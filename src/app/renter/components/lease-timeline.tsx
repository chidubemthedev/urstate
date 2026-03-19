import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Lease } from "@/types/property";
import { format } from "date-fns";

export function LeaseTimeline({ lease }: { lease: Lease }) {
  const start = new Date(lease.startDate);
  const end = new Date(lease.endDate);
  const progress = 100 - (lease.monthsBeforeExpire / 12) * 100;

  return (
    <Card className="border border-gray-100 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-gray-500">Start Date</p>
          <p className="font-semibold text-gray-900">
            {format(start, "dd MMM, yyyy")}
          </p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-gray-500">End Date</p>
          <p className="font-semibold text-gray-900">
            {format(end, "dd MMM, yyyy")}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <Progress value={progress} className="h-2 bg-gray-100" />
        <p className="text-center text-sm font-medium text-[#102A43]">
          {lease.monthsBeforeExpire} months before expire
        </p>
      </div>
    </Card>
  );
}
