import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaymentStatus } from "@/lib/admin/types";

type Step = { label: string; sublabel: string; state: "done" | "current" | "upcoming" | "failed" | "warning" };

/**
 * The payment's journey through provider states (PRD lifecycle tab):
 * Initiated → Pending → Confirmed, or ending in Failed / Disputed / Refunded.
 * Payout is a separate state shown next to this, not a step in it.
 */
const stepsFor = (status: PaymentStatus): Step[] => {
  const initiated: Step = { label: "Initiated", sublabel: "Renter started payment", state: "done" };
  switch (status) {
    case "initiated":
      return [{ ...initiated, state: "current" }, { label: "Pending", sublabel: "With payment provider", state: "upcoming" }, { label: "Confirmed", sublabel: "Provider confirmed", state: "upcoming" }];
    case "pending":
      return [initiated, { label: "Pending", sublabel: "With payment provider", state: "current" }, { label: "Confirmed", sublabel: "Provider confirmed", state: "upcoming" }];
    case "confirmed":
      return [initiated, { label: "Pending", sublabel: "With payment provider", state: "done" }, { label: "Confirmed", sublabel: "Provider confirmed", state: "done" }];
    case "failed":
      return [initiated, { label: "Failed", sublabel: "Not completed", state: "failed" }];
    case "disputed":
      return [initiated, { label: "Disputed", sublabel: "Under investigation", state: "warning" }];
    case "refunded":
      return [initiated, { label: "Confirmed", sublabel: "Provider confirmed", state: "done" }, { label: "Refunded", sublabel: "Returned to renter", state: "current" }];
  }
};

const circle: Record<Step["state"], string> = {
  done: "border-admin-success bg-[#ECFDF5]",
  current: "border-admin-accent bg-[#EEF2FF]",
  upcoming: "border-admin-border bg-gray-50",
  failed: "border-admin-danger bg-[#FEF2F2]",
  warning: "border-amber-500 bg-[#FFFBEB]",
};

export function PaymentStepper({ status }: { status: PaymentStatus }) {
  const steps = stepsFor(status);
  return (
    <ol className="flex items-start">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step.label} className={cn("flex min-w-0 items-start", !last && "flex-1")}>
            <div className="flex shrink-0 flex-col items-center">
              <span className={cn("flex size-9 items-center justify-center rounded-full border-2", circle[step.state])}>
                {step.state === "done" ? (
                  <Check className="size-3.5 text-admin-success" strokeWidth={2.5} aria-hidden />
                ) : step.state === "failed" ? (
                  <X className="size-3.5 text-admin-danger" strokeWidth={2.5} aria-hidden />
                ) : (
                  <span
                    aria-hidden
                    className={cn(
                      "size-2.5 rounded-full",
                      step.state === "current" ? "bg-admin-accent" : step.state === "warning" ? "bg-amber-500" : "bg-admin-border",
                    )}
                  />
                )}
              </span>
              <div className="mt-2 px-1 text-center">
                <div className={cn("whitespace-nowrap text-[12.5px] font-bold", step.state === "upcoming" ? "text-admin-muted" : step.state === "failed" ? "text-admin-danger" : "text-admin-ink")}>
                  {step.label}
                  <span className="sr-only">
                    {step.state === "done" ? " (complete)" : step.state === "current" ? " (current)" : step.state === "upcoming" ? " (not reached)" : ""}
                  </span>
                </div>
                <div className="mt-0.5 hidden whitespace-nowrap text-[11.5px] text-admin-muted sm:block">{step.sublabel}</div>
              </div>
            </div>
            {!last && (
              <span
                aria-hidden
                className={cn("mx-1.5 mt-[17px] h-0.5 flex-1 rounded", steps[i + 1].state === "upcoming" ? "bg-admin-border" : "bg-admin-success")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
