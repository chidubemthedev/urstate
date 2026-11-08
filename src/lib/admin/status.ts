import type {
  ApplicationStatus,
  PaymentStatus,
  PaymentType,
  PayoutStatus,
  ReviewStatus,
  Role,
} from "./types";

/** Visual tone of a badge. Every status maps to a tone and a plain-language label. */
export type Tone = "success" | "warning" | "danger" | "info" | "accent" | "neutral";

export type StatusMeta = { label: string; tone: Tone };

export const reviewStatusMeta: Record<ReviewStatus, StatusMeta> = {
  not_submitted: { label: "Not submitted", tone: "neutral" },
  pending: { label: "Pending", tone: "warning" },
  action_required: { label: "Action required", tone: "warning" },
  verified: { label: "Verified", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
};

export const roleMeta: Record<Exclude<Role, null>, StatusMeta> = {
  renter: { label: "Renter", tone: "accent" },
  owner: { label: "Owner", tone: "success" },
  admin: { label: "Admin", tone: "info" },
};

export const applicationStatusMeta: Record<ApplicationStatus, StatusMeta> = {
  submitted: { label: "Submitted", tone: "warning" },
  under_review: { label: "Under review", tone: "info" },
  accepted: { label: "Accepted", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  withdrawn: { label: "Withdrawn", tone: "neutral" },
};

export const paymentStatusMeta: Record<PaymentStatus, StatusMeta> = {
  initiated: { label: "Initiated", tone: "neutral" },
  pending: { label: "Pending", tone: "warning" },
  confirmed: { label: "Confirmed", tone: "success" },
  failed: { label: "Failed", tone: "danger" },
  disputed: { label: "Disputed", tone: "danger" },
  refunded: { label: "Refunded", tone: "info" },
};

export const payoutStatusMeta: Record<PayoutStatus, StatusMeta> = {
  not_applicable: { label: "No payout", tone: "neutral" },
  pending: { label: "Awaiting payout", tone: "warning" },
  processing: { label: "Payout processing", tone: "info" },
  paid: { label: "Paid out", tone: "success" },
  failed: { label: "Payout failed", tone: "danger" },
};

export const paymentTypeLabel: Record<PaymentType, string> = {
  rent: "Rent",
  caution_deposit: "Caution deposit",
  service_charge: "Service charge",
};

/** Plain-language labels for audit-log actions. */
const ACTION_LABELS: Record<string, string> = {
  "admin.created": "Admin account created",
  "user.promoted_to_admin": "Promoted to admin",
  "kyc.approved": "Identity check approved",
  "kyc.rejected": "Identity check rejected",
  "kyc.action_required": "More identity information requested",
  "user.flagged": "Account flagged for review",
  "user.unflagged": "Flag removed",
  "user.suspended": "Account suspended",
  "user.reactivated": "Account reactivated",
  "property.verified": "Property verified",
  "property.rejected": "Property rejected",
  "property.action_required": "More property information requested",
  "property.flagged": "Flagged as duplicate or possible fraud",
  "property.unflagged": "Property flag removed",
  "application.accepted": "Application accepted by owner",
  "application.rejected": "Application rejected by owner",
  "application.withdrawn": "Application withdrawn",
  "payment.confirmed": "Payment confirmed",
  "payment.flagged": "Payment flagged for review",
  "payment.unflagged": "Payment flag removed",
};

export const actionLabel = (action: string) =>
  ACTION_LABELS[action] ?? action.replace(/[._]/g, " ").replace(/^\w/, (c) => c.toUpperCase());

/** Tone for an audit action, used for timeline dots. */
export const actionTone = (action: string): Tone => {
  if (/(approved|verified|reactivated|confirmed|accepted|unflagged)$/.test(action)) return "success";
  if (/(rejected|suspended|failed)$/.test(action)) return "danger";
  if (/(flagged|action_required)$/.test(action)) return "warning";
  return "accent";
};
