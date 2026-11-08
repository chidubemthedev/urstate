import { formatDistanceToNowStrict } from "date-fns";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** 180000000 kobo → "₦1,800,000" */
export const formatNaira = (kobo: number | null | undefined) =>
  kobo === null || kobo === undefined ? "—" : naira.format(kobo / 100).replace("NGN", "₦");

/** 180000000 kobo → "₦1.8m" (for chart axes and tight spaces) */
export const formatNairaCompact = (kobo: number) => {
  const n = kobo / 100;
  if (n >= 1_000_000_000) return `₦${trim(n / 1_000_000_000)}bn`;
  if (n >= 1_000_000) return `₦${trim(n / 1_000_000)}m`;
  if (n >= 1_000) return `₦${trim(n / 1_000)}k`;
  return `₦${n}`;
};
const trim = (n: number) => (n >= 100 ? Math.round(n).toString() : n.toFixed(1).replace(/\.0$/, ""));

export const formatCount = (n: number | undefined) => (n ?? 0).toLocaleString("en-NG");

export const formatDate = (value: string | null | undefined) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

export const formatDateTime = (value: string | null | undefined) =>
  value
    ? new Date(value).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "—";

export const timeAgo = (value: string) => `${formatDistanceToNowStrict(new Date(value))} ago`;

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

/** Stable avatar colour per person, from the design's avatar palette. */
const AVATAR_COLOURS = ["#6366F1", "#0EA5E9", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"];
export const avatarColour = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_COLOURS[h % AVATAR_COLOURS.length];
};

export const frequencyLabel = (f: string) =>
  ({ yearly: "/yr", monthly: "/mo", quarterly: "/qtr", weekly: "/wk", daily: "/night" })[f] ?? `/${f}`;

/** "USR-…" style short reference from a UUID, for display only. */
export const shortId = (prefix: string, id: string) => `${prefix}-${id.slice(0, 8).toUpperCase()}`;

export const frequencyLong = (f: string) =>
  ({ yearly: "per year", monthly: "per month", quarterly: "per quarter", weekly: "per week", daily: "per night" })[f] ?? `per ${f}`;
