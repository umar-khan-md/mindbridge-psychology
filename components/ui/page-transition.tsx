"use client";

import { type ReactNode, useEffect, useState } from "react";

/**
 * Page-level entrance animation: fades in on mount.
 * Uses plain CSS transition to avoid Framer Motion hydration issues.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay so the browser paints the initial frame first
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
