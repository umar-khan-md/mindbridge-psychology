"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Page-level entrance animation: fades in on mount.
 * Respects prefers-reduced-motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
