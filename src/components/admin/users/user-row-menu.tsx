"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { UserRow } from "@/lib/admin/types";
import { SuspendDialog } from "./suspend-dialog";

/** "…" menu on each user row. Delete is intentionally absent: records are retained (PRD §8). */
export function UserRowMenu({ user, onChanged }: { user: UserRow; onChanged: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const item = "block w-full px-4 py-2.5 text-left text-[13.5px] font-medium hover:bg-gray-50";

  return (
    <>
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger
          aria-label={`Actions for ${user.name}`}
          className="rounded-md px-1.5 py-1 text-admin-muted hover:bg-admin-line focus-visible:outline-2 focus-visible:outline-admin-accent"
        >
          <MoreHorizontal className="size-[18px]" />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 overflow-hidden rounded-[10px] p-0 shadow-admin-raised">
          <Link href={`/admin/users/${user.id}`} className={`${item} text-admin-body`}>
            View profile
          </Link>
          <button
            type="button"
            className={`${item} border-t border-admin-line ${user.suspended ? "text-admin-body" : "text-admin-danger"}`}
            onClick={() => {
              setMenuOpen(false);
              setDialogOpen(true);
            }}
          >
            {user.suspended ? "Reactivate account" : "Suspend account"}
          </button>
        </PopoverContent>
      </Popover>
      <SuspendDialog
        userId={user.id}
        userName={user.name}
        suspended={user.suspended}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onDone={onChanged}
      />
    </>
  );
}
