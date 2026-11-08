import { cn } from "@/lib/utils";

/** Table primitives matching the design: uppercase muted headers, hairline rows. */
export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    // `relative` makes this the containing block for absolutely positioned
    // children (e.g. sr-only header labels); otherwise they escape the
    // scroll container and widen the whole page on small screens.
    <div className="relative overflow-x-auto">
      <table className={cn("w-full min-w-[720px] border-collapse", className)} {...props} />
    </div>
  );
}

export function Th({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      scope="col"
      className={cn(
        "whitespace-nowrap border-b border-admin-line px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.04em] text-admin-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("border-b border-admin-line px-4 py-3.5 align-middle", className)} {...props} />;
}

/**
 * A row that opens a detail page. The whole row is clickable for mouse users;
 * the primary cell should also contain a real link for keyboard and screen readers.
 */
export function LinkRow({ onOpen, className, ...props }: React.ComponentProps<"tr"> & { onOpen: () => void }) {
  return (
    <tr
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a,button")) return;
        onOpen();
      }}
      className={cn("cursor-pointer bg-white transition-colors hover:bg-gray-50", className)}
      {...props}
    />
  );
}
