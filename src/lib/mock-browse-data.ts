import type { BrowseProperty } from "@/types/property";

const IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
];

export const MOCK_BROWSE_DATA: BrowseProperty[] = [
  {
    id: "prop_1",
    name: "The Levite Homes",
    address: "Ikeja GRA, Ikeja, Lagos",
    images: IMAGES,
    price: 4000000,
    priceFormatted: "N4,000,000",
    category: "Long term",
    type: "Duplex",
    beds: 3,
    baths: 3,
    furnished: true,
    verified: true,
    status: "Available",
    listedAt: "four hours ago",
    isWishlisted: false,
  },
  {
    id: "prop_2",
    name: "Maryland Mini Flat",
    address: "Maryland, Ikeja, Lagos",
    images: [IMAGES[1], IMAGES[0]],
    price: 1500000,
    priceFormatted: "N1,500,000",
    category: "Shortlet",
    type: "Apartment / Flat",
    beds: 1,
    baths: 1,
    furnished: true,
    verified: true,
    status: "Available",
    listedAt: "two days ago",
    isWishlisted: true,
  },
  {
    id: "prop_3",
    name: "Alausa Executive Office/Home",
    address: "Alausa, Ikeja, Lagos",
    images: [IMAGES[2], IMAGES[1]],
    price: 6000000,
    priceFormatted: "N6,000,000",
    category: "Long term",
    type: "Fully-Detached House",
    beds: 4,
    baths: 4,
    furnished: false,
    verified: false,
    status: "Occupied",
    listedAt: "one week ago",
    isWishlisted: false,
  },
];

// Helper constants for our filters
export const PROPERTY_TYPES = [
  "Apartment / Flat",
  "Bungalow",
  "Duplex",
  "Terrace / Townhouse",
  "Semi-Detached House",
  "Fully-Detached House",
  "Tenement / “Face-me-I-face-you”",
  "Maisonette",
  "Penthouse",
  "Mansion / Luxury Villa",
];

export const LOCATIONS = [
  "Ikeja, Lagos",
  "Maryland, Ikeja, Lagos",
  "Ikeja GRA, Ikeja, Lagos",
  "Alausa, Ikeja, Lagos",
  "Allen Avenue, Ikeja, Lagos",
  "Airport Road, Ikeja, Lagos",
  "Awolowo way, Ikeja, Lagos",
];

export const FURNISHING_TYPES = [
  "Furnished",
  "Unfurnished",
  "Semi - Furnished",
];
