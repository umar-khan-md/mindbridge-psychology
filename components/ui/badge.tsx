import React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   BADGE — Pill shape · Better color variants · Optional dot indicator
   --------------------------------------------------------------------------- */

const badgeVariants = {
  default: "bg-primary-100 text-primary-700 ring-primary-500/20",
  accent: "bg-accent-100 text-accent-700 ring-accent-500/20",
  outline: "bg-transparent text-primary-700 ring-1 ring-inset ring-primary-300",
  success: "bg-success-light text-success-dark ring-success/20",
  warning: "bg-warning-light text-warning-dark ring-warning/20",
  error: "bg-error-light text-error-dark ring-error/20",
  info: "bg-info-light text-info-dark ring-info/20",
  neutral: "bg-sand-100 text-sand-700 ring-sand-300/30",
} as const;

const badgeSizes = {
  sm: "text-xs px-2.5 py-0.5 gap-1",
  md: "text-sm px-3 py-1 gap-1.5",
  lg: "text-sm px-3.5 py-1.5 gap-1.5",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof badgeSizes;
  /** Show a colored dot indicator */
  dot?: boolean;
  /** Icon on the left side */
  icon?: React.ReactNode;
  /** Removable badge — shows close button */
  onRemove?: () => void;
}

function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  icon,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Pill shape
        "inline-flex items-center font-sans font-medium rounded-full whitespace-nowrap",
        "ring-1 ring-inset",
        "motion-safe:transition-colors motion-safe:duration-150",
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "shrink-0 rounded-full",
            size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
            variant === "success" && "bg-success",
            variant === "error" && "bg-error",
            variant === "warning" && "bg-warning",
            variant === "info" && "bg-info",
            variant === "default" && "bg-primary-500",
            variant === "accent" && "bg-accent-500",
            variant === "neutral" && "bg-sand-500",
            variant === "outline" && "bg-primary-500"
          )}
          aria-hidden="true"
        />
      )}
      {icon && (
        <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "shrink-0 -mr-0.5 rounded-full p-0.5 cursor-pointer",
            "hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            "motion-safe:transition-colors motion-safe:duration-150"
          )}
          aria-label="Remove"
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

export { Badge, badgeVariants, badgeSizes };
