"use client";

import { useState } from "react";
import { Flag, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { adminAction } from "@/lib/admin/api";
import type { UserDetail } from "@/lib/admin/types";
import { ActionButton } from "../ui/action-button";
import { ReasonDialog } from "../ui/reason-dialog";
import { SuspendDialog } from "./suspend-dialog";

type Dialog = "reject" | "request-info" | "flag" | "unflag" | "suspend" | null;

/** Identity-check decisions and account controls for one user. */
export function UserActions({ detail, onChanged }: { detail: UserDetail; onChanged: () => void }) {
  const { user, kyc } = detail;
  const [dialog, setDialog] = useState<Dialog>(null);
  const [approving, setApproving] = useState(false);
  const reviewable = kyc?.status === "pending" || kyc?.status === "action_required";

  const run = async (path: string, body: Record<string, unknown>, success: string) => {
    try {
      await adminAction(`/users/${user.id}${path}`, body);
      toast.success(success);
      onChanged();
    } catch (e) {
      toast.error((e as Error).message);
      throw e;
    }
  };

  const approve = async () => {
    setApproving(true);
    await run("/kyc/approve", {}, "Identity check approved.").catch(() => {});
    setApproving(false);
  };

  return (
    <>
      {reviewable && (
        <>
          <ActionButton variant="primary" icon={<ShieldCheck className="size-[15px]" />} busy={approving} onClick={approve}>
            Approve identity check
          </ActionButton>
          <ActionButton variant="danger" onClick={() => setDialog("reject")}>
            Reject
          </ActionButton>
          {kyc?.status === "pending" && (
            <ActionButton variant="neutral" onClick={() => setDialog("request-info")}>
              Request more info
            </ActionButton>
          )}
        </>
      )}
      <ActionButton
        variant={user.flagged ? "warning-active" : "warning"}
        icon={<Flag className="size-[15px]" />}
        onClick={() => setDialog(user.flagged ? "unflag" : "flag")}
      >
        {user.flagged ? "Remove flag" : "Flag user"}
      </ActionButton>
      <ActionButton variant="neutral" onClick={() => setDialog("suspend")}>
        {user.suspended ? "Reactivate account" : "Suspend account"}
      </ActionButton>

      <ReasonDialog
        open={dialog === "reject"}
        onOpenChange={(o) => !o && setDialog(null)}
        title="Reject identity check"
        description="Explain what's wrong so the user can fix it. They'll see this reason."
        placeholder="e.g. The ID photo is blurry. Upload a clear photo of the full card."
        confirmLabel="Reject identity check"
        onConfirm={(reason) => run("/kyc/reject", { reason }, "Identity check rejected.")}
      />
      <ReasonDialog
        open={dialog === "request-info"}
        onOpenChange={(o) => !o && setDialog(null)}
        title="Request more information"
        description="Tell the user exactly what to add. Their check moves to Action required."
        placeholder="e.g. Add a photo of the back of your ID card."
        confirmLabel="Send request"
        tone="primary"
        onConfirm={(reason) => run("/kyc/request-info", { reason }, "Request sent to user.")}
      />
      <ReasonDialog
        open={dialog === "flag"}
        onOpenChange={(o) => !o && setDialog(null)}
        title="Flag user for review"
        description="Flagging doesn't block the user. It marks the account so the team takes a closer look."
        placeholder="e.g. Name on ID doesn't match account name."
        confirmLabel="Flag user"
        tone="primary"
        optional
        onConfirm={(reason) => run("/flag", { reason }, "User flagged for review.")}
      />
      <ReasonDialog
        open={dialog === "unflag"}
        onOpenChange={(o) => !o && setDialog(null)}
        title="Remove flag"
        description="Add a note on why the flag is no longer needed (optional)."
        placeholder="e.g. Checked with the user; details are correct."
        confirmLabel="Remove flag"
        tone="primary"
        optional
        onConfirm={(reason) => run("/unflag", { reason }, "Flag removed.")}
      />
      <SuspendDialog
        userId={user.id}
        userName={user.name}
        suspended={user.suspended}
        open={dialog === "suspend"}
        onOpenChange={(o) => !o && setDialog(null)}
        onDone={onChanged}
      />
    </>
  );
}
