"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * <img> for user-uploaded media from any host. If the file is missing or
 * the link is broken, it shows a neutral placeholder instead of a broken icon.
 */
export function SafeImage({
  src,
  alt,
  className,
  fallbackClassName,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <span
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className={cn("flex items-center justify-center bg-gray-200 text-admin-muted", className, fallbackClassName)}
      >
        <ImageOff className="size-5" aria-hidden />
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- uploads can come from any storage host
    <img src={src} alt={alt} onError={() => setFailedSrc(src)} className={className} />
  );
}
