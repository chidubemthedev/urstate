"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Info } from "lucide-react";
import { useAdminQuery } from "@/lib/admin/api";
import { formatDate, formatDateTime, formatNaira } from "@/lib/admin/format";
import { actionLabel, actionTone, paymentStatusMeta, paymentTypeLabel, payoutStatusMeta } from "@/lib/admin/status";
import type { PaymentDetail } from "@/lib/admin/types";
import { ActionBar, Breadcrumb } from "@/components/admin/shell/page-header";
import { PaymentFlagButton } from "@/components/admin/payments/payment-flag-button";
import { PaymentStepper } from "@/components/admin/payments/payment-stepper";
import { Avatar } from "@/components/admin/ui/avatar";
import { DetailGrid } from "@/components/admin/ui/detail-list";
import { Panel, PanelTitle } from "@/components/admin/ui/panel";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { ErrorState, LoadingState } from "@/components/admin/ui/states";
import { Timeline, type TimelineEntry } from "@/components/admin/ui/timeline";

export default function PaymentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, reload } = useAdminQuery<PaymentDetail>(`/payments/${id}`, { keepPrevious: false });

  if (error && !data) {
    return (
      <>
        <Breadcrumb parent="Payments" href="/admin/payments" current="Payment" />
        <ErrorState message={error.message} onRetry={error.status === 404 ? undefined : reload} />
      </>
    );
  }
  if (!data) return <LoadingState rows={6} />;

  const p = data.payment;
  const receiptReady = p.status === "confirmed" || p.status === "refunded";

  // Key moments from the payment record, merged with recorded admin/provider events.
  const timeline: (TimelineEntry & { at: number })[] = [
    { id: "created", title: `Payment initiated by ${data.renter.name}`, detail: p.method, time: formatDateTime(p.createdAt), tone: "accent" as const, at: +new Date(p.createdAt) },
    ...(p.confirmedAt && !data.history.some((h) => h.action === "payment.confirmed")
      ? [{ id: "confirmed", title: "Payment confirmed", detail: p.provider ? `via ${p.provider}` : null, time: formatDateTime(p.confirmedAt), tone: "success" as const, at: +new Date(p.confirmedAt) }]
      : []),
    ...(p.status === "failed" ? [{ id: "failed", title: "Payment failed", detail: p.failureReason, time: "", tone: "danger" as const, at: Number.MAX_SAFE_INTEGER - 1 }] : []),
    ...(p.paidOutAt ? [{ id: "paid-out", title: `Paid out to ${data.owner.name}`, detail: null, time: formatDateTime(p.paidOutAt), tone: "success" as const, at: +new Date(p.paidOutAt) }] : []),
    ...data.history.map((h) => ({
      id: h.id,
      title: actionLabel(h.action),
      detail: [h.reason, h.actorName && `by ${h.actorName}`].filter(Boolean).join(" · ") || null,
      time: formatDateTime(h.createdAt),
      tone: actionTone(h.action),
      at: +new Date(h.createdAt),
    })),
  ].sort((a, b) => b.at - a.at);

  return (
    <>
      <Breadcrumb parent="Payments" href="/admin/payments" current={p.reference} />
      <ActionBar
        status={
          <>
            {p.flagged && <StatusBadge meta={{ label: "Flagged", tone: "danger" }} className="px-3.5 py-1.5 text-[13px]" />}
            <StatusBadge meta={paymentStatusMeta[p.status]} dot className="px-3.5 py-1.5 text-[13px] font-bold" />
          </>
        }
      >
        <PaymentFlagButton id={p.id} flagged={p.flagged} onChanged={reload} />
        <p className="flex items-center gap-2 text-[13px] text-admin-subtle">
          <Info className="size-4 shrink-0 text-admin-muted" aria-hidden />
          Payment status comes from the payment provider. Admins can&apos;t release, hold or refund funds here.
        </p>
      </ActionBar>
      {p.flaggedReason && <p className="mb-5 text-[13px] text-admin-subtle">Flag reason: {p.flaggedReason}</p>}

      <Panel className="mb-5 p-6 sm:p-7">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="mb-2.5 text-xs font-semibold text-admin-muted">Amount</h2>
            <p className="mb-3 text-[42px] font-extrabold leading-none text-admin-ink">{formatNaira(p.amountKobo)}</p>
            <p className="text-[13px] text-admin-muted">
              {paymentTypeLabel[p.type]}
              {p.method && `, ${p.method}`}
              {p.isRecordedHistory && ", recorded history"}
            </p>
          </div>
          <StatusBadge meta={payoutStatusMeta[p.payoutStatus]} dot />
        </div>

        <div className="flex flex-col items-stretch gap-4 rounded-xl bg-gray-50 px-6 py-[18px] sm:flex-row sm:items-center">
          <Link href={`/admin/users/${data.renter.id}`} className="flex min-w-0 flex-1 items-center gap-3 hover:underline">
            <Avatar name={data.renter.name} seed={data.renter.id} image={data.renter.image} size="lg" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-admin-ink">{data.renter.name}</span>
              <span className="text-xs text-admin-muted">Paid by (renter)</span>
            </span>
          </Link>
          <ArrowRight className="hidden size-5 shrink-0 text-admin-muted sm:block" aria-hidden />
          <Link href={`/admin/users/${data.owner.id}`} className="flex min-w-0 flex-1 items-center gap-3 hover:underline sm:flex-row-reverse sm:text-right">
            <Avatar name={data.owner.name} seed={data.owner.id} image={data.owner.image} size="lg" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-admin-ink">{data.owner.name}</span>
              <span className="text-xs text-admin-muted">Paid to (owner or manager)</span>
            </span>
          </Link>
        </div>

        <div className="mt-7 border-t border-admin-line pt-6">
          <h2 className="mb-5 text-[12.5px] font-bold text-admin-muted">Payment journey</h2>
          <PaymentStepper status={p.status} />
        </div>
      </Panel>

      <div className="mb-5 grid items-start gap-5 lg:grid-cols-[1fr_280px]">
        <Panel className="p-6">
          <PanelTitle className="mb-1">Payment details</PanelTitle>
          <DetailGrid
            items={[
              { label: "UrState reference", value: p.reference, mono: true },
              { label: "Provider reference", value: p.providerReference ?? "Not issued yet", mono: !!p.providerReference },
              { label: "Payment type", value: paymentTypeLabel[p.type] },
              { label: "Method", value: p.method },
              { label: "Initiated", value: formatDateTime(p.createdAt) },
              { label: "Confirmed", value: formatDateTime(p.confirmedAt) },
              { label: "Rent period", value: p.periodStart ? `${formatDate(p.periodStart)} to ${formatDate(p.periodEnd)}` : "—" },
              { label: "Payout", value: payoutStatusMeta[p.payoutStatus].label },
              { label: "Property", value: <Link href={`/admin/properties/${data.property.id}`} className="hover:underline">{data.property.name}, {data.property.address}</Link>, wide: true },
              ...(p.failureReason ? [{ label: "Failure reason", value: p.failureReason, wide: true }] : []),
            ]}
          />
        </Panel>

        <Panel className="flex flex-col p-[22px]">
          <PanelTitle className="mb-4 text-sm">Receipt</PanelTitle>
          {receiptReady ? (
            <div className="rounded-xl border-[1.5px] border-dashed border-admin-border bg-gray-50 p-4">
              <div className="rounded-lg bg-white px-4 py-5 shadow-admin-card">
                <p className="mb-1 text-center text-[10px] text-admin-muted">Payment receipt</p>
                <p className="mb-3 text-center text-lg font-extrabold text-admin-ink">{formatNaira(p.amountKobo)}</p>
                <dl className="space-y-1.5 border-t border-dashed border-admin-border pt-3 text-[11px]">
                  {[
                    ["Ref", p.reference],
                    ["Date", formatDate(p.confirmedAt)],
                    ["Status", paymentStatusMeta[p.status].label],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="text-admin-muted">{k}</dt>
                      <dd className="truncate font-mono font-bold text-admin-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ) : (
            <p className="text-[13px] leading-relaxed text-admin-muted">A receipt is issued once the provider confirms the payment.</p>
          )}
        </Panel>
      </div>

      <Panel className="p-6">
        <PanelTitle className="mb-5">Timeline</PanelTitle>
        <Timeline entries={timeline} empty="No events yet." />
      </Panel>
    </>
  );
}
