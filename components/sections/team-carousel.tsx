"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { practitioners } from "@/data/practitioners";
import { cn, getInitials } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Funding label map                                                  */
/* ------------------------------------------------------------------ */

const fundingLabels: Record<string, string> = {
  "bulk-bill": "Bulk Bill",
  rebate: "Medicare",
  "self-funded": "Private",
  ndis: "NDIS",
  workcover: "WorkCover",
  dva: "DVA",
};

const fundingColors: Record<string, string> = {
  "bulk-bill": "bg-primary-50 text-primary-700",
  rebate: "bg-accent-50 text-accent-700",
  "self-funded": "bg-sand-100 text-sand-700",
  ndis: "bg-info-light text-info-dark",
  workcover: "bg-warning-light text-warning-dark",
  dva: "bg-success-light text-success-dark",
};

/* ------------------------------------------------------------------ */
/*  TeamCarousel                                                       */
/* ------------------------------------------------------------------ */

export function TeamCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  /* ---- Auto-scroll ---- */
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollBy = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 24
      : 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || isPaused || !inView) return;

    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // If near end, scroll back to start
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollBy("right");
      }
    }, 4500);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [isPaused, inView, scrollBy]);

  return (
    <section ref={sectionRef} className="section-padding bg-sand-50">
      <div className="container-wide">
        {/* Header with nav buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-4"
            >
              Our Team
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-3xl lg:text-4xl text-text-primary"
            >
              Meet Your Psychologist
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <motion.button
              onClick={() => scrollBy("left")}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "w-11 h-11 rounded-full border border-border-default bg-white",
                "flex items-center justify-center",
                "hover:bg-primary-50 hover:border-primary-200",
                "transition-[background-color,border-color] duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40"
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-text-secondary" />
            </motion.button>
            <motion.button
              onClick={() => scrollBy("right")}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "w-11 h-11 rounded-full border border-border-default bg-white",
                "flex items-center justify-center",
                "hover:bg-primary-50 hover:border-primary-200",
                "transition-[background-color,border-color] duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40"
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </motion.button>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-1.5 px-1.5 scroll-smooth"
        >
          {practitioners.map((practitioner) => (
            <motion.div
              key={practitioner.slug}
              className="flex-shrink-0 w-[320px] sm:w-[340px] snap-start"
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div
                className={cn(
                  "relative bg-white rounded-2xl border border-border-subtle p-6 h-full flex flex-col",
                  "hover:shadow-lg hover:border-primary-200/60",
                  "transition-[box-shadow,border-color] duration-200 ease-out group overflow-hidden"
                )}
              >
                {/* Gradient top border accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 opacity-30 group-hover:opacity-100 transition-opacity duration-200"
                  aria-hidden="true"
                />

                {/* Photo placeholder + status */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="font-heading text-xl text-primary-700">
                      {getInitials(practitioner.firstName, practitioner.lastName)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg text-text-primary truncate">
                      {practitioner.firstName} {practitioner.lastName}
                    </h3>
                    <p className="text-sm text-text-tertiary">
                      {practitioner.title}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {practitioner.yearsExperience}+ years experience
                    </p>
                  </div>
                </div>

                {/* Accepting badge with green pulse dot */}
                {practitioner.acceptingNewClients ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60 text-xs font-medium mb-4 w-fit">
                    <span className="relative flex h-2 w-2">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Available This Week
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sand-100 text-sand-600 text-xs font-medium mb-4 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-400" />
                    Waitlist only
                  </div>
                )}

                {/* Specialisations */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {practitioner.specialisations.slice(0, 3).map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-sand-100 text-sand-700"
                    >
                      {spec}
                    </span>
                  ))}
                  {practitioner.specialisations.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-sand-50 text-sand-500">
                      +{practitioner.specialisations.length - 3} more
                    </span>
                  )}
                </div>

                {/* Funding badges */}
                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                  {practitioner.fundingAccepted.slice(0, 4).map((funding) => (
                    <span
                      key={funding}
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider",
                        fundingColors[funding] || "bg-primary-50 text-primary-700"
                      )}
                    >
                      {fundingLabels[funding] || funding}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={`/practitioners/${practitioner.slug}`}
                  className={cn(
                    "inline-flex items-center text-sm font-semibold",
                    "text-primary-600 group-hover:text-primary-700",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 rounded"
                  )}
                >
                  View Profile
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/practitioners"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 rounded-lg px-2 py-1"
          >
            View All Psychologists
            <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
