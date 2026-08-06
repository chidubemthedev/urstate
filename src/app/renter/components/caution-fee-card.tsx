import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CautionFeeCard({ amount }: { amount: number }) {
  const formattedAmount = `N${amount.toLocaleString()}`;
  return (
    <Card className="bg-[#F6FBD6] border border-[#E9F4A8] rounded-xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-base font-semibold text-gray-800">Caution Fee</p>
          <p className="text-sm text-gray-600">
            Amount paid: {formattedAmount}
          </p>
        </div>
        <Badge className="bg-[#8CB13B] text-white rounded-full px-4 py-1.5 text-xs font-semibold hover:bg-[#789932]">
          {formattedAmount}
        </Badge>
      </div>
    </Card>
  );
}
