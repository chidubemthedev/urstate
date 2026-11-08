import { FileText } from "lucide-react";
import { SafeImage } from "./safe-image";

const isImage = (url: string, mimeType?: string | null) =>
  mimeType ? mimeType.startsWith("image/") : /\.(png|jpe?g|webp|gif)(\?|$)/i.test(url) || url.includes("images.unsplash.com");

/** Thumbnail tile for an uploaded document. Opens the original in a new tab. */
export function DocumentTile({ label, url, mimeType }: { label: string; url: string; mimeType?: string | null }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-[140px] flex-1 flex-col items-center gap-2 rounded-xl border-[1.5px] border-dashed border-admin-border bg-gray-50 px-4 py-5 text-center hover:border-admin-accent focus-visible:outline-2 focus-visible:outline-admin-accent"
    >
      {isImage(url, mimeType) ? (
        <SafeImage src={url} alt="" className="h-16 w-24 rounded-md object-cover" />
      ) : (
        <FileText className="size-7 text-admin-muted" strokeWidth={1.6} aria-hidden />
      )}
      <span className="text-xs leading-snug text-admin-muted">{label}</span>
      <span className="text-[11px] font-semibold text-admin-accent">
        View<span className="sr-only"> {label} (opens in a new tab)</span>
      </span>
    </a>
  );
}
