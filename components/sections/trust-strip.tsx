"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  MessageCircle,
  DollarSign,
  Star,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface StatItem {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  icon: LucideIcon;
}

const stats: StatItem[] = [
  { value: 200, suffix: "+", prefix: "", label: "Psychologists", icon: Users },
  { value: 35000, suffix: "+", prefix: "", label: "Sessions Delivered", icon: MessageCircle },
  { value: 0, suffix: "", prefix: "$", label: "Bulk Bill Available", icon: DollarSign },
  { value: 4.9, suffix: "", prefix: "", label: "Client Rating", icon: Star },
  { value: 100, suffix: "%", prefix: "", label: "Telehealth", icon: Monitor },
];

/* ------------------------------------------------------------------ */
/*  Animated number                                                    */
/* ------------------------------------------------------------------ */

function AnimatedNumber({
  value,
  suffix,
  prefix,
  inView,
}: {
  value: number;
  suffix: string;
  prefix: string;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      // ease-out quart for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(
        Number((eased * value).toFixed(value % 1 !== 0 ? 1 : 0))
      );

      if (current >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, value]);

  const formatted =
    value >= 1000
      ? displayValue.toLocaleString("en-AU", { maximumFractionDigits: 0 })
      : value % 1 !== 0
        ? displayValue.toFixed(1)
        : displayValue.toString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  TrustStrip                                                         */
/* ------------------------------------------------------------------ */

export function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-white py-16 lg:py-20 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(13,115,119,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center group"
              >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-200 ease-out">
                    <IconComponent className="w-6 h-6 text-primary-700" />
                  </div>
                </div>

                {/* Number */}
                <div
                  className={cn(
                    "font-heading text-5xl lg:text-6xl text-primary-900 mb-2 tracking-tight",
                    stat.label === "Client Rating" && "flex items-center justify-center gap-1"
                  )}
                >
                  {stat.label === "Client Rating" && inView && (
                    <Star className="w-6 h-6 text-accent-500 fill-accent-500" />
                  )}
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    inView={inView}
                  />
                </div>

                {/* Label */}
                <p className="text-sm text-sand-600 font-semibold tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
