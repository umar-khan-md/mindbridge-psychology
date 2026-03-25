"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setCount(target); return; }
    const duration = 2200;
    const steps = 60;
    const stepMs = duration / steps;
    let tick = 0;
    const timer = setInterval(() => {
      tick++;
      const progress = tick / steps;
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (tick >= steps) { setCount(target); clearInterval(timer); }
    }, stepMs);
    return () => clearInterval(timer);
  }, [target, inView]);
  return <>{count.toLocaleString("en-AU")}</>;
}

/* ------------------------------------------------------------------ */
/*  Trust badges                                                       */
/* ------------------------------------------------------------------ */

const badges = [
  { icon: Users, label: "200+ Psychologists" },
  { icon: ShieldCheck, label: "AHPRA Registered" },
  { icon: DollarSign, label: "$0 Bulk Bill Available" },
];

/* ------------------------------------------------------------------ */
/*  HeroIntro — CTA section immediately below the scroll hero          */
/* ------------------------------------------------------------------ */

export function HeroIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative bg-white py-20 lg:py-28 overflow-hidden">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-medium text-text-tertiary tracking-wide"
          >
            Trusted by{" "}
            <span className="text-text-primary font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
              <AnimatedCounter target={4438} inView={inView} />+
            </span>{" "}
            Australians
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.1]"
          >
            Expert Psychology,{" "}
            <span className="text-primary-600">From the Comfort of Home</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Connect with AHPRA-registered psychologists via secure video.
            Medicare bulk billing, NDIS, WorkCover & DVA accepted.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <Link
                href="/book"
                className={cn(
                  "inline-flex items-center justify-center gap-3 px-10 py-4.5",
                  "bg-primary-600 text-white font-bold rounded-xl text-lg",
                  "shadow-lg shadow-primary-600/20",
                  "hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 focus-visible:ring-offset-2",
                  "group"
                )}
              >
                Find a Psychologist
                <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <Link
                href="/self-assessment"
                className={cn(
                  "inline-flex items-center justify-center gap-2.5 px-10 py-4.5",
                  "border-2 border-border-strong text-text-primary font-bold rounded-xl text-lg",
                  "hover:bg-sand-50 hover:border-primary-300",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 focus-visible:ring-offset-2"
                )}
              >
                Take Self-Assessment
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-4"
          >
            {badges.map((badge, i) => (
              <div key={badge.label} className="flex items-center gap-2">
                {i > 0 && <span className="w-px h-4 bg-border-default -ml-4 mr-1 hidden sm:block" aria-hidden="true" />}
                <badge.icon className="w-4 h-4 text-primary-500/70" />
                <span className="text-sm text-text-tertiary font-medium">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
