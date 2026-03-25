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
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Scroll-text captions that fade in/out as the video plays           */
/* ------------------------------------------------------------------ */

const scrollCaptions = [
  "Expert Psychology, From Home",
  "Same-Week Appointments",
  "Medicare Bulk Billing",
  "Your Space, Your Pace",
];

/* ------------------------------------------------------------------ */
/*  Hero — scroll-driven cinematic video with text reveals             */
/* ------------------------------------------------------------------ */

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeCaption, setActiveCaption] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll-driven video playback using requestAnimationFrame
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!videoRef.current || prefersReducedMotion) return;

    const videoDuration = videoRef.current.duration || 5;
    const targetTime = progress * videoDuration;

    // Cancel any pending frame
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    // Use rAF for smooth frame updates
    rafRef.current = requestAnimationFrame(() => {
      if (videoRef.current) {
        // Only update if the time difference is meaningful (avoids micro-jitter)
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.01) {
          videoRef.current.currentTime = targetTime;
        }
        lastTimeRef.current = targetTime;
      }
    });

    // Determine active caption
    const captionIndex = Math.min(
      scrollCaptions.length - 1,
      Math.floor(progress * scrollCaptions.length)
    );
    setActiveCaption(captionIndex);
  });

  // Preload video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.preload = "auto";
    video.load();
    const handleReady = () => setVideoReady(true);
    video.addEventListener("canplaythrough", handleReady);
    return () => {
      video.removeEventListener("canplaythrough", handleReady);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Video scale — subtle zoom as you scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Progress for the thin bottom bar
  const progressOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${(scrollCaptions.length + 1) * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 overflow-hidden" style={{ height: "100dvh" }}>
        {/* Video background */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            muted
            playsInline
            preload="auto"
            className={cn(
              "absolute inset-0 w-full h-full object-cover",
              "transition-opacity duration-700",
              videoReady ? "opacity-100" : "opacity-0"
            )}
            style={{ willChange: "transform" }}
          />
          {/* Subtle dark overlay — just enough for text legibility */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Bottom vignette for transition */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        {/* ---- Caption text — minimal, centered-bottom ---- */}
        <div className="absolute inset-0 z-10 flex items-end justify-center pb-28 lg:pb-32 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCaption}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-6"
            >
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-tight">
                {scrollCaptions[activeCaption]}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---- Section counter (subtle, top-right) ---- */}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-10 z-10">
          <span className="text-xs font-medium tracking-widest uppercase text-white/40">
            {String(activeCaption + 1).padStart(2, "0")} / {String(scrollCaptions.length).padStart(2, "0")}
          </span>
        </div>

        {/* ---- Scroll indicator (visible at start) ---- */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
              Scroll
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

        {/* ---- Progress bar ---- */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20"
          style={{ opacity: progressOpacity }}
        >
          <motion.div
            className="h-full bg-white/30 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </motion.div>

        {/* ---- Section dots (right side) ---- */}
        <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2.5">
          {scrollCaptions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                activeCaption === i
                  ? "bg-white/80 scale-150"
                  : "bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
