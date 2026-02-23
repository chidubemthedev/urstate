"use client";

import { useSession } from "@/lib/auth-client";
import { Bell } from "lucide-react";
import type { NavItem } from "@/lib/navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

export default function DashboardShell({
  children,
  navItems,
}: DashboardShellProps) {
  const { data: session } = useSession();

  return (
    <SidebarProvider>
      {/* The Responsive Sidebar */}
      <AppSidebar navItems={navItems} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden bg-gray-50">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
          {/* This trigger automatically handles opening/closing the sidebar on mobile/desktop */}
          <SidebarTrigger className="-ml-1 text-[#227CBD]" />

          <div className="flex flex-1 items-center justify-between">
            <h2 className="text-lg font-semibold capitalize hidden sm:block ml-2 text-gray-800">
              {session?.user?.role} Dashboard
            </h2>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4 ml-auto">
              <button className="text-gray-400 hover:text-gray-500">
                <Bell className="h-5 w-5" />
              </button>

              {/* User Profile Snippet */}
              <div className="flex items-center gap-3 border-l pl-4">
                <div className="h-8 w-8 rounded-full bg-[#227CBD] text-white flex items-center justify-center font-bold text-sm">
                  {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="hidden text-sm md:block">
                  <p className="font-medium text-gray-700">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
