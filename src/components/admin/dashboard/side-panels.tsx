import Link from "next/link";
import { CreditCard, FileText, Home, UserPlus } from "lucide-react";
import { timeAgo } from "@/lib/admin/format";
import type { Overview } from "@/lib/admin/types";
import { Panel, PanelTitle } from "../ui/panel";

const activityIcon = {
  user: UserPlus,
  property: Home,
  payment: CreditCard,
  application: FileText,
} as const;

export function RecentActivity({ items }: { items: Overview["activity"] }) {
  return (
    <Panel className="flex flex-col p-6">
      <PanelTitle className="mb-3">Recent activity</PanelTitle>
      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-admin-muted">Activity appears here as people sign up, list properties and pay rent.</p>
      ) : (
        <ul>
          {items.map((item, i) => {
            const Icon = activityIcon[item.kind];
            return (
              <li key={`${item.kind}-${item.id}`} className={i < items.length - 1 ? "border-b border-admin-line" : ""}>
                <Link href={item.href} className="flex items-center justify-between gap-4 py-3.5 hover:text-admin-accent">
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="size-4 shrink-0 text-admin-muted" aria-hidden />
                    <span className="truncate text-[13.5px] font-medium text-admin-body">{item.text}</span>
                  </span>
                  <span className="whitespace-nowrap text-xs text-admin-muted">{timeAgo(item.at)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}

export function PendingApprovals({ items }: { items: Overview["pending"] }) {
  return (
    <Panel className="px-6 py-[22px]">
      <PanelTitle className="mb-2">Waiting for review</PanelTitle>
      <ul>
        {items.map((item, i) => (
          <li key={item.key} className={i < items.length - 1 ? "border-b border-admin-line" : ""}>
            <Link href={item.href} className="flex items-center justify-between py-3 text-[13.5px] font-medium text-admin-subtle hover:text-admin-accent">
              {item.label}
              <span className="text-base font-extrabold text-admin-ink">{item.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function UrgentAlerts({ items }: { items: Overview["alerts"] }) {
  return (
    <Panel id="alerts" className="scroll-mt-6 px-6 py-[22px]">
      <PanelTitle className="mb-2">Needs attention</PanelTitle>
      {items.length === 0 ? (
        <p className="py-3 text-[13.5px] text-admin-muted">Nothing flagged right now.</p>
      ) : (
        <ul>
          {items.map((item, i) => (
            <li key={item.key} className={i < items.length - 1 ? "border-b border-admin-line" : ""}>
              <Link href={item.href} className="flex items-center gap-2.5 py-3 text-[13.5px] font-medium text-admin-body hover:text-admin-danger">
                <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-admin-danger" />
                <span className="flex-1">{item.label}</span>
                <span className="font-bold text-admin-danger">{item.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
