import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

export function CtaButton({ 
  href, 
  onClick, 
  type = "button", 
  children, 
  className, 
  fullWidth = false,
  size = "md"
}: CtaButtonProps) {
  const content = (
    <>
      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-xl scale-95 group-hover:scale-105 transition-transform duration-500" />
      <div className={cn(
        "relative bg-gradient-to-r from-[#00d2ff] via-[#3adaff] to-[#00d2ff] rounded-xl transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(0,210,255,0.6)] group-active:scale-[0.98] text-center",
        size === "sm" ? "px-4 py-2" : size === "lg" ? "px-10 py-6 md:py-8" : "px-6 py-4 md:py-6"
      )}>
        <span className={cn(
          "font-black text-black uppercase tracking-tight md:tracking-wider",
          size === "sm" ? "text-[10px]" : "text-xs md:text-lg"
        )}>
          {children}
        </span>
      </div>
    </>
  );

  const classes = cn(
    "inline-block group relative",
    fullWidth ? "w-full" : "",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
