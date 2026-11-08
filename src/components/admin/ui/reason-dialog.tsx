"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/**
 * Asks for a reason before a consequential action (reject, suspend, flag…).
 * The reason is stored in the audit log and, where relevant, shown to the user.
 */
export function ReasonDialog({
  open,
  onOpenChange,
  title,
  description,
  placeholder,
  confirmLabel,
  tone = "danger",
  optional = false,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  placeholder: string;
  confirmLabel: string;
  tone?: "danger" | "primary";
  optional?: boolean;
  onConfirm: (reason: string) => Promise<void>;
}) {
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  // Clear the text whenever the dialog closes, so it opens empty next time.
  const setOpen = (next: boolean) => {
    if (busy) return;
    if (!next) setReason("");
    onOpenChange(next);
  };

  const ready = optional || reason.trim().length > 0;

  const submit = async () => {
    if (!ready || busy) return;
    setBusy(true);
    try {
      await onConfirm(reason.trim());
      setReason("");
      onOpenChange(false);
    } catch {
      // The caller already showed the error; keep the dialog open to retry.
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl px-8 py-7 sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-admin-ink">{title}</DialogTitle>
          <DialogDescription className="text-[13.5px] leading-relaxed text-admin-subtle">
            {description}
          </DialogDescription>
        </DialogHeader>
        <label className="sr-only" htmlFor="reason-input">
          Reason
        </label>
        <textarea
          id="reason-input"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={placeholder}
          rows={4}
          maxLength={1000}
          className="w-full resize-y rounded-[10px] border-[1.5px] border-admin-border px-3.5 py-3 text-[13.5px] leading-relaxed text-admin-ink outline-none focus:border-admin-accent"
        />
        <div className="mt-2 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={busy}
            className="rounded-[10px] border-[1.5px] border-admin-border bg-white px-5 py-2 text-sm font-semibold text-admin-subtle hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!ready || busy}
            className={cn(
              "rounded-[10px] px-5 py-2 text-sm font-semibold transition",
              !ready
                ? "cursor-not-allowed bg-admin-line text-admin-muted"
                : tone === "danger"
                  ? "bg-admin-danger text-white hover:opacity-90"
                  : "bg-admin-accent text-white hover:opacity-90",
            )}
          >
            {busy ? "Saving…" : confirmLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
