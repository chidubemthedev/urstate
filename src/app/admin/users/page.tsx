"use client";

import { Suspense, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useAdminQuery } from "@/lib/admin/api";
import { useUrlParams } from "@/lib/admin/use-url-params";
import type { UserList } from "@/lib/admin/types";
import { PageHeader } from "@/components/admin/shell/page-header";
import { UsersTable } from "@/components/admin/users/users-table";
import { FilterPills } from "@/components/admin/ui/filter-pills";
import { Pagination } from "@/components/admin/ui/pagination";
import { Panel } from "@/components/admin/ui/panel";
import { EmptyState, ErrorState, LoadingState } from "@/components/admin/ui/states";

const PAGE_SIZE = 10;
type RoleFilter = "all" | "renter" | "owner";

function UsersPageContent() {
  const { get, set } = useUrlParams();
  const role = (get("role") as RoleFilter) ?? "all";
  const page = Number(get("page") ?? 1);
  const search = get("search") ?? "";
  const [query, setQuery] = useState(search);

  // Debounce typing before it reaches the URL and the API.
  useEffect(() => {
    const t = setTimeout(() => {
      if (query !== search) set({ search: query.trim(), page: undefined });
    }, 300);
    return () => clearTimeout(t);
  }, [query, search, set]);

  const qs = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
  if (role !== "all") qs.set("role", role);
  if (search) qs.set("search", search);
  const { data, error, loading, reload } = useAdminQuery<UserList>(`/users?${qs}`);

  return (
    <>
      <PageHeader title="Users" />
      <div className="mb-5 flex flex-wrap items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-admin-muted" aria-hidden />
          <label htmlFor="user-search" className="sr-only">
            Search users
          </label>
          <input
            id="user-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email"
            className="w-full rounded-[10px] border-[1.5px] border-admin-border bg-white py-2.5 pl-[38px] pr-3.5 text-sm text-admin-ink outline-none focus:border-admin-accent"
          />
        </div>
        <FilterPills<RoleFilter>
          label="Filter by role"
          value={role}
          onChange={(v) => set({ role: v, page: undefined })}
          options={[
            { value: "all", label: "All", count: data?.counts.all },
            { value: "renter", label: "Renters", count: data?.counts.renter },
            { value: "owner", label: "Owners", count: data?.counts.owner },
          ]}
        />
        {data && (
          <span className="ml-auto text-[13px] text-admin-muted">
            {data.total} user{data.total === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {error && !data ? (
        <ErrorState message={error.message} onRetry={reload} />
      ) : !data ? (
        <LoadingState />
      ) : (
        <Panel className="overflow-hidden" aria-busy={loading}>
          {data.rows.length ? (
            <UsersTable rows={data.rows} onChanged={reload} />
          ) : (
            <EmptyState>{search ? `No users match “${search}”.` : "No users yet. They'll appear here once people sign up."}</EmptyState>
          )}
          <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onPageChange={(p) => set({ page: p === 1 ? undefined : p })} />
        </Panel>
      )}
    </>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <UsersPageContent />
    </Suspense>
  );
}
