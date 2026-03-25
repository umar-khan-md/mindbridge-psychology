"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Scroll moments — text that appears/disappears at specific scroll %
   ------------------------------------------------------------------ */

interface ScrollMoment {
  text: string;
  sub?: string;
  enter: number;
  peak: number;
  exit: number;
  position?: "center" | "bottom-left" | "bottom-right";
  size?: "large" | "medium" | "small";
}

const scrollMoments: ScrollMoment[] = [
  {
    text: "Expert Psychology",
    sub: "From the comfort of home",
    enter: 0.02,
    peak: 0.06,
    exit: 0.14,
    position: "center",
    size: "large",
  },
  {
    text: "AHPRA Registered",
    sub: "Every psychologist, verified",
    enter: 0.16,
    peak: 0.2,
    exit: 0.26,
    position: "bottom-left",
    size: "small",
  },
  {
    text: "Same-Week\nAppointments",
    enter: 0.28,
    peak: 0.33,
    exit: 0.4,
    position: "center",
    size: "large",
  },
  {
    text: "Video & Phone",
    sub: "Your choice, your comfort",
    enter: 0.42,
    peak: 0.46,
    exit: 0.52,
    position: "bottom-right",
    size: "small",
  },
  {
    text: "Medicare\nBulk Billing",
    enter: 0.54,
    peak: 0.59,
    exit: 0.66,
    position: "center",
    size: "large",
  },
  {
    text: "NDIS · WorkCover · DVA",
    sub: "All major funding accepted",
    enter: 0.67,
    peak: 0.71,
    exit: 0.77,
    position: "bottom-left",
    size: "small",
  },
  {
    text: "Your Space,\nYour Pace",
    enter: 0.79,
    peak: 0.85,
    exit: 0.93,
    position: "center",
    size: "large",
  },
];

const largeMomentIndices = scrollMoments
  .map((m, i) => (m.size === "large" ? i : -1))
  .filter((i) => i !== -1);

/* ------------------------------------------------------------------
   Calculate opacity for a moment based on scroll progress
   ------------------------------------------------------------------ */

function getMomentOpacity(progress: number, moment: ScrollMoment): number {
  if (progress < moment.enter || progress > moment.exit) return 0;
  const fadeOutStart = moment.exit - (moment.exit - moment.peak) * 0.5;
  if (progress >= moment.peak && progress <= fadeOutStart) return 1;
  if (progress < moment.peak) {
    return (progress - moment.enter) / (moment.peak - moment.enter);
  }
  return 1 - (progress - fadeOutStart) / (moment.exit - fadeOutStart);
}

/* ------------------------------------------------------------------
   Hero — scroll-driven cinematic video with layered text reveals
   Uses direct DOM manipulation (no React state) for 60fps fluidity
   ------------------------------------------------------------------ */

const SCROLL_HEIGHT_VH = 800;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoReady = useRef(false);
  const momentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Direct DOM update — zero React re-renders during scroll
  const updateFrame = useCallback(
    (progress: number) => {
      // Video scrub
      const video = videoRef.current;
      if (video && videoReady.current && !prefersReducedMotion) {
        const targetTime = progress * (video.duration || 5);
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime;
        }
      }

      // Text moment opacity / transform / blur — direct style mutation
      let activeLarge = 0;
      scrollMoments.forEach((moment, i) => {
        const el = momentRefs.current[i];
        if (!el) return;

        const opacity = getMomentOpacity(progress, moment);

        if (opacity < 0.01) {
          el.style.opacity = "0";
          el.style.visibility = "hidden";
          return;
        }

        const yOffset = (1 - opacity) * 24;
        const blur = (1 - Math.min(opacity * 2, 1)) * 6;

        el.style.opacity = String(opacity);
        el.style.visibility = "visible";
        el.style.transform = `translateY(${yOffset}px)`;
        el.style.filter = blur > 0.1 ? `blur(${blur}px)` : "none";

        if (moment.size === "large" && opacity > 0.3) {
          activeLarge = largeMomentIndices.indexOf(i);
        }
      });

      // Dot indicators
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        if (i === activeLarge) {
          dot.style.backgroundColor = "rgba(255,255,255,0.8)";
          dot.style.transform = "scale(1.5)";
        } else {
          dot.style.backgroundColor = "rgba(255,255,255,0.2)";
          dot.style.transform = "scale(1)";
        }
      });
    },
    [prefersReducedMotion]
  );

  // Scroll listener — uses rAF for smooth batching
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateFrame(progress));
  });

  // Preload video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.preload = "auto";
    video.load();
    const handleReady = () => {
      videoReady.current = true;
      video.classList.add("opacity-100");
      video.classList.remove("opacity-0");
    };
    video.addEventListener("canplaythrough", handleReady);
    if (video.readyState >= 4) handleReady();
    return () => {
      video.removeEventListener("canplaythrough", handleReady);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Derived motion values (Framer handles these natively — no re-renders)
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.35, 0.5]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const progressBarOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 overflow-hidden" style={{ height: "100dvh" }}>
        {/* Video background with slow zoom */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0"
            style={{ willChange: "transform" }}
          />
          {/* Dynamic dark overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
          {/* Bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Top vignette */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />
        </motion.div>

        {/* Text moments — always rendered, visibility toggled via ref */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {scrollMoments.map((moment, i) => (
            <div
              key={i}
              ref={(el) => { momentRefs.current[i] = el; }}
              className={cn(
                "absolute px-6 sm:px-10 lg:px-16",
                moment.position === "center" &&
                  "inset-0 flex flex-col items-center justify-center text-center",
                moment.position === "bottom-left" &&
                  "bottom-20 left-0 lg:bottom-28",
                moment.position === "bottom-right" &&
                  "bottom-20 right-0 lg:bottom-28 text-right"
              )}
              style={{ opacity: 0, visibility: "hidden", willChange: "opacity, transform" }}
            >
              {moment.size === "large" ? (
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-[1.1] whitespace-pre-line">
                  {moment.text}
                </h2>
              ) : (
                <p className="font-heading text-xl sm:text-2xl lg:text-3xl text-white/90 tracking-tight">
                  {moment.text}
                </p>
              )}
              {moment.sub && (
                <p
                  className={cn(
                    "mt-3 lg:mt-4 font-sans tracking-wide",
                    moment.size === "large"
                      ? "text-sm sm:text-base lg:text-lg text-white/60"
                      : "text-xs sm:text-sm text-white/50 uppercase tracking-widest"
                  )}
                >
                  {moment.sub}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                className="w-1 h-2 rounded-full bg-white/40"
                animate={prefersReducedMotion ? {} : { y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20"
          style={{ opacity: progressBarOpacity }}
        >
          <motion.div
            className="h-full bg-white/25 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </motion.div>

        {/* Section dots */}
        <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2.5">
          {largeMomentIndices.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotRefs.current[i] = el; }}
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: i === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                transform: i === 0 ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
