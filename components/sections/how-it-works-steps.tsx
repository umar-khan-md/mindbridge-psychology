"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
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
      staggerChildren: 0.2,
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
      stiffness: 300,
      damping: 25,
      delay: 0.1,
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
/*  Animated connecting line (desktop only, draws on scroll)           */
/* ------------------------------------------------------------------ */

function ConnectingLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={lineRef}
      className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-[2px]"
    >
      {/* Track */}
      <div className="absolute inset-0 bg-primary-100 rounded-full" />
      {/* Animated fill */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 rounded-full origin-left"
        style={{ scaleX }}
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="section-padding bg-white">
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

        {/* Steps */}
        <div className="relative">
          <ConnectingLine />

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-8"
            variants={stepsContainerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number}>
                  <motion.div
                    variants={stepCardVariants}
                    className="relative text-center"
                  >
                    {/* Card background */}
                    <div className="bg-sand-50/60 rounded-2xl p-6 lg:p-5 lg:bg-transparent lg:rounded-none">
                      {/* Step number circle with gradient fill */}
                      <div className="relative mx-auto mb-6 w-[120px] h-[120px]">
                        {/* Outer ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-primary-200" />
                        {/* Inner circle with gradient + icon */}
                        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary-100 via-primary-50 to-sand-50 flex items-center justify-center shadow-sm shadow-primary-200/30">
                          <IconComponent className="w-8 h-8 text-primary-600" />
                        </div>
                        {/* Number badge with spring scale */}
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

                      {/* Content */}
                      <h3 className="font-heading text-xl text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-text-tertiary leading-relaxed max-w-[260px] mx-auto">
                        {step.description}
                      </p>
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
