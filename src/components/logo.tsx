"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useBranding } from "@/providers/branding-provider";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "vertical";
  width?: number;
  height?: number;
  showLink?: boolean;
  type?: "navbar" | "footer" | "sidebar" | "default";
}

export function Logo({
  className,
  variant = "horizontal",
  width,
  height,
  showLink = true,
  type = "default",
}: LogoProps) {
  const { branding } = useBranding();

  // Determine source based on type
  let src = "";
  const finalWidth = width || (type === "navbar" ? branding.navbarLogoSize : type === "footer" ? branding.footerLogoSize : type === "sidebar" ? branding.adminSidebarLogoSize : undefined);
  const finalHeight = height;

  if (type === "navbar") {
    src = branding.navbarLogo || "/logo/AcclimationLogo-Horizontal.png";
  } else if (type === "footer") {
    src = branding.footerLogo || "/logo/AcclimationLogo-Horizontal.png";
  } else if (type === "sidebar") {
    src = branding.adminSidebarLogo || "/logo/AcclimationLogo-Horizontal.png";
  } else {
    src = variant === "horizontal"
      ? "/logo/AcclimationLogo-Horizontal.png"
      : "/logo/AcclimationLogo-Vartical.png";
  }

  // Default sizes based on variant if not provided and not a specific type
  const defaultWidth = variant === "horizontal" ? 180 : 120;
  const defaultHeight = variant === "horizontal" ? 40 : 120;

  const content = (
    <Image
      src={src}
      alt="Acclimation Sports Management"
      width={finalWidth || defaultWidth}
      height={finalHeight || defaultHeight}
      className="object-contain"
      priority
      unoptimized // Add unoptimized to handle external/dynamic URLs better
    />
  );

  if (!showLink) {
    return <div className={cn("block", className)}>{content}</div>;
  }

  return (
    <Link href="/" className={cn("block", className)}>
      {content}
    </Link>
  );
}
