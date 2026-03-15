"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { authClient } from "@/lib/auth-client";
import type { NavItem } from "@/lib/navigation";

interface AppSidebarProps {
  topNav: NavItem[];
  bottomNav: NavItem[];
}

export function AppSidebar({ topNav, bottomNav }: AppSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  // Helper function to render a menu item
  const renderNavItem = (item: NavItem) => {
    const isActive = pathname.startsWith(item.href) && !item.disabled;

    return (
      <SidebarMenuItem key={item.name}>
        <SidebarMenuButton
          asChild={!item.disabled}
          isActive={isActive}
          tooltip={item.name}
          className={`h-11 ${item.disabled ? "opacity-60 cursor-not-allowed" : ""} ${
            isActive
              ? "bg-gray-100 text-gray-900 font-medium"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {item.disabled ? (
            <div className="flex items-center w-full">
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </div>
          ) : (
            <Link href={item.href} className="flex items-center w-full">
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          )}
        </SidebarMenuButton>

        {/* Optional Badge (Blue Number) */}
        {item.badge && (
          <SidebarMenuBadge className="bg-[#227CBD] text-white rounded-full px-1.5 min-w-5 h-5 flex items-center justify-center text-xs ml-auto mt-1.5">
            {item.badge}
          </SidebarMenuBadge>
        )}

        {/* Optional Chip ("Coming Soon") */}
        {item.chip && (
          // <SidebarMenuBadge className="mt-1.5">
          <span className="ml-auto my-auto text-[10px] font-medium bg-gray-200 text-gray-500 px-2 py-0.5 rounded-md">
            {item.chip}
          </span>
          // </SidebarMenuBadge>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      {/* Brand / Logo Area */}
      <SidebarHeader className="h-20 flex items-start justify-center pt-5 px-6 pb-2">
        <Image
          src="/images/logo.png"
          alt="UrState Logo"
          width={120}
          height={36}
          className="w-auto h-8"
        />
      </SidebarHeader>

      <SidebarContent className="px-4 gap-0">
        {/* --- TOP NAVIGATION --- */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {topNav.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* --- BOTTOM NAVIGATION (Pushed to bottom using mt-auto) --- */}
        <SidebarGroup className="mt-auto pb-4">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {bottomNav.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer (Logout) */}
      <SidebarFooter className="px-4 pb-6 border-none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="h-11 text-[#9F2B2B] hover:text-[#9F2B2B] hover:bg-red-50 font-medium"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
