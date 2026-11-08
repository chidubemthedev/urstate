import Link from "next/link";
import { BadgeCheck, FileImage, FileText } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/admin/format";
import { actionLabel, actionTone, reviewStatusMeta } from "@/lib/admin/status";
import type { PropertyDetail } from "@/lib/admin/types";
import { Avatar } from "../ui/avatar";
import { DetailRows } from "../ui/detail-list";
import { Panel, PanelTitle } from "../ui/panel";
import { Timeline } from "../ui/timeline";

const DOC_KIND: Record<string, string> = {
  ownership_evidence: "Ownership evidence",
  management_authority: "Management authority",
  lease: "Lease agreement",
  other: "Other",
};

const fileSize = (bytes: number | null) =>
  bytes === null ? "" : bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.round(bytes / 1000)} KB`;

export function OwnerCard({ detail }: { detail: PropertyDetail }) {
  const { owner, property } = detail;
  if (!owner) return null;
  const verified = owner.kycStatus === "verified";
  return (
    <Panel className="p-6">
      <PanelTitle className="mb-4 text-sm">{property.authorityType === "manager" ? "Manager details" : "Owner details"}</PanelTitle>
      <div className="mb-4 flex items-center gap-3">
        <Avatar name={owner.name} seed={owner.id} image={owner.image} size="lg" />
        <div className="min-w-0">
          <Link href={`/admin/users/${owner.id}`} className="block truncate text-sm font-bold text-admin-ink hover:underline">
            {owner.name}
          </Link>
          <span className={`mt-1 flex items-center gap-1 text-xs font-medium ${verified ? "text-admin-success" : "text-admin-muted"}`}>
            {verified && <BadgeCheck className="size-3.5" aria-hidden />}
            Identity: {reviewStatusMeta[owner.kycStatus].label}
          </span>
        </div>
      </div>
      <DetailRows
        items={[
          { label: "Email", value: owner.email },
          { label: "Phone", value: owner.phone ?? "Not added" },
          { label: "Authority", value: property.authorityType === "manager" ? "Manages for owner" : property.authorityType === "owner" ? "Owns property" : "Not stated" },
          { label: "Joined", value: formatDate(owner.createdAt) },
        ]}
      />
    </Panel>
  );
}

export function DocumentsCard({ documents }: { documents: PropertyDetail["documents"] }) {
  return (
    <Panel className="p-6">
      <PanelTitle className="mb-2 text-sm">Uploaded documents</PanelTitle>
      {documents.length === 0 ? (
        <p className="py-3 text-[13px] text-admin-muted">No documents uploaded.</p>
      ) : (
        <ul>
          {documents.map((doc, i) => {
            const Icon = doc.mimeType?.startsWith("image/") ? FileImage : FileText;
            return (
              <li key={doc.id} className={`flex items-center gap-3 py-3 ${i < documents.length - 1 ? "border-b border-admin-line" : ""}`}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-admin-line bg-gray-50">
                  <Icon className="size-[18px] text-admin-accent" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-admin-ink">{doc.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-admin-muted">
                    {[DOC_KIND[doc.kind] ?? doc.kind, fileSize(doc.sizeBytes)].filter(Boolean).join(", ")}
                  </p>
                </div>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[12.5px] font-semibold text-admin-accent hover:underline">
                  View<span className="sr-only"> {doc.name} (opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}

export function ReviewHistoryCard({ history }: { history: PropertyDetail["history"] }) {
  return (
    <Panel className="p-6">
      <PanelTitle className="mb-4 text-sm">Review history</PanelTitle>
      <Timeline
        empty="No reviews recorded yet."
        entries={history.map((h) => ({
          id: h.id,
          title: actionLabel(h.action),
          detail: [h.reason, h.actorName && `by ${h.actorName}`].filter(Boolean).join(" · ") || null,
          time: formatDateTime(h.createdAt),
          tone: actionTone(h.action),
        }))}
      />
    </Panel>
  );
}
