"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useAdminQuery } from "@/lib/admin/api";
import { formatCount, formatDate, formatNairaCompact } from "@/lib/admin/format";
import type { Overview, VolumePeriod } from "@/lib/admin/types";
import { PageHeader } from "@/components/admin/shell/page-header";
import { StatCard } from "@/components/admin/dashboard/stat-card";
import { VolumeChart } from "@/components/admin/dashboard/volume-chart";
import { PendingApprovals, RecentActivity, UrgentAlerts } from "@/components/admin/dashboard/side-panels";
import { ErrorState, LoadingState } from "@/components/admin/ui/states";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const [period, setPeriod] = useState<VolumePeriod>("monthly");
  const { data, error, loading, reload } = useAdminQuery<Overview>(`/overview?period=${period}`);
  const firstName = session?.user.name?.split(" ")[0];

  return (
    <>
      <PageHeader
        title={firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        subtitle="Here's what's happening on UrState today."
      />

      {error && !data ? (
        <ErrorState message={error.message} onRetry={reload} />
      ) : !data ? (
        <LoadingState rows={6} />
      ) : (
        <div aria-busy={loading}>
          <div className="mb-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 [&>*]:min-w-0">
            <StatCard
              title="Active users"
              asOf={formatDate(data.asOf)}
              value={formatCount(data.stats.activeUsers.value)}
              changePercent={data.stats.activeUsers.changePercent}
              changeLabel="sign-ups vs prior 30 days"
              series={data.stats.activeUsers.series}
            />
            <StatCard
              title="Verified properties"
              asOf={formatDate(data.asOf)}
              value={formatCount(data.stats.verifiedProperties.value)}
              changePercent={data.stats.verifiedProperties.changePercent}
              changeLabel="vs last month"
              series={data.stats.verifiedProperties.series}
            />
            <StatCard
              title="Payments this month"
              asOf={formatDate(data.asOf)}
              value={formatCount(data.stats.monthlyTransactions.value)}
              changePercent={data.stats.monthlyTransactions.changePercent}
              changeLabel="vs last month"
              series={data.stats.monthlyTransactions.series}
            />
            <StatCard
              title="Rent collected this month"
              asOf={formatDate(data.asOf)}
              value={formatNairaCompact(data.stats.rentCollected.valueKobo ?? 0)}
              changePercent={data.stats.rentCollected.changePercent}
              changeLabel="vs last month"
              series={data.stats.rentCollected.series}
            />
          </div>

          <VolumeChart volume={data.volume} period={period} onPeriodChange={setPeriod} />

          <div className="grid gap-5 lg:grid-cols-2 [&>*]:min-w-0">
            <RecentActivity items={data.activity} />
            <div className="flex flex-col gap-5">
              <PendingApprovals items={data.pending} />
              <UrgentAlerts items={data.alerts} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
