"use client";

import Image from "next/image";
import { House, CheckCircle2, Shield, ShieldCheck, Home } from "lucide-react";
import type { Lease } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const DetailText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm text-gray-500">{children}</span>
);
const DotSeparator = () => <span className="text-gray-300 px-1.5">•</span>;

interface LeaseCardProps {
  lease: Lease;
}

export function LeaseCard({ lease }: LeaseCardProps) {
  const { property } = lease;

  return (
    <Card className="w-full max-w-[380px] rounded-2xl bg-white border border-[#D2D2D2] overflow-hidden group py-0">
      <CardContent className="p-[11px]">
        <div className="relative w-full">
          <AspectRatio ratio={16 / 10}>
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover rounded-[8px]"
              sizes="(max-w-768px) 100vw, 380px"
              priority={lease.id === "lease_1"}
            />
          </AspectRatio>
          {lease.verified && (
            <Badge className="absolute top-4 left-4 bg-white/90 text-[#34A853] flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Verified
            </Badge>
          )}
        </div>

        <div className="p-1 pt-2 space-y-4">
          <div className="flex items-center gap-1 text-[#34A853]">
            <Home className="w-3 h-3" />
            <span className="text-[10px] uppercase leading-[18px] tracking-wide mt-0.5">
              Ongoing Lease
            </span>
          </div>

          <h3 className="text-[18px] leading-6 font-bold text-primary/500">
            {property.name}
          </h3>
          <p className="text-sm text-[#606060] leading-5 line-clamp-1">
            {property.address}
          </p>
          <p className="text-[18px] leading-6 font-bold text-primary/500">
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
