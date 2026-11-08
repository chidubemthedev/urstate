"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** "Showing 1–10 of 42" plus numbered page buttons, as in the users table design. */
export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  // Show at most 7 page buttons around the current page.
  const start = Math.max(1, Math.min(page - 3, pages - 6));
  const visible = Array.from({ length: Math.min(7, pages) }, (_, i) => start + i);

  const btn = "flex size-8 items-center justify-center rounded-lg text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-admin-accent";

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-between gap-3 border-t border-admin-line px-5 py-4">
      <span className="text-[13px] text-admin-muted">
        Showing {from}–{to} of {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={cn(btn, "border-[1.5px] border-admin-border bg-white text-admin-body disabled:cursor-not-allowed disabled:text-gray-300")}
        >
          <ChevronLeft className="size-4" />
        </button>
        {visible.map((n) => (
          <button
            key={n}
            type="button"
            aria-current={n === page ? "page" : undefined}
            onClick={() => onPageChange(n)}
            className={cn(btn, n === page ? "bg-admin-ink text-white" : "border-[1.5px] border-admin-border bg-white text-admin-body")}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          aria-label="Next page"
          disabled={page === pages}
          onClick={() => onPageChange(page + 1)}
          className={cn(btn, "border-[1.5px] border-admin-border bg-white text-admin-body disabled:cursor-not-allowed disabled:text-gray-300")}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  );
}
