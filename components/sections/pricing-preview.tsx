"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const pricingContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const pricingCardVariants: Variants = {
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface PricingTier {
  name: string;
  price: string;
  priceCurrency?: string;
  priceSubtext: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  ctaText: string;
  ctaHref: string;
}

const tiers: PricingTier[] = [
  {
    name: "Medicare Bulk Bill",
    price: "0",
    priceCurrency: "$",
    priceSubtext: "per session",
    description: "Up to 10 sessions per year with a GP referral",
    features: [
      "GP Mental Health Treatment Plan required",
      "Available with select psychologists",
      "50-minute video or phone sessions",
      "Evidence-based therapy approaches",
      "No out-of-pocket cost",
    ],
    highlighted: true,
    badge: "Most Popular",
    ctaText: "Get Started",
    ctaHref: "/referrals",
  },
  {
    name: "Medicare Rebate",
    price: "18.15",
    priceCurrency: "From $",
    priceSubtext: "gap per session",
    description: "After automatic Medicare rebate",
    features: [
      "GP Mental Health Treatment Plan required",
      "Choice of any psychologist",
      "Rebate processed same day",
      "Up to 10 sessions per calendar year",
      "Video or phone sessions",
    ],
    highlighted: false,
    ctaText: "Get Started",
    ctaHref: "/referrals",
  },
  {
    name: "Self-Funded",
    price: "160",
    priceCurrency: "From $",
    priceSubtext: "per session",
    description: "No referral needed, no session limits",
    features: [
      "No GP referral required",
      "Unlimited sessions per year",
      "Immediate availability",
      "All psychologists available",
      "Video or phone sessions",
    ],
    highlighted: false,
    ctaText: "Get Started",
    ctaHref: "/booking",
  },
];

/* ------------------------------------------------------------------ */
/*  PricingPreview                                                     */
/* ------------------------------------------------------------------ */

export function PricingPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isAnnual, setIsAnnual] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="section-padding bg-bg-primary">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl lg:text-5xl text-text-primary mb-4 tracking-tight"
          >
            Psychology on Any Budget
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-secondary text-lg"
          >
            Quality mental health care should be accessible. We offer multiple
            funding pathways to suit your situation.
          </motion.p>
        </div>

        {/* Billing toggle (visual) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span
            className={cn(
              "text-sm font-medium transition-colors duration-200",
              !isAnnual ? "text-text-primary" : "text-text-muted"
            )}
          >
            Per Session
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={cn(
              "relative w-12 h-7 rounded-full transition-colors duration-200 ease-out",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40",
              isAnnual ? "bg-primary-700" : "bg-sand-300"
            )}
            role="switch"
            aria-checked={isAnnual}
            aria-label="Toggle annual pricing view"
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out",
                isAnnual && "translate-x-5"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm font-medium transition-colors duration-200",
              isAnnual ? "text-text-primary" : "text-text-muted"
            )}
          >
            Annual Plan
            <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-100 text-accent-700 uppercase">
              Save 10%
            </span>
          </span>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch"
          variants={pricingContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={pricingCardVariants}
              className={cn(
                "relative rounded-2xl flex flex-col",
                tier.highlighted
                  ? "md:-translate-y-5 md:scale-[1.03]"
                  : ""
              )}
            >
              {/* Gradient glow wrapper for featured card with subtle pulse */}
              {tier.highlighted && (
                <motion.div
                  className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500"
                  aria-hidden="true"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.8 }
                      : {
                          opacity: [0.7, 0.9, 0.7],
                        }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              <div
                className={cn(
                  "relative rounded-2xl p-7 lg:p-8 flex flex-col flex-grow",
                  tier.highlighted
                    ? "bg-primary-900 text-white shadow-2xl shadow-primary-900/30"
                    : "bg-white border border-border-default"
                )}
              >
                {/* Subtle pattern for featured */}
                {tier.highlighted && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-accent-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="relative z-10 flex flex-col flex-grow">
                  {/* Tier name */}
                  <h3
                    className={cn(
                      "font-heading text-xl mb-4",
                      tier.highlighted ? "text-primary-100" : "text-text-primary"
                    )}
                  >
                    {tier.name}
                  </h3>

                  {/* Price — large number with smaller currency */}
                  <div className="mb-2 flex items-baseline gap-1">
                    <span
                      className={cn(
                        "text-lg font-medium",
                        tier.highlighted ? "text-primary-300" : "text-text-muted"
                      )}
                    >
                      {tier.priceCurrency}
                    </span>
                    <span
                      className={cn(
                        "font-heading text-6xl lg:text-7xl",
                        tier.highlighted ? "text-white" : "text-primary-800"
                      )}
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {tier.price}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-sm mb-2",
                      tier.highlighted ? "text-primary-300" : "text-text-muted"
                    )}
                  >
                    {tier.priceSubtext}
                  </p>

                  <p
                    className={cn(
                      "text-sm mb-6",
                      tier.highlighted ? "text-primary-300" : "text-text-tertiary"
                    )}
                  >
                    {tier.description}
                  </p>

                  {/* Divider */}
                  <div
                    className={cn(
                      "h-px mb-6",
                      tier.highlighted ? "bg-primary-700" : "bg-border-subtle"
                    )}
                  />

                  {/* Features with green check circles */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <span
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                            tier.highlighted
                              ? "bg-primary-700/60"
                              : "bg-primary-50"
                          )}
                        >
                          <Check
                            className={cn(
                              "w-3 h-3",
                              tier.highlighted
                                ? "text-primary-200"
                                : "text-primary-600"
                            )}
                          />
                        </span>
                        <span
                          className={
                            tier.highlighted
                              ? "text-primary-100"
                              : "text-text-secondary"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Link
                      href={tier.ctaHref}
                      className={cn(
                        "flex items-center justify-center gap-2.5 w-full px-6 py-4 min-h-[52px] rounded-xl font-bold text-base",
                        "transition-[background-color,box-shadow] duration-200 ease-out",
                        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40",
                        tier.highlighted
                          ? "bg-white text-primary-900 hover:bg-primary-50 shadow-lg hover:shadow-2xl"
                          : "bg-primary-800 text-white hover:bg-primary-700"
                      )}
                    >
                      {tier.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10 space-y-3"
        >
          <Link
            href="/fees"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 rounded-lg px-2 py-1"
          >
            View Full Pricing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
          </Link>
          <p className="text-sm text-text-muted">
            NDIS, WorkCover &amp; DVA funding also accepted.{" "}
            <Link
              href="/fees"
              className="underline hover:text-text-secondary transition-colors duration-200"
            >
              Learn more
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
