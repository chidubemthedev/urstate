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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {leases.map((lease) => (
        <LeaseCard key={lease.id} lease={lease} />
      ))}
    </div>
  );
}
