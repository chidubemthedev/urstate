import { cn } from "@/lib/utils";
import type { StatusMeta, Tone } from "@/lib/admin/status";

const toneClasses: Record<Tone, { soft: string; solid: string; dot: string }> = {
  success: { soft: "bg-[#ECFDF5] text-admin-success", solid: "bg-admin-success/90 text-white", dot: "bg-admin-success" },
  warning: { soft: "bg-[#FFFBEB] text-admin-warning", solid: "bg-amber-400/90 text-amber-900", dot: "bg-amber-500" },
  danger: { soft: "bg-[#FEF2F2] text-admin-danger", solid: "bg-admin-danger/90 text-white", dot: "bg-admin-danger" },
  info: { soft: "bg-[#EFF6FF] text-admin-info", solid: "bg-admin-info/90 text-white", dot: "bg-blue-500" },
  accent: { soft: "bg-[#EEF2FF] text-admin-accent", solid: "bg-admin-accent/90 text-white", dot: "bg-admin-accent" },
  neutral: { soft: "bg-admin-line text-admin-subtle", solid: "bg-admin-ink/75 text-white", dot: "bg-admin-muted" },
};

export const toneDotClass = (tone: Tone) => toneClasses[tone].dot;

/**
 * Status pill. `soft` (default) is for tables and cards; `solid` sits on photos.
 * The label always carries the meaning, so colour is never the only signal.
 */
export function StatusBadge({
  meta,
  dot = false,
  variant = "soft",
  className,
}: {
  meta: StatusMeta;
  dot?: boolean;
  variant?: "soft" | "solid";
  className?: string;
}) {
  const t = toneClasses[meta.tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variant === "soft" ? t.soft : cn(t.solid, "backdrop-blur-sm"),
        className,
      )}
    >
      {dot && <span aria-hidden className={cn("size-1.5 rounded-full", t.dot)} />}
      {meta.label}
    </span>
  );
}
