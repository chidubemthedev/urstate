"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

import { MOCK_BROWSE_DATA } from "@/lib/mock-browse-data";
import { PropertyCard } from "../components/property-card";

// Reusable Filter Dropdown Component
function MultiSelectFilter({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (val: string, checked: boolean) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-gray-300 text-gray-700 rounded-lg"
        >
          {title} <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3 rounded-xl shadow-lg" align="start">
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <Checkbox
                id={`${title}-${option}`}
                checked={selected.includes(option)}
                onCheckedChange={(checked) =>
                  onChange(option, checked as boolean)
                }
                className="border-gray-300 data-[state=checked]:bg-[#34A853] data-[state=checked]:border-[#34A853]"
              />
              <label
                htmlFor={`${title}-${option}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function BrowsePage() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  // --- HANDLERS ---
  const toggleCategory = (val: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, val] : prev.filter((c) => c !== val),
    );
  };

  const togglePrice = (val: string, checked: boolean) => {
    setSelectedPrices((prev) =>
      checked ? [...prev, val] : prev.filter((p) => p !== val),
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setSearchQuery("");
  };

  // --- FILTERING LOGIC ---
  const filteredData = MOCK_BROWSE_DATA.filter((property) => {
    // 1. Search Query
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category Filter (If none selected, show all)
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(property.category);

    // 3. Price Filter (Mock logic evaluating the price ranges)
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

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-4xl font-extrabold text-[#102A43] tracking-tight">
        Find Apartment
      </h1>

      {/* --- SEARCH BAR --- */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Cabins, Beachfront House, Rooms"
          className="w-full pl-12 h-14 bg-gray-100/80 border-none rounded-xl text-base focus-visible:ring-1 focus-visible:ring-[#102A43]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* --- FILTER BAR --- */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" className="px-3 border-gray-300 rounded-lg">
          <SlidersHorizontal className="w-4 h-4" />
        </Button>

        <MultiSelectFilter
          title="Category"
          options={["Long term", "Shortlet", "BNB"]}
          selected={selectedCategories}
          onChange={toggleCategory}
        />

        {/* Keeping these as visual placeholders for now, they work the same way */}
        <Button
          variant="outline"
          className="gap-2 border-gray-300 text-gray-700 rounded-lg"
        >
          Property Type <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-gray-300 text-gray-700 rounded-lg"
        >
          Location <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>

        <MultiSelectFilter
          title="Price"
          options={["Under 500k", "500k - 2M", "2M - 4M", "4M+"]}
          selected={selectedPrices}
          onChange={togglePrice}
        />

        {/* Clear Filter Button */}
        {(selectedCategories.length > 0 ||
          selectedPrices.length > 0 ||
          searchQuery !== "") && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-[#227CBD] hover:text-[#102A43] transition-colors ml-2"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* --- GRID OF PROPERTIES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
        {filteredData.length > 0 ? (
          filteredData.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            No properties found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
