import { BadgeCheck } from "lucide-react";
import { formatDate } from "@/lib/admin/format";
import { reviewStatusMeta, roleMeta } from "@/lib/admin/status";
import type { UserDetail } from "@/lib/admin/types";
import { Avatar } from "../ui/avatar";
import { Panel } from "../ui/panel";
import { StatusBadge } from "../ui/status-badge";

/** Left-hand profile card. */
export function UserSummary({ detail }: { detail: UserDetail }) {
  const { user, kyc, propertyCount } = detail;
  const rows = [
    { label: "Member since", value: formatDate(user.createdAt) },
    {
      label: "Email",
      value: (
        <span className="inline-flex items-center gap-1">
          {user.email}
          {user.emailVerified && <BadgeCheck className="size-3.5 shrink-0 text-admin-success" aria-label="Email verified" />}
        </span>
      ),
    },
    { label: "Phone", value: user.phone ?? "Not added" },
    { label: "State", value: kyc?.state ?? "—" },
    ...(user.role === "owner" ? [{ label: "Properties", value: String(propertyCount) }] : []),
  ];

  return (
    <Panel className="px-6 py-7">
      <div className="mb-5 flex flex-col items-center border-b border-admin-line pb-5 text-center">
        <Avatar name={user.name} seed={user.id} image={user.image} size="xl" className="mb-3.5" />
        <p className="mb-2 text-lg font-bold text-admin-ink">{user.name}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {user.role && <StatusBadge meta={roleMeta[user.role]} />}
          <StatusBadge meta={reviewStatusMeta[kyc?.status ?? "not_submitted"]} dot />
        </div>
      </div>
      <dl>
        {rows.map((row, i) => (
          <div key={row.label} className={`flex flex-col gap-0.5 py-3 ${i < rows.length - 1 ? "border-b border-admin-line" : ""}`}>
            <dt className="text-[11.5px] font-medium text-admin-muted">{row.label}</dt>
            <dd className="break-all text-[13.5px] font-medium text-admin-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
