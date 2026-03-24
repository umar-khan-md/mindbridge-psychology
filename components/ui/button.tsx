"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   BUTTON — WCAG AAA · 44px min touch target · Lucide icons only
   Rich Teal primary, Amber Gold accent, motion-safe transitions
   --------------------------------------------------------------------------- */

const buttonVariants = {
  primary: [
    "bg-primary-500 text-white",
    "hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25",
    "active:bg-primary-700 active:shadow-none",
    "focus-visible:ring-primary-500",
  ].join(" "),
  secondary: [
    "bg-accent-400 text-white",
    "hover:bg-accent-500 hover:shadow-lg hover:shadow-accent-400/25",
    "active:bg-accent-600 active:shadow-none",
    "focus-visible:ring-accent-400",
  ].join(" "),
  outline: [
    "border-2 border-primary-500 text-primary-700 bg-transparent",
    "hover:bg-primary-50 hover:shadow-md hover:shadow-primary-500/10",
    "active:bg-primary-100 active:shadow-none",
    "focus-visible:ring-primary-500",
  ].join(" "),
  ghost: [
    "text-primary-700 bg-transparent",
    "hover:bg-primary-50",
    "active:bg-primary-100",
    "focus-visible:ring-primary-500",
  ].join(" "),
  danger: [
    "bg-error text-white",
    "hover:bg-error-dark hover:shadow-lg hover:shadow-error/25",
    "active:shadow-none",
    "focus-visible:ring-error",
  ].join(" "),
  white: [
    "bg-white text-primary-900 shadow-sm border border-border-default",
    "hover:bg-sand-50 hover:shadow-md",
    "active:bg-sand-100 active:shadow-none",
    "focus-visible:ring-primary-500",
  ].join(" "),
} as const;

const buttonSizes = {
  sm: "min-h-[44px] px-4 text-sm gap-2",
  md: "min-h-[44px] px-5 text-sm gap-2",
  lg: "min-h-[52px] px-7 text-base gap-2.5",
  icon: "min-h-[44px] min-w-[44px] p-2.5",
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      iconLeft,
      iconRight,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-sans font-semibold rounded-xl cursor-pointer select-none",
          // Transitions — respect reduced motion
          "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
          // Hover lift
          "motion-safe:hover:-translate-y-px",
          // Focus ring — WCAG AAA: 3px outline with offset
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2",
          // Disabled
          "disabled:opacity-[0.4] disabled:pointer-events-none disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0",
          // Variant + size
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {loading ? (
          <Loader2
            className={cn(
              "animate-spin shrink-0",
              size === "lg" ? "h-5 w-5" : "h-4 w-4"
            )}
            aria-hidden="true"
          />
        ) : (
          iconLeft && (
            <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4" aria-hidden="true">
              {iconLeft}
            </span>
          )
        )}
        {children && <span>{children}</span>}
        {!loading && iconRight && (
          <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, buttonSizes };
