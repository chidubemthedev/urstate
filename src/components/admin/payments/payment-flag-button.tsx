"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { adminAction } from "@/lib/admin/api";
import { ActionButton } from "../ui/action-button";
import { ReasonDialog } from "../ui/reason-dialog";

/** Flagging is the only payment action: it records concern without moving money. */
export function PaymentFlagButton({ id, flagged, onChanged }: { id: string; flagged: boolean; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const run = async (path: string, reason: string, success: string) => {
    try {
      await adminAction(`/payments/${id}${path}`, { reason });
      toast.success(success);
      onChanged();
    } catch (e) {
      toast.error((e as Error).message);
      throw e;
    }
  };

  return (
    <>
      <ActionButton variant="danger-soft" icon={<AlertTriangle className="size-[15px]" />} onClick={() => setOpen(true)}>
        {flagged ? "Remove flag" : "Flag for review"}
      </ActionButton>
      {flagged ? (
        <ReasonDialog
          open={open}
          onOpenChange={setOpen}
          title="Remove flag"
          description="Add a note on how this was resolved (optional)."
          placeholder="e.g. Provider confirmed a single charge."
          confirmLabel="Remove flag"
          tone="primary"
          optional
          onConfirm={(reason) => run("/unflag", reason, "Flag removed.")}
        />
      ) : (
        <ReasonDialog
          open={open}
          onOpenChange={setOpen}
          title="Flag payment for review"
          description="Describe what looks wrong. The flag and reason are kept in this payment's history."
          placeholder="e.g. Renter reports being charged twice."
          confirmLabel="Flag payment"
          onConfirm={(reason) => run("/flag", reason, "Payment flagged for review.")}
        />
      )}
    </>
  );
}
