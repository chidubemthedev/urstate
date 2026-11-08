// Response shapes for the backend's /api/admin routes.
// Money is always in kobo (₦1 = 100 kobo); format with formatNaira().

export type Role = "renter" | "owner" | "admin" | null;
export type ReviewStatus = "not_submitted" | "pending" | "verified" | "action_required" | "rejected";
export type PublicationStatus = "unpublished" | "published" | "paused";
export type OccupancyStatus = "vacant" | "reserved" | "occupied";
export type ApplicationStatus = "submitted" | "under_review" | "accepted" | "rejected" | "withdrawn";
export type PaymentStatus = "initiated" | "pending" | "confirmed" | "failed" | "disputed" | "refunded";
export type PayoutStatus = "not_applicable" | "pending" | "processing" | "paid" | "failed";
export type PaymentType = "rent" | "caution_deposit" | "service_charge";

export interface PersonRef {
  id: string;
  name: string;
  email?: string;
  image?: string | null;
}

export interface HistoryEntry {
  id: string;
  action: string;
  reason: string | null;
  createdAt: string;
  actorName: string | null;
  metadata?: Record<string, unknown> | null;
}

// ─── Overview ────────────────────────────────────────────────────────────────

export interface StatBlock {
  value?: number;
  valueKobo?: number;
  changePercent: number;
  series: number[];
}

export type VolumePeriod = "weekly" | "monthly" | "annually";

export interface Overview {
  asOf: string;
  stats: {
    activeUsers: StatBlock;
    verifiedProperties: StatBlock;
    monthlyTransactions: StatBlock;
    rentCollected: StatBlock;
  };
  volume: {
    period: VolumePeriod;
    points: { label: string; valueKobo: number }[];
    totalKobo: number;
    changePercent: number;
  };
  activity: { kind: "user" | "property" | "payment" | "application"; id: string; text: string; at: string; href: string }[];
  pending: { key: string; label: string; count: number; href: string }[];
  alerts: { key: string; label: string; count: number; href: string }[];
}

// ─── Users ───────────────────────────────────────────────────────────────────

export interface UserRow {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: Role;
  suspended: boolean;
  flagged: boolean;
  createdAt: string;
  kycStatus: ReviewStatus;
}

export interface UserList {
  rows: UserRow[];
  total: number;
  page: number;
  pageSize: number;
  counts: { all: number; renter: number; owner: number };
}

export interface KycSubmission {
  id: string;
  status: ReviewStatus;
  idType: string | null;
  idNumber: string | null;
  dateOfBirth: string | null;
  address: string | null;
  state: string | null;
  country: string | null;
  documents: { label: string; url: string; mimeType?: string }[];
  reviewReason: string | null;
  reviewedAt: string | null;
  submittedAt: string;
}

export interface UserDetail {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    role: Role;
    phone: string | null;
    suspended: boolean;
    suspendedReason: string | null;
    flagged: boolean;
    flaggedReason: string | null;
    createdAt: string;
  };
  kyc: KycSubmission | null;
  activity: HistoryEntry[];
  payments: { id: string; reference: string; amountKobo: number; status: PaymentStatus; type: PaymentType; createdAt: string }[];
  propertyCount: number;
}

// ─── Properties ──────────────────────────────────────────────────────────────

export interface PropertyRow {
  id: string;
  name: string;
  address: string;
  city: string | null;
  state: string | null;
  propertyType: string | null;
  bedrooms: number;
  bathrooms: number;
  rentAmountKobo: number;
  paymentFrequency: string;
  photo: string | null;
  verificationStatus: ReviewStatus;
  publicationStatus: PublicationStatus;
  occupancyStatus: OccupancyStatus;
  flagged: boolean;
  submittedAt: string | null;
  createdAt: string;
  owner: PersonRef;
}

export interface PropertyList {
  rows: PropertyRow[];
  counts: { all: number; pending: number; verified: number; rejected: number };
}

export interface PropertyDetail {
  property: {
    id: string;
    ownerId: string;
    name: string;
    description: string | null;
    address: string;
    city: string | null;
    state: string | null;
    propertyType: string | null;
    category: string | null;
    bedrooms: number;
    bathrooms: number;
    toilets: number;
    maxOccupants: number | null;
    furnishing: string | null;
    amenities: string[];
    photos: string[];
    rentAmountKobo: number;
    paymentFrequency: string;
    cautionFeeKobo: number | null;
    serviceChargeKobo: number | null;
    authorityType: "owner" | "manager" | null;
    verificationStatus: ReviewStatus;
    verificationReason: string | null;
    reviewedAt: string | null;
    submittedAt: string | null;
    publicationStatus: PublicationStatus;
    occupancyStatus: OccupancyStatus;
    flagged: boolean;
    flaggedReason: string | null;
    createdAt: string;
  };
  owner: (PersonRef & { phone: string | null; createdAt: string; kycStatus: ReviewStatus }) | null;
  documents: { id: string; kind: string; name: string; url: string; mimeType: string | null; sizeBytes: number | null; createdAt: string }[];
  applicationCount: number;
  history: HistoryEntry[];
}

// ─── Applications ────────────────────────────────────────────────────────────

export interface ApplicationRow {
  id: string;
  status: ApplicationStatus;
  moveInDate: string | null;
  createdAt: string;
  updatedAt: string;
  renter: PersonRef;
  owner: PersonRef;
  property: { id: string; name: string; address: string; photo: string | null };
}

export interface ApplicationList {
  rows: ApplicationRow[];
  counts: Record<"all" | ApplicationStatus, number>;
}

export interface ApplicationDetail {
  application: {
    id: string;
    status: ApplicationStatus;
    moveInDate: string | null;
    durationMonths: number | null;
    message: string | null;
    decidedAt: string | null;
    decisionReason: string | null;
    createdAt: string;
    updatedAt: string;
  };
  renter: PersonRef & { phone: string | null; createdAt: string; kycStatus: ReviewStatus };
  owner: PersonRef & { kycStatus: ReviewStatus; propertyCount: number };
  property: { id: string; name: string; address: string; bedrooms: number; bathrooms: number; rentAmountKobo: number; paymentFrequency: string; photo: string | null };
  decidedByName: string | null;
  history: HistoryEntry[];
}

// ─── Payments ────────────────────────────────────────────────────────────────

export interface PaymentRow {
  id: string;
  reference: string;
  type: PaymentType;
  amountKobo: number;
  status: PaymentStatus;
  payoutStatus: PayoutStatus;
  flagged: boolean;
  isRecordedHistory: boolean;
  createdAt: string;
  renter: PersonRef;
  owner: PersonRef;
  property: { id: string; name: string };
}

export interface PaymentList {
  rows: PaymentRow[];
  counts: Record<"all" | PaymentStatus, number>;
  summary: { confirmedKobo: number; pendingKobo: number; awaitingPayoutKobo: number; failedKobo: number };
}

export interface PaymentDetail {
  payment: {
    id: string;
    reference: string;
    providerReference: string | null;
    provider: string | null;
    type: PaymentType;
    amountKobo: number;
    currency: string;
    status: PaymentStatus;
    payoutStatus: PayoutStatus;
    method: string | null;
    periodStart: string | null;
    periodEnd: string | null;
    failureReason: string | null;
    isRecordedHistory: boolean;
    flagged: boolean;
    flaggedReason: string | null;
    confirmedAt: string | null;
    paidOutAt: string | null;
    createdAt: string;
  };
  renter: PersonRef;
  owner: PersonRef;
  property: { id: string; name: string; address: string };
  history: HistoryEntry[];
}
