"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Search, X } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PractitionerCard } from "@/components/features/practitioner-card";
import { practitioners } from "@/data/practitioners";
import { FUNDING_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

/* ==========================================================================
   Team Directory — MindBridge Psychology
   ========================================================================== */

const SEARCH_DEBOUNCE_MS = 300;
const VIRTUAL_PAGE_SIZE = 21; // 7 rows x 3 cols

// Derive filter options from data (computed once at module level)
const allSpecialisations = Array.from(
  new Set(practitioners.flatMap((p) => p.specialisations))
).sort();

const allApproaches = Array.from(
  new Set(practitioners.flatMap((p) => p.approaches))
).sort();

const allFunding = Array.from(
  new Set(practitioners.flatMap((p) => p.fundingAccepted))
).sort();

export function TeamPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [approach, setApproach] = useState("");
  const [funding, setFunding] = useState("");
  const [visibleCount, setVisibleCount] = useState(VIRTUAL_PAGE_SIZE);

  // Debounce search input at 300ms
  const debouncedSearch = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  const hasFilters = debouncedSearch || specialisation || approach || funding;

  const filtered = useMemo(() => {
    return practitioners
      .filter((p) => {
        // Name search (debounced)
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase();
          const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
          if (!fullName.includes(q)) return false;
        }

        // Specialisation
        if (specialisation && !p.specialisations.includes(specialisation)) {
          return false;
        }

        // Approach
        if (approach && !p.approaches.includes(approach)) {
          return false;
        }

        // Funding
        if (funding && !p.fundingAccepted.includes(funding as any)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => a.order - b.order);
  }, [debouncedSearch, specialisation, approach, funding]);

  // Virtualised rendering for large result sets (>20)
  const visiblePractitioners = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const hasMore = visibleCount < filtered.length;

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

  function clearFilters() {
    setSearchQuery("");
    setSpecialisation("");
    setApproach("");
    setFunding("");
    setVisibleCount(VIRTUAL_PAGE_SIZE);
  }

  return (
    <>
      <Breadcrumbs />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-primary-600 mb-4">
              Our Team
            </p>
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-primary-900 mb-6">
              Our Psychologists
            </h1>
            <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Every psychologist on our team is AHPRA-registered, holds postgraduate
              qualifications, and brings genuine expertise to their specialisation.
              Find the right fit for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Filter Bar ───────────────────────────────────────────────────── */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-end">
            {/* Search — debounced at 300ms */}
            <div className="relative flex-1 lg:max-w-xs">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={cn(
                  "block w-full rounded-lg border bg-white pl-10 pr-3.5 py-2.5 text-sm text-primary-900",
                  "placeholder:text-neutral-400 transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary-500 focus:border-primary-500",
                  "border-neutral-300 hover:border-neutral-400"
                )}
              />
            </div>

            {/* Specialisation */}
            <div className="flex-1 lg:max-w-xs">
              <select
                value={specialisation}
                onChange={(e) => {
                  setSpecialisation(e.target.value);
                  setVisibleCount(VIRTUAL_PAGE_SIZE);
                }}
                className={cn(
                  "block w-full appearance-none rounded-lg border bg-white pl-3.5 pr-10 py-2.5 text-sm text-primary-900",
                  "transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary-500 focus:border-primary-500",
                  "border-neutral-300 hover:border-neutral-400"
                )}
              >
                <option value="">All Specialisations</option>
                {allSpecialisations.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Approach */}
            <div className="flex-1 lg:max-w-xs">
              <select
                value={approach}
                onChange={(e) => {
                  setApproach(e.target.value);
                  setVisibleCount(VIRTUAL_PAGE_SIZE);
                }}
                className={cn(
                  "block w-full appearance-none rounded-lg border bg-white pl-3.5 pr-10 py-2.5 text-sm text-primary-900",
                  "transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary-500 focus:border-primary-500",
                  "border-neutral-300 hover:border-neutral-400"
                )}
              >
                <option value="">All Approaches</option>
                {allApproaches.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Funding */}
            <div className="flex-1 lg:max-w-xs">
              <select
                value={funding}
                onChange={(e) => {
                  setFunding(e.target.value);
                  setVisibleCount(VIRTUAL_PAGE_SIZE);
                }}
                className={cn(
                  "block w-full appearance-none rounded-lg border bg-white pl-3.5 pr-10 py-2.5 text-sm text-primary-900",
                  "transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary-500 focus:border-primary-500",
                  "border-neutral-300 hover:border-neutral-400"
                )}
              >
                <option value="">All Funding</option>
                {allFunding.map((f) => (
                  <option key={f} value={f}>
                    {FUNDING_LABELS[f] ?? f}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear */}
            {(searchQuery || specialisation || approach || funding) && (
              <button
                onClick={clearFilters}
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg",
                  "text-primary-700 hover:bg-primary-50 transition-colors"
                )}
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── Grid ─────────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {visiblePractitioners.length > 0 ? (
            <motion.div
              ref={gridRef}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visiblePractitioners.map((practitioner) => (
                <motion.div key={practitioner.slug} variants={staggerItem}>
                  <PractitionerCard practitioner={practitioner} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
                <Search className="h-7 w-7 text-primary-400" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-xl text-primary-900 mb-2">
                No psychologists match your criteria
              </h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Try adjusting your filters or clearing them to see all available
                psychologists.
              </p>
              <button
                onClick={clearFilters}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-5 h-11 text-sm font-medium rounded-lg",
                  "bg-primary-700 text-white hover:bg-primary-800 transition-colors"
                )}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Load More — virtualisation for >20 results */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-50 text-primary-700 font-medium rounded-xl hover:bg-primary-100 transition-colors"
              >
                Show More ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {/* Result count */}
          {hasFilters && filtered.length > 0 && (
            <p className="text-sm text-neutral-500 mt-8 text-center">
              Showing {visiblePractitioners.length}
              {hasMore ? ` of ${filtered.length}` : ""} of{" "}
              {practitioners.length} psychologists
            </p>
          )}
        </div>
      </section>
    </>
  );
}
