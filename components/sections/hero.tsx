"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, Users, ShieldCheck, DollarSign, Sparkles, Star, Video } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUpChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Rotating-word effect for the subheading                            */
/* ------------------------------------------------------------------ */

const rotatingWords = ["anxiety", "depression", "trauma", "burnout", "ADHD", "grief"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % rotatingWords.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = setInterval(advance, 2400);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <span className="relative inline-block w-[10ch] text-left align-bottom overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="inline-block text-accent-400 font-semibold"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter for social-proof line                             */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCount(target);
      return;
    }
    const duration = 2200;
    const steps = 60;
    const stepMs = duration / steps;
    let tick = 0;
    const timer = setInterval(() => {
      tick++;
      const progress = tick / steps;
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (tick >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, stepMs);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count.toLocaleString("en-AU")}</>;
}

/* ------------------------------------------------------------------ */
/*  Trust badges data                                                  */
/* ------------------------------------------------------------------ */

const trustBadges = [
  { icon: Users, label: "200+ Psychologists" },
  { icon: ShieldCheck, label: "AHPRA Registered" },
  { icon: DollarSign, label: "$0 Bulk Bill Available" },
];

/* ------------------------------------------------------------------ */
/*  Hero component                                                     */
/* ------------------------------------------------------------------ */

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Parallax: blobs move at 60% speed of scroll
  const blobY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 120]
  );

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-primary-950 flex items-center">
      {/* ---- Animated gradient mesh background (CSS only) ---- */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950" />
        {/* Warm accent wash */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-950/20 via-transparent to-primary-800/10" />
        {/* Mesh highlight orbs */}
        <div
          className="absolute inset-0 opacity-30 motion-safe:animate-[meshShift_18s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 40% 50% at 20% 50%, rgba(13,115,119,0.25) 0%, transparent 70%), " +
              "radial-gradient(ellipse 35% 40% at 75% 30%, rgba(212,168,83,0.12) 0%, transparent 70%), " +
              "radial-gradient(ellipse 45% 50% at 60% 80%, rgba(13,115,119,0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ---- Dot grid overlay ---- */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ---- Floating organic blobs with parallax ---- */}
      <motion.div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px]"
        aria-hidden="true"
        style={{ y: blobY }}
      >
        <motion.div
          className="absolute inset-0 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-gradient-to-br from-primary-700/20 to-primary-800/10 blur-3xl"
          animate={prefersReducedMotion ? {} : { y: [0, -20, 0], scale: [1, 1.04, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute top-20 left-20 w-[70%] h-[70%] rounded-[55%_45%_50%_50%/50%_50%_55%_45%] bg-gradient-to-tl from-accent-500/8 to-primary-600/14 blur-2xl"
          animate={prefersReducedMotion ? {} : { y: [0, 15, 0], x: [0, -12, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[40%] h-[40%] rounded-[45%_55%_60%_40%/50%_40%_55%_50%] bg-gradient-to-br from-primary-500/10 to-accent-600/8 blur-2xl"
          animate={prefersReducedMotion ? {} : { y: [0, -14, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ willChange: "transform" }}
        />
      </motion.div>

      {/* ---- Main content ---- */}
      <div className="relative z-10 container-wide w-full py-32 lg:py-40">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-3 space-y-8"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Social proof line */}
            <motion.div
              variants={fadeInUpChild}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-accent-400" />
              <span className="text-sm font-medium text-primary-200/90">
                Trusted by{" "}
                <span className="text-white font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
                  <AnimatedCounter target={4438} />+
                </span>{" "}
                Australians
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              variants={fadeInUpChild}
              className="text-sm font-semibold tracking-widest uppercase text-primary-300/80"
            >
              Telehealth Psychology &mdash; Anywhere in Australia
            </motion.p>

            {/* Heading */}
            <motion.h1
              variants={fadeInUpChild}
              className="font-heading text-5xl lg:text-6xl xl:text-7xl text-white tracking-tighter leading-none"
            >
              <span className="text-white">Expert Psychology,</span>
              <br />
              <span className="text-accent-300">From the Comfort</span>
              <br />
              of Home
            </motion.h1>

            {/* Subheading with rotating word */}
            <motion.p
              variants={fadeInUpChild}
              className="text-lg lg:text-xl xl:text-2xl text-primary-200/80 max-w-2xl leading-relaxed"
            >
              Get support for <RotatingWord /> from
              Australia&rsquo;s leading psychologists via secure video.
              Medicare bulk billing, NDIS, WorkCover &amp; DVA accepted.
            </motion.p>

            {/* CTAs with whileHover/whileTap */}
            <motion.div
              variants={fadeInUpChild}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <Link
                  href="/practitioners"
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

              {/* Secondary CTA */}
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
                    "hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]",
                    "transition-[background-color,border-color,box-shadow] duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
                  )}
                >
                  Take Self-Assessment
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust badges (enters after CTAs) */}
            <motion.div
              variants={fadeInUpChild}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4"
            >
              {trustBadges.map((badge, i) => (
                <div key={badge.label} className="flex items-center gap-2.5">
                  {i > 0 && (
                    <span className="w-px h-4 bg-white/15 -ml-4 mr-1" aria-hidden="true" />
                  )}
                  <badge.icon className="w-4.5 h-4.5 text-accent-400/70" />
                  <span className="text-[15px] text-primary-200/80 font-medium">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right decorative column — floating testimonial + video call visual */}
          <div className="hidden lg:block lg:col-span-2" aria-hidden="true">
            <div className="relative aspect-square">
              {/* Video call illustration card */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="absolute top-[8%] left-[5%] right-[10%] rounded-2xl bg-white/[0.06] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-400/20 flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90">Secure Video Session</p>
                    <p className="text-xs text-primary-300/70">End-to-end encrypted</p>
                  </div>
                </div>
                {/* Mock video grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-video rounded-lg bg-primary-800/40 border border-white/5" />
                  <div className="aspect-video rounded-lg bg-primary-700/30 border border-white/5" />
                </div>
              </motion.div>

              {/* Floating testimonial card */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                className="absolute bottom-[12%] left-[2%] right-[6%] rounded-2xl bg-white/[0.07] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md p-5"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  &ldquo;I was hesitant about telehealth, but the experience felt as personal as being in the room. My psychologist truly understood me.&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400/30 to-accent-400/20 border border-white/10" />
                  <div>
                    <p className="text-xs font-medium text-white/70">Verified Patient</p>
                    <p className="text-xs text-primary-300/50">Melbourne, VIC</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />

    </section>
  );
}
