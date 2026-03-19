"use client";

import Image from "next/image";
import {
  House,
  ChevronRight,
  MessageSquareText,
  ArrowLeft,
  FileText,
  Building2,
} from "lucide-react";
import type { Lease } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLeaseStore } from "@/store/useLeaseStore";
import { LeaseTimeline } from "@/app/renter/components/lease-timeline";
import { CautionFeeCard } from "@/app/renter/components/caution-fee-card";

const InfoText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm text-gray-500">{children}</span>
);

const Dot = () => <span className="text-gray-300 px-1.5">•</span>;

const ActionButton = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <Card className="bg-[#F6FBD6] border border-[#E9F4A8] rounded-xl hover:bg-[#EFF7B8] transition-colors cursor-pointer">
    <CardContent className="flex items-center justify-between p-5 h-[64px]">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#8CB13B]" />
        <span className="text-base font-medium text-gray-800">{title}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </CardContent>
  </Card>
);

interface LeaseDetailsProps {
  lease: Lease;
}

export function LeaseDetails({ lease }: LeaseDetailsProps) {
  const clearSelection = useLeaseStore((state) => state.clearSelection);
  const { property } = lease;

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8">
      <Button
        variant="ghost"
        onClick={clearSelection}
        className="gap-2 text-gray-600 pl-0"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery (Recreating the grid exactly) */}
          <div className="grid grid-cols-3 gap-4 h-[400px]">
            <div className="col-span-2 relative h-full">
              <Image
                src={property.images[0]}
                alt="Property"
                fill
                className="object-cover rounded-xl"
                sizes="(max-w-1024px) 100vw, 600px"
                priority
              />
            </div>
            <div className="grid grid-rows-2 gap-4 h-full">
              {[property.images[1], property.images[2]].map((img, i) => (
                <div key={i} className="relative h-full">
                  <Image
                    src={img || property.images[0]}
                    alt="Property detail"
                    fill
                    className="object-cover rounded-xl"
                    sizes="200px"
                  />
                  {i === 1 && (
                    <Button
                      variant="secondary"
                      className="absolute bottom-4 right-4 gap-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg shadow-sm"
                    >
                      <MessageSquareText className="w-4 h-4" />
                      View all photos
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-[#34A853]">
              <House className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Ongoing Lease
              </span>
            </div>
            <h1 className="text-5xl font-extrabold text-[#102A43] tracking-tighter">
              {property.name}
            </h1>
            <p className="text-base text-gray-600 leading-relaxed max-w-xl">
              {property.address}
            </p>
            <div className="flex items-center gap-1.5 text-base text-gray-600">
              <InfoText>{lease.duration}</InfoText>
              <Dot />
              <InfoText>{lease.type}</InfoText>
              <Dot />
              <InfoText>
                {lease.beds} bed/{lease.baths} bath
              </InfoText>
              <Dot />
              <InfoText>
                {lease.furnished ? "Furnished" : "Unfurnished"}
              </InfoText>
            </div>
          </div>

          <div className="space-y-4 max-w-xl">
            <ActionButton icon={FileText} title="Lease agreement" />
            <ActionButton icon={Building2} title="Property details" />
            <Button
              variant="outline"
              size="lg"
              className="w-full text-base font-semibold h-[64px] border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
            >
              Message Support
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 sticky top-20">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">Rent Price</p>
              <p className="text-5xl font-extrabold text-[#102A43] tracking-tight">
                {lease.rentAmountFormatted}
              </p>
            </div>

            {/* 🆕 Using the extracted components */}
            <LeaseTimeline lease={lease} />
            <CautionFeeCard amount={lease.cautionFee} />

            <Button
              size="lg"
              className="w-full bg-[#102A43] text-white hover:bg-[#081B2E] rounded-[10px] text-base font-semibold h-14"
            >
              Renew payment
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
