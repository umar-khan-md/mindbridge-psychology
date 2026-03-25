"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  SVG decorative quotation mark                                      */
/* ------------------------------------------------------------------ */

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 26c-3.3 0-6-2.7-6-6s2.7-6 6-6c.6 0 1.1.1 1.6.2C15.8 10.4 19.6 8 24 8v4c-3.3 0-6 2.7-6 6v2h-6zm18 0c-3.3 0-6-2.7-6-6s2.7-6 6-6c.6 0 1.1.1 1.6.2C33.8 10.4 37.6 8 42 8v4c-3.3 0-6 2.7-6 6v2h-6z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Star rating component                                              */
/* ------------------------------------------------------------------ */

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: i * 0.05,
            duration: 0.25,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          <Star
            className={cn(
              "w-4 h-4",
              i < rating
                ? "text-accent-400 fill-accent-400"
                : "text-primary-700/40"
            )}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonial Card                                                   */
/* ------------------------------------------------------------------ */

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: (typeof testimonials)[number];
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-br from-primary-900/70 to-primary-950/60 backdrop-blur-sm rounded-2xl p-6 lg:p-7 border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300",
        isActive
          ? "border-primary-600/40 shadow-lg shadow-primary-950/30 scale-100 opacity-100"
          : "border-primary-800/30 opacity-70 scale-[0.97]"
      )}
    >
      {/* Decorative quote SVG */}
      <QuoteMark className="absolute top-4 right-4 w-10 h-10 text-primary-400/15" />

      {/* Stars */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote text */}
      <blockquote className="text-primary-100 leading-relaxed text-sm lg:text-base mb-5 line-clamp-5">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-sm font-bold text-primary-100">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">
            {testimonial.initials}
          </p>
          <p className="text-xs text-primary-400">
            {testimonial.location}
          </p>
        </div>
        <span className="ml-auto inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-primary-800/50 text-primary-300 border border-primary-700/30">
          {testimonial.service}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (isPaused || !inView || mq.matches) return;
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, inView, next]);

  // Build visible cards: show 3 at a time on desktop for masonry feel
  const visibleIndices = [
    (current - 1 + testimonials.length) % testimonials.length,
    current,
    (current + 1) % testimonials.length,
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-primary-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary-800/20 blur-3xl -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent-900/10 blur-3xl translate-x-1/3 translate-y-1/3"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest uppercase text-primary-400 mb-4"
          >
            Client Experiences
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl lg:text-4xl text-white"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {/* Card grid — 3 visible cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr_1fr] gap-5 max-w-5xl mx-auto items-center"
        >
          {visibleIndices.map((tIdx, posIdx) => (
            <AnimatePresence mode="wait" key={posIdx}>
              <motion.div
                key={tIdx}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className={cn(
                  posIdx === 0 && "hidden md:block md:translate-y-4",
                  posIdx === 1 && "md:-translate-y-3",
                  posIdx === 2 && "hidden md:block md:translate-y-4"
                )}
              >
                <TestimonialCard
                  testimonial={testimonials[tIdx]}
                  isActive={posIdx === 1}
                />
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-1 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={cn(
                "relative flex items-center justify-center",
                "min-w-[44px] min-h-[44px]",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/40 rounded-full"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <span
                className={cn(
                  "rounded-full transition-all duration-200 ease-out",
                  index === current
                    ? "w-8 h-2.5 bg-accent-500"
                    : "w-2.5 h-2.5 bg-primary-700 hover:bg-primary-600"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
