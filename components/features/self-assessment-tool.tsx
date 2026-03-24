"use client";

import { useState, useCallback, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Shield,
  Copy,
  CheckCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   K10 Questions & Response Options
   ========================================================================== */

const K10_QUESTIONS = [
  "About how often did you feel tired out for no good reason?",
  "About how often did you feel nervous?",
  "About how often did you feel so nervous that nothing could calm you down?",
  "About how often did you feel hopeless?",
  "About how often did you feel restless or fidgety?",
  "About how often did you feel so restless you could not sit still?",
  "About how often did you feel depressed?",
  "About how often did you feel that everything was an effort?",
  "About how often did you feel so sad that nothing could cheer you up?",
  "About how often did you feel worthless?",
] as const;

const RESPONSE_OPTIONS = [
  { value: 1, label: "None of the time" },
  { value: 2, label: "A little of the time" },
  { value: 3, label: "Some of the time" },
  { value: 4, label: "Most of the time" },
  { value: 5, label: "All of the time" },
] as const;

/* ==========================================================================
   Score Interpretation
   ========================================================================== */

interface ScoreResult {
  range: string;
  label: string;
  description: string;
  recommendation: string;
  gaugeColor: string;
  gaugeTrackColor: string;
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
  severity: "well" | "mild" | "moderate" | "severe";
}

function getScoreResult(score: number): ScoreResult {
  if (score <= 19) {
    return {
      range: "10 -- 19",
      label: "Likely to be well",
      description:
        "Your score suggests you are likely experiencing low levels of psychological distress. This is within the normal range and indicates healthy emotional functioning.",
      recommendation:
        "Continue maintaining your current wellbeing practices. If you have specific concerns, a single consultation with a psychologist can provide reassurance and personalised strategies.",
      gaugeColor: "#059669",
      gaugeTrackColor: "#d1fae5",
      bgGradient: "from-emerald-50 to-teal-50",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
      severity: "well",
    };
  }
  if (score <= 24) {
    return {
      range: "20 -- 24",
      label: "Likely to have a mild disorder",
      description:
        "Your score suggests you may be experiencing mild levels of psychological distress. You may be noticing some changes in mood, sleep, energy, or day-to-day functioning.",
      recommendation:
        "Consider speaking with your GP about a Mental Health Treatment Plan. Early intervention with a psychologist can help build coping strategies before symptoms escalate.",
      gaugeColor: "#ca8a04",
      gaugeTrackColor: "#fef9c3",
      bgGradient: "from-yellow-50 to-amber-50",
      badgeBg: "bg-yellow-100",
      badgeText: "text-yellow-800",
      severity: "mild",
    };
  }
  if (score <= 29) {
    return {
      range: "25 -- 29",
      label: "Likely to have a moderate disorder",
      description:
        "Your score indicates moderate levels of psychological distress. You may be finding it difficult to manage daily responsibilities, relationships, or work demands.",
      recommendation:
        "We recommend booking an appointment with a psychologist. A GP Mental Health Treatment Plan will give you access to Medicare-rebated sessions. Professional support can make a meaningful difference at this stage.",
      gaugeColor: "#d97706",
      gaugeTrackColor: "#fef3c7",
      bgGradient: "from-amber-50 to-orange-50",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-800",
      severity: "moderate",
    };
  }
  return {
    range: "30 -- 50",
    label: "Likely to have a severe disorder",
    description:
      "Your score indicates high levels of psychological distress. You may be experiencing significant difficulties with mood, anxiety, daily functioning, or relationships.",
    recommendation:
      "We strongly recommend seeking professional support as soon as possible. Please speak with your GP or contact MindBridge Psychology to book an urgent appointment. If you are in crisis, please call Lifeline on 13 11 14 or emergency services on 000.",
    gaugeColor: "#dc2626",
    gaugeTrackColor: "#fee2e2",
    bgGradient: "from-red-50 to-rose-50",
    badgeBg: "bg-red-100",
    badgeText: "text-red-800",
    severity: "severe",
  };
}

/* ==========================================================================
   Circular Progress Ring (question progress)
   ========================================================================== */

function CircularProgress({
  progress,
  size = 56,
  strokeWidth = 4,
  children,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-primary-100"
        />
        {/* Fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-primary-600"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/* ==========================================================================
   Animated Score Gauge (results page)
   ========================================================================== */

function ScoreGauge({
  score,
  maxScore = 50,
  result,
}: {
  score: number;
  maxScore?: number;
  result: ScoreResult;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [displayScore, setDisplayScore] = useState(0);
  const animationRef = useRef<number | null>(null);

  const size = 220;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  // Semi-circle (270 degrees)
  const arcAngle = 270;
  const arcLength = (arcAngle / 360) * 2 * Math.PI * radius;
  const progress = (score - 10) / (maxScore - 10); // K10 min is 10
  const filledLength = progress * arcLength;
  const startAngle = (360 - arcAngle) / 2 + 90; // start from bottom-left

  // Animate the score count-up
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayScore(score);
      return;
    }
    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [score, prefersReducedMotion]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={result.gaugeTrackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${2 * Math.PI * radius}`}
          transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
        />
        {/* Filled arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={result.gaugeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${2 * Math.PI * radius}`}
          transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: arcLength - filledLength }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.5,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.3,
          }}
        />
      </svg>
      {/* Score text in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-heading text-5xl tabular-nums"
          style={{ color: result.gaugeColor }}
        >
          {displayScore}
        </span>
        <span className="text-sm text-neutral-400 mt-1">out of 50</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   Framer Motion Variants
   ========================================================================== */

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
};

const resultsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const pillVariants = {
  idle: { scale: 1 },
  selected: { scale: 1.02 },
  tap: { scale: 0.98 },
};

/* ==========================================================================
   Main Component
   ========================================================================== */

export const SelfAssessmentTool = memo(function SelfAssessmentTool() {
  const prefersReducedMotion = useReducedMotion();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(K10_QUESTIONS.length).fill(null)
  );
  const [direction, setDirection] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalQuestions = K10_QUESTIONS.length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const allAnswered = answeredCount === totalQuestions;
  const totalScore = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);

  /* ---- Handlers ---- */

  const handleAnswer = useCallback(
    (value: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = value;
        return next;
      });

      // Auto-advance after selection delay
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setDirection(1);
          setCurrentQuestion((prev) => prev + 1);
        }
      }, prefersReducedMotion ? 150 : 400);
    },
    [currentQuestion, totalQuestions, prefersReducedMotion]
  );

  const goBack = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const goToQuestion = useCallback(
    (idx: number) => {
      // Only allow navigating to answered questions or the next unanswered
      if (answers[idx] !== null || idx <= answeredCount) {
        setDirection(idx > currentQuestion ? 1 : -1);
        setCurrentQuestion(idx);
      }
    },
    [answers, answeredCount, currentQuestion]
  );

  const handleShowResults = useCallback(() => {
    setShowResults(true);
  }, []);

  const handleRestart = useCallback(() => {
    setAnswers(new Array(K10_QUESTIONS.length).fill(null));
    setCurrentQuestion(0);
    setDirection(1);
    setShowResults(false);
    setCopied(false);
  }, []);

  const handleCopyScore = useCallback(() => {
    const result = getScoreResult(totalScore);
    const text = `My K10 Psychological Distress Score: ${totalScore}/50 (${result.label}). The K10 is a widely used clinical screening tool for psychological distress.`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [totalScore]);

  const transitionConfig = {
    duration: prefersReducedMotion ? 0 : 0.35,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  /* ====================================================================
     Results View
     ==================================================================== */

  if (showResults) {
    const result = getScoreResult(totalScore);
    const isSevere = result.severity === "severe" || result.severity === "moderate";

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={resultsVariants}
        className="space-y-6"
      >
        {/* Score Card */}
        <motion.div
          variants={itemVariants}
          className={cn(
            "relative overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br shadow-sm",
            result.bgGradient
          )}
        >
          {/* Subtle decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/15 blur-2xl" />

          {/* Subtle sparkle celebration for "well" results (CSS only) */}
          {result.severity === "well" && !prefersReducedMotion && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-[sparkleFloat_2.5s_ease-out_forwards]"
                  style={{
                    left: `${15 + i * 10}%`,
                    top: `${60 + (i % 3) * 10}%`,
                    animationDelay: `${0.2 + i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative px-8 py-10 flex flex-col items-center text-center">
            <p className="text-sm font-body font-medium tracking-wide text-neutral-500 uppercase mb-6">
              Your K10 Score
            </p>

            <ScoreGauge score={totalScore} result={result} />

            <div
              className={cn(
                "mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-body",
                result.badgeBg,
                result.badgeText
              )}
            >
              <span>{result.range}</span>
              <span className="w-px h-4 bg-current opacity-25" />
              <span>{result.label}</span>
            </div>
          </div>
        </motion.div>

        {/* Interpretation */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-neutral-100 bg-white shadow-sm p-8 space-y-6"
        >
          <div>
            <h3 className="font-heading text-xl text-primary-900 mb-3">
              What This Means
            </h3>
            <p className="font-body text-neutral-600 leading-relaxed">
              {result.description}
            </p>
          </div>

          <div className="w-full h-px bg-neutral-100" />

          <div>
            <h3 className="font-heading text-xl text-primary-900 mb-3">
              Our Recommendation
            </h3>
            <p className="font-body text-neutral-600 leading-relaxed">
              {result.recommendation}
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          {/* Book a Session - more prominent for higher scores */}
          <Link
            href="/book"
            className={cn(
              "relative inline-flex items-center justify-center gap-3 px-8 py-4 font-body font-semibold text-white rounded-2xl",
              "bg-primary-700 hover:bg-primary-800",
              "transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
              "min-h-[44px] group",
              isSevere && "shadow-accent-500/25 shadow-lg"
            )}
          >
            {isSevere && (
              <span className="absolute inset-0 rounded-2xl bg-accent-500/10 animate-pulse" />
            )}
            <Sparkles className={cn(
              "w-5 h-5 relative",
              isSevere ? "text-accent-300" : "text-primary-200"
            )} />
            <span className="relative">Book a Session</span>
            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRestart}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-6 py-3.5 font-body font-medium rounded-2xl",
                "border border-neutral-200 text-neutral-700 bg-white",
                "hover:bg-neutral-50 hover:border-neutral-300",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
                "min-h-[44px] flex-1"
              )}
            >
              <RotateCcw className="w-4 h-4" />
              Retake Assessment
            </button>

            <button
              onClick={handleCopyScore}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-6 py-3.5 font-body font-medium rounded-2xl",
                "border border-neutral-200 text-neutral-700 bg-white",
                "hover:bg-neutral-50 hover:border-neutral-300",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
                "min-h-[44px] flex-1"
              )}
            >
              {copied ? (
                <>
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Share Anonymously
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Clinical Disclaimer */}
        <motion.div
          variants={itemVariants}
          className="flex items-start gap-3.5 p-5 bg-sand-50/80 rounded-2xl border border-sand-200"
        >
          <Shield className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
          <p className="text-sm font-body text-neutral-500 leading-relaxed">
            <strong className="text-neutral-700">Clinical disclaimer:</strong>{" "}
            The K10 is a screening instrument, not a diagnostic tool. It
            indicates the level of distress you may be experiencing but does not
            replace a professional clinical assessment. Please consult a
            qualified psychologist for a comprehensive evaluation and
            personalised treatment recommendations.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  /* ====================================================================
     Question View
     ==================================================================== */

  return (
    <div className="space-y-6">
      {/* Top bar: circular progress + question count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CircularProgress progress={progressPercent} size={56} strokeWidth={4}>
            <span className="text-sm font-body font-bold text-primary-700">
              {progressPercent}%
            </span>
          </CircularProgress>
          <div>
            <p className="text-sm font-body font-semibold text-primary-900">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
            <p className="text-xs font-body text-neutral-400">
              {answeredCount} answered
            </p>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={goBack}
          disabled={currentQuestion === 0}
          aria-label="Go to previous question"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-body font-medium rounded-xl",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
            "min-h-[44px]",
            currentQuestion === 0
              ? "text-neutral-300 cursor-not-allowed"
              : "text-neutral-600 hover:text-primary-700 hover:bg-primary-50"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Question Card */}
      <div className="relative min-h-[440px] sm:min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transitionConfig}
            className={cn(
              "rounded-2xl border border-neutral-100 bg-white shadow-sm",
              "p-6 sm:p-8"
            )}
          >
            {/* Context label */}
            <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-primary-500 mb-4">
              In the past 4 weeks...
            </p>

            {/* Question text */}
            <h3 className="font-heading text-xl sm:text-2xl lg:text-[1.7rem] leading-snug text-primary-900 mb-8">
              {K10_QUESTIONS[currentQuestion]}
            </h3>

            {/* Likert pill buttons */}
            <div className="flex flex-col gap-3">
              {RESPONSE_OPTIONS.map((option) => {
                const isSelected = answers[currentQuestion] === option.value;
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    variants={pillVariants}
                    initial="idle"
                    animate={isSelected ? "selected" : "idle"}
                    whileTap="tap"
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    className={cn(
                      "relative w-full text-left px-5 py-4 rounded-2xl border-2",
                      "font-body font-medium text-[0.95rem]",
                      "transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
                      "min-h-[44px]",
                      isSelected
                        ? "border-primary-500 bg-primary-600 text-white shadow-md"
                        : "border-neutral-200 text-neutral-700 bg-white hover:border-primary-300 hover:bg-primary-50/60"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span>{option.label}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25 shrink-0"
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation: progress dots + next/results */}
      <div className="flex items-center justify-between">
        {/* Progress dots */}
        <div
          className="flex items-center gap-1.5 flex-wrap"
          role="navigation"
          aria-label="Question navigation"
        >
          {K10_QUESTIONS.map((_, idx) => {
            const isActive = idx === currentQuestion;
            const isAnswered = answers[idx] !== null;
            const isAccessible = isAnswered || idx <= answeredCount;

            return (
              <button
                key={idx}
                onClick={() => goToQuestion(idx)}
                disabled={!isAccessible}
                aria-label={`Question ${idx + 1}${isAnswered ? " (answered)" : ""}`}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "rounded-full transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50",
                  isActive
                    ? "w-7 h-3 bg-primary-600"
                    : isAnswered
                    ? "w-3 h-3 bg-primary-400 hover:bg-primary-500 cursor-pointer"
                    : isAccessible
                    ? "w-3 h-3 bg-neutral-200 hover:bg-neutral-300 cursor-pointer"
                    : "w-3 h-3 bg-neutral-100 cursor-default"
                )}
              />
            );
          })}
        </div>

        {/* Next / View Results */}
        {currentQuestion === totalQuestions - 1 && allAnswered ? (
          <button
            onClick={handleShowResults}
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 font-body font-semibold text-white rounded-xl",
              "bg-primary-700 hover:bg-primary-800",
              "transition-all duration-200 shadow-sm hover:shadow-md",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
              "min-h-[44px] group"
            )}
          >
            View Results
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        ) : (
          <button
            onClick={() => {
              if (currentQuestion < totalQuestions - 1) {
                setDirection(1);
                setCurrentQuestion((prev) => prev + 1);
              }
            }}
            disabled={currentQuestion === totalQuestions - 1}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-3 text-sm font-body font-medium rounded-xl",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
              "min-h-[44px]",
              currentQuestion === totalQuestions - 1
                ? "text-neutral-300 cursor-not-allowed"
                : "text-neutral-600 hover:text-primary-700 hover:bg-primary-50"
            )}
          >
            Skip
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
});

SelfAssessmentTool.displayName = "SelfAssessmentTool";

/* Sparkle float keyframe injected globally via Tailwind arbitrary values.
   The keyframe is referenced as animate-[sparkleFloat_2.5s_ease-out_forwards]. */
if (typeof document !== "undefined" && !document.getElementById("sparkle-kf")) {
  const style = document.createElement("style");
  style.id = "sparkle-kf";
  style.textContent = `
    @keyframes sparkleFloat {
      0%   { transform: translateY(0) scale(0); opacity: 0; }
      20%  { transform: translateY(-10px) scale(1); opacity: 0.8; }
      100% { transform: translateY(-60px) scale(0.4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
