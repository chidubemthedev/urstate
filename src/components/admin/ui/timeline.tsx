import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/admin/status";
import { toneDotClass } from "./status-badge";

export type TimelineEntry = { id: string; title: string; detail?: string | null; time: string; tone: Tone };

const ring: Record<Tone, string> = {
  success: "border-admin-success bg-admin-success/10",
  warning: "border-amber-500 bg-amber-500/10",
  danger: "border-admin-danger bg-admin-danger/10",
  info: "border-blue-500 bg-blue-500/10",
  accent: "border-admin-accent bg-admin-accent/10",
  neutral: "border-admin-muted bg-admin-muted/10",
};

/** Vertical event list with coloured dots, used for activity and audit history. */
export function Timeline({ entries, empty }: { entries: TimelineEntry[]; empty: string }) {
  if (!entries.length) return <p className="py-6 text-center text-sm text-admin-muted">{empty}</p>;
  return (
    <ol className="relative">
      <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-0.5 rounded bg-admin-line" />
      {entries.map((e, i) => (
        <li key={e.id} className={cn("relative flex gap-5", i < entries.length - 1 && "mb-6")}>
          <span aria-hidden className={cn("z-[1] flex size-6 shrink-0 items-center justify-center rounded-full border-2", ring[e.tone])}>
            <span className={cn("size-2 rounded-full", toneDotClass(e.tone))} />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold text-admin-ink">{e.title}</span>
              <span className="whitespace-nowrap text-xs text-admin-muted">{e.time}</span>
            </div>
            {e.detail && <p className="mt-1 text-[13px] text-admin-subtle">{e.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
