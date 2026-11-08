"use client";

import { Suspense } from "react";
import { useAdminQuery } from "@/lib/admin/api";
import { formatNaira } from "@/lib/admin/format";
import { paymentStatusMeta } from "@/lib/admin/status";
import { useUrlParams } from "@/lib/admin/use-url-params";
import type { PaymentList, PaymentStatus } from "@/lib/admin/types";
import { PageHeader } from "@/components/admin/shell/page-header";
import { PaymentsTable } from "@/components/admin/payments/payments-table";
import { FilterPills } from "@/components/admin/ui/filter-pills";
import { Panel } from "@/components/admin/ui/panel";
import { EmptyState, ErrorState, LoadingState } from "@/components/admin/ui/states";

type Filter = "all" | PaymentStatus;
const STATUSES: PaymentStatus[] = ["pending", "confirmed", "failed", "disputed", "refunded", "initiated"];

function PaymentsContent() {
  const { get, set } = useUrlParams();
  const filter = (get("status") as Filter) ?? "all";
  const { data, error, loading, reload } = useAdminQuery<PaymentList>(
    filter === "all" ? "/payments" : `/payments?status=${filter}`,
  );

  const summary = data && [
    { label: "Confirmed", value: data.summary.confirmedKobo, className: "text-admin-ink" },
    { label: "In progress", value: data.summary.pendingKobo, className: "text-admin-warning" },
    { label: "Awaiting payout", value: data.summary.awaitingPayoutKobo, className: "text-admin-info" },
    { label: "Failed", value: data.summary.failedKobo, className: "text-admin-danger" },
  ];
  const filteredTotal = data?.rows.reduce((sum, p) => sum + p.amountKobo, 0) ?? 0;

  return (
    <>
      <PageHeader title="Payments" subtitle="Rent and rental charges paid through UrState. Subscription billing is tracked separately.">
        <FilterPills<Filter>
          label="Filter by status"
          value={filter}
          onChange={(v) => set({ status: v })}
          options={[
            { value: "all", label: "All", count: data?.counts.all },
            ...STATUSES.map((s) => ({ value: s, label: paymentStatusMeta[s].label, count: data?.counts[s] })),
          ]}
        />
      </PageHeader>

      {error && !data ? (
        <ErrorState message={error.message} onRetry={reload} />
      ) : !data ? (
        <LoadingState />
      ) : (
        <div aria-busy={loading}>
          <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summary!.map((s) => (
              <Panel key={s.label} className="px-5 py-4">
                <h2 className="mb-1.5 text-xs font-semibold text-admin-muted">{s.label}</h2>
                <p className={`text-xl font-extrabold ${s.className}`}>{formatNaira(s.value)}</p>
              </Panel>
            ))}
          </div>
          <Panel className="overflow-hidden">
            {data.rows.length ? (
              <PaymentsTable rows={data.rows} />
            ) : (
              <EmptyState>{filter === "all" ? "No payments yet." : "No payments with this status."}</EmptyState>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-admin-line px-5 py-3.5 text-[13px]">
              <span className="text-admin-muted">
                Showing {data.rows.length} of {data.counts.all} payments
              </span>
              <span className="font-bold text-admin-ink">Shown total: {formatNaira(filteredTotal)}</span>
            </div>
          </Panel>
        </div>
      )}
    </>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PaymentsContent />
    </Suspense>
  );
}
