"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Users, ShieldCheck, DollarSign, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Scroll-text sections that reveal as the video plays                */
/* ------------------------------------------------------------------ */

const scrollSections = [
  {
    title: "Expert Psychology,",
    subtitle: "From the Comfort of Home",
    description:
      "Australia's leading telehealth psychologists, available from wherever you are.",
  },
  {
    title: "Same-Week Appointments",
    subtitle: "No Waitlists, No Travel",
    description:
      "Skip the 6-month wait. Connect with an AHPRA-registered psychologist within days.",
  },
  {
    title: "Medicare Bulk Billing",
    subtitle: "Accessible Mental Health Care",
    description:
      "With a GP Mental Health Treatment Plan, your sessions can be fully covered.",
  },
  {
    title: "Your Space, Your Pace",
    subtitle: "Therapy That Fits Your Life",
    description:
      "From rural Queensland to inner-city Melbourne — quality care, wherever you call home.",
  },
];

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
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
  }, [target]);
  return <>{count.toLocaleString("en-AU")}</>;
}

/* ------------------------------------------------------------------ */
/*  Trust badges                                                       */
/* ------------------------------------------------------------------ */

const trustBadges = [
  { icon: Users, label: "200+ Psychologists" },
  { icon: ShieldCheck, label: "AHPRA Registered" },
  { icon: DollarSign, label: "$0 Bulk Bill Available" },
];

/* ------------------------------------------------------------------ */
/*  Hero component — scroll-driven video with text reveals             */
/* ------------------------------------------------------------------ */

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [pastIntro, setPastIntro] = useState(false);

  // Total scroll height = 4 screen heights (one per text section)
  // plus initial hero content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to video currentTime (0-5s video)
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (videoRef.current && !prefersReducedMotion) {
      const videoDuration = videoRef.current.duration || 5;
      videoRef.current.currentTime = progress * videoDuration;
    }
    // Determine active text section (0 = intro, 1-4 = scroll sections)
    const sectionIndex = Math.min(
      scrollSections.length - 1,
      Math.floor(progress * scrollSections.length)
    );
    setActiveSection(sectionIndex);
    setPastIntro(progress > 0.08);
  });

  // No longer using useTransform for intro — using pastIntro state toggle instead

  // Video scale — slight zoom as you scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Preload video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = "auto";
      videoRef.current.load();
    }
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${(scrollSections.length + 1) * 100}vh` }}>
      {/* Sticky wrapper — stays fixed while we scroll through */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Video background */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: "transform" }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/50 to-primary-950/80" />
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,33,34,0.6)_100%)]" />
        </motion.div>

        {/* ---- Intro content (visible at scroll start, fades out) ---- */}
        <AnimatePresence>
        {!pastIntro && (
        <motion.div
          key="intro"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-20 flex items-center"
        >
          <div className="container-wide w-full">
            <div className="max-w-3xl space-y-6">
              {/* Social proof pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-accent-400" />
                <span className="text-sm font-medium text-primary-100/90">
                  Trusted by{" "}
                  <span className="text-white font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
                    <AnimatedCounter target={4438} />+
                  </span>{" "}
                  Australians
                </span>
              </motion.div>

              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm font-semibold tracking-widest uppercase text-primary-300/80"
              >
                Telehealth Psychology &mdash; Anywhere in Australia
              </motion.p>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-5xl lg:text-6xl xl:text-7xl text-white tracking-tighter leading-none"
              >
                Expert Psychology,
                <br />
                <span className="text-accent-300">From the Comfort</span>
                <br />
                of Home
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg lg:text-xl text-primary-200/80 max-w-2xl leading-relaxed"
              >
                Connect with AHPRA-registered psychologists via secure video.
                Medicare bulk billing, NDIS, WorkCover &amp; DVA accepted.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <Link
                    href="/book"
                    className={cn(
                      "inline-flex items-center justify-center gap-3 px-10 py-5 min-h-[56px]",
                      "bg-white text-primary-900 font-bold rounded-xl text-lg",
                      "shadow-xl shadow-black/15 hover:shadow-2xl hover:shadow-primary-400/25",
                      "hover:bg-primary-50",
                      "transition-[background-color,box-shadow] duration-200 ease-out",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950",
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
                      "inline-flex items-center justify-center gap-2.5 px-10 py-5 min-h-[56px]",
                      "border-2 border-white/30 text-white font-bold rounded-xl text-lg",
                      "hover:bg-white/10 hover:border-white/40",
                      "transition-[background-color,border-color] duration-200 ease-out",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
                    )}
                  >
                    Take Self-Assessment
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4"
              >
                {trustBadges.map((badge, i) => (
                  <div key={badge.label} className="flex items-center gap-2.5">
                    {i > 0 && <span className="w-px h-4 bg-white/15 -ml-4 mr-1" aria-hidden="true" />}
                    <badge.icon className="w-4.5 h-4.5 text-accent-400/70" />
                    <span className="text-[15px] text-primary-200/80 font-medium">{badge.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="pt-8"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-start gap-2"
                >
                  <span className="text-xs uppercase tracking-widest text-primary-300/50 font-medium">
                    Scroll to explore
                  </span>
                  <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
                    <motion.div
                      className="w-1 h-2 rounded-full bg-white/50"
                      animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        )}
        </AnimatePresence>

        {/* ---- Scroll-driven text sections (appear as video plays) ---- */}
        <div className="absolute inset-0 z-30 flex items-center pointer-events-none">
          <div className="container-wide w-full">
            <AnimatePresence mode="wait">
              {pastIntro && (
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-3xl"
                >
                  <p className="text-sm font-semibold tracking-widest uppercase text-accent-400 mb-4">
                    {String(activeSection + 1).padStart(2, "0")} / {String(scrollSections.length).padStart(2, "0")}
                  </p>
                  <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-white tracking-tighter leading-none mb-4">
                    {scrollSections[activeSection].title}
                    <br />
                    <span className="text-accent-300">{scrollSections[activeSection].subtitle}</span>
                  </h2>
                  <p className="text-lg lg:text-xl text-primary-200/80 max-w-xl leading-relaxed">
                    {scrollSections[activeSection].description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ---- Progress bar ---- */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20"
        >
          <motion.div
            className="h-full bg-accent-400 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </motion.div>

        {/* ---- Section dots (right side) ---- */}
        <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {scrollSections.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeSection === i && pastIntro
                  ? "bg-accent-400 scale-125"
                  : "bg-white/25"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
