import DashboardShell from "@/components/layout/dashboard-shell";
import { OWNER_NAV } from "@/lib/navigation";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client"; // Use the client, not the server auth

export default async function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Await the Next.js headers
  const reqHeaders = await headers();

  // 2. Ask Express if the user is logged in, forwarding the cookies
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: reqHeaders,
    },
  });

  // 3. Handle the redirects based on the response from Express
  if (!session) redirect("/login");
  if (!session.user.role) redirect("/onboarding");
  if (session.user.role !== "owner") redirect("/renter/dashboard");

  return <DashboardShell navItems={OWNER_NAV}>{children}</DashboardShell>;
}
