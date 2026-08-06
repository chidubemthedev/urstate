import {
  CreditCard,
  Search,
  Heart,
  Wallet,
  MessageSquare,
  Bell,
  User,
  Box,
  Settings,
  FileText,
  Home,
  Building,
  Users,
} from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number; // For the blue notification numbers
  chip?: string; // For "Coming Soon"
  disabled?: boolean; // To prevent clicking "Coming Soon" items
};

export const RENTER_TOP_NAV: NavItem[] = [
  { name: "Manage", href: "/renter/dashboard", icon: CreditCard },
  { name: "Browse", href: "/renter/browse", icon: Search },
  { name: "Wishlist", href: "/renter/wishlist", icon: Heart },
  {
    name: "Wallet",
    href: "#",
    icon: Wallet,
    chip: "Coming Soon",
    disabled: true,
  },
  { name: "Message", href: "/renter/messages", icon: MessageSquare, badge: 2 },
  { name: "Notification", href: "/renter/notifications", icon: Bell, badge: 2 },
];

export const RENTER_BOTTOM_NAV: NavItem[] = [
  { name: "Account", href: "/renter/account", icon: User },
  { name: "Renter Tools", href: "/renter/tools", icon: Box },
  { name: "Settings", href: "/renter/settings", icon: Settings },
  { name: "Legal & Support", href: "/renter/support", icon: FileText },
];

export const OWNER_TOP_NAV: NavItem[] = [
  { name: "Dashboard", href: "/owner/dashboard", icon: Home },
  { name: "My Properties", href: "/owner/properties", icon: Building },
  { name: "Tenants & Apps", href: "/owner/tenants", icon: Users },
  { name: "Messages", href: "/owner/messages", icon: MessageSquare, badge: 2 },
  { name: "Settings", href: "/owner/settings", icon: Settings },
];

export const OWNER_BOTTOM_NAV: NavItem[] = [
  { name: "Account", href: "/owner/account", icon: User },
  { name: "Renter Tools", href: "/owner/tools", icon: Box },
  { name: "Settings", href: "/owner/settings", icon: Settings },
  { name: "Legal & Support", href: "/owner/support", icon: FileText },
];
