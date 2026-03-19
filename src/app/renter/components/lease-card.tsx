"use client";

import Image from "next/image";
import { House, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Lease } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { useLeaseStore } from "@/store/useLeaseStore";
import Link from "next/link";

// ✅ MOVED OUTSIDE: Prevents re-render destruction
const DetailText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm text-gray-500">{children}</span>
);
const DotSeparator = () => <span className="text-gray-300 px-1.5">•</span>;

interface LeaseCardProps {
  lease: Lease;
}

export function LeaseCard({ lease }: LeaseCardProps) {
  const { property } = lease;
  const selectLease = useLeaseStore((state) => state.selectLease);

  return (
    <Card className="w-full max-w-[380px] rounded-[18px] shadow-sm border border-gray-100 overflow-hidden group">
      {/* ... (Keep the exact same JSX return from the previous LeaseCard) ... */}
      <CardContent className="p-0">
        <div className="relative w-full">
          <AspectRatio ratio={16 / 10}>
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 380px"
              priority={lease.id === "lease_1"}
            />
          </AspectRatio>
          {lease.verified && (
            <Badge className="absolute top-4 left-4 bg-white/90 text-[#34A853] flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Verified
            </Badge>
          )}
        </div>

        <div className="p-6 pt-5 space-y-4">
          <div className="flex items-center gap-2.5 text-[#34A853]">
            <House className="w-5 h-5" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Ongoing Lease
            </span>
          </div>

          <h3 className="text-2xl font-bold text-[#102A43]">{property.name}</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-[320px]">
            {property.address}
          </p>
          <p className="text-3xl font-extrabold text-[#102A43]">
            {lease.rentAmountFormatted}
          </p>

          <div className="flex items-center text-sm text-gray-500">
            <DetailText>{lease.duration}</DetailText>
            <DotSeparator />
            <DetailText>{lease.type}</DetailText>
            <DotSeparator />
            <DetailText>
              {lease.beds} bed/{lease.baths} bath
            </DetailText>
            <DotSeparator />
            <DetailText>
              {lease.furnished ? "Furnished" : "Unfurnished"}
            </DetailText>
          </div>

          <Button
            asChild // 👈 This tells shadcn to render the <Link> as a Button
            size="lg"
            className="w-full bg-[#102A43] text-white hover:bg-[#081B2E] rounded-[10px] h-14"
          >
            <Link href={`/renter/dashboard/${lease.id}`}>Manage</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
