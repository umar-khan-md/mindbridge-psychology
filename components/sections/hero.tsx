"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
/*  Hero — clean, cinematic, video background                         */
/* ------------------------------------------------------------------ */

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.75;
    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplaythrough", handleCanPlay);
    return () => video.removeEventListener("canplaythrough", handleCanPlay);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Video background — autoplay, no green overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={cn(
            "absolute inset-0 w-full h-full object-cover scale-105",
            "transition-opacity duration-1000",
            videoLoaded ? "opacity-100" : "opacity-0"
          )}
        />
        {/* Neutral dark overlay — no green tint */}
        <div className="absolute inset-0 bg-black/45" />
        {/* Bottom gradient for section transition */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide w-full py-32 lg:py-40">
        <div className="max-w-3xl space-y-8">
          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-medium text-white/70 tracking-wide"
          >
            Trusted by{" "}
            <span className="text-white font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
              <AnimatedCounter target={4438} />+
            </span>{" "}
            Australians
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]"
          >
            Expert Psychology,
            <br />
            <span className="text-accent-300">From Home</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg lg:text-xl text-white/75 max-w-xl leading-relaxed"
          >
            AHPRA-registered psychologists via secure video.
            Medicare bulk billing available.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
                  "inline-flex items-center justify-center gap-3 px-10 py-4.5",
                  "bg-white text-primary-900 font-bold rounded-xl text-lg",
                  "shadow-xl shadow-black/10",
                  "hover:bg-primary-50 hover:shadow-2xl",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
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
                  "border-2 border-white/30 text-white font-bold rounded-xl text-lg",
                  "hover:bg-white/10 hover:border-white/50",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
                )}
              >
                Take Self-Assessment
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center p-1.5"
        >
          <motion.div
            className="w-1.5 h-2.5 rounded-full bg-white/50"
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
