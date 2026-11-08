"use client";

import { useParams } from "next/navigation";
import { Bath, BedDouble } from "lucide-react";
import { useAdminQuery } from "@/lib/admin/api";
import { formatDate, formatNaira, frequencyLong, shortId } from "@/lib/admin/format";
import { reviewStatusMeta } from "@/lib/admin/status";
import type { PropertyDetail } from "@/lib/admin/types";
import { ActionBar, Breadcrumb } from "@/components/admin/shell/page-header";
import { PropertyActions } from "@/components/admin/properties/property-actions";
import { PropertyGallery } from "@/components/admin/properties/property-gallery";
import { DocumentsCard, OwnerCard, ReviewHistoryCard } from "@/components/admin/properties/property-side-cards";
import { DetailGrid } from "@/components/admin/ui/detail-list";
import { Panel } from "@/components/admin/ui/panel";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { ErrorState, LoadingState } from "@/components/admin/ui/states";

const PUBLICATION = { unpublished: "Not published", published: "Published", paused: "Paused" } as const;
const OCCUPANCY = { vacant: "Vacant", reserved: "Reserved", occupied: "Occupied" } as const;

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, reload } = useAdminQuery<PropertyDetail>(`/properties/${id}`, { keepPrevious: false });

  if (error && !data) {
    return (
      <>
        <Breadcrumb parent="Properties" href="/admin/properties" current="Property" />
        <ErrorState message={error.message} onRetry={error.status === 404 ? undefined : reload} />
      </>
    );
  }
  if (!data) return <LoadingState rows={6} />;

  const p = data.property;
  const specs = [
    p.bedrooms > 0 && { icon: <BedDouble className="size-[13px]" aria-hidden />, label: `${p.bedrooms} bedroom${p.bedrooms === 1 ? "" : "s"}` },
    { icon: <Bath className="size-[13px]" aria-hidden />, label: `${p.bathrooms} bathroom${p.bathrooms === 1 ? "" : "s"}` },
    p.toilets > 0 && { icon: null, label: `${p.toilets} toilet${p.toilets === 1 ? "" : "s"}` },
    p.propertyType && { icon: null, label: p.propertyType },
    p.furnishing && { icon: null, label: p.furnishing },
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

  return (
    <>
      <Breadcrumb parent="Properties" href="/admin/properties" current={p.name} />
      <ActionBar
        status={
          <>
            {p.flagged && <StatusBadge meta={{ label: "Flagged", tone: "danger" }} className="px-3.5 py-1.5 text-[13px]" />}
            <StatusBadge meta={reviewStatusMeta[p.verificationStatus]} variant="solid" className="px-3.5 py-1.5 text-[13px] font-bold" />
          </>
        }
      >
        <PropertyActions detail={data} onChanged={reload} />
      </ActionBar>

      {(p.verificationReason || p.flaggedReason) && (
        <div className="mb-5 space-y-1 text-[13px] text-admin-subtle">
          {p.verificationReason && <p>Review note: {p.verificationReason}</p>}
          {p.flaggedReason && <p>Flag reason: {p.flaggedReason}</p>}
        </div>
      )}

      <PropertyGallery photos={p.photos} name={p.name} />

      <div className="grid items-start gap-5 xl:grid-cols-[1fr_380px]">
        <Panel className="overflow-hidden">
          <div className="border-b border-admin-line px-6 pb-5 pt-6">
            <div className="mb-1.5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="mb-1 text-xl font-extrabold text-admin-ink">{p.name}</h1>
                <p className="text-[13.5px] text-admin-muted">{[p.address, p.city, p.state].filter(Boolean).join(", ")}</p>
              </div>
              <div className="text-right">
                <p className="text-[26px] font-extrabold leading-tight text-admin-ink">{formatNaira(p.rentAmountKobo)}</p>
                <p className="text-[12.5px] font-medium text-admin-muted">{frequencyLong(p.paymentFrequency)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {specs.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-1.5 rounded-full bg-admin-line px-3 py-1.5 text-[12.5px] font-semibold text-admin-subtle">
                  {s.icon}
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div className="border-b border-admin-line px-6 py-5">
            <h2 className="mb-2.5 text-[13.5px] font-bold text-admin-ink">Description</h2>
            <p className="max-w-prose text-[13.5px] leading-[1.75] text-admin-subtle">{p.description || "No description provided."}</p>
            {p.amenities.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Amenities">
                {p.amenities.map((a) => (
                  <li key={a} className="rounded-md border border-admin-border px-2.5 py-1 text-xs text-admin-body">
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-6 py-5">
            <h2 className="mb-1 text-[13.5px] font-bold text-admin-ink">Listing details</h2>
            <DetailGrid
              items={[
                { label: "Property ID", value: shortId("PROP", p.id), mono: true },
                { label: "Category", value: p.category === "shortlet" ? "Shortlet" : p.category === "long_term" ? "Long term" : p.category },
                { label: "Caution fee", value: formatNaira(p.cautionFeeKobo) },
                { label: "Service charge", value: formatNaira(p.serviceChargeKobo) },
                { label: "Publication", value: PUBLICATION[p.publicationStatus] },
                { label: "Occupancy", value: OCCUPANCY[p.occupancyStatus] },
                { label: "Applications", value: String(data.applicationCount) },
                { label: "Max occupants", value: p.maxOccupants ?? "—" },
                { label: "Submitted for review", value: formatDate(p.submittedAt) },
                { label: "Last reviewed", value: formatDate(p.reviewedAt) },
              ]}
            />
          </div>
        </Panel>

        <div className="flex flex-col gap-5">
          <OwnerCard detail={data} />
          <DocumentsCard documents={data.documents} />
          <ReviewHistoryCard history={data.history} />
        </div>
      </div>
    </>
  );
}
