"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   CARD — 21st.dev premium patterns · gradient border hover · glass variant
   Shadow hierarchy: sm -> md -> lg on hover
   --------------------------------------------------------------------------- */

const cardVariants = {
  default: [
    "bg-white border border-border-subtle",
    "shadow-sm",
  ].join(" "),
  elevated: [
    "bg-white border border-border-subtle",
    "shadow-md",
  ].join(" "),
  glass: [
    "bg-white/70 backdrop-blur-xl border border-white/40",
    "shadow-lg shadow-primary-500/5",
  ].join(" "),
  outline: [
    "bg-transparent border-2 border-border-default",
  ].join(" "),
} as const;

const cardPadding = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariants;
  padding?: keyof typeof cardPadding;
  hoverable?: boolean;
  /** Interactive card — adds cursor-pointer and a11y attributes */
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "none",
      hoverable = true,
      interactive = false,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
        cardVariants[variant],
        cardPadding[padding],
        // Hoverable gradient border effect (21st.dev style)
        hoverable && [
          "hover:shadow-lg hover:shadow-primary-500/[0.08]",
          "motion-safe:hover:-translate-y-0.5",
          // Gradient border glow on hover
          "before:absolute before:inset-0 before:rounded-2xl before:p-px",
          "before:bg-gradient-to-br before:from-primary-400/0 before:via-accent-400/0 before:to-primary-400/0",
          "motion-safe:before:transition-all motion-safe:before:duration-300",
          "hover:before:from-primary-400/20 hover:before:via-accent-400/15 hover:before:to-primary-400/20",
          "before:pointer-events-none before:z-0",
        ],
        interactive && "cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        className
      )}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
);
Card.displayName = "Card";

/* ---- Sub-components ---- */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pt-6 pb-2", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pb-6 pt-2 flex items-center", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
