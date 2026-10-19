import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { BRAND } from "@/lib/brand";

type BrandMarkProps = {
  className?: string;
};

// Decorative mark used next to the Taskora wordmark. Keep geometry in sync
// with public/brand/taskora-mark.svg and src/app/icon.svg.
export function BrandMark({ className = "size-7" }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <rect width="32" height="32" rx="7" fill={BRAND.colors.mark} />
      <path
        d="M9.5 10.5h13M16 10.5v12"
        stroke={BRAND.colors.markForeground}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="23" cy="22.5" r="2.5" fill={BRAND.colors.accent} />
    </svg>
  );
}

type BrandLinkProps = {
  href: ComponentPropsWithoutRef<typeof Link>["href"];
  className?: string;
  markClassName?: string;
};

export function BrandLink({
  href,
  className = "flex w-fit items-center gap-2.5 rounded-md font-semibold text-ink",
  markClassName = "size-7",
}: BrandLinkProps) {
  return (
    <Link href={href} className={className}>
      <BrandMark className={markClassName} />
      {BRAND.name}
    </Link>
  );
}
