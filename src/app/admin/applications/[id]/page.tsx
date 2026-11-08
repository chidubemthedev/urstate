"use client";

import { useParams } from "next/navigation";
import { Info } from "lucide-react";
import { useAdminQuery } from "@/lib/admin/api";
import { formatDate, formatDateTime } from "@/lib/admin/format";
import { actionLabel, actionTone, applicationStatusMeta } from "@/lib/admin/status";
import type { ApplicationDetail } from "@/lib/admin/types";
import { ActionBar, Breadcrumb } from "@/components/admin/shell/page-header";
import { PartyCards } from "@/components/admin/applications/party-cards";
import { DetailGrid } from "@/components/admin/ui/detail-list";
import { Panel, PanelTitle } from "@/components/admin/ui/panel";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { ErrorState, LoadingState } from "@/components/admin/ui/states";
import { Timeline } from "@/components/admin/ui/timeline";

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, reload } = useAdminQuery<ApplicationDetail>(`/applications/${id}`, { keepPrevious: false });

  if (error && !data) {
    return (
      <>
        <Breadcrumb parent="Applications" href="/admin/applications" current="Application" />
        <ErrorState message={error.message} onRetry={error.status === 404 ? undefined : reload} />
      </>
    );
  }
  if (!data) return <LoadingState rows={6} />;

  const a = data.application;
  // Submission is the first event; owner decisions and later changes come from the audit log.
  const timeline = [
    ...data.history.map((h) => ({
      id: h.id,
      title: actionLabel(h.action),
      detail: [h.reason, h.actorName && `by ${h.actorName}`].filter(Boolean).join(" · ") || null,
      time: formatDateTime(h.createdAt),
      tone: actionTone(h.action),
    })),
    { id: "submitted", title: `Application submitted by ${data.renter.name}`, detail: null, time: formatDateTime(a.createdAt), tone: "accent" as const },
  ];

  return (
    <>
      <Breadcrumb parent="Applications" href="/admin/applications" current={`${data.renter.name}, ${data.property.name}`} />
      <ActionBar status={<StatusBadge meta={applicationStatusMeta[a.status]} dot className="px-3.5 py-1.5 text-[13px] font-bold" />}>
        <p className="flex items-center gap-2 text-[13px] text-admin-subtle">
          <Info className="size-4 shrink-0 text-admin-muted" aria-hidden />
          The owner or manager decides this application. Admins can review it but not change the outcome.
        </p>
      </ActionBar>

      <PartyCards detail={data} />

      <div className="grid items-start gap-5 lg:grid-cols-2">
        <Panel className="p-6">
          <PanelTitle className="mb-1">Application details</PanelTitle>
          <DetailGrid
            items={[
              { label: "Requested move-in", value: formatDate(a.moveInDate) },
              { label: "Duration", value: a.durationMonths ? `${a.durationMonths} months` : "—" },
              { label: "Submitted", value: formatDateTime(a.createdAt) },
              { label: "Decided", value: a.decidedAt ? `${formatDateTime(a.decidedAt)}${data.decidedByName ? ` by ${data.decidedByName}` : ""}` : "Not yet" },
              { label: "Message from renter", value: a.message || "No message", wide: true },
              ...(a.decisionReason ? [{ label: "Decision reason", value: a.decisionReason, wide: true }] : []),
            ]}
          />
        </Panel>
        <Panel className="p-6">
          <PanelTitle className="mb-5">History</PanelTitle>
          <Timeline entries={timeline} empty="No history yet." />
        </Panel>
      </div>
    </>
  );
}
