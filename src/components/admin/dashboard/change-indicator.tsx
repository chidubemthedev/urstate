import { cn } from "@/lib/utils";

/** "▲ 21.01%" / "▼ 7.5%" — the arrow and sign carry the meaning, not just colour. */
export function ChangeIndicator({ percent, suffix, className }: { percent: number; suffix?: string; className?: string }) {
  const up = percent > 0;
  const flat = percent === 0;
  return (
    <span
      className={cn(
        "text-[13px] font-semibold",
        flat ? "text-admin-muted" : up ? "text-admin-success" : "text-admin-danger",
        className,
      )}
    >
      {flat ? "No change" : `${up ? "▲ +" : "▼ "}${percent.toFixed(2)}%`}
      {suffix && <span className="font-normal text-admin-muted"> {suffix}</span>}
    </span>
  );
}
