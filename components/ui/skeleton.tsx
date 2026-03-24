import React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   SKELETON — Warm-toned shimmer · Better animation · prefers-reduced-motion
   Uses sand palette for warmth instead of cold neutral grays
   --------------------------------------------------------------------------- */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "heading" | "avatar" | "card" | "image" | "button";
  width?: string;
}

function Skeleton({
  variant = "text",
  width,
  className,
  style,
  ...props
}: SkeletonProps) {
  const variantClasses: Record<string, string> = {
    text: "h-4 rounded-lg w-full",
    heading: "h-8 rounded-lg w-3/4",
    avatar: "h-12 w-12 rounded-full",
    card: "h-48 w-full rounded-2xl",
    image: "aspect-video w-full rounded-2xl",
    button: "h-11 w-28 rounded-xl",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-sand-200/60",
        // Warm shimmer animation — respect reduced motion
        "motion-safe:after:absolute motion-safe:after:inset-0",
        "motion-safe:after:bg-gradient-to-r motion-safe:after:from-transparent motion-safe:after:via-sand-100/80 motion-safe:after:to-transparent",
        "motion-safe:after:animate-[shimmer_2s_ease-in-out_infinite]",
        "motion-safe:after:-translate-x-full",
        // Reduced motion — simple pulse
        "motion-reduce:animate-pulse",
        variantClasses[variant],
        className
      )}
      style={{ width, ...style }}
      role="status"
      aria-label="Loading"
      aria-hidden="true"
      {...props}
    />
  );
}

/* ---- Convenience compound skeletons ---- */

function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-border-subtle p-6 space-y-4",
        className
      )}
      role="status"
      aria-label="Loading card"
      aria-hidden="true"
      {...props}
    >
      <Skeleton variant="image" />
      <Skeleton variant="heading" width="60%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
    </div>
  );
}

function SkeletonAvatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      role="status"
      aria-label="Loading profile"
      aria-hidden="true"
      {...props}
    >
      <Skeleton variant="avatar" />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  );
}

function SkeletonTable({
  rows = 3,
  columns = 4,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { rows?: number; columns?: number }) {
  return (
    <div
      className={cn("space-y-3", className)}
      role="status"
      aria-label="Loading table"
      aria-hidden="true"
      {...props}
    >
      {/* Header row */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`h-${i}`} variant="text" className="h-5" width={`${20 + Math.random() * 15}%`} />
        ))}
      </div>
      <div className="h-px bg-sand-200" />
      {/* Data rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={`r-${r}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={`${r}-${c}`} variant="text" width={`${15 + Math.random() * 20}%`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonTable };
