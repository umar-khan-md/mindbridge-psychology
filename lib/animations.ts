import type { Variants, Transition } from "framer-motion";

/* ==========================================================================
   SHARED FRAMER MOTION ANIMATION VARIANTS
   MindBridge Psychology - Premium healthcare animations
   ========================================================================== */

// ---------------------------------------------------------------------------
// Transitions
// ---------------------------------------------------------------------------

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const gentleTransition: Transition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1],
};

// ---------------------------------------------------------------------------
// Fade variants
// ---------------------------------------------------------------------------

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Slide variants
// ---------------------------------------------------------------------------

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Scale variants
// ---------------------------------------------------------------------------

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Stagger container + item
// ---------------------------------------------------------------------------

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Mobile navigation variants
// ---------------------------------------------------------------------------

export const mobileMenuOverlay: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const mobileMenuPanel: Variants = {
  closed: {
    x: "100%",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  open: {
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export const mobileNavItem: Variants = {
  closed: { opacity: 0, x: 30 },
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export const mobileNavStagger: Variants = {
  closed: {},
  open: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

// ---------------------------------------------------------------------------
// FAB / Floating element
// ---------------------------------------------------------------------------

export const fabVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// ---------------------------------------------------------------------------
// Mega menu / dropdown
// ---------------------------------------------------------------------------

export const dropdownVariants: Variants = {
  closed: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Page transition
// ---------------------------------------------------------------------------

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};
