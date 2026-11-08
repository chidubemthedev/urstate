import Link from "next/link";
import { Bath, BedDouble, Flag } from "lucide-react";
import { formatDate, formatNaira, frequencyLabel } from "@/lib/admin/format";
import { reviewStatusMeta } from "@/lib/admin/status";
import type { PropertyRow } from "@/lib/admin/types";
import { Avatar } from "../ui/avatar";
import { StatusBadge } from "../ui/status-badge";
import { SafeImage } from "../ui/safe-image";

export function PropertyCard({ property: p }: { property: PropertyRow }) {
  return (
    <Link
      href={`/admin/properties/${p.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-admin-card transition hover:-translate-y-0.5 hover:shadow-admin-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-admin-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative h-[180px] bg-gray-200">
        <SafeImage src={p.photo} alt="" className="size-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent to-50%" />
        {p.propertyType && (
          <span className="absolute left-3 top-3 rounded-full bg-admin-ink/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {p.propertyType}
          </span>
        )}
        <div className="absolute right-3 top-3 flex gap-1.5">
          {p.flagged && (
            <span className="flex items-center gap-1 rounded-full bg-admin-danger/90 px-2 py-1 text-[11px] font-bold text-white">
              <Flag className="size-3" aria-hidden />
              Flagged
            </span>
          )}
          <StatusBadge meta={reviewStatusMeta[p.verificationStatus]} variant="solid" className="text-[11.5px] font-bold" />
        </div>
      </div>

      <div className="px-[18px] pb-4 pt-[18px]">
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <h3 className="flex-1 text-[15px] font-bold leading-snug text-admin-ink group-hover:underline">{p.name}</h3>
          <p className="shrink-0 text-right">
            <span className="text-[15px] font-extrabold text-admin-ink">{formatNaira(p.rentAmountKobo)}</span>
            <span className="text-[11.5px] font-medium text-admin-muted">{frequencyLabel(p.paymentFrequency)}</span>
          </p>
        </div>
        <p className="mb-3.5 text-[12.5px] leading-snug text-admin-muted">
          {[p.address, p.city, p.state].filter(Boolean).join(", ")}
        </p>
        <div className="mb-3.5 flex gap-3.5 text-[12.5px] text-admin-subtle">
          {p.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="size-[13px]" aria-hidden />
              {p.bedrooms} bed{p.bedrooms === 1 ? "" : "s"}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath className="size-[13px]" aria-hidden />
            {p.bathrooms} bath{p.bathrooms === 1 ? "" : "s"}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-admin-line pt-3">
          <span className="flex min-w-0 items-center gap-2">
            <Avatar name={p.owner.name} seed={p.owner.id} image={p.owner.image} size="xs" />
            <span className="truncate text-[12.5px] text-admin-subtle">{p.owner.name}</span>
          </span>
          <span className="whitespace-nowrap text-[11.5px] text-admin-muted">
            {p.submittedAt ? `Submitted ${formatDate(p.submittedAt)}` : "Not submitted"}
          </span>
        </div>
      </div>
    </Link>
  );
}
