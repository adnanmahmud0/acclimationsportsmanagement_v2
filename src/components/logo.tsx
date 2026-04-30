import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "vertical";
  width?: number;
  height?: number;
  showLink?: boolean;
}

export function Logo({
  className,
  variant = "horizontal",
  width,
  height,
  showLink = true,
}: LogoProps) {
  const src =
    variant === "horizontal"
      ? "/logo/AcclimationLogo-Horizontal.png"
      : "/logo/AcclimationLogo-Vartical.png";

  // Default sizes based on variant if not provided
  const defaultWidth = variant === "horizontal" ? 180 : 120;
  const defaultHeight = variant === "horizontal" ? 40 : 120;

  const content = (
    <Image
      src={src}
      alt="Acclimation Sports Management"
      width={width || defaultWidth}
      height={height || defaultHeight}
      className="object-contain"
      priority
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
