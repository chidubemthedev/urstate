"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import { ADMIN_NAV } from "./nav";

const signOut = () =>
  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/login";
      },
    },
  });

/** Navigation list, shared by the desktop sidebar and the mobile drawer. */
export function AdminNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {ADMIN_NAV.map(({ label, href, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-[10px] px-3.5 py-[11px] text-sm transition-colors",
              "focus-visible:outline-2 focus-visible:outline-admin-accent",
              active ? "bg-admin-line font-semibold text-admin-ink" : "font-medium text-admin-subtle hover:bg-gray-50",
            )}
          >
            <Icon className={cn("size-[18px]", active ? "text-admin-ink" : "text-admin-muted")} strokeWidth={1.8} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebarFooter() {
  const { data: session } = useSession();
  const name = session?.user.name ?? "Admin";
  return (
    <>
      <button
        type="button"
        onClick={signOut}
        className="mb-5 flex w-full items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-sm font-medium text-admin-danger hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-admin-accent"
      >
        <LogOut className="size-[18px]" strokeWidth={1.8} aria-hidden />
        Log out
      </button>
      <div className="flex items-center gap-2.5 border-t border-admin-line pl-2.5 pt-4">
        <Avatar name={name} seed={session?.user.id ?? name} image={session?.user.image} size="md" />
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold text-admin-ink">{name}</div>
          <div className="text-[11.5px] text-admin-muted">Admin</div>
        </div>
      </div>
    </>
  );
}

export function AdminLogo() {
  return (
    <Link href="/admin/dashboard" className="flex items-center pl-2" aria-label="UrState admin home">
      <Image src="/images/logo.png" alt="UrState" width={136} height={32} className="h-8 w-auto" priority />
    </Link>
  );
}

/** Fixed 240px sidebar from the design, shown from the `lg` breakpoint up. */
export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col bg-white px-4 pb-6 pt-7 shadow-[1px_0_0_#EAECF0] lg:flex">
      <div className="mb-9">
        <AdminLogo />
      </div>
      <AdminNavLinks />
      <div className="flex-1" />
      <AdminSidebarFooter />
    </aside>
  );
}
