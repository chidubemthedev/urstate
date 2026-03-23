import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { FilterTrigger } from "./filter-trigger";
import { LOCATIONS } from "@/lib/mock-browse-data";

interface LocationFilterProps {
  selected: string[];
  onChange: (key: string, val: string, checked: boolean) => void;
}

export function LocationFilter({ selected, onChange }: LocationFilterProps) {
  const [localSearch, setLocalSearch] = useState("");
  const filteredLocs = LOCATIONS.filter((l) =>
    l.toLowerCase().includes(localSearch.toLowerCase()),
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <FilterTrigger title="Location" count={selected.length} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 p-0 rounded-xl shadow-lg overflow-hidden"
        align="start"
      >
        <div className="p-2 border-b">
          <div className="relative">
            <Input
              placeholder="Search location..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="h-9 pr-8 text-sm border-gray-200 focus-visible:ring-[#227CBD]"
            />
            {localSearch && (
              <X
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => setLocalSearch("")}
              />
            )}
          </div>
        </div>
        <div className="p-3 space-y-3 max-h-[250px] overflow-y-auto">
          {filteredLocs.length > 0 ? (
            filteredLocs.map((option) => (
              <div key={option} className="flex items-start space-x-3">
                <Checkbox
                  id={`location-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={(checked) =>
                    onChange("location", option, checked as boolean)
                  }
                  className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#34A853] data-[state=checked]:border-[#34A853]"
                />
                <label
                  htmlFor={`location-${option}`}
                  className="text-sm font-medium leading-tight text-gray-700 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 text-center py-4">
              No locations found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
