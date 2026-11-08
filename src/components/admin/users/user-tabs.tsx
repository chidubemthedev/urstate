"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate, formatDateTime, formatNaira, shortId } from "@/lib/admin/format";
import { actionLabel, actionTone, paymentStatusMeta, paymentTypeLabel, reviewStatusMeta } from "@/lib/admin/status";
import type { UserDetail } from "@/lib/admin/types";
import { DetailGrid } from "../ui/detail-list";
import { DocumentTile } from "../ui/document-tile";
import { Panel } from "../ui/panel";
import { StatusBadge } from "../ui/status-badge";
import { Tabs } from "../ui/tabs";
import { Timeline } from "../ui/timeline";

const TABS = ["Identity details", "Activity history", "Linked payments"] as const;

export function UserTabs({ detail }: { detail: UserDetail }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0]);
  const { user, kyc } = detail;

  return (
    <Panel className="overflow-hidden">
      <Tabs tabs={TABS} value={tab} onChange={setTab}>
        {tab === "Identity details" &&
          (kyc ? (
            <>
              {kyc.reviewReason && (
                <p className="mb-5 rounded-[10px] border-l-[3px] border-amber-400 bg-[#FFFBEB] px-4 py-3 text-[13px] text-admin-body">
                  <span className="font-semibold">Last review note: </span>
                  {kyc.reviewReason}
                </p>
              )}
              <div className="mb-7">
                <DetailGrid
                  items={[
                    { label: "User ID", value: shortId("USR", user.id), mono: true },
                    { label: "Date of birth", value: formatDate(kyc.dateOfBirth) },
                    { label: "ID type", value: kyc.idType },
                    { label: "ID number", value: kyc.idNumber, mono: true },
                    { label: "Address", value: kyc.address, wide: true },
                    { label: "State", value: kyc.state },
                    { label: "Country", value: kyc.country },
                    { label: "Submitted", value: formatDateTime(kyc.submittedAt) },
                    { label: "Status", value: <StatusBadge meta={reviewStatusMeta[kyc.status]} dot /> },
                  ]}
                />
              </div>
              <h3 className="mb-3.5 text-[13.5px] font-semibold text-admin-ink">Uploaded documents</h3>
              {kyc.documents.length ? (
                <div className="flex flex-wrap gap-3.5">
                  {kyc.documents.map((d) => (
                    <DocumentTile key={d.label + d.url} label={d.label} url={d.url} mimeType={d.mimeType} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-admin-muted">No documents uploaded.</p>
              )}
            </>
          ) : (
            <p className="py-8 text-center text-sm text-admin-muted">
              {user.name} hasn&apos;t submitted an identity check yet.
            </p>
          ))}

        {tab === "Activity history" && (
          <Timeline
            empty="No recorded activity yet."
            entries={detail.activity.map((a) => ({
              id: a.id,
              title: actionLabel(a.action),
              detail: [a.reason, a.actorName && `by ${a.actorName}`].filter(Boolean).join(" · ") || null,
              time: formatDateTime(a.createdAt),
              tone: actionTone(a.action),
            }))}
          />
        )}

        {tab === "Linked payments" &&
          (detail.payments.length ? (
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse">
                <thead>
                  <tr>
                    {["Reference", "Type", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} scope="col" className="border-b border-admin-line pb-3.5 pr-3 text-left text-xs font-semibold uppercase tracking-[0.04em] text-admin-muted">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detail.payments.map((p) => (
                    <tr key={p.id} className="border-b border-admin-line last:border-0">
                      <td className="py-3.5 pr-3">
                        <Link href={`/admin/payments/${p.id}`} className="font-mono text-[13px] font-semibold text-admin-ink hover:underline">
                          {p.reference}
                        </Link>
                      </td>
                      <td className="py-3.5 pr-3 text-[13px] text-admin-subtle">{paymentTypeLabel[p.type]}</td>
                      <td className="py-3.5 pr-3 text-sm font-bold text-admin-ink">{formatNaira(p.amountKobo)}</td>
                      <td className="py-3.5 pr-3">
                        <StatusBadge meta={paymentStatusMeta[p.status]} dot />
                      </td>
                      <td className="py-3.5 text-[13px] text-admin-subtle">{formatDate(p.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-admin-muted">No payments linked to this user.</p>
          ))}
      </Tabs>
    </Panel>
  );
}
