"use client";

import { Suspense } from "react";
import { useAdminQuery } from "@/lib/admin/api";
import { useUrlParams } from "@/lib/admin/use-url-params";
import type { PropertyList } from "@/lib/admin/types";
import { PageHeader } from "@/components/admin/shell/page-header";
import { PropertyCard } from "@/components/admin/properties/property-card";
import { FilterPills } from "@/components/admin/ui/filter-pills";
import { EmptyState, ErrorState, LoadingState } from "@/components/admin/ui/states";

type Filter = "all" | "pending" | "verified" | "rejected";

const EMPTY: Record<Filter, string> = {
  all: "No properties yet. They'll appear here once owners add them.",
  pending: "Nothing waiting for review.",
  verified: "No verified properties yet.",
  rejected: "No rejected properties.",
};

function PropertiesContent() {
  const { get, set } = useUrlParams();
  const filter = (get("status") as Filter) ?? "all";
  const { data, error, loading, reload } = useAdminQuery<PropertyList>(
    filter === "all" ? "/properties" : `/properties?status=${filter}`,
  );

  return (
    <>
      <PageHeader title="Properties">
        <FilterPills<Filter>
          label="Filter by verification status"
          value={filter}
          onChange={(v) => set({ status: v })}
          options={[
            { value: "all", label: "All", count: data?.counts.all },
            { value: "pending", label: "Pending", count: data?.counts.pending },
            { value: "verified", label: "Verified", count: data?.counts.verified },
            { value: "rejected", label: "Rejected", count: data?.counts.rejected },
          ]}
        />
      </PageHeader>

      {error && !data ? (
        <ErrorState message={error.message} onRetry={reload} />
      ) : !data ? (
        <LoadingState />
      ) : data.rows.length === 0 ? (
        <EmptyState>{EMPTY[filter]}</EmptyState>
      ) : (
        <div aria-busy={loading} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {data.rows.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PropertiesContent />
    </Suspense>
  );
}
