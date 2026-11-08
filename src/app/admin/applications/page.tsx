"use client";

import { Suspense } from "react";
import { useAdminQuery } from "@/lib/admin/api";
import { applicationStatusMeta } from "@/lib/admin/status";
import { useUrlParams } from "@/lib/admin/use-url-params";
import type { ApplicationList, ApplicationStatus } from "@/lib/admin/types";
import { PageHeader } from "@/components/admin/shell/page-header";
import { ApplicationsTable } from "@/components/admin/applications/applications-table";
import { FilterPills } from "@/components/admin/ui/filter-pills";
import { Panel } from "@/components/admin/ui/panel";
import { EmptyState, ErrorState, LoadingState } from "@/components/admin/ui/states";

type Filter = "all" | ApplicationStatus;
const STATUSES: ApplicationStatus[] = ["submitted", "under_review", "accepted", "rejected", "withdrawn"];

function ApplicationsContent() {
  const { get, set } = useUrlParams();
  const filter = (get("status") as Filter) ?? "all";
  const { data, error, loading, reload } = useAdminQuery<ApplicationList>(
    filter === "all" ? "/applications" : `/applications?status=${filter}`,
  );

  return (
    <>
      <PageHeader title="Applications" subtitle="Owners and managers decide on applications. This view is for oversight.">
        <FilterPills<Filter>
          label="Filter by status"
          value={filter}
          onChange={(v) => set({ status: v })}
          options={[
            { value: "all", label: "All", count: data?.counts.all },
            ...STATUSES.map((s) => ({ value: s, label: applicationStatusMeta[s].label, count: data?.counts[s] })),
          ]}
        />
      </PageHeader>

      {error && !data ? (
        <ErrorState message={error.message} onRetry={reload} />
      ) : !data ? (
        <LoadingState />
      ) : (
        <Panel className="overflow-hidden" aria-busy={loading}>
          {data.rows.length ? (
            <ApplicationsTable rows={data.rows} />
          ) : (
            <EmptyState>
              {filter === "all" ? "No applications yet. They'll appear when renters apply to published properties." : "No applications with this status."}
            </EmptyState>
          )}
          <p className="border-t border-admin-line px-5 py-3.5 text-[13px] text-admin-muted">
            Showing {data.rows.length} of {data.counts.all} applications
          </p>
        </Panel>
      )}
    </>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ApplicationsContent />
    </Suspense>
  );
}
