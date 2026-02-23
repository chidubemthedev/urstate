import {
  Home,
  Building,
  Users,
  Search,
  Bookmark,
  Settings,
  MessageSquare,
} from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

export const OWNER_NAV: NavItem[] = [
  { name: "Dashboard", href: "/owner/dashboard", icon: Home },
  { name: "My Properties", href: "/owner/properties", icon: Building },
  { name: "Tenants & Apps", href: "/owner/tenants", icon: Users },
  { name: "Messages", href: "/owner/messages", icon: MessageSquare },
  { name: "Settings", href: "/owner/settings", icon: Settings },
];

export const RENTER_NAV: NavItem[] = [
  { name: "Dashboard", href: "/renter/dashboard", icon: Home },
  { name: "Search Homes", href: "/renter/search", icon: Search },
  { name: "My Applications", href: "/renter/applications", icon: Users },
  { name: "Saved Homes", href: "/renter/saved", icon: Bookmark },
  { name: "Messages", href: "/renter/messages", icon: MessageSquare },
  { name: "Settings", href: "/renter/settings", icon: Settings },
];
