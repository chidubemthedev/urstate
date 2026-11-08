"use client";

import { useParams } from "next/navigation";
import { useAdminQuery } from "@/lib/admin/api";
import type { UserDetail } from "@/lib/admin/types";
import { ActionBar, Breadcrumb } from "@/components/admin/shell/page-header";
import { UserActions } from "@/components/admin/users/user-actions";
import { UserSummary } from "@/components/admin/users/user-summary";
import { UserTabs } from "@/components/admin/users/user-tabs";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { ErrorState, LoadingState } from "@/components/admin/ui/states";

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, reload } = useAdminQuery<UserDetail>(`/users/${id}`, { keepPrevious: false });

  if (error && !data) {
    return (
      <>
        <Breadcrumb parent="Users" href="/admin/users" current="User" />
        <ErrorState message={error.message} onRetry={error.status === 404 ? undefined : reload} />
      </>
    );
  }
  if (!data) return <LoadingState rows={6} />;

  const { user } = data;
  return (
    <>
      <Breadcrumb parent="Users" href="/admin/users" current={user.name} />
      <ActionBar
        status={
          <>
            {user.suspended && <StatusBadge meta={{ label: "Suspended", tone: "danger" }} className="rounded-[10px] px-3 py-1.5 text-[13px]" />}
            {user.flagged && <StatusBadge meta={{ label: "Flagged", tone: "warning" }} className="rounded-[10px] px-3 py-1.5 text-[13px]" />}
          </>
        }
      >
        <UserActions detail={data} onChanged={reload} />
      </ActionBar>
      {(user.suspendedReason || user.flaggedReason) && (
        <div className="mb-5 space-y-1 text-[13px] text-admin-subtle">
          {user.suspendedReason && <p>Suspended: {user.suspendedReason}</p>}
          {user.flaggedReason && <p>Flagged: {user.flaggedReason}</p>}
        </div>
      )}
      <div className="grid items-start gap-5 lg:grid-cols-[300px_1fr]">
        <UserSummary detail={data} />
        <UserTabs detail={data} />
      </div>
    </>
  );
}
