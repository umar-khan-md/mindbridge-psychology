"use client";

import { useState, useMemo, useCallback, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Sparkles,
  Heart,
  ClipboardCheck,
  Users,
  User,
  Star,
  Shield,
  DollarSign,
  CreditCard,
  Briefcase,
  Medal,
  Brain,
  MessageCircle,
  Palette,
  Globe,
  CloudRain,
  Wind,
  Flame,
  Compass,
  Calendar,
  ChevronDown,
  Award,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { practitioners } from "@/data/practitioners";
import { CONDITION_CATEGORIES, FUNDING_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Practitioner, FundingType } from "@/lib/types";

/* ============================================================================
   CONSTANTS & DATA
   ============================================================================ */

const TOTAL_STEPS = 5;

const CONDITION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  mood: CloudRain,
  anxiety: Wind,
  trauma: Shield,
  relationships: Heart,
  neurodevelopmental: Brain,
  behavioural: Flame,
  "life-transitions": Compass,
  workplace: Briefcase,
};

const CONDITION_DESCRIPTIONS: Record<string, string> = {
  mood: "Depression, bipolar, perinatal mood changes",
  anxiety: "Panic attacks, OCD, phobias, chronic stress",
  trauma: "PTSD, abuse recovery, complex trauma",
  relationships: "Couples, family conflict, attachment",
  neurodevelopmental: "Assessment, support strategies, coping",
  behavioural: "Anger, addiction, eating disorders",
  "life-transitions": "Grief, career change, identity, self-esteem",
  workplace: "Burnout, performance anxiety, work-life balance",
};

const conditionOptions = Object.entries(CONDITION_CATEGORIES).map(([key, val]) => ({
  id: key,
  label: val.label,
  description: CONDITION_DESCRIPTIONS[key] || "",
  Icon: CONDITION_ICONS[key] || Brain,
}));

const approachOptions = [
  { id: "CBT", label: "CBT", description: "Cognitive Behavioural Therapy -- restructure unhelpful thought patterns" },
  { id: "ACT", label: "ACT", description: "Acceptance & Commitment Therapy -- mindfulness & values-based action" },
  { id: "DBT", label: "DBT", description: "Dialectical Behaviour Therapy -- emotional regulation skills" },
  { id: "EMDR", label: "EMDR", description: "Eye Movement Desensitisation -- process traumatic memories" },
  { id: "Schema Therapy", label: "Schema", description: "Schema Therapy -- address deep-rooted patterns" },
  { id: "Psychodynamic", label: "Psychodynamic", description: "Explore unconscious processes & early experiences" },
  { id: "EFT", label: "EFT", description: "Emotionally Focused Therapy -- strengthen attachment bonds" },
  { id: "Narrative", label: "Narrative", description: "Re-author your story to find new meaning" },
  { id: "Mindfulness", label: "Mindfulness", description: "Mindfulness-Based -- present-moment awareness" },
  { id: "no-preference", label: "No preference", description: "I am open to any evidence-based approach" },
];

const fundingMethodOptions: {
  id: FundingType;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "bulk-bill", label: "Medicare Bulk Bill", description: "No out-of-pocket cost with a valid referral", Icon: Shield },
  { id: "rebate", label: "Medicare Rebate", description: "Partial rebate -- you pay the gap", Icon: DollarSign },
  { id: "self-funded", label: "Self-Funded", description: "Full private fee, no referral needed", Icon: CreditCard },
  { id: "ndis", label: "NDIS", description: "Funded through your NDIS plan", Icon: Shield },
  { id: "workcover", label: "WorkCover", description: "Workplace injury claim coverage", Icon: Briefcase },
  { id: "dva", label: "DVA", description: "Department of Veterans Affairs", Icon: Medal },
];

const genderOptions = [
  { id: "no-preference", label: "No preference" },
  { id: "female", label: "Female" },
  { id: "male", label: "Male" },
];

const STEP_LABELS = ["Concerns", "Approach", "Funding", "Preferences", "Results"];

/* ============================================================================
   ANIMATION VARIANTS
   ============================================================================ */

const cardSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
  }),
};

const staggerContainer: Variants = {
  enter: {},
  center: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const staggerItem: Variants = {
  enter: { opacity: 0, y: 12, scale: 0.96 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ============================================================================
   SCORING LOGIC
   ============================================================================ */

interface MatchResult {
  practitioner: Practitioner;
  score: number;
  reasons: string[];
}

function calculateMatch(
  practitioner: Practitioner,
  selectedConditions: string[],
  selectedApproaches: string[],
  selectedFunding: FundingType | null,
  genderPref: string,
  languagePref: string
): MatchResult {
  let score = 0;
  const reasons: string[] = [];

  const conditionKeywords: Record<string, string[]> = {
    mood: ["depression", "mood", "bipolar", "perinatal"],
    anxiety: ["anxiety", "panic", "ocd", "phobia", "stress"],
    trauma: ["trauma", "ptsd", "abuse", "violence", "emdr"],
    relationships: ["relationship", "couples", "family", "communication"],
    neurodevelopmental: ["adhd", "autism", "asd", "neurodevelopmental", "assessment"],
    behavioural: ["anger", "addiction", "gambling", "eating", "self-harm"],
    "life-transitions": ["grief", "loss", "career", "retirement", "identity", "esteem"],
    workplace: ["burnout", "workplace", "performance", "work-life", "corporate"],
  };

  // Condition matching (up to 40 pts)
  if (selectedConditions.length > 0) {
    for (const cat of selectedConditions) {
      const keywords = conditionKeywords[cat] || [];
      const matchedSpecs = practitioner.specialisations.filter((s) =>
        keywords.some((k) => s.toLowerCase().includes(k))
      );
      if (matchedSpecs.length > 0) {
        score += Math.min(40, matchedSpecs.length * 15);
        reasons.push(`Specialises in ${matchedSpecs[0]}`);
      }
    }
  }

  // Approach matching (up to 25 pts)
  if (selectedApproaches.length > 0 && !selectedApproaches.includes("no-preference")) {
    const matchedApproaches = practitioner.approaches.filter((a) =>
      selectedApproaches.some(
        (sel) =>
          a.toLowerCase().includes(sel.toLowerCase()) ||
          sel.toLowerCase().includes(a.toLowerCase().split(" ")[0])
      )
    );
    if (matchedApproaches.length > 0) {
      score += Math.min(25, matchedApproaches.length * 10);
      reasons.push(`Trained in ${matchedApproaches[0]}`);
    }
  } else if (selectedApproaches.includes("no-preference")) {
    score += 10;
  }

  // Funding matching (up to 20 pts)
  if (selectedFunding && practitioner.fundingAccepted.includes(selectedFunding)) {
    score += 20;
    reasons.push(`Accepts ${FUNDING_LABELS[selectedFunding]}`);
  }

  // Language matching (up to 5 pts)
  if (languagePref && languagePref !== "English") {
    if (practitioner.languages.includes(languagePref)) {
      score += 5;
      reasons.push(`Speaks ${languagePref}`);
    }
  }

  // Availability bonus
  if (practitioner.acceptingNewClients) {
    score += 3;
    reasons.push("Accepting new clients");
  }

  // Gender preference
  if (genderPref !== "no-preference") {
    const pronouns = practitioner.pronouns.toLowerCase();
    const isFemale = pronouns.includes("she");
    const isMale = pronouns.includes("he");
    if (
      (genderPref === "female" && isFemale) ||
      (genderPref === "male" && isMale)
    ) {
      score += 3;
    }
  }

  const maxPossible = 96;
  const percentage = Math.min(99, Math.round((score / maxPossible) * 100));

  return { practitioner, score: percentage, reasons };
}

/* ============================================================================
   CIRCULAR PROGRESS INDICATOR
   ============================================================================ */

function CircularProgress({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const progress = currentStep / totalSteps;
  const size = 64;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Track */}
      <svg width={size} height={size} className="absolute -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F6C254"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>
      {/* Inner label */}
      <span className="relative text-sm font-bold text-white font-heading">
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
}

/* ============================================================================
   SPARKLE MICRO-ANIMATION (for results header)
   ============================================================================ */

function SparkleField() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 1.5,
    size: 3 + Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-accent-400"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 2,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 3 + Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================================
   SELECTION CARD COMPONENT (visual card with icon, title, description)
   ============================================================================ */

function SelectionCard({
  selected,
  onClick,
  icon: Icon,
  label,
  description,
  compact = false,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  compact?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={staggerItem}
      whileHover={prefersReducedMotion ? {} : { y: -2 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative flex items-start gap-3 text-left rounded-2xl border-2 transition-all duration-200",
        "min-h-[44px] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 focus-visible:ring-offset-2",
        "motion-safe:transition-all motion-safe:duration-200",
        compact ? "px-4 py-3" : "px-5 py-4",
        selected
          ? "border-primary-500 bg-primary-50/80 shadow-md shadow-primary-200/30"
          : "border-neutral-200/80 bg-white hover:border-primary-300 hover:shadow-sm"
      )}
    >
      {/* Checkmark overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center"
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      {Icon && (
        <div
          className={cn(
            "mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
            selected
              ? "bg-primary-600 text-white"
              : "bg-neutral-100 text-neutral-500 group-hover:bg-primary-100 group-hover:text-primary-600"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0 pr-6">
        <span
          className={cn(
            "block text-sm font-semibold font-body transition-colors",
            selected ? "text-primary-800" : "text-neutral-800"
          )}
        >
          {label}
        </span>
        {description && (
          <span
            className={cn(
              "block text-xs mt-0.5 leading-relaxed transition-colors",
              selected ? "text-primary-600" : "text-neutral-500"
            )}
          >
            {description}
          </span>
        )}
      </div>
    </motion.button>
  );
}

/* ============================================================================
   MATCH CARD COMPONENT (results)
   ============================================================================ */

function MatchCard({ result, rank }: { result: MatchResult; rank: number }) {
  const { practitioner, score, reasons } = result;
  const prefersReducedMotion = useReducedMotion();
  const isBestMatch = rank === 0;

  const scoreColor =
    score >= 75 ? "text-emerald-600" : score >= 50 ? "text-primary-600" : "text-neutral-500";
  const barColor =
    score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-primary-500" : "bg-neutral-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      transition={{
        delay: prefersReducedMotion ? 0 : rank * 0.1,
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative bg-white rounded-2xl border-2 p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary-100/30",
        isBestMatch
          ? "border-accent-400 shadow-lg shadow-accent-100/30"
          : "border-neutral-100"
      )}
    >
      {/* Best Match Badge */}
      {isBestMatch && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="absolute -top-3.5 left-6"
        >
          <span className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-md shadow-accent-200/50 overflow-hidden">
            {/* Gold shimmer sweep */}
            <span
              className="absolute inset-0 motion-safe:animate-[badgeShimmer_2s_ease-out_0.5s_1_both]"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
              aria-hidden="true"
            />
            <Award className="w-3.5 h-3.5 relative" />
            <span className="relative">Best Match</span>
          </span>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* Avatar */}
        <div
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold font-heading shrink-0",
            isBestMatch
              ? "bg-gradient-to-br from-accent-400 to-accent-500 text-white"
              : "bg-primary-100 text-primary-700"
          )}
        >
          {practitioner.firstName[0]}
          {practitioner.lastName[0]}
        </div>

        <div className="flex-1 min-w-0 w-full">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-heading font-semibold text-primary-900 text-lg leading-tight">
                {practitioner.firstName} {practitioner.lastName}
              </h3>
              <p className="text-sm text-neutral-500 font-body">{practitioner.title}</p>
            </div>

            {/* Score display */}
            <div className="text-right shrink-0">
              <motion.div
                className={cn("text-3xl font-bold font-heading tabular-nums", scoreColor)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rank * 0.08 + 0.2 }}
              >
                {score}
                <span className="text-base">%</span>
              </motion.div>
              <p className="text-[11px] text-neutral-400 font-body uppercase tracking-wider">
                fit score
              </p>
            </div>
          </div>

          {/* Animated score bar */}
          <div className="mt-3 h-2 rounded-full bg-neutral-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{
                duration: prefersReducedMotion ? 0 : 1,
                delay: rank * 0.08 + 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn("h-full rounded-full", barColor)}
            />
          </div>

          {/* Match reason tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {reasons.slice(0, 5).map((reason, i) => (
              <motion.span
                key={reason}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : rank * 0.08 + 0.4 + i * 0.05,
                  duration: 0.2,
                }}
              >
                <Badge variant="default" size="sm" className="font-body">
                  {reason}
                </Badge>
              </motion.span>
            ))}
          </div>

          {/* Meta info */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 font-body">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {practitioner.yearsExperience} years experience
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {practitioner.languages.join(", ")}
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={`/practitioners/${practitioner.slug}`}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-body transition-all duration-200 group",
                "min-h-[44px]",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 focus-visible:ring-offset-2",
                isBestMatch
                  ? "bg-primary-700 text-white hover:bg-primary-800 shadow-md shadow-primary-200/40"
                  : "bg-primary-50 text-primary-700 hover:bg-primary-100"
              )}
            >
              View Profile
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 motion-safe:transition-transform" />
            </Link>
            {practitioner.acceptingNewClients && practitioner.calendlyUrl && (
              <Link
                href={practitioner.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-body transition-all duration-200",
                  "min-h-[44px]",
                  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-400/40 focus-visible:ring-offset-2",
                  isBestMatch
                    ? "bg-accent-500 text-white hover:bg-accent-600 shadow-md shadow-accent-200/40"
                    : "bg-accent-50 text-accent-700 hover:bg-accent-100"
                )}
              >
                <Zap className="w-4 h-4" />
                Book Now
              </Link>
            )}
            {practitioner.acceptingNewClients && (
              <Badge variant="success" size="sm" className="font-body">
                Accepting clients
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   PROGRESS DOTS
   ============================================================================ */

function ProgressDots({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isComplete = stepNum < current;

        return (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              layout
              className={cn(
                "rounded-full transition-all duration-300",
                isActive
                  ? "w-8 h-2.5 bg-primary-600"
                  : isComplete
                    ? "w-2.5 h-2.5 bg-primary-400"
                    : "w-2.5 h-2.5 bg-neutral-200"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================================
   MAIN WIZARD COMPONENT
   ============================================================================ */

export const MatchingWizard = memo(function MatchingWizard() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedApproaches, setSelectedApproaches] = useState<string[]>([]);
  const [selectedFunding, setSelectedFunding] = useState<FundingType | null>(null);
  const [genderPref, setGenderPref] = useState("no-preference");
  const [languagePref, setLanguagePref] = useState("");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const transitionDuration = prefersReducedMotion ? 0 : 0.35;

  const toggleItem = useCallback(
    (list: string[], setList: (val: string[]) => void, item: string) => {
      if (item === "no-preference") {
        setList(["no-preference"]);
        return;
      }
      const filtered = list.filter((i) => i !== "no-preference");
      if (filtered.includes(item)) {
        setList(filtered.filter((i) => i !== item));
      } else {
        setList([...filtered, item]);
      }
    },
    []
  );

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    for (const p of practitioners) {
      for (const l of p.languages) {
        langs.add(l);
      }
    }
    return Array.from(langs).sort();
  }, []);

  const results = useMemo<MatchResult[]>(() => {
    if (step <= TOTAL_STEPS) return [];
    return practitioners
      .map((p) =>
        calculateMatch(p, selectedConditions, selectedApproaches, selectedFunding, genderPref, languagePref)
      )
      .sort((a, b) => b.score - a.score);
  }, [step, selectedConditions, selectedApproaches, selectedFunding, genderPref, languagePref]);

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return selectedConditions.length > 0;
      case 2:
        return selectedApproaches.length > 0;
      case 3:
        return selectedFunding !== null;
      case 4:
        return true; // preferences are optional
      case 5:
        return true; // review
      default:
        return false;
    }
  }, [step, selectedConditions, selectedApproaches, selectedFunding]);

  const next = useCallback(() => {
    if (step <= TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step]);

  const back = useCallback(() => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  const reset = useCallback(() => {
    setDirection(-1);
    setStep(1);
    setSelectedConditions([]);
    setSelectedApproaches([]);
    setSelectedFunding(null);
    setGenderPref("no-preference");
    setLanguagePref("");
  }, []);

  // Scroll to top of wizard on step change
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step]);

  const showResults = step > TOTAL_STEPS;
  const topMatches = results.filter((r) => r.score > 0);

  // Step metadata
  const stepMeta: Record<number, { icon: React.ComponentType<{ className?: string }>; heading: string; subtext: string }> = {
    1: {
      icon: Brain,
      heading: "What brings you here today?",
      subtext: "Select all areas of concern. Choose as many as you need.",
    },
    2: {
      icon: Palette,
      heading: "Any preferred therapy approach?",
      subtext: "If you know what works for you, select it. Otherwise, choose \"No preference.\"",
    },
    3: {
      icon: DollarSign,
      heading: "How will you fund your sessions?",
      subtext: "This ensures we match you with practitioners who accept your funding type.",
    },
    4: {
      icon: User,
      heading: "Final preferences",
      subtext: "These are optional and help us refine your match even further.",
    },
    5: {
      icon: Sparkles,
      heading: "Ready to find your match?",
      subtext: "Review your selections below, then hit \"Find My Matches\" to see your personalised results.",
    },
  };

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-3xl border border-neutral-200/60 shadow-2xl shadow-primary-100/20 overflow-hidden"
    >
      {/* ---- HEADER ---- */}
      <div className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 px-6 sm:px-8 py-6 overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-1">
              <Sparkles className="w-5 h-5 text-accent-400" />
              <h3 className="font-heading text-lg sm:text-xl text-white">
                {showResults ? "Your Matches" : "Smart Matching Wizard"}
              </h3>
            </div>
            <p className="text-primary-200/80 text-sm font-body max-w-md">
              {showResults
                ? `We found ${topMatches.length} psychologists ranked by fit`
                : `Step ${step} of ${TOTAL_STEPS} -- ${STEP_LABELS[step - 1]}`}
            </p>
          </div>

          {/* Circular progress */}
          {!showResults && (
            <CircularProgress currentStep={step} totalSteps={TOTAL_STEPS} />
          )}
        </div>
      </div>

      {/* ---- BODY ---- */}
      <div className="px-6 sm:px-8 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ================================================================
              STEP 1: CONDITION SELECTION (Icon grid, multi-select)
              ================================================================ */}
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={cardSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeader icon={stepMeta[1].icon} heading={stepMeta[1].heading} subtext={stepMeta[1].subtext} />
              <motion.div
                variants={staggerContainer}
                initial="enter"
                animate="center"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {conditionOptions.map((option) => (
                  <SelectionCard
                    key={option.id}
                    selected={selectedConditions.includes(option.id)}
                    onClick={() => toggleItem(selectedConditions, setSelectedConditions, option.id)}
                    icon={option.Icon}
                    label={option.label}
                    description={option.description}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ================================================================
              STEP 2: APPROACH SELECTION (cards with description)
              ================================================================ */}
          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={cardSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeader icon={stepMeta[2].icon} heading={stepMeta[2].heading} subtext={stepMeta[2].subtext} />
              <motion.div
                variants={staggerContainer}
                initial="enter"
                animate="center"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {approachOptions.map((option) => (
                  <SelectionCard
                    key={option.id}
                    selected={selectedApproaches.includes(option.id)}
                    onClick={() => toggleItem(selectedApproaches, setSelectedApproaches, option.id)}
                    label={option.label}
                    description={option.description}
                    icon={option.id === "no-preference" ? MessageCircle : undefined}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ================================================================
              STEP 3: FUNDING SELECTION (cards with cost indicator)
              ================================================================ */}
          {step === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={cardSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeader icon={stepMeta[3].icon} heading={stepMeta[3].heading} subtext={stepMeta[3].subtext} />
              <motion.div
                variants={staggerContainer}
                initial="enter"
                animate="center"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {fundingMethodOptions.map((option) => (
                  <SelectionCard
                    key={option.id}
                    selected={selectedFunding === option.id}
                    onClick={() => setSelectedFunding(option.id)}
                    icon={option.Icon}
                    label={option.label}
                    description={option.description}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ================================================================
              STEP 4: PREFERENCES (gender pills, language dropdown)
              ================================================================ */}
          {step === 4 && (
            <motion.div
              key="step-4"
              custom={direction}
              variants={cardSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeader icon={stepMeta[4].icon} heading={stepMeta[4].heading} subtext={stepMeta[4].subtext} />

              <div className="space-y-8">
                {/* Gender pills */}
                <div>
                  <p className="text-sm font-semibold text-primary-900 mb-3 font-body flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary-500" />
                    Practitioner gender preference
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {genderOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setGenderPref(option.id)}
                        className={cn(
                          "px-5 py-2.5 rounded-full text-sm font-semibold font-body transition-all duration-200",
                          "min-h-[44px]",
                          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 focus-visible:ring-offset-2",
                          genderPref === option.id
                            ? "bg-primary-600 text-white shadow-md shadow-primary-200/40"
                            : "bg-neutral-100 text-neutral-600 hover:bg-primary-50 hover:text-primary-700"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language dropdown */}
                <div>
                  <p className="text-sm font-semibold text-primary-900 mb-3 font-body flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary-500" />
                    Language preference
                  </p>
                  <div className="relative max-w-xs">
                    <button
                      onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                      className={cn(
                        "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border-2 text-sm font-body text-left transition-all duration-200",
                        "min-h-[44px]",
                        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 focus-visible:ring-offset-2",
                        languagePref
                          ? "border-primary-500 bg-primary-50/60 text-primary-800"
                          : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300"
                      )}
                    >
                      <span>{languagePref || "Any language"}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-neutral-400 transition-transform duration-200",
                          showLanguageDropdown && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {showLanguageDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-20 mt-1 w-full bg-white rounded-xl border border-neutral-200 shadow-xl shadow-neutral-200/50 overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              setLanguagePref("");
                              setShowLanguageDropdown(false);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-2.5 text-sm font-body hover:bg-primary-50 transition-colors",
                              "min-h-[44px]",
                              !languagePref ? "text-primary-700 bg-primary-50" : "text-neutral-600"
                            )}
                          >
                            Any language
                          </button>
                          {allLanguages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => {
                                setLanguagePref(lang);
                                setShowLanguageDropdown(false);
                              }}
                              className={cn(
                                "w-full text-left px-4 py-2.5 text-sm font-body hover:bg-primary-50 transition-colors",
                                "min-h-[44px]",
                                languagePref === lang
                                  ? "text-primary-700 bg-primary-50"
                                  : "text-neutral-600"
                              )}
                            >
                              {lang}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================================================================
              STEP 5: REVIEW & CONFIRM
              ================================================================ */}
          {step === 5 && (
            <motion.div
              key="step-5"
              custom={direction}
              variants={cardSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeader icon={stepMeta[5].icon} heading={stepMeta[5].heading} subtext={stepMeta[5].subtext} />

              <div className="space-y-4">
                <ReviewRow
                  label="Concerns"
                  value={
                    selectedConditions
                      .map((id) => conditionOptions.find((c) => c.id === id)?.label)
                      .filter(Boolean)
                      .join(", ") || "None selected"
                  }
                />
                <ReviewRow
                  label="Approach"
                  value={
                    selectedApproaches
                      .map((id) => approachOptions.find((a) => a.id === id)?.label)
                      .filter(Boolean)
                      .join(", ") || "None selected"
                  }
                />
                <ReviewRow
                  label="Funding"
                  value={selectedFunding ? FUNDING_LABELS[selectedFunding] : "Not specified"}
                />
                <ReviewRow
                  label="Gender preference"
                  value={genderOptions.find((g) => g.id === genderPref)?.label || "No preference"}
                />
                <ReviewRow label="Language" value={languagePref || "Any"} />
              </div>
            </motion.div>
          )}

          {/* ================================================================
              RESULTS PAGE
              ================================================================ */}
          {showResults && (
            <motion.div
              key="results"
              custom={direction}
              variants={cardSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Results heading with sparkle animation */}
              <div className="relative text-center mb-8">
                <SparkleField />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-100 mb-4">
                    <Sparkles className="w-7 h-7 text-accent-600" />
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-primary-900 mb-2">
                    We found {topMatches.length} matches
                  </h3>
                  <p className="text-neutral-500 font-body text-sm max-w-md mx-auto">
                    Ranked by how closely each practitioner fits your needs and preferences
                  </p>
                </motion.div>
              </div>

              {/* Match cards */}
              <div className="space-y-5">
                {topMatches.map((result, i) => (
                  <MatchCard key={result.practitioner.slug} result={result} rank={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- NAVIGATION FOOTER ---- */}
        {!showResults && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
            <button
              onClick={back}
              disabled={step === 1}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold font-body transition-all duration-200",
                "min-h-[44px] px-4 py-2 rounded-xl",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 focus-visible:ring-offset-2",
                step === 1
                  ? "text-neutral-300 cursor-not-allowed"
                  : "text-neutral-600 hover:text-primary-700 hover:bg-primary-50"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <ProgressDots current={step} total={TOTAL_STEPS} />

            <button
              onClick={next}
              disabled={!canProceed}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold font-body transition-all duration-200 group",
                "min-h-[44px]",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 focus-visible:ring-offset-2",
                canProceed
                  ? step === TOTAL_STEPS
                    ? "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent-200/40"
                    : "bg-primary-700 text-white hover:bg-primary-800 shadow-md shadow-primary-200/30"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              )}
            >
              {step === TOTAL_STEPS ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Find My Matches
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 motion-safe:transition-transform" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Start Over floating button (results only) */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={reset}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold font-body",
                "bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all duration-200",
                "shadow-sm hover:shadow-md",
                "min-h-[44px]",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 focus-visible:ring-offset-2"
              )}
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
});

MatchingWizard.displayName = "MatchingWizard";

/* ============================================================================
   HELPER SUB-COMPONENTS
   ============================================================================ */

function StepHeader({
  icon: Icon,
  heading,
  subtext,
}: {
  icon: React.ComponentType<{ className?: string }>;
  heading: string;
  subtext: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-primary-600" />
        </div>
        <h4 className="font-heading text-xl font-bold text-primary-900">{heading}</h4>
      </div>
      <p className="text-sm text-neutral-500 font-body pl-[42px]">{subtext}</p>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-neutral-50/80 border border-neutral-100">
      <span className="text-sm font-semibold text-primary-800 font-body shrink-0">{label}</span>
      <span className="text-sm text-neutral-600 font-body text-right">{value}</span>
    </div>
  );
}

/* Badge shimmer keyframe */
if (typeof document !== "undefined" && !document.getElementById("badge-shimmer-kf")) {
  const style = document.createElement("style");
  style.id = "badge-shimmer-kf";
  style.textContent = `
    @keyframes badgeShimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @media (prefers-reduced-motion: reduce) {
      .motion-safe\\:animate-\\[badgeShimmer_2s_ease-out_0\\.5s_1_both\\] {
        animation: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}
