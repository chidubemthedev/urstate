"use client";

import { toast } from "sonner";
import { adminAction } from "@/lib/admin/api";
import { ReasonDialog } from "../ui/reason-dialog";

/** Suspend or reactivate, with the required reason. Used by the row menu and profile page. */
export function SuspendDialog({
  userId,
  userName,
  suspended,
  open,
  onOpenChange,
  onDone,
}: {
  userId: string;
  userName: string;
  suspended: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDone: () => void;
}) {
  return suspended ? (
    <ReasonDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Reactivate account"
      description={`${userName} will be able to sign in again. Note why the suspension is being lifted.`}
      placeholder="e.g. Identity confirmed with the user by phone."
      confirmLabel="Reactivate account"
      tone="primary"
      onConfirm={async (reason) => {
        try {
          await adminAction(`/users/${userId}/reactivate`, { reason });
          toast.success("Account reactivated.");
          onDone();
        } catch (e) {
          toast.error((e as Error).message);
          throw e;
        }
      }}
    />
  ) : (
    <ReasonDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Suspend account"
      description={`${userName} will be signed out everywhere and won't be able to sign in until reactivated. Their records are kept.`}
      placeholder="e.g. Submitted a forged ID document."
      confirmLabel="Suspend account"
      onConfirm={async (reason) => {
        try {
          await adminAction(`/users/${userId}/suspend`, { reason });
          toast.success("Account suspended.");
          onDone();
        } catch (e) {
          toast.error((e as Error).message);
          throw e;
        }
      }}
    />
  );
}
