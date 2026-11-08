"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Panel } from "../ui/panel";
import { SafeImage } from "../ui/safe-image";

/** Main photo with a thumbnail strip, from the property detail design. */
export function PropertyGallery({ photos, name }: { photos: string[]; name: string }) {
  const [active, setActive] = useState(0);

  if (!photos.length) {
    return (
      <Panel className="mb-5 flex h-48 items-center justify-center gap-2 text-sm text-admin-muted">
        <ImageOff className="size-5" aria-hidden /> No photos uploaded
      </Panel>
    );
  }

  return (
    <Panel className="mb-5 overflow-hidden">
      <div className="relative h-[240px] bg-admin-ink sm:h-[340px]">
        <SafeImage src={photos[active]} alt={`${name}, photo ${active + 1} of ${photos.length}`} className="size-full object-cover" fallbackClassName="bg-admin-ink/90" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-55% to-black/45" />
        <span className="absolute bottom-4 right-4 rounded-lg bg-admin-ink/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {active + 1} / {photos.length}
        </span>
      </div>
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-admin-line bg-gray-50 px-4 py-3">
          {photos.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={active === i}
              className={cn(
                "h-[60px] w-[90px] shrink-0 overflow-hidden rounded-lg border-[2.5px] transition focus-visible:outline-2 focus-visible:outline-admin-accent",
                active === i ? "border-admin-accent opacity-100" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <SafeImage src={src} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </Panel>
  );
}
