"use client";

import Image from "next/image";
import { ShieldCheck, Home, DotIcon, Share, Heart, Map } from "lucide-react";
import type { BrowseProperty } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

const DetailText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm text-gray-500">{children}</span>
);
const DotSeparator = () => <DotIcon className="w-4 h-4 text-gray-300" />;

interface PropertyCardProps {
  property: BrowseProperty;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(property.isWishlisted);
  const isAvailable = property.status === "Available";

  return (
    <Card className="w-full max-w-[380px] rounded-2xl bg-white border border-[#D2D2D2] overflow-hidden group py-0">
      <CardContent className="p-[11px]">
        {/* IMAGE SECTION */}
        <div className="relative w-full">
          <AspectRatio ratio={16 / 10}>
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover rounded-[8px]"
              sizes="(max-w-768px) 100vw, 380px"
            />
          </AspectRatio>
          {property.verified && (
            <Badge className="absolute top-4 left-4 bg-white/90 text-[#34A853] flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Verified
            </Badge>
          )}
          {/* Mock Carousel Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* STATUS BAR (Listed Time & Availability) */}
        <div className="flex justify-between items-center text-[11px] text-gray-500 mt-3 px-1">
          <span>Listed {property.listedAt}</span>
          <div
            className={`flex items-center gap-1 font-semibold ${isAvailable ? "text-[#34A853]" : "text-[#D92D20]"}`}
          >
            <Home className="w-3 h-3" />
            <span>{isAvailable ? "Available" : "Not Available/Occupied"}</span>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-1 pt-3 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-[18px] leading-6 font-bold text-[#102A43]">
              {property.name}
            </h3>
            <div className="flex gap-3 text-gray-600">
              <button className="hover:text-gray-900 transition-colors">
                <Share className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`transition-colors ${isWishlisted ? "text-red-500" : "hover:text-red-500"}`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>

          <p className="text-sm text-[#606060] leading-5 line-clamp-2">
            {property.address}
          </p>

          <p className="text-[18px] leading-6 font-bold text-[#102A43]">
            {property.priceFormatted}
          </p>

          <div className="flex flex-wrap items-center text-sm text-gray-500">
            <DetailText>{property.category}</DetailText>
            <DotSeparator />
            <DetailText>{property.type}</DetailText>
            <DotSeparator />
            <DetailText>
              {property.beds} bed/{property.baths} bath
            </DetailText>
            <DotSeparator />
            <DetailText>
              {property.furnished ? "Furnished" : "Unfurnished"}
            </DetailText>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              disabled={!isAvailable}
              className="flex-1 max-w-[100px] border-gray-300 rounded-[10px] h-12 text-gray-700 font-semibold gap-2"
            >
              <Map className="w-4 h-4" /> Tour
            </Button>

            <Button
              asChild={isAvailable}
              className="flex-1 bg-[#102A43] text-white hover:bg-[#081B2E] rounded-[10px] h-12 font-semibold"
            >
              {isAvailable ? (
                <Link href={`/renter/browse/${property.id}`}>Apply</Link>
              ) : (
                <span className="cursor-not-allowed opacity-90">View</span>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
