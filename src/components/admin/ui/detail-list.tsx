import { cn } from "@/lib/utils";

export type DetailItem = { label: string; value: React.ReactNode; wide?: boolean; mono?: boolean };

/** Label/value grid used in detail panels. */
export function DetailGrid({ items, columns = 2 }: { items: DetailItem[]; columns?: 1 | 2 }) {
  return (
    <dl className={cn("grid gap-x-8", columns === 2 && "sm:grid-cols-2")}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn("border-b border-admin-line py-3.5", item.wide && columns === 2 && "sm:col-span-2")}
        >
          <dt className="mb-1 text-xs font-medium text-admin-muted">{item.label}</dt>
          <dd className={cn("text-sm font-semibold leading-normal text-admin-ink break-words", item.mono && "font-mono text-[13px]")}>
            {item.value ?? "—"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Compact label-left / value-right rows used in side cards. */
export function DetailRows({ items }: { items: DetailItem[] }) {
  return (
    <dl>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={cn("flex items-center justify-between gap-4 py-2.5", i < items.length - 1 && "border-b border-admin-line")}
        >
          <dt className="text-[12.5px] text-admin-muted">{item.label}</dt>
          <dd className={cn("max-w-[60%] truncate text-right text-[13px] font-semibold text-admin-ink", item.mono && "font-mono")}>
            {item.value ?? "—"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
