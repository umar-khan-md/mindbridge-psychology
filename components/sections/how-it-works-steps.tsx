"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Search, Wallet, CalendarDays, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const stepsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const stepCardVariants: Variants = {
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

const numberCircleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Find Your Match",
    description:
      "Browse our directory or take our matching quiz to find the right psychologist for you.",
    icon: Search,
  },
  {
    number: "02",
    title: "Choose Your Funding",
    description:
      "Select Medicare bulk bill, rebate, NDIS, WorkCover, DVA, or self-funded.",
    icon: Wallet,
  },
  {
    number: "03",
    title: "Book Your Session",
    description:
      "Choose a time that works for you. Same-week appointments available.",
    icon: CalendarDays,
  },
  {
    number: "04",
    title: "Connect & Thrive",
    description:
      "Join your secure video session from anywhere in Australia.",
    icon: Video,
  },
];

/* ------------------------------------------------------------------ */
/*  Vertical connecting line (desktop — draws on scroll)               */
/* ------------------------------------------------------------------ */

function ConnectingTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.7", "end 0.6"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={lineRef}
      className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
    >
      {/* Track */}
      <div className="absolute inset-0 bg-primary-100 rounded-full" />
      {/* Animated fill */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary-500 via-primary-400 to-accent-500 rounded-full origin-top"
        style={{ scaleY }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile vertical timeline connector                                 */
/* ------------------------------------------------------------------ */

function MobileTimeline({ isLast }: { isLast: boolean }) {
  if (isLast) return null;
  return (
    <div className="lg:hidden flex justify-center py-2" aria-hidden="true">
      <div className="w-[2px] h-10 bg-gradient-to-b from-primary-300 to-primary-100 rounded-full" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HowItWorksSteps                                                    */
/* ------------------------------------------------------------------ */

export function HowItWorksSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="section-label mb-4"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="font-heading text-3xl lg:text-4xl text-text-primary"
          >
            Your Path to Better Mental Health
          </motion.h2>
        </div>

        {/* Steps — asymmetric zig-zag on desktop */}
        <div className="relative max-w-4xl mx-auto">
          <ConnectingTimeline />

          <motion.div
            className="flex flex-col gap-0 lg:gap-16"
            variants={stepsContainerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={step.number}>
                  <motion.div
                    variants={stepCardVariants}
                    className={cn(
                      "relative",
                      /* Desktop: alternate sides via grid */
                      "lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:items-center"
                    )}
                  >
                    {/* Left content area (visible on even steps) */}
                    <div
                      className={cn(
                        "hidden lg:block",
                        isEven ? "" : "lg:order-1"
                      )}
                    >
                      {isEven ? (
                        <div className="bg-sand-50/60 rounded-[1.5rem] p-8 text-right">
                          <h3 className="font-heading text-xl text-text-primary mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm text-text-tertiary leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Center: Step number circle (desktop) */}
                    <div className="hidden lg:flex flex-col items-center relative z-10 lg:order-none">
                      <motion.div
                        variants={numberCircleVariants}
                        className={cn(
                          "w-14 h-14 rounded-full",
                          "bg-gradient-to-br from-primary-600 to-primary-800",
                          "text-white text-lg font-bold flex items-center justify-center",
                          "shadow-lg shadow-primary-800/20 ring-4 ring-white"
                        )}
                      >
                        {step.number}
                      </motion.div>
                    </div>

                    {/* Right content area (visible on odd steps) */}
                    <div
                      className={cn(
                        "hidden lg:block",
                        isEven ? "lg:order-last" : ""
                      )}
                    >
                      {!isEven ? (
                        <div className="bg-sand-50/60 rounded-[1.5rem] p-8">
                          <h3 className="font-heading text-xl text-text-primary mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm text-text-tertiary leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Mobile card — always visible on small screens */}
                    <div className="lg:hidden">
                      <div className="bg-sand-50/60 rounded-[1.5rem] p-6 text-center">
                        {/* Step number + icon circle */}
                        <div className="relative mx-auto mb-6 w-[120px] h-[120px]">
                          <div className="absolute inset-0 rounded-full border-2 border-primary-200" />
                          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary-100 via-primary-50 to-sand-50 flex items-center justify-center shadow-sm shadow-primary-200/30">
                            <IconComponent className="w-8 h-8 text-primary-600" />
                          </div>
                          <motion.div
                            variants={numberCircleVariants}
                            className={cn(
                              "absolute -top-1 -right-1 w-9 h-9 rounded-full",
                              "bg-gradient-to-br from-primary-600 to-primary-800",
                              "text-white text-sm font-bold flex items-center justify-center",
                              "shadow-md shadow-primary-800/25"
                            )}
                          >
                            {step.number}
                          </motion.div>
                        </div>

                        <h3 className="font-heading text-xl text-text-primary mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-text-tertiary leading-relaxed max-w-[260px] mx-auto">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Mobile timeline connector */}
                  <MobileTimeline isLast={index === steps.length - 1} />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
