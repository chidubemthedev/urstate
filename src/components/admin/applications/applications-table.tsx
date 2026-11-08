"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { formatDate, timeAgo } from "@/lib/admin/format";
import { applicationStatusMeta } from "@/lib/admin/status";
import type { ApplicationRow } from "@/lib/admin/types";
import { Avatar } from "../ui/avatar";
import { LinkRow, Table, Td, Th } from "../ui/data-table";
import { StatusBadge } from "../ui/status-badge";
import { SafeImage } from "../ui/safe-image";

export function ApplicationsTable({ rows }: { rows: ApplicationRow[] }) {
  const router = useRouter();
  return (
    <Table>
      <thead>
        <tr>
          <Th className="w-[24%]">Renter</Th>
          <Th className="w-[28%]">Property</Th>
          <Th>Owner</Th>
          <Th>Status</Th>
          <Th>Move-in</Th>
          <Th>Last update</Th>
          <Th className="w-8">
            <span className="sr-only">Open</span>
          </Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((a) => (
          <LinkRow key={a.id} onOpen={() => router.push(`/admin/applications/${a.id}`)}>
            <Td>
              <div className="flex items-center gap-2.5">
                <Avatar name={a.renter.name} seed={a.renter.id} image={a.renter.image} size="md" />
                <div className="min-w-0">
                  <Link href={`/admin/applications/${a.id}`} className="block truncate text-[13.5px] font-semibold text-admin-ink hover:underline">
                    {a.renter.name}
                  </Link>
                  <div className="truncate text-[11.5px] text-admin-muted">{a.renter.email}</div>
                </div>
              </div>
            </Td>
            <Td>
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-[52px] shrink-0 overflow-hidden rounded-md bg-admin-line">
                  <SafeImage src={a.property.photo} alt="" className="size-full object-cover" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13.5px] font-semibold leading-snug text-admin-ink">{a.property.name}</div>
                  <div className="truncate text-[11.5px] text-admin-muted">{a.property.address}</div>
                </div>
              </div>
            </Td>
            <Td>
              <div className="flex items-center gap-2">
                <Avatar name={a.owner.name} seed={a.owner.id} image={a.owner.image} size="sm" />
                <span className="truncate text-[13.5px] font-medium text-admin-body">{a.owner.name}</span>
              </div>
            </Td>
            <Td>
              <StatusBadge meta={applicationStatusMeta[a.status]} dot />
            </Td>
            <Td className="whitespace-nowrap text-[13px] text-admin-subtle">{formatDate(a.moveInDate)}</Td>
            <Td className="whitespace-nowrap text-[13px] text-admin-muted">{timeAgo(a.updatedAt)}</Td>
            <Td className="text-gray-300">
              <ChevronRight className="size-4" aria-hidden />
            </Td>
          </LinkRow>
        ))}
      </tbody>
    </Table>
  );
}
