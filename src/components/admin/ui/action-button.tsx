import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-admin-accent text-white border-transparent hover:opacity-90",
  success: "bg-admin-success text-white border-transparent hover:opacity-90",
  danger: "border-admin-danger text-admin-danger bg-transparent hover:bg-[#FEF2F2]",
  warning: "border-amber-400 text-admin-warning bg-transparent hover:bg-[#FFFBEB]",
  "warning-active": "border-amber-400 text-admin-warning bg-[#FFFBEB] hover:bg-amber-50",
  neutral: "border-gray-300 text-admin-subtle bg-transparent hover:bg-gray-50",
  "danger-soft": "border-red-300 text-admin-danger bg-[#FEF2F2] hover:bg-red-100",
};

/** The design's action-bar button. Shows a spinner and disables itself while busy. */
export function ActionButton({
  variant = "neutral",
  icon,
  busy,
  children,
  className,
  disabled,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  icon?: React.ReactNode;
  busy?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled || busy}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-[10px] border-[1.5px] px-[18px] py-[9px] text-[13.5px] font-semibold transition",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-admin-accent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {busy ? <Loader2 className="size-[15px] animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  );
}
