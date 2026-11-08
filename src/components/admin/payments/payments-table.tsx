"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Flag } from "lucide-react";
import { formatDate, formatNaira } from "@/lib/admin/format";
import { paymentStatusMeta, paymentTypeLabel } from "@/lib/admin/status";
import type { PaymentRow } from "@/lib/admin/types";
import { Avatar } from "../ui/avatar";
import { LinkRow, Table, Td, Th } from "../ui/data-table";
import { StatusBadge } from "../ui/status-badge";

export function PaymentsTable({ rows }: { rows: PaymentRow[] }) {
  const router = useRouter();
  return (
    <Table className="min-w-[860px]">
      <thead>
        <tr>
          <Th>Reference</Th>
          <Th className="w-[30%]">Renter → Owner</Th>
          <Th>Type</Th>
          <Th>Amount</Th>
          <Th>Status</Th>
          <Th>Date</Th>
          <Th className="w-8">
            <span className="sr-only">Open</span>
          </Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p) => (
          <LinkRow key={p.id} onOpen={() => router.push(`/admin/payments/${p.id}`)}>
            <Td>
              <Link href={`/admin/payments/${p.id}`} className="font-mono text-[13px] font-bold text-admin-ink hover:underline">
                {p.reference}
              </Link>
              {p.isRecordedHistory && <div className="mt-0.5 text-[11px] text-admin-muted">Recorded history</div>}
            </Td>
            <Td>
              <div className="flex items-center gap-2.5">
                <span className="relative h-7 w-[46px] shrink-0">
                  <Avatar name={p.renter.name} seed={p.renter.id} image={p.renter.image} size="sm" className="absolute left-0 z-[2] border-2 border-white" />
                  <Avatar name={p.owner.name} seed={p.owner.id} image={p.owner.image} size="sm" className="absolute left-[18px] z-[1] border-2 border-white" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold leading-snug text-admin-ink">
                    {p.renter.name} <span className="font-normal text-admin-muted">to</span> {p.owner.name}
                  </div>
                  <div className="truncate text-[11.5px] text-admin-muted">{p.property.name}</div>
                </div>
              </div>
            </Td>
            <Td className="whitespace-nowrap text-[13px] font-medium text-admin-subtle">{paymentTypeLabel[p.type]}</Td>
            <Td className="whitespace-nowrap text-[15px] font-extrabold text-admin-ink">{formatNaira(p.amountKobo)}</Td>
            <Td>
              <div className="flex items-center gap-1.5">
                <StatusBadge meta={paymentStatusMeta[p.status]} dot />
                {p.flagged && <Flag className="size-3.5 text-admin-danger" aria-label="Flagged" />}
              </div>
            </Td>
            <Td className="whitespace-nowrap text-[13px] text-admin-muted">{formatDate(p.createdAt)}</Td>
            <Td className="text-gray-300">
              <ChevronRight className="size-4" aria-hidden />
            </Td>
          </LinkRow>
        ))}
      </tbody>
    </Table>
  );
}
