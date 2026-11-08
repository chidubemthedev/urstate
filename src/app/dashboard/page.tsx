import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";

export default async function DashboardTrafficCop() {
  const reqHeaders = await headers();

  // 1. Get the session securely
  const { data: session } = await authClient.getSession({
    fetchOptions: { headers: reqHeaders },
  });

  // 2. Not logged in?
  if (!session) {
    redirect("/login");
  }

  // 3. No role yet? (Google users)
  if (!session.user.role) {
    redirect("/choose-role");
  }

  // 4. Send them to their correct home!
  redirect(`/${session.user.role}/dashboard`);
}
