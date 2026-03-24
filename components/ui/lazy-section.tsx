"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   LazySection — IntersectionObserver-based viewport loader
   --------------------------------------------------------------------------
   Renders a lightweight skeleton placeholder until the section scrolls within
   `rootMargin` of the viewport, then fades in the real content.

   Usage:
     <LazySection
       minHeight="400px"
       skeleton={<MySkeleton />}        // optional custom skeleton
     >
       <HeavyComponent />
     </LazySection>
   -------------------------------------------------------------------------- */

interface LazySectionProps {
  children: ReactNode;
  /** Custom skeleton shown before the section enters the viewport */
  skeleton?: ReactNode;
  /** CSS min-height to reserve layout space and prevent CLS (default: "200px") */
  minHeight?: string;
  /** IntersectionObserver rootMargin — how early to trigger (default: "200px") */
  rootMargin?: string;
  /** Additional className on the wrapper */
  className?: string;
  /** If true, skip lazy loading and render children immediately */
  eager?: boolean;
}

export function LazySection({
  children,
  skeleton,
  minHeight = "200px",
  rootMargin = "200px",
  className,
  eager = false,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(eager);

  useEffect(() => {
    if (eager || isVisible) return;

    const element = ref.current;
    if (!element) return;

    // Fallback: if IntersectionObserver is unavailable, render immediately
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [eager, isVisible, rootMargin]);

  // Eager mode — no wrapper overhead
  if (eager) {
    return <>{children}</>;
  }

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{ minHeight: isVisible ? undefined : minHeight }}
    >
      {isVisible ? (
        <div
          className="animate-in fade-in duration-500"
          style={{
            animation: "lazySectionFadeIn 0.5s ease-out forwards",
          }}
        >
          {children}
        </div>
      ) : (
        skeleton ?? <DefaultSkeleton minHeight={minHeight} />
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Default Skeleton — shows a generic pulsing placeholder
   -------------------------------------------------------------------------- */

function DefaultSkeleton({ minHeight }: { minHeight: string }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-4 px-8 py-12"
      style={{ minHeight }}
      aria-hidden="true"
    >
      <div className="w-full max-w-2xl space-y-4">
        <div className="h-6 w-2/5 mx-auto rounded bg-neutral-200 animate-pulse" />
        <div className="h-4 w-3/5 mx-auto rounded bg-neutral-200 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-neutral-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
