import { CreditCard, FileText, Home, LayoutGrid, Users } from "lucide-react";

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Properties", href: "/admin/properties", icon: Home },
  { label: "Applications", href: "/admin/applications", icon: FileText },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
] as const;
