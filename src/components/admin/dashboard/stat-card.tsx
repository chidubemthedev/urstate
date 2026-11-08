import { Panel } from "../ui/panel";
import { ChangeIndicator } from "./change-indicator";
import { Sparkline } from "./sparkline";

export function StatCard({
  title,
  asOf,
  value,
  changePercent,
  changeLabel,
  series,
}: {
  title: string;
  asOf: string;
  value: string;
  changePercent: number;
  changeLabel: string;
  series: number[];
}) {
  const colour = changePercent < 0 ? "#E53E3E" : "#1FAE73";
  return (
    <Panel className="min-w-0 px-6 py-[22px]">
      <h2 className="mb-0.5 text-[15px] font-semibold text-admin-ink">{title}</h2>
      <p className="mb-3 text-[11.5px] text-admin-muted">As of {asOf}</p>
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[32px] font-extrabold leading-tight text-admin-ink">{value}</p>
          <ChangeIndicator percent={changePercent} className="mt-1.5 block" />
          <p className="mt-0.5 text-[11.5px] text-admin-muted">{changeLabel}</p>
        </div>
        <div className="shrink-0 pb-1">
          <Sparkline data={series} color={colour} />
        </div>
      </div>
    </Panel>
  );
}
