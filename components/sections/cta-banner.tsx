"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  CTABanner                                                          */
/* ------------------------------------------------------------------ */

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 lg:py-44 overflow-hidden">
      {/* ---- Gradient mesh background ---- */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-900 to-primary-950" />
      <div
        className="absolute inset-0 opacity-40 motion-safe:animate-[ctaMesh_20s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 30% 40%, rgba(13,115,119,0.3) 0%, transparent 70%), " +
            "radial-gradient(ellipse 40% 50% at 70% 60%, rgba(212,168,83,0.12) 0%, transparent 70%), " +
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(13,115,119,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ---- Floating decorative elements ---- */}
      <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-700/10 blur-3xl" aria-hidden="true" />

      {/* Floating dots */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-primary-400/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[25%] right-[20%] w-3 h-3 rounded-full bg-accent-400/15"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[60%] left-[70%] w-1.5 h-1.5 rounded-full bg-white/10"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[35%] right-[10%] w-1 h-1 rounded-full bg-primary-300/15"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        aria-hidden="true"
      />

      {/* Line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-600/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-600/20 to-transparent" />

      {/* ---- Content ---- */}
      <div className="container-wide relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl lg:text-6xl xl:text-7xl text-white mb-8 tracking-tight"
          >
            Your First Step Starts Here
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-primary-200/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you&rsquo;re navigating anxiety, processing trauma, or
            seeking personal growth &mdash; expert support is just a click away.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA with glow */}
            <Link
              href="/practitioners"
              className={cn(
                "inline-flex items-center justify-center gap-3 px-10 py-5 min-h-[56px]",
                "bg-white text-primary-900 font-bold rounded-xl text-lg",
                "shadow-xl shadow-black/15",
                "hover:bg-primary-50 hover:shadow-[0_12px_40px_rgba(13,115,119,0.3)] hover:-translate-y-1",
                "transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950",
                "group"
              )}
            >
              Find a Psychologist
              <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>

            <a
              href="tel:1300646327"
              className={cn(
                "inline-flex items-center justify-center gap-2.5 px-10 py-5 min-h-[56px]",
                "border-2 border-white/30 text-white font-bold rounded-xl text-lg",
                "hover:bg-white/10 hover:border-white/50",
                "transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
              )}
            >
              <Phone className="w-4.5 h-4.5" />
              Call 1300 MIND BR
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-accent-500/60" />
            <p className="text-sm text-primary-300/70">
              Join 35,000+ Australians who&rsquo;ve found their path
            </p>
          </motion.div>

          {/* Micro-trust */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-3 text-sm text-primary-400/50"
          >
            Free initial consultation &middot; Same-week availability &middot;
            Secure &amp; confidential
          </motion.p>
        </div>
      </div>

      {/* Keyframe for mesh animation */}
      <style jsx global>{`
        @keyframes ctaMesh {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(-2%, 1%) scale(1.03); }
          66%      { transform: translate(1%, -2%) scale(0.97); }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[ctaMesh_20s_ease-in-out_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
