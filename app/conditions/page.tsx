"use client";

import { useState, useMemo, useCallback, memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  CloudRain,
  Wind,
  Shield,
  Heart,
  Brain,
  Flame,
  Compass,
  Briefcase,
  Activity,
  Sun,
  CloudDrizzle,
  Baby,
  Users,
  Zap,
  HeartPulse,
  RotateCcw,
  AlertTriangle,
  Gauge,
  ShieldAlert,
  Layers,
  ShieldCheck,
  HeartCrack,
  Unlink,
  MessageCircle,
  Puzzle,
  BookOpen,
  CircleSlash,
  Dice5,
  Utensils,
  AlertCircle,
  Flower2,
  Sunset,
  Fingerprint,
  BatteryLow,
  ShieldX,
  Presentation,
  Scale,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { conditions, conditionCategoryOrder } from "@/data/conditions";
import { CONDITION_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks";
import { LazySection } from "@/components/ui/lazy-section";
import type { Condition, ConditionCategory } from "@/lib/types";

/* --------------------------------------------------------------------------
   Constants
   -------------------------------------------------------------------------- */

const VIRTUAL_PAGE_SIZE = 21; // 7 rows x 3 cols
const SEARCH_DEBOUNCE_MS = 300;

/* --------------------------------------------------------------------------
   Icon Mapper
   -------------------------------------------------------------------------- */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CloudRain,
  Activity,
  Sun,
  CloudDrizzle,
  Baby,
  Wind,
  Users,
  Zap,
  HeartPulse,
  RotateCcw,
  AlertTriangle,
  Gauge,
  ShieldAlert,
  Layers,
  Heart,
  ShieldCheck,
  Shield,
  HeartCrack,
  Unlink,
  MessageCircle,
  Brain,
  Puzzle,
  BookOpen,
  Flame,
  CircleSlash,
  Dice5,
  Utensils,
  AlertCircle,
  Flower2,
  Compass,
  Sunset,
  Fingerprint,
  BatteryLow,
  Briefcase,
  ShieldX,
  Presentation,
  Scale,
};

function getIcon(name: string) {
  return iconMap[name] ?? CloudRain;
}

/* Category-specific color tints for condition icons */
const categoryColors: Record<string, { bg: string; icon: string }> = {
  mood: { bg: "bg-primary-50 group-hover:bg-primary-100", icon: "text-primary-600" },
  anxiety: { bg: "bg-amber-50 group-hover:bg-amber-100", icon: "text-amber-600" },
  trauma: { bg: "bg-rose-50 group-hover:bg-rose-100", icon: "text-rose-600" },
  relationships: { bg: "bg-pink-50 group-hover:bg-pink-100", icon: "text-pink-600" },
  neurodevelopmental: { bg: "bg-violet-50 group-hover:bg-violet-100", icon: "text-violet-600" },
  behavioural: { bg: "bg-orange-50 group-hover:bg-orange-100", icon: "text-orange-600" },
  "life-transitions": { bg: "bg-sky-50 group-hover:bg-sky-100", icon: "text-sky-600" },
  identity: { bg: "bg-indigo-50 group-hover:bg-indigo-100", icon: "text-indigo-600" },
  workplace: { bg: "bg-emerald-50 group-hover:bg-emerald-100", icon: "text-emerald-600" },
};

function getCategoryColors(category: string) {
  return categoryColors[category] ?? categoryColors.mood;
}

/* --------------------------------------------------------------------------
   Condition Card (memoized)
   -------------------------------------------------------------------------- */

const ConditionCard = memo(function ConditionCard({
  condition,
  index,
}: {
  condition: Condition;
  index: number;
}) {
  const Icon = getIcon(condition.icon);
  const colors = getCategoryColors(condition.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.6),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/conditions/${condition.slug}`}
        className="group block h-full bg-white rounded-2xl border border-border-subtle p-6 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/40 transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="flex items-start gap-4">
          <div className={cn("flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors", colors.bg)}>
            <Icon className={cn("w-6 h-6", colors.icon)} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-primary-900 group-hover:text-primary-700 transition-colors mb-1.5">
              {condition.name}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
              {condition.shortDescription}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 mt-3 group-hover:gap-2 transition-all">
              Learn More
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

ConditionCard.displayName = "ConditionCard";

/* --------------------------------------------------------------------------
   Page Component
   -------------------------------------------------------------------------- */

export default function ConditionsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(VIRTUAL_PAGE_SIZE);

  // Debounce search to avoid filtering on every keystroke
  const debouncedSearch = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);

  const filteredConditions = useMemo(() => {
    let result = conditions;

    if (activeCategory !== "all") {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.shortDescription.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, debouncedSearch]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: conditions.length };
    for (const c of conditions) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Virtualised rendering: only show visibleCount items
  const visibleConditions = useMemo(() => {
    return filteredConditions.slice(0, visibleCount);
  }, [filteredConditions, visibleCount]);

  const hasMore = visibleCount < filteredConditions.length;

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(VIRTUAL_PAGE_SIZE);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setVisibleCount(VIRTUAL_PAGE_SIZE);
    },
    []
  );

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + VIRTUAL_PAGE_SIZE);
  }, []);

  return (
    <>
      <Breadcrumbs />

      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary-100/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-accent-100/20 blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="default" className="mb-4">
                Evidence-Based Treatment
              </Badge>
              <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
                Conditions We Treat
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Our psychologists provide evidence-based treatment for a wide range of
                mental health conditions. Explore the conditions below to learn more
                about symptoms, how therapy helps, and the approaches we use.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="pb-8">
        <div className="container-wide">
          {/* Search Input — debounced at 300ms */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
              <input
                type="text"
                placeholder="Search conditions..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-default bg-white text-primary-900 placeholder:text-sand-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
              />
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            <button
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === "all"
                  ? "bg-primary-700 text-white shadow-md shadow-primary-200"
                  : "bg-white text-text-secondary border border-border-default hover:border-primary-200 hover:text-primary-700"
              )}
            >
              All Conditions
              <span className="ml-1.5 text-xs opacity-70">{categoryCounts.all}</span>
            </button>
            {conditionCategoryOrder.map((catKey) => {
              const cat =
                CONDITION_CATEGORIES[catKey as keyof typeof CONDITION_CATEGORIES];
              if (!cat) return null;
              return (
                <button
                  key={catKey}
                  onClick={() => handleCategoryChange(catKey)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    activeCategory === catKey
                      ? "bg-primary-700 text-white shadow-md shadow-primary-200"
                      : "bg-white text-text-secondary border border-border-default hover:border-primary-200 hover:text-primary-700"
                  )}
                >
                  {cat.label}
                  <span className="ml-1.5 text-xs opacity-70">
                    {categoryCounts[catKey] || 0}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Results Count */}
          <p className="text-sm text-text-tertiary text-center mb-6">
            Showing {visibleConditions.length}
            {hasMore ? ` of ${filteredConditions.length}` : ""} condition
            {filteredConditions.length !== 1 ? "s" : ""}
            {activeCategory !== "all" &&
              ` in ${CONDITION_CATEGORIES[activeCategory as keyof typeof CONDITION_CATEGORIES]?.label ?? activeCategory}`}
            {debouncedSearch.trim() && ` matching "${debouncedSearch}"`}
          </p>

          {/* Conditions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {visibleConditions.map((condition, index) => (
                <ConditionCard
                  key={condition.slug}
                  condition={condition}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Load More — virtualisation for large lists (>20 items) */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-50 text-primary-700 font-medium rounded-xl hover:bg-primary-100 transition-colors"
              >
                Show More ({filteredConditions.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {filteredConditions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-tertiary text-lg">
                No conditions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange("all");
                }}
                className="mt-4 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <LazySection minHeight="300px" rootMargin="100px">
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 rounded-3xl px-8 py-16 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
              <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="font-heading text-3xl lg:text-4xl text-white mb-4">
                  Not Sure Where to Start?
                </h2>
                <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                  Our matching quiz helps you find the right psychologist based on
                  your specific needs, preferred approach, and funding method.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/match"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
                  >
                    Take the Matching Quiz
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/practitioners"
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  >
                    Browse Psychologists
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>
    </>
  );
}
