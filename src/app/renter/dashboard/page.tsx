"use client";

import { useSession } from "@/lib/auth-client";
import { MOCK_LEASES } from "@/lib/mock-leases";
import { EmptyState } from "../components/empty-state";
import { LeaseCard } from "../components/lease-card";

export default function RenterDashboard() {
  const { data: session } = useSession();

  // Later: use a data fetching hook like SWR or React Query here
  const leases = MOCK_LEASES;

  if (leases.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold text-[#102A43] tracking-tighter">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-lg text-gray-600">
          Here are your ongoing property leases.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leases.map((lease) => (
          <LeaseCard key={lease.id} lease={lease} />
        ))}
      </div>
    </div>
  );
}
