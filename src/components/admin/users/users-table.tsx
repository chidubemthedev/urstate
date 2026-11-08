"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/admin/format";
import { reviewStatusMeta, roleMeta } from "@/lib/admin/status";
import type { UserRow } from "@/lib/admin/types";
import { Avatar } from "../ui/avatar";
import { LinkRow, Table, Td, Th } from "../ui/data-table";
import { StatusBadge } from "../ui/status-badge";
import { UserRowMenu } from "./user-row-menu";

export function UsersTable({ rows, onChanged }: { rows: UserRow[]; onChanged: () => void }) {
  const router = useRouter();
  return (
    <Table>
      <thead>
        <tr>
          <Th className="w-[38%]">Name</Th>
          <Th>Role</Th>
          <Th>Identity check</Th>
          <Th>Account</Th>
          <Th>Date joined</Th>
          <Th className="w-12">
            <span className="sr-only">Actions</span>
          </Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((u) => (
          <LinkRow key={u.id} onOpen={() => router.push(`/admin/users/${u.id}`)}>
            <Td>
              <div className="flex items-center gap-3">
                <Avatar name={u.name} seed={u.id} image={u.image} />
                <div className="min-w-0">
                  <Link href={`/admin/users/${u.id}`} className="block truncate text-sm font-semibold text-admin-ink hover:underline">
                    {u.name}
                  </Link>
                  <div className="mt-px truncate text-xs text-admin-muted">{u.email}</div>
                </div>
              </div>
            </Td>
            <Td>{u.role ? <StatusBadge meta={roleMeta[u.role]} /> : <span className="text-xs text-admin-muted">No role yet</span>}</Td>
            <Td>
              <StatusBadge meta={reviewStatusMeta[u.kycStatus]} dot />
            </Td>
            <Td>
              <div className="flex flex-wrap gap-1.5">
                {u.suspended && <StatusBadge meta={{ label: "Suspended", tone: "danger" }} />}
                {u.flagged && <StatusBadge meta={{ label: "Flagged", tone: "warning" }} />}
                {!u.suspended && !u.flagged && <span className="text-[13px] text-admin-muted">Active</span>}
              </div>
            </Td>
            <Td className="whitespace-nowrap text-[13.5px] text-admin-subtle">{formatDate(u.createdAt)}</Td>
            <Td>
              <UserRowMenu user={u} onChanged={onChanged} />
            </Td>
          </LinkRow>
        ))}
      </tbody>
    </Table>
  );
}
