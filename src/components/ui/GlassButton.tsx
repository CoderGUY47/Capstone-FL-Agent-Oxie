"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function GlassButton({
  variant = "secondary",
  size = "md",
  href,
  children,
  icon,
  className,
  ...props
}: GlassButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-3 rounded-full backdrop-blur-2xl font-semibold transition-all duration-300 select-none cursor-pointer outline-none border-none text-white shadow-xl hover:scale-[1.03] active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-indigo-600/50 hover:bg-indigo-500/80 border border-white/30 text-white font-extrabold shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_36px_rgba(99,102,241,0.4)]",
    secondary:
      "bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.3)]",
    ghost:
      "bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 hover:text-white backdrop-blur-xl",
    outline:
      "bg-transparent hover:bg-white/10 border border-white/25 text-white backdrop-blur-md",
  };

  const sizeStyles = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-xs sm:text-sm",
    lg: "px-9 py-4 text-sm sm:text-base font-extrabold",
  };

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(combinedClasses, "no-underline")}>
        <span>{children}</span>
        {icon && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <span>{children}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
