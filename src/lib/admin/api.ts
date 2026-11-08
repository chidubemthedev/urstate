"use client";

import { useCallback, useEffect, useState } from "react";

const BASE = `${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}/api/admin`;

export class AdminApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Calls the admin API with the session cookie. Throws AdminApiError on failure. */
export async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new AdminApiError(0, "Can't reach the server. Check your connection and try again.");
  }

  if (res.status === 401 && typeof window !== "undefined") {
    window.location.href = "/login";
  }

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new AdminApiError(res.status, body?.error ?? "Something went wrong. Try again.");
  }
  return body as T;
}

/** POSTs an admin action, e.g. adminAction(`/users/${id}/suspend`, { reason }). */
export const adminAction = <T = unknown>(path: string, body: Record<string, unknown> = {}) =>
  adminFetch<T>(path, { method: "POST", body: JSON.stringify(body) });

/**
 * Loads an admin API path and reloads whenever the path changes.
 * Pass null to skip loading. Call reload() after an action to refresh.
 *
 * With keepPrevious (the default, good for lists), the last result stays on
 * screen while a new filter loads. Detail pages pass false so one record's
 * data is never shown under another record's URL.
 */
export function useAdminQuery<T>(path: string | null, { keepPrevious = true } = {}) {
  const [version, setVersion] = useState(0);
  const key = path === null ? null : `${path}#${version}`;
  const [result, setResult] = useState<{ key: string; path: string; data?: T; error?: AdminApiError } | null>(null);
  const [lastData, setLastData] = useState<{ path: string; data: T } | null>(null);

  useEffect(() => {
    if (key === null || path === null) return;
    let cancelled = false;
    adminFetch<T>(path)
      .then((data) => {
        if (cancelled) return;
        setResult({ key, path, data });
        setLastData({ path, data });
      })
      .catch((error: AdminApiError) => {
        if (!cancelled) setResult({ key, path, error });
      });
    return () => {
      cancelled = true;
    };
  }, [key, path]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  const settled = result?.key === key;
  const data = lastData && (keepPrevious || lastData.path === path) ? lastData.data : null;

  return {
    data,
    error: settled ? (result?.error ?? null) : null,
    loading: key !== null && !settled,
    reload,
  };
}
