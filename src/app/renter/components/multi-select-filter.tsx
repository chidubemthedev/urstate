import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterTrigger } from "./filter-trigger";

interface MultiSelectFilterProps {
  title: string;
  paramKey: string;
  options: string[];
  selected: string[];
  onChange: (key: string, val: string, checked: boolean) => void;
}

export function MultiSelectFilter({
  title,
  paramKey,
  options,
  selected,
  onChange,
}: MultiSelectFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <FilterTrigger title={title} count={selected.length} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 rounded-xl shadow-lg" align="start">
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {options.map((option) => (
            <div key={option} className="flex items-start space-x-3">
              <Checkbox
                id={`${paramKey}-${option}`}
                checked={selected.includes(option)}
                onCheckedChange={(checked) =>
                  onChange(paramKey, option, checked as boolean)
                }
                className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#34A853] data-[state=checked]:border-[#34A853]"
              />
              <label
                htmlFor={`${paramKey}-${option}`}
                className="text-sm font-medium leading-tight text-gray-700 cursor-pointer"
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
