import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface FilterTriggerProps {
  title: string;
  count: number;
}

export function FilterTrigger({ title, count }: FilterTriggerProps) {
  return (
    <Button
      variant="outline"
      className={`gap-2 rounded-lg transition-colors ${
        count > 0
          ? "border-[#227CBD] text-[#227CBD] bg-[#227CBD]/5"
          : "border-gray-300 text-gray-700"
      }`}
    >
      {title}
      {count > 0 && (
        <span className="flex items-center justify-center w-5 h-5 ml-1 text-xs text-white bg-[#227CBD] rounded-full">
          {count}
        </span>
      )}
      <ChevronDown
        className={`w-4 h-4 ${count > 0 ? "text-[#227CBD]" : "text-gray-500"}`}
      />
    </Button>
  );
}
