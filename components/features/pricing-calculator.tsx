"use client";

import { useState, useMemo, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Check,
  Info,
  Stethoscope,
  Users,
  Brain,
  ClipboardCheck,
  UserCheck,
  DollarSign,
  Shield,
  Briefcase,
  Medal,
  CreditCard,
  RotateCcw,
  TrendingDown,
  Sparkles,
  Calendar,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { fees } from "@/data/fees";
import { cn, formatCurrency } from "@/lib/utils";
import { MEDICARE_INFO } from "@/lib/constants";

/* ==========================================================================
   Types & Data
   ========================================================================== */

type ServiceType =
  | "individual-general"
  | "individual-clinical"
  | "couples"
  | "group"
  | "assessment-adhd"
  | "assessment-asd";

type FundingMethod =
  | "bulk-bill"
  | "rebate"
  | "self-funded"
  | "ndis"
  | "workcover"
  | "dva";

interface ServiceOption {
  id: ServiceType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
}

interface FundingOption {
  id: FundingMethod;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeLabel?: string;
  badgeVariant?: "success" | "default" | "accent" | "warning";
}

const serviceOptions: ServiceOption[] = [
  {
    id: "individual-general",
    label: "Individual (Registered)",
    description: "With a Registered Psychologist",
    icon: UserCheck,
    duration: "50 min",
  },
  {
    id: "individual-clinical",
    label: "Individual (Clinical)",
    description: "With a Clinical Psychologist",
    icon: Stethoscope,
    duration: "50 min",
  },
  {
    id: "couples",
    label: "Couples Therapy",
    description: "Relationship & couples session",
    icon: Users,
    duration: "80 min",
  },
  {
    id: "group",
    label: "Group Therapy",
    description: "Facilitated group program",
    icon: Users,
    duration: "90 min",
  },
  {
    id: "assessment-adhd",
    label: "ADHD Assessment",
    description: "Comprehensive diagnostic package",
    icon: Brain,
    duration: "3-4 hrs",
  },
  {
    id: "assessment-asd",
    label: "ASD Assessment",
    description: "Comprehensive diagnostic package",
    icon: ClipboardCheck,
    duration: "4-6 hrs",
  },
];

const fundingOptions: FundingOption[] = [
  {
    id: "bulk-bill",
    label: "Medicare Bulk Bill",
    description: "No out-of-pocket cost",
    icon: Shield,
    badgeLabel: "$0 Gap",
    badgeVariant: "success",
  },
  {
    id: "rebate",
    label: "Medicare Rebate",
    description: "Pay upfront, claim rebate",
    icon: DollarSign,
    badgeLabel: "Most Popular",
    badgeVariant: "accent",
  },
  {
    id: "self-funded",
    label: "Self-Funded",
    description: "Full fee, no referral needed",
    icon: CreditCard,
  },
  {
    id: "ndis",
    label: "NDIS",
    description: "Funded through your plan",
    icon: Shield,
    badgeLabel: "No Gap",
    badgeVariant: "success",
  },
  {
    id: "workcover",
    label: "WorkCover",
    description: "Workplace injury cover",
    icon: Briefcase,
    badgeLabel: "No Gap",
    badgeVariant: "success",
  },
  {
    id: "dva",
    label: "DVA",
    description: "Veterans\u2019 Affairs funded",
    icon: Medal,
    badgeLabel: "No Gap",
    badgeVariant: "success",
  },
];

const serviceFeeMap: Record<ServiceType, string> = {
  "individual-general": "individual-general-50",
  "individual-clinical": "individual-clinical-50",
  couples: "couples-therapy",
  group: "group-therapy",
  "assessment-adhd": "assessment-adhd",
  "assessment-asd": "assessment-asd",
};

const validCombinations: Record<ServiceType, FundingMethod[]> = {
  "individual-general": [
    "bulk-bill",
    "rebate",
    "self-funded",
    "ndis",
    "workcover",
    "dva",
  ],
  "individual-clinical": [
    "rebate",
    "self-funded",
    "ndis",
    "workcover",
    "dva",
  ],
  couples: ["self-funded"],
  group: ["rebate", "self-funded", "ndis"],
  "assessment-adhd": ["rebate", "self-funded", "ndis"],
  "assessment-asd": ["rebate", "self-funded", "ndis"],
};

// Average industry fee for comparison
const INDUSTRY_AVG: Record<ServiceType, number> = {
  "individual-general": 190,
  "individual-clinical": 260,
  couples: 320,
  group: 80,
  "assessment-adhd": 2000,
  "assessment-asd": 2800,
};

/* ==========================================================================
   Step labels & progress
   ========================================================================== */

const STEPS = [
  { num: 1, label: "Service" },
  { num: 2, label: "Funding" },
  { num: 3, label: "Your Cost" },
] as const;

/* ==========================================================================
   Animated counter hook
   ========================================================================== */

function useCountUp(
  target: number,
  duration: number = 1200,
  enabled: boolean = true
) {
  const [value, setValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }
    let startTime: number | null = null;
    let frame: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target * 100) / 100);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, enabled, prefersReducedMotion]);

  return value;
}

/* ==========================================================================
   Motion variants
   ========================================================================== */

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
  }),
};

const cardStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/* ==========================================================================
   Component
   ========================================================================== */

export const PricingCalculator = memo(function PricingCalculator() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null
  );
  const [selectedFunding, setSelectedFunding] = useState<FundingMethod | null>(
    null
  );
  const [showAnnual, setShowAnnual] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // ---- derived data ----
  const feeData = useMemo(() => {
    if (!selectedService) return null;
    return fees.find((f) => f.id === serviceFeeMap[selectedService]) ?? null;
  }, [selectedService]);

  const availableFunding = useMemo(() => {
    if (!selectedService) return fundingOptions;
    const valid = validCombinations[selectedService];
    return fundingOptions.map((f) => ({
      ...f,
      disabled: !valid.includes(f.id),
    }));
  }, [selectedService]);

  const calculation = useMemo(() => {
    if (!feeData || !selectedFunding || !selectedService) return null;

    const sessionFee = feeData.privateFee;
    let rebateAmount = 0;
    let outOfPocket = sessionFee;
    let note = "";
    let requiresReferral = false;

    switch (selectedFunding) {
      case "bulk-bill":
        rebateAmount = sessionFee;
        outOfPocket = 0;
        note =
          "Bulk-billed sessions are available for eligible concession card holders with a valid GP Mental Health Treatment Plan. Subject to practitioner availability.";
        requiresReferral = true;
        break;
      case "rebate":
        rebateAmount = feeData.medicareRebate ?? 0;
        outOfPocket = sessionFee - rebateAmount;
        note = `Medicare rebate of ${formatCurrency(rebateAmount)} applies with a valid GP Mental Health Treatment Plan. Up to ${MEDICARE_INFO.maxSessions} sessions per calendar year.`;
        requiresReferral = true;
        break;
      case "self-funded":
        outOfPocket = sessionFee;
        note =
          "No referral or Mental Health Treatment Plan required. No session limits. Private health fund rebates may be available depending on your level of cover.";
        break;
      case "ndis":
        rebateAmount = sessionFee;
        outOfPocket = 0;
        note =
          "Billed at NDIS Price Guide rates. No out-of-pocket cost with sufficient plan funding. Agency-managed, plan-managed, and self-managed plans accepted.";
        break;
      case "workcover":
        rebateAmount = sessionFee;
        outOfPocket = 0;
        note =
          "Sessions covered by your WorkCover claim. Pre-approval from your insurer may be required. No out-of-pocket cost once approved.";
        requiresReferral = true;
        break;
      case "dva":
        rebateAmount = sessionFee;
        outOfPocket = 0;
        note =
          "Sessions covered by DVA Gold or White Card. No out-of-pocket cost. Referral from your GP or psychiatrist required.";
        requiresReferral = true;
        break;
    }

    const actualOOP = Math.max(0, outOfPocket);
    const annualEstimate = actualOOP * MEDICARE_INFO.maxSessions;
    const rebatePercentage =
      sessionFee > 0 ? (rebateAmount / sessionFee) * 100 : 0;

    const industryAvg = INDUSTRY_AVG[selectedService];
    const savings = industryAvg - actualOOP;

    return {
      sessionFee,
      rebateAmount,
      outOfPocket: actualOOP,
      annualEstimate,
      rebatePercentage,
      note,
      requiresReferral,
      industryAvg,
      savings,
    };
  }, [feeData, selectedFunding, selectedService]);

  // ---- handlers ----
  const goTo = useCallback(
    (target: number) => {
      setDirection(target > step ? 1 : -1);
      setStep(target);
    },
    [step]
  );

  const handleServiceSelect = useCallback(
    (service: ServiceType) => {
      setSelectedService(service);
      setSelectedFunding(null);
      setDirection(1);
      setStep(2);
    },
    []
  );

  const handleFundingSelect = useCallback(
    (funding: FundingMethod) => {
      setSelectedFunding(funding);
      setDirection(1);
      setStep(3);
    },
    []
  );

  const reset = useCallback(() => {
    setDirection(-1);
    setStep(1);
    setSelectedService(null);
    setSelectedFunding(null);
    setShowAnnual(false);
  }, []);

  // Animated counter for the main OOP number
  const animatedOOP = useCountUp(
    calculation?.outOfPocket ?? 0,
    1200,
    step === 3
  );

  const transitionConfig = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 30 };

  /* ========================================================================
     Render
     ======================================================================== */

  return (
    <div
      ref={containerRef}
      className="relative bg-white rounded-3xl border border-neutral-100 shadow-2xl shadow-primary-200/30 overflow-hidden"
    >
      {/* ----------------------------------------------------------------
          Header & Progress
          ---------------------------------------------------------------- */}
      <div className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 px-6 py-7 sm:px-8 overflow-hidden">
        {/* Decorative circles */}
        <div
          className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-400), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-400), transparent 70%)",
          }}
        />

        <div className="relative flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm">
            <Calculator className="w-5 h-5 text-accent-400" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl text-white tracking-tight">
              Pricing Calculator
            </h3>
            <p className="text-primary-200/80 text-sm leading-tight">
              Your out-of-pocket cost in 2 simple steps
            </p>
          </div>
        </div>

        {/* --- Progress bar --- */}
        <div className="relative mt-6 mb-1">
          {/* Track */}
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent-400), var(--color-accent-500))",
              }}
              initial={false}
              animate={{ width: `${((step) / 3) * 100}%` }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>

          {/* Step dots */}
          <div className="absolute inset-0 flex items-center justify-between">
            {STEPS.map((s) => (
              <button
                key={s.num}
                disabled={s.num > step}
                onClick={() => {
                  if (s.num <= step) goTo(s.num);
                }}
                className={cn(
                  "relative flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-400/50",
                  s.num < step &&
                    "bg-accent-500 text-white cursor-pointer hover:scale-110",
                  s.num === step &&
                    "bg-white text-primary-800 shadow-lg shadow-accent-500/30 ring-2 ring-accent-400/50 scale-110",
                  s.num > step &&
                    "bg-white/15 text-white/40 cursor-not-allowed"
                )}
                aria-label={`Step ${s.num}: ${s.label}`}
              >
                {s.num < step ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                ) : (
                  s.num
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step labels */}
        <div className="flex justify-between mt-3">
          {STEPS.map((s) => (
            <span
              key={s.num}
              className={cn(
                "text-xs font-medium transition-colors duration-200",
                s.num === step ? "text-white" : "text-primary-300/60"
              )}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------------------
          Body
          ---------------------------------------------------------------- */}
      <div className="p-6 sm:p-8 min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ==============================================================
              Step 1 -- Service Selection
              ============================================================== */}
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transitionConfig}
            >
              <h4 className="font-heading text-lg text-primary-900 mb-0.5">
                Choose your service
              </h4>
              <p className="text-sm text-neutral-500 mb-6">
                Select the type of session you are interested in.
              </p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                variants={cardStagger}
                initial="hidden"
                animate="show"
              >
                {serviceOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedService === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      variants={cardItem}
                      onClick={() => handleServiceSelect(option.id)}
                      className={cn(
                        "group relative text-left p-4 rounded-2xl border-2 transition-all duration-200 min-h-[72px]",
                        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40",
                        "hover:shadow-lg hover:shadow-primary-100/40 hover:-translate-y-0.5",
                        isSelected
                          ? "border-primary-600 bg-primary-50/60 shadow-md shadow-primary-100/30"
                          : "border-neutral-100 hover:border-primary-300 hover:bg-primary-50/30"
                      )}
                    >
                      {/* Selected checkmark */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-3.5">
                        {/* Gradient icon circle */}
                        <div
                          className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200",
                            isSelected
                              ? "bg-gradient-to-br from-primary-600 to-primary-700 shadow-md shadow-primary-400/20"
                              : "bg-gradient-to-br from-primary-50 to-primary-100 group-hover:from-primary-100 group-hover:to-primary-200"
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-5 h-5 transition-colors duration-200",
                              isSelected
                                ? "text-white"
                                : "text-primary-600 group-hover:text-primary-700"
                            )}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-primary-900 text-sm leading-tight">
                            {option.label}
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {option.description}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-medium text-primary-600/70 bg-primary-50 rounded-full px-2 py-0.5">
                            {option.duration}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          {/* ==============================================================
              Step 2 -- Funding Selection
              ============================================================== */}
          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transitionConfig}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-heading text-lg text-primary-900 mb-0.5">
                    How will you pay?
                  </h4>
                  <p className="text-sm text-neutral-500">
                    Select your funding method.{" "}
                    {selectedService && (
                      <span className="text-primary-600 font-medium">
                        {
                          serviceOptions.find((s) => s.id === selectedService)
                            ?.label
                        }
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => goTo(1)}
                  className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors shrink-0 px-3 py-2 rounded-lg hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                variants={cardStagger}
                initial="hidden"
                animate="show"
              >
                {availableFunding.map((option) => {
                  const Icon = option.icon;
                  const isDisabled = (option as { disabled?: boolean }).disabled;
                  const isSelected = selectedFunding === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      variants={cardItem}
                      disabled={isDisabled}
                      onClick={() => {
                        if (!isDisabled) handleFundingSelect(option.id);
                      }}
                      className={cn(
                        "group relative text-left p-4 rounded-2xl border-2 transition-all duration-200 min-h-[72px]",
                        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40",
                        isDisabled
                          ? "border-neutral-50 bg-neutral-50/50 opacity-[0.4] cursor-not-allowed"
                          : [
                              "hover:shadow-lg hover:shadow-primary-100/40 hover:-translate-y-0.5",
                              isSelected
                                ? "border-primary-600 bg-primary-50/60 shadow-md shadow-primary-100/30"
                                : "border-neutral-100 hover:border-primary-300 hover:bg-primary-50/30",
                            ]
                      )}
                    >
                      {/* Selected checkmark */}
                      {isSelected && !isDisabled && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}

                      {/* Lock for disabled */}
                      {isDisabled && (
                        <div className="absolute top-3 right-3">
                          <Lock className="w-3.5 h-3.5 text-neutral-300" />
                        </div>
                      )}

                      <div className="flex items-center gap-3.5">
                        <div
                          className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200",
                            isDisabled
                              ? "bg-neutral-100"
                              : isSelected
                                ? "bg-gradient-to-br from-primary-600 to-primary-700 shadow-md shadow-primary-400/20"
                                : "bg-gradient-to-br from-primary-50 to-primary-100 group-hover:from-primary-100 group-hover:to-primary-200"
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-5 h-5 transition-colors duration-200",
                              isDisabled
                                ? "text-neutral-300"
                                : isSelected
                                  ? "text-white"
                                  : "text-primary-600"
                            )}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p
                              className={cn(
                                "font-semibold text-sm leading-tight",
                                isDisabled
                                  ? "text-neutral-400"
                                  : "text-primary-900"
                              )}
                            >
                              {option.label}
                            </p>
                            {option.badgeLabel && !isDisabled && (
                              <Badge
                                variant={option.badgeVariant ?? "default"}
                                size="sm"
                                className="text-[10px] px-1.5 py-0"
                              >
                                {option.badgeLabel}
                              </Badge>
                            )}
                          </div>
                          <p
                            className={cn(
                              "text-xs mt-0.5",
                              isDisabled
                                ? "text-neutral-300"
                                : "text-neutral-500"
                            )}
                          >
                            {isDisabled
                              ? "Not available for this service"
                              : option.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {selectedService === "couples" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex items-start gap-2.5 p-4 bg-amber-50/80 border border-amber-200/50 rounded-xl"
                >
                  <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Medicare rebates do not apply to couples therapy. Only
                    self-funded sessions are available for couples therapy.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ==============================================================
              Step 3 -- Results
              ============================================================== */}
          {step === 3 && calculation && feeData && selectedService && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transitionConfig}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-heading text-lg text-primary-900 mb-0.5">
                    Your estimated cost
                  </h4>
                  <p className="text-sm text-neutral-500">
                    <span className="text-primary-700 font-medium">
                      {
                        serviceOptions.find((s) => s.id === selectedService)
                          ?.label
                      }
                    </span>
                    {" \u00B7 "}
                    <span className="text-primary-600">
                      {
                        fundingOptions.find((f) => f.id === selectedFunding)
                          ?.label
                      }
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => goTo(2)}
                    className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary-700 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 min-h-[44px]"
                    aria-label="Reset calculator"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>
              </div>

              {/* ---- Stacked bar chart ---- */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Fee Breakdown
                  </span>
                  <span className="text-xs text-neutral-400">
                    {formatCurrency(calculation.sessionFee)} total
                  </span>
                </div>
                <div className="h-10 rounded-2xl overflow-hidden bg-neutral-100/80 flex relative">
                  {calculation.rebateAmount > 0 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${calculation.rebatePercentage}%`,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-l-2xl relative flex items-center justify-center"
                    >
                      {calculation.rebatePercentage > 25 && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-[11px] font-bold text-white drop-shadow-sm"
                        >
                          {formatCurrency(calculation.rebateAmount)}
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${100 - calculation.rebatePercentage}%`,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.9,
                      delay: prefersReducedMotion ? 0 : 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      "bg-gradient-to-r from-primary-600 to-primary-500 relative flex items-center justify-center",
                      calculation.rebateAmount > 0
                        ? ""
                        : "rounded-l-2xl",
                      "rounded-r-2xl"
                    )}
                  >
                    {(100 - calculation.rebatePercentage) > 20 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-[11px] font-bold text-white drop-shadow-sm"
                      >
                        {formatCurrency(calculation.outOfPocket)}
                      </motion.span>
                    )}
                  </motion.div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
                  {calculation.rebateAmount > 0 && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400" />
                      <span className="text-xs text-neutral-600">
                        Rebate / Cover:{" "}
                        <span className="font-semibold text-emerald-700">
                          {formatCurrency(calculation.rebateAmount)}
                        </span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary-600 to-primary-500" />
                    <span className="text-xs text-neutral-600">
                      Your Cost:{" "}
                      <span className="font-semibold text-primary-700">
                        {formatCurrency(calculation.outOfPocket)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* ---- Big OOP number ---- */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : 0.3,
                }}
                className="relative text-center p-8 sm:p-10 rounded-2xl border-2 border-primary-300/60 bg-gradient-to-br from-primary-50/80 via-white to-primary-50/40 mb-6 overflow-hidden shadow-lg shadow-primary-100/40"
              >
                {/* Decorative sparkle */}
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-accent-400/30" />

                <p className="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-2">
                  Your Out-of-Pocket
                </p>
                <p className="text-5xl sm:text-7xl font-heading font-bold text-primary-900 tabular-nums tracking-tight">
                  {calculation.outOfPocket === 0
                    ? "$0.00"
                    : formatCurrency(animatedOOP)}
                </p>
                <p className="text-sm text-neutral-500 mt-1.5">
                  per session
                </p>

                {calculation.outOfPocket === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3"
                  >
                    <Badge variant="success" size="md">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      Fully Covered
                    </Badge>
                  </motion.div>
                )}
              </motion.div>

              {/* ---- Industry comparison ---- */}
              {calculation.savings > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: prefersReducedMotion ? 0 : 0.5,
                  }}
                  className="flex items-center gap-3 p-4 bg-emerald-50/80 border border-emerald-200/40 rounded-xl mb-6"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">
                      You save {formatCurrency(calculation.savings)} vs industry
                      average
                    </p>
                    <p className="text-xs text-emerald-700/70 mt-0.5">
                      Average session cost:{" "}
                      {formatCurrency(calculation.industryAvg)}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ---- Annual toggle ---- */}
              {(selectedFunding === "rebate" ||
                selectedFunding === "self-funded") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.6,
                  }}
                  className="mb-6"
                >
                  <button
                    onClick={() => setShowAnnual(!showAnnual)}
                    className="w-full flex items-center justify-between p-4 bg-neutral-50/80 rounded-xl border border-neutral-100 hover:bg-neutral-100/60 transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 group"
                    aria-expanded={showAnnual}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-100/60 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-primary-900">
                          Annual Cost Estimate
                        </p>
                        <p className="text-xs text-neutral-500">
                          Based on {MEDICARE_INFO.maxSessions} sessions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <AnimatePresence mode="wait">
                        {showAnnual && (
                          <motion.span
                            key="annual-val"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-lg font-bold text-primary-900 tabular-nums"
                          >
                            {formatCurrency(calculation.annualEstimate)}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {/* Toggle pill */}
                      <div
                        className={cn(
                          "relative w-10 h-6 rounded-full transition-colors duration-200",
                          showAnnual ? "bg-primary-600" : "bg-neutral-300"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
                            showAnnual
                              ? "translate-x-[22px]"
                              : "translate-x-[2px]"
                          )}
                        />
                      </div>
                    </div>
                  </button>
                </motion.div>
              )}

              {/* ---- Info note ---- */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.65,
                }}
                className="flex items-start gap-3 p-4 bg-primary-50/40 border border-primary-100/50 rounded-xl mb-5"
              >
                <Info className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                <p className="text-sm text-primary-800/80 leading-relaxed">
                  {calculation.note}
                </p>
              </motion.div>

              {/* ---- Referral callout ---- */}
              {calculation.requiresReferral && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.7,
                  }}
                  className="flex items-start gap-2.5 px-4 py-3 mb-6"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-neutral-600">
                    This funding method requires a GP referral and Mental Health
                    Treatment Plan.{" "}
                    <Link
                      href="/services/mental-health-treatment-plans"
                      className="text-primary-600 font-medium hover:text-primary-700 underline decoration-primary-200 hover:decoration-primary-400 transition-colors"
                    >
                      Learn how to get one
                    </Link>
                  </p>
                </motion.div>
              )}

              {/* ---- CTA ---- */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.75,
                }}
              >
                <Link
                  href="/practitioners"
                  className={cn(
                    "relative flex items-center justify-center gap-3 w-full px-8 py-5 font-heading font-bold text-xl rounded-2xl transition-all duration-200 group overflow-hidden min-h-[56px]",
                    "bg-gradient-to-r from-accent-500 to-accent-600 text-white",
                    "hover:from-accent-600 hover:to-accent-700 hover:shadow-2xl hover:shadow-accent-500/30 hover:-translate-y-1",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-400/50",
                    "active:translate-y-0"
                  )}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-accent-400/0 via-white/10 to-accent-400/0" />
                  <span className="relative">Book at This Rate</span>
                  <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ----------------------------------------------------------------
          Footer trust strip
          ---------------------------------------------------------------- */}
      <div className="border-t border-neutral-100 bg-neutral-50/60 px-6 py-3 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            AHPRA Registered
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            256-bit Encrypted
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Medicare Approved
          </span>
        </div>
      </div>
    </div>
  );
});

PricingCalculator.displayName = "PricingCalculator";
