"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { AdminLogo, AdminNavLinks, AdminSidebar, AdminSidebarFooter } from "./admin-sidebar";

/** Page frame: fixed sidebar on desktop, top bar with a drawer on smaller screens. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-admin-canvas text-admin-ink">
      <AdminSidebar />

      <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-4 py-3 shadow-[0_1px_0_#EAECF0] lg:hidden">
        <AdminLogo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-admin-ink hover:bg-admin-line focus-visible:outline-2 focus-visible:outline-admin-accent"
        >
          <Menu className="size-5" />
        </button>
      </header>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="flex w-64 flex-col bg-white px-4 pb-6 pt-7">
          <SheetTitle className="sr-only">Admin menu</SheetTitle>
          <div className="mb-8">
            <AdminLogo />
          </div>
          <AdminNavLinks onNavigate={() => setOpen(false)} />
          <div className="flex-1" />
          <AdminSidebarFooter />
        </SheetContent>
      </Sheet>

      <main className="min-w-0 px-4 pb-12 pt-6 sm:px-8 sm:pt-8 lg:ml-60">{children}</main>
    </div>
  );
}
