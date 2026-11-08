import Link from "next/link";
import { Bath, BedDouble, Mail } from "lucide-react";
import { formatDate, formatNaira, frequencyLabel } from "@/lib/admin/format";
import { reviewStatusMeta } from "@/lib/admin/status";
import type { ApplicationDetail, ReviewStatus } from "@/lib/admin/types";
import { Avatar } from "../ui/avatar";
import { Panel } from "../ui/panel";
import { StatusBadge } from "../ui/status-badge";
import { SafeImage } from "../ui/safe-image";

function PersonCard({
  heading,
  person,
  kycStatus,
  rows,
}: {
  heading: string;
  person: { id: string; name: string; email?: string; image?: string | null };
  kycStatus: ReviewStatus;
  rows: { label: string; value: string }[];
}) {
  return (
    <Panel className="flex flex-col p-6">
      <h2 className="mb-4 text-xs font-bold text-admin-muted">{heading}</h2>
      <div className="mb-4 flex items-center gap-3.5">
        <Avatar name={person.name} seed={person.id} image={person.image} size="lg" />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold text-admin-ink">{person.name}</p>
          <StatusBadge meta={{ ...reviewStatusMeta[kycStatus], label: `Identity: ${reviewStatusMeta[kycStatus].label}` }} dot className="mt-1" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        {person.email && (
          <span className="flex items-center gap-2 text-[13px] text-admin-body">
            <Mail className="size-3.5 shrink-0 text-admin-muted" aria-hidden />
            <span className="truncate">{person.email}</span>
          </span>
        )}
        {rows.map((r) => (
          <span key={r.label} className="flex items-center gap-2 text-[13px]">
            <span className="min-w-[88px] text-[11.5px] text-admin-muted">{r.label}</span>
            <span className="font-medium text-admin-body">{r.value}</span>
          </span>
        ))}
      </div>
      <Link href={`/admin/users/${person.id}`} className="mt-4 text-[13px] font-semibold text-admin-accent hover:underline">
        View full profile
      </Link>
    </Panel>
  );
}

/** Renter / property / owner trio from the match-detail design. */
export function PartyCards({ detail }: { detail: ApplicationDetail }) {
  const { renter, owner, property } = detail;
  return (
    <div className="mb-5 grid gap-5 lg:grid-cols-3">
      <PersonCard
        heading="Renter"
        person={renter}
        kycStatus={renter.kycStatus}
        rows={[
          { label: "Phone", value: renter.phone ?? "Not added" },
          { label: "Member since", value: formatDate(renter.createdAt) },
        ]}
      />

      <Panel className="flex flex-col overflow-hidden">
        <div className="relative h-[130px] shrink-0 bg-gray-200">
          <SafeImage src={property.photo} alt="" className="size-full object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/50" />
          <span className="absolute bottom-2.5 left-3 text-base font-extrabold leading-tight text-white">{property.name}</span>
        </div>
        <div className="flex flex-1 flex-col px-5 py-[18px]">
          <h2 className="mb-3 text-xs font-bold text-admin-muted">Property</h2>
          <p className="mb-2.5 text-[13px] leading-normal text-admin-subtle">{property.address}</p>
          <p className="mb-1 text-xl font-extrabold text-admin-ink">
            {formatNaira(property.rentAmountKobo)}
            <span className="text-xs font-medium text-admin-muted">{frequencyLabel(property.paymentFrequency)}</span>
          </p>
          <div className="mt-1.5 flex gap-3 text-[12.5px] text-admin-subtle">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <BedDouble className="size-[13px]" aria-hidden />
                {property.bedrooms} beds
              </span>
            )}
            <span className="flex items-center gap-1">
              <Bath className="size-[13px]" aria-hidden />
              {property.bathrooms} baths
            </span>
          </div>
          <Link href={`/admin/properties/${property.id}`} className="mt-auto pt-3.5 text-[13px] font-semibold text-admin-accent hover:underline">
            View property
          </Link>
        </div>
      </Panel>

      <PersonCard
        heading="Owner or manager"
        person={owner}
        kycStatus={owner.kycStatus}
        rows={[{ label: "Properties", value: `${owner.propertyCount} on UrState` }]}
      />
    </div>
  );
}
