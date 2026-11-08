import Link from "next/link";
import { Bell, ChevronLeft } from "lucide-react";

/** Bell from the design. Notifications aren't built yet, so it opens the dashboard alerts. */
export function AlertsButton() {
  return (
    <Link
      href="/admin/dashboard#alerts"
      aria-label="View alerts"
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-admin-accent"
    >
      <Bell className="size-5 text-admin-ink" strokeWidth={1.8} />
    </Link>
  );
}

/** List-page header: title, optional subtitle and controls, bell on the right. */
export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold leading-tight text-admin-ink">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-admin-muted">{subtitle}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
      <AlertsButton />
    </div>
  );
}

/** Detail-page header: "‹ Section / Item" breadcrumb, bell on the right. */
export function Breadcrumb({ parent, href, current }: { parent: string; href: string; current: string }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm">
        <Link href={href} className="flex items-center gap-1 font-medium text-admin-muted hover:text-admin-ink">
          <ChevronLeft className="size-4" aria-hidden />
          {parent}
        </Link>
        <span aria-hidden className="text-gray-300">
          /
        </span>
        <span aria-current="page" className="truncate font-semibold text-admin-ink">
          {current}
        </span>
      </nav>
      <AlertsButton />
    </div>
  );
}

/** Wrapping row of action buttons with an optional status badge pushed right. */
export function ActionBar({ children, status }: { children?: React.ReactNode; status?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2.5">
      {children}
      {status && <div className="ml-auto flex flex-wrap items-center gap-2">{status}</div>}
    </div>
  );
}
