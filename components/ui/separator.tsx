import React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   SEPARATOR — Gradient fade edges · Warm sand tones · Label variant
   --------------------------------------------------------------------------- */

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  orientation?: "horizontal" | "vertical";
  /** Decorative gradient variant */
  gradient?: boolean;
}

function Separator({
  label,
  orientation = "horizontal",
  gradient = true,
  className,
  ...props
}: SeparatorProps) {
  /* ---- Vertical ---- */
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "inline-block w-px self-stretch",
          gradient
            ? "bg-gradient-to-b from-transparent via-border-default to-transparent"
            : "bg-border-default",
          className
        )}
        {...props}
      />
    );
  }

  /* ---- Horizontal with label ---- */
  if (label) {
    return (
      <div
        role="separator"
        className={cn("flex items-center gap-4 my-6", className)}
        {...props}
      >
        <div
          className={cn(
            "flex-1 h-px",
            gradient
              ? "bg-gradient-to-r from-transparent via-border-default to-border-default"
              : "bg-border-default"
          )}
        />
        <span className="text-sm font-sans text-text-muted font-medium whitespace-nowrap px-1">
          {label}
        </span>
        <div
          className={cn(
            "flex-1 h-px",
            gradient
              ? "bg-gradient-to-l from-transparent via-border-default to-border-default"
              : "bg-border-default"
          )}
        />
      </div>
    );
  }

  /* ---- Horizontal plain ---- */
  return (
    <hr
      role="separator"
      className={cn(
        "border-0 h-px my-6",
        gradient
          ? "bg-gradient-to-r from-transparent via-border-default to-transparent"
          : "bg-border-default",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
