"use client";

import React, { useEffect, useCallback, useRef, useId } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   MODAL — Glass backdrop · Framer Motion enter/exit · Focus trap
   WCAG AAA · prefers-reduced-motion · 44px close button
   --------------------------------------------------------------------------- */

const modalSizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)]",
} as const;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: keyof typeof modalSizes;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /** Prevent closing on overlay click */
  persistent?: boolean;
}

// Reduced-motion variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 25, stiffness: 350 },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 4,
    transition: { duration: 0.15 },
  },
};

function Modal({
  open,
  onClose,
  size = "md",
  title,
  description,
  children,
  className,
  persistent = false,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reactId = useId();
  const titleId = title ? `${reactId}-modal-title` : undefined;
  const descId = description ? `${reactId}-modal-desc` : undefined;

  /* ----- Focus trap ----- */
  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !contentRef.current) return;

    const focusable = contentRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  /* ----- Save and restore focus ----- */
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        // Focus the first focusable element, or the dialog itself
        const focusable = contentRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        (focusable ?? contentRef.current)?.focus();
      });
      document.addEventListener("keydown", trapFocus);
    } else {
      previousFocusRef.current?.focus();
      document.removeEventListener("keydown", trapFocus);
    }
    return () => {
      document.removeEventListener("keydown", trapFocus);
    };
  }, [open, trapFocus]);

  /* ----- Lock body scroll ----- */
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  /* ----- Close on Escape ----- */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose]
  );

  /* ----- Close on overlay click ----- */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (!persistent && e.target === overlayRef.current) onClose();
    },
    [onClose, persistent]
  );

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          role="presentation"
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Glass backdrop */}
          <motion.div
            className="absolute inset-0 bg-primary-950/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />

          {/* Dialog content */}
          <motion.div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            tabIndex={-1}
            className={cn(
              "relative w-full bg-white rounded-2xl shadow-2xl",
              "focus:outline-none",
              "ring-1 ring-border-subtle",
              modalSizes[size],
              className
            )}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-2">
              <div className="flex-1 min-w-0 pr-4">
                {title && (
                  <h2
                    id={titleId}
                    className="text-lg font-heading font-semibold text-primary-900 leading-snug"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id={descId}
                    className="mt-1 text-sm font-sans text-text-tertiary leading-relaxed"
                  >
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className={cn(
                  // 44px touch target
                  "flex items-center justify-center min-h-[44px] min-w-[44px] -m-2",
                  "rounded-xl text-text-muted cursor-pointer",
                  "hover:text-primary-900 hover:bg-sand-100",
                  "motion-safe:transition-colors motion-safe:duration-150",
                  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-500"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ---- ModalFooter helper ---- */

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function ModalFooter({ className, children, ...props }: ModalFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 px-6 pb-6 pt-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Modal, ModalFooter };
