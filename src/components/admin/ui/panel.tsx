import { cn } from "@/lib/utils";

/** White rounded card used for every content block in the admin area. */
export function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("rounded-2xl bg-white shadow-admin-card", className)} {...props} />;
}

export function PanelTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-[15px] font-bold text-admin-ink", className)} {...props} />;
}
