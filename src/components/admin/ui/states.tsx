import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Panel } from "./panel";

export function LoadingState({ rows = 4 }: { rows?: number }) {
  return (
    <Panel className="space-y-3 p-6" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-lg" />
      ))}
    </Panel>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Panel role="alert" className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <AlertCircle className="size-6 text-admin-danger" aria-hidden />
      <p className="text-sm text-admin-body">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="text-sm font-semibold text-admin-accent hover:underline">
          Try again
        </button>
      )}
    </Panel>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="flex h-56 items-center justify-center text-center text-[15px] text-admin-muted">{children}</div>;
}
