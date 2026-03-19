import type { Lease } from "@/types/property";

// Random high-res house images from Unsplash
const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1613498382159-0972b7b4c9f1",
  "https://images.unsplash.com/photo-1613977257363-707ba934f246",
];

// Reusable Lagos address for testing
const SAMPLE_ADDRESS = "No 4, Bolaji Avenue, off Iworoko, Lagos Nigeria.";

// Helper to get random images
const getRandomImages = (count: number) => {
  const shuffled = [...UNSPLASH_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const MOCK_LEASES: Lease[] = [
  {
    id: "lease_1",
    property: {
      id: "prop_1",
      name: "The Levite Homes",
      address: `${SAMPLE_ADDRESS} Solar power, Estate, Urban area`,
      tags: ["Solar power", "Estate", "Urban area"],
      images: getRandomImages(3),
    },
    rentAmount: 2000000,
    rentAmountFormatted: "N2,000,000",
    duration: "Long term",
    type: "Duplex",
    beds: 3,
    baths: 3,
    furnished: true,
    cautionFee: 100000,
    startDate: "2025-09-22",
    endDate: "2026-09-22",
    monthsBeforeExpire: 11,
    verified: true,
  },
  {
    id: "lease_2",
    property: {
      id: "prop_2",
      name: "Standard Urban Apartment",
      address: "123 Victory Street, Victoria Island, Lagos.",
      tags: ["Estate", "Urban area"],
      images: getRandomImages(2),
    },
    rentAmount: 3500000,
    rentAmountFormatted: "N3,500,000",
    duration: "Short term",
    type: "Flat",
    beds: 2,
    baths: 2,
    furnished: false,
    cautionFee: 150000,
    startDate: "2025-10-01",
    endDate: "2026-10-01",
    monthsBeforeExpire: 12,
    verified: false,
  },
  {
    id: "lease_2",
    property: {
      id: "prop_2",
      name: "Standard Urban Apartment",
      address: "123 Victory Street, Victoria Island, Lagos.",
      tags: ["Estate", "Urban area"],
      images: getRandomImages(2),
    },
    rentAmount: 3500000,
    rentAmountFormatted: "N3,500,000",
    duration: "Short term",
    type: "Flat",
    beds: 2,
    baths: 2,
    furnished: false,
    cautionFee: 150000,
    startDate: "2025-10-01",
    endDate: "2026-10-01",
    monthsBeforeExpire: 12,
    verified: false,
  },
  {
    id: "lease_2",
    property: {
      id: "prop_2",
      name: "Standard Urban Apartment",
      address: "123 Victory Street, Victoria Island, Lagos.",
      tags: ["Estate", "Urban area"],
      images: getRandomImages(2),
    },
    rentAmount: 3500000,
    rentAmountFormatted: "N3,500,000",
    duration: "Short term",
    type: "Flat",
    beds: 2,
    baths: 2,
    furnished: false,
    cautionFee: 150000,
    startDate: "2025-10-01",
    endDate: "2026-10-01",
    monthsBeforeExpire: 12,
    verified: false,
  },
  {
    id: "lease_2",
    property: {
      id: "prop_2",
      name: "Standard Urban Apartment",
      address: "123 Victory Street, Victoria Island, Lagos.",
      tags: ["Estate", "Urban area"],
      images: getRandomImages(2),
    },
    rentAmount: 3500000,
    rentAmountFormatted: "N3,500,000",
    duration: "Short term",
    type: "Flat",
    beds: 2,
    baths: 2,
    furnished: false,
    cautionFee: 150000,
    startDate: "2025-10-01",
    endDate: "2026-10-01",
    monthsBeforeExpire: 12,
    verified: false,
  },
];
