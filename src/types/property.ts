export interface Property {
  id: string;
  name: string;
  address: string;
  tags: string[]; // e.g., ["Solar power", "Estate", "Urban area"]
  images: string[];
}

export interface Lease {
  id: string;
  property: Property;
  rentAmount: number; // e.g., 2000000
  rentAmountFormatted: string; // e.g., "N2,000,000"
  duration: "Long term" | "Short term";
  type: string; // e.g., "Duplex"
  beds: number;
  baths: number;
  furnished: boolean;
  cautionFee: number; // e.g., 100000
  startDate: string; // e.g., "2025-09-22"
  endDate: string; // e.g., "2026-09-22"
  monthsBeforeExpire: number; // e.g., 11
  verified: boolean;
}

export interface BrowseProperty {
  id: string;
  name: string;
  address: string;
  images: string[];
  price: number;
  priceFormatted: string;
  category: "Long term" | "Shortlet" | "BNB";
  type: string;
  beds: number;
  baths: number;
  furnished: boolean;
  verified: boolean;
  status: "Available" | "Occupied";
  listedAt: string;
  isWishlisted: boolean;
}
