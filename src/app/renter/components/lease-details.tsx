"use client";
import {
  House,
  ChevronRight,
  ArrowLeft,
  FileText,
  Building2,
} from "lucide-react";
import type { Lease } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeaseTimeline } from "@/app/renter/components/lease-timeline";
import { CautionFeeCard } from "@/app/renter/components/caution-fee-card";
import { ImageGallery } from "@/components/shared/image-gallery";
import Link from "next/link";

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
    <CardContent className="flex items-center justify-between p-5 h-16">
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
  const { property } = lease;

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8">
      <Button variant="ghost" asChild className="gap-2 text-gray-600 pl-0">
        <Link href="/renter/dashboard">
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery images={property.images} />

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
              className="w-full text-base font-semibold h-16 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
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
