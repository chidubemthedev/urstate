import { cn } from "@/lib/utils";
import { avatarColour, initials } from "@/lib/admin/format";

const sizes = {
  xs: "size-6 text-[10px]",
  sm: "size-7 text-[11px]",
  md: "size-9 text-[13px]",
  lg: "size-12 text-base",
  xl: "size-[72px] text-2xl",
};

/** Profile photo when there is one, otherwise coloured initials. */
export function Avatar({
  name,
  seed,
  image,
  size = "md",
  className,
}: {
  name: string;
  seed: string;
  image?: string | null;
  size?: keyof typeof sizes;
  className?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- user images come from any host
      <img src={image} alt="" className={cn("shrink-0 rounded-full object-cover", sizes[size], className)} />
    );
  }
  return (
    <span
      aria-hidden
      style={{ background: avatarColour(seed) }}
      className={cn("flex shrink-0 items-center justify-center rounded-full font-bold text-white", sizes[size], className)}
    >
      {initials(name)}
    </span>
  );
}
