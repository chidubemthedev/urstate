import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AdminShell } from "@/components/admin/shell/admin-shell";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Admin · UrState",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (!session) redirect("/login");
  // Non-admins go back to their own dashboard. The API enforces this too;
  // this check only keeps people from seeing an empty admin shell.
  if (session.user.role !== "admin") redirect("/dashboard");

  return (
    <div className={inter.className}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
