"use client";

import { cn } from "@/lib/utils";

export type FilterOption<T extends string> = { value: T; label: string; count?: number };

/** Segmented pill filter from the design (dark pill marks the active option). */
export function FilterPills<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap gap-0.5 rounded-3xl bg-admin-line p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-admin-accent",
              active ? "bg-admin-ink text-white" : "text-admin-subtle hover:text-admin-ink",
            )}
          >
            {o.label}
            {o.count !== undefined && ` (${o.count})`}
          </button>
        );
      })}
    </div>
  );
}
