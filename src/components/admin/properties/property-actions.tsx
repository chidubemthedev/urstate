"use client";

import { useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { adminAction } from "@/lib/admin/api";
import type { PropertyDetail } from "@/lib/admin/types";
import { ActionButton } from "../ui/action-button";
import { ReasonDialog } from "../ui/reason-dialog";

type Dialog = "reject" | "request-info" | "flag" | "unflag" | null;

/** Review decisions for a property. Verifying approves eligibility; the owner still decides when to publish. */
export function PropertyActions({ detail, onChanged }: { detail: PropertyDetail; onChanged: () => void }) {
  const { property: p } = detail;
  const [dialog, setDialog] = useState<Dialog>(null);
  const [verifying, setVerifying] = useState(false);
  const reviewable = p.verificationStatus === "pending" || p.verificationStatus === "action_required";

  const run = async (path: string, body: Record<string, unknown>, success: string) => {
    try {
      await adminAction(`/properties/${p.id}${path}`, body);
      toast.success(success);
      onChanged();
    } catch (e) {
      toast.error((e as Error).message);
      throw e;
    }
  };

  const verify = async () => {
    setVerifying(true);
    await run("/verify", {}, "Property verified. The owner can now publish it.").catch(() => {});
    setVerifying(false);
  };

  return (
    <>
      {reviewable && (
        <>
          <ActionButton variant="primary" icon={<ShieldCheck className="size-[15px]" />} busy={verifying} onClick={verify}>
            Verify property
          </ActionButton>
          <ActionButton variant="danger" onClick={() => setDialog("reject")}>
            Reject
          </ActionButton>
          {p.verificationStatus === "pending" && (
            <ActionButton variant="neutral" onClick={() => setDialog("request-info")}>
              Request more info
            </ActionButton>
          )}
        </>
      )}
      <ActionButton
        variant="danger-soft"
        icon={<AlertTriangle className="size-[15px]" />}
        onClick={() => setDialog(p.flagged ? "unflag" : "flag")}
      >
        {p.flagged ? "Remove flag" : "Flag duplicate or fraud"}
      </ActionButton>

      <ReasonDialog
        open={dialog === "reject"}
        onOpenChange={(o) => !o && setDialog(null)}
        title="Reject property"
        description="Explain what's wrong so the owner can fix it. They'll see this reason. A rejected property is unpublished."
        placeholder="e.g. The deed of assignment names a different owner."
        confirmLabel="Reject property"
        onConfirm={(reason) => run("/reject", { reason }, "Property rejected. The owner has the reason.")}
      />
      <ReasonDialog
        open={dialog === "request-info"}
        onOpenChange={(o) => !o && setDialog(null)}
        title="Request more information"
        description="Tell the owner exactly what to add. The property moves to Action required."
        placeholder="e.g. Upload the authorisation letter from the property owner."
        confirmLabel="Send request"
        tone="primary"
        onConfirm={(reason) => run("/request-info", { reason }, "Request sent to owner.")}
      />
      <ReasonDialog
        open={dialog === "flag"}
        onOpenChange={(o) => !o && setDialog(null)}
        title="Flag duplicate or fraud"
        description="Describe what looks wrong. This marks the property for investigation and is kept in the audit history."
        placeholder="e.g. Same photos as a listing in Ajah under a different owner."
        confirmLabel="Flag property"
        onConfirm={(reason) => run("/flag", { reason }, "Property flagged for review.")}
      />
      <ReasonDialog
        open={dialog === "unflag"}
        onOpenChange={(o) => !o && setDialog(null)}
        title="Remove flag"
        description="Add a note on why the flag is no longer needed (optional)."
        placeholder="e.g. Confirmed these are two separate units."
        confirmLabel="Remove flag"
        tone="primary"
        optional
        onConfirm={(reason) => run("/unflag", { reason }, "Flag removed.")}
      />
    </>
  );
}
