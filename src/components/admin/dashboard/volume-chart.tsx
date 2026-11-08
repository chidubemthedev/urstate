"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatNaira, formatNairaCompact } from "@/lib/admin/format";
import type { Overview, VolumePeriod } from "@/lib/admin/types";
import { FilterPills } from "../ui/filter-pills";
import { Panel } from "../ui/panel";
import { ChangeIndicator } from "./change-indicator";

const PERIODS: { value: VolumePeriod; label: string }[] = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "annually", label: "Annually" },
];

const PERIOD_CAPTION: Record<VolumePeriod, string> = {
  weekly: "last 7 days",
  monthly: "last 12 months",
  annually: "last 5 years",
};

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[10px] bg-admin-ink px-3.5 py-2 text-[13px] leading-normal text-white shadow-lg">
      <div className="font-bold">{formatNaira(payload[0].value)}</div>
      <div className="opacity-75">{label}</div>
    </div>
  );
}

/** Confirmed rent volume over time. */
export function VolumeChart({
  volume,
  period,
  onPeriodChange,
}: {
  volume: Overview["volume"];
  period: VolumePeriod;
  onPeriodChange: (p: VolumePeriod) => void;
}) {
  return (
    <Panel className="mb-6 px-5 pb-5 pt-6 sm:px-7">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="mb-1 text-[13.5px] text-admin-muted">Confirmed rent collected, {PERIOD_CAPTION[period]}</h2>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[26px] font-extrabold text-admin-ink">{formatNaira(volume.totalKobo)}</span>
            <ChangeIndicator percent={volume.changePercent} suffix="vs previous period" />
          </div>
        </div>
        <FilterPills label="Chart period" options={PERIODS} value={period} onChange={onPeriodChange} />
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={volume.points} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="volumeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5B5FEF" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#5B5FEF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={64}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickFormatter={(v: number) => formatNairaCompact(v)}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#5B5FEF", strokeWidth: 1, strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="valueKobo"
              stroke="#5B5FEF"
              strokeWidth={2.5}
              fill="url(#volumeFill)"
              dot={false}
              activeDot={{ r: 5, fill: "#5B5FEF", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
