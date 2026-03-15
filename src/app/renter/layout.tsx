import DashboardShell from "@/components/layout/dashboard-shell";
import { RENTER_NAV } from "@/lib/navigation";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";

export default async function RenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reqHeaders = await headers();

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: reqHeaders,
    },
  });

  if (!session) redirect("/login");
  if (!session.user.role) redirect("/onboarding");
  if (session.user.role !== "renter") redirect("/owner/dashboard");

  return <DashboardShell role="renter">{children}</DashboardShell>;
}
