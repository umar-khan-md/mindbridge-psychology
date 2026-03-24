"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fabVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function BookingFab() {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const footerObserver = useRef<IntersectionObserver | null>(null);

  /* ---- Show after scroll threshold ---- */
  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---- Hide when footer is visible (IntersectionObserver) ---- */
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    footerObserver.current = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    footerObserver.current.observe(footer);

    return () => {
      footerObserver.current?.disconnect();
    };
  }, []);

  const shouldShow = visible && !footerVisible;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          variants={fabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-6 right-6 z-40"
        >
          {/* Tooltip on hover */}
          <div className="relative group">
            {/* Tooltip */}
            <span
              className={cn(
                "absolute bottom-full right-0 mb-3 px-3 py-1.5",
                "rounded-lg bg-primary-900 text-white text-xs font-medium",
                "whitespace-nowrap shadow-lg",
                "opacity-0 translate-y-1 pointer-events-none",
                "group-hover:opacity-100 group-hover:translate-y-0",
                "transition-all duration-200"
              )}
              role="tooltip"
              aria-hidden="true"
            >
              Book your session
              {/* Tooltip arrow */}
              <span
                className="absolute top-full right-6 -mt-px border-4 border-transparent border-t-primary-900"
                aria-hidden="true"
              />
            </span>

            {/* FAB button */}
            <Link
              href="/book"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={cn(
                "inline-flex items-center gap-2",
                "rounded-full px-6 py-3.5",
                "bg-accent-500 text-white",
                "shadow-xl shadow-accent-500/30",
                "min-h-[48px]",
                "transition-all duration-200 ease-out",
                "hover:bg-accent-600",
                "hover:shadow-2xl hover:shadow-accent-500/40",
                "hover:scale-105",
                "active:scale-100",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-400/50 focus-visible:ring-offset-2",
                "text-sm font-semibold"
              )}
              aria-label="Book your session"
            >
              {/* Pulse beacon — only when idle (not hovered), reduced-motion safe */}
              {!isHovered && (
                <span
                  className="absolute inset-0 rounded-full motion-safe:animate-[fabPulse_2.5s_ease-out_infinite] bg-accent-400/20"
                  aria-hidden="true"
                />
              )}
              <Calendar
                className="h-4 w-4 relative z-10"
                aria-hidden="true"
              />
              <span className="relative z-10">Book Now</span>
            </Link>
          </div>
        </motion.div>
      )}
      {/* FAB pulse keyframe */}
      <style jsx global>{`
        @keyframes fabPulse {
          0%   { transform: scale(1); opacity: 0.4; }
          50%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </AnimatePresence>
  );
}
