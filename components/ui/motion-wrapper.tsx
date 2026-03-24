"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

/* ==========================================================================
   Shared spring config for natural movement
   ========================================================================== */

const naturalSpring = { type: "spring" as const, stiffness: 300, damping: 25 };

/* ==========================================================================
   ScrollReveal — fade-in-up when scrolled into view
   ========================================================================== */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={revealVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.45,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   StaggerReveal — orchestrated stagger children entrance
   ========================================================================== */

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      custom={prefersReducedMotion ? 0 : stagger}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/** Export child variants so consumers can apply them to each child */
export { staggerChildVariants };

/* ==========================================================================
   Parallax — element moves slower than scroll
   ========================================================================== */

export function Parallax({
  children,
  offset = 30,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [offset, -offset]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   HoverScale — scale on hover with spring physics
   ========================================================================== */

export function HoverScale({
  children,
  scale = 1.03,
  className,
}: {
  children: ReactNode;
  scale?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={prefersReducedMotion ? {} : { scale }}
      whileTap={prefersReducedMotion ? {} : { scale: scale * 0.97 }}
      transition={naturalSpring}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   Re-export spring config for external use
   ========================================================================== */

export { naturalSpring };
