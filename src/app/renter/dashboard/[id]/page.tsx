import { notFound } from "next/navigation";
import { MOCK_LEASES } from "@/lib/mock-leases";
import { LeaseDetails } from "../../components/lease-details";

// In Next.js App Router, dynamic params are promises
export default async function LeaseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Fetch the data based on the ID from the URL
  // Later, this becomes: const lease = await fetch(`.../api/leases/${id}`).then(res => res.json())
  const lease = MOCK_LEASES.find((l) => l.id === id);

  // 2. Handle 404 if the ID doesn't exist
  if (!lease) {
    notFound();
  }

  // 3. Render the details component
  return <LeaseDetails lease={lease} />;
}
