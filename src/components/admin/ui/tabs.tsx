"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** Underlined tab bar from the profile design, with proper tab semantics. */
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  children,
}: {
  tabs: readonly T[];
  value: T;
  onChange: (tab: T) => void;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <>
      <div role="tablist" className="flex overflow-x-auto border-b border-admin-line px-6">
        {tabs.map((t, i) => {
          const active = t === value;
          return (
            <button
              key={t}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`${id}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(t)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
                onChange(next);
                document.getElementById(`${id}-tab-${tabs.indexOf(next)}`)?.focus();
              }}
              className={cn(
                "mr-7 whitespace-nowrap border-b-2 py-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-admin-accent",
                active ? "border-admin-accent text-admin-ink" : "border-transparent text-admin-muted hover:text-admin-ink",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${tabs.indexOf(value)}`} className="px-6 py-7">
        {children}
      </div>
    </>
  );
}
