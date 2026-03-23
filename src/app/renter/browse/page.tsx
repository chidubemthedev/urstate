"use client";

import { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  MOCK_BROWSE_DATA,
  PROPERTY_TYPES,
  FURNISHING_TYPES,
} from "@/lib/mock-browse-data";
import { PropertyCard } from "../components/property-card";
import { MultiSelectFilter } from "../components/multi-select-filter";
import { LocationFilter } from "../components/location-filter";

function BrowseContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse URL Parameters
  const querySearch = searchParams.get("q") || "";
  const selectedCategories = searchParams.getAll("category");
  const selectedTypes = searchParams.getAll("type");
  const selectedLocations = searchParams.getAll("location");
  const selectedPrices = searchParams.getAll("price");
  const selectedFurnishing = searchParams.getAll("furnishing");

  const totalFiltersApplied =
    selectedCategories.length +
    selectedTypes.length +
    selectedLocations.length +
    selectedPrices.length +
    selectedFurnishing.length;

  // --- URL UPDATERS (Removed useCallback to satisfy React Compiler) ---
  const updateQueryString = (name: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.append(name, value);
    } else {
      const existing = params.getAll(name);
      params.delete(name);
      existing
        .filter((v) => v !== value)
        .forEach((v) => params.append(name, v));
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearchInput = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set("q", val);
    else params.delete("q");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  // --- ENHANCED FILTERING LOGIC ---
  const filteredData = MOCK_BROWSE_DATA.filter((property) => {
    const query = querySearch.toLowerCase();

    // Now searches across Name, Address, Category, and Type!
    const matchesSearch =
      query === "" ||
      property.name.toLowerCase().includes(query) ||
      property.address.toLowerCase().includes(query) ||
      property.category.toLowerCase().includes(query) ||
      property.type.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(property.category);
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(property.type);

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.some((loc) =>
        property.address
          .toLowerCase()
          .includes(loc.split(",")[0].toLowerCase().trim()),
      );

    const furnishString = property.furnished ? "Furnished" : "Unfurnished";
    const matchesFurnishing =
      selectedFurnishing.length === 0 ||
      selectedFurnishing.includes(furnishString);

    let matchesPrice = selectedPrices.length === 0;
    if (!matchesPrice) {
      const p = property.price;
      if (selectedPrices.includes("Under 500k") && p < 500000)
        matchesPrice = true;
      if (selectedPrices.includes("500k - 2M") && p >= 500000 && p <= 2000000)
        matchesPrice = true;
      if (selectedPrices.includes("2M - 4M") && p > 2000000 && p <= 4000000)
        matchesPrice = true;
      if (selectedPrices.includes("4M+") && p > 4000000) matchesPrice = true;
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesType &&
      matchesLocation &&
      matchesFurnishing &&
      matchesPrice
    );
  });

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-4xl font-extrabold text-[#102A43] tracking-tight">
        Find Apartment
      </h1>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Cabins, Beachfront House, Rooms..."
          className="w-full pl-12 h-14 bg-[#F2F2F2] border-none rounded-xl text-base focus-visible:ring-1 focus-visible:ring-[#102A43]"
          defaultValue={querySearch}
          onChange={(e) => handleSearchInput(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          className="px-3 border-gray-300 rounded-lg h-10"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Button>

        <MultiSelectFilter
          title="Category"
          paramKey="category"
          options={["Long term", "Shortlet", "BNB"]}
          selected={selectedCategories}
          onChange={updateQueryString}
        />
        <MultiSelectFilter
          title="Property Type"
          paramKey="type"
          options={PROPERTY_TYPES}
          selected={selectedTypes}
          onChange={updateQueryString}
        />
        <LocationFilter
          selected={selectedLocations}
          onChange={updateQueryString}
        />
        <MultiSelectFilter
          title="Price"
          paramKey="price"
          options={["Under 500k", "500k - 2M", "2M - 4M", "4M+"]}
          selected={selectedPrices}
          onChange={updateQueryString}
        />
        <MultiSelectFilter
          title="Furnishing"
          paramKey="furnishing"
          options={FURNISHING_TYPES}
          selected={selectedFurnishing}
          onChange={updateQueryString}
        />

        {(totalFiltersApplied > 0 || querySearch !== "") && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-[#227CBD] hover:text-[#102A43] transition-colors ml-2"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
        {filteredData.length > 0 ? (
          filteredData.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            No properties found matching your criteria. Try clearing some
            filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-gray-500">
          Loading properties...
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
}
