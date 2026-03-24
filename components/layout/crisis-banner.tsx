"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { EMERGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "mindbridge-crisis-banner-dismissed";

export function CrisisBanner() {
  const [dismissed, setDismissed] = useState(true); // default hidden to avoid flash
  const [expanded, setExpanded] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY) === "true";
    setDismissed(wasDismissed);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsAnimatingOut(true);
    // Allow the CSS transition to complete before removing from DOM
    const timer = setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem(DISMISS_KEY, "true");
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div
      role="banner"
      aria-label="Crisis support resources — call for immediate help"
      className={cn(
        "fixed top-0 left-0 right-0 z-[60]",
        "bg-gradient-to-r from-amber-50 to-amber-100/80",
        "border-b border-amber-200/60",
        "transition-all duration-300 ease-out",
        isAnimatingOut
          ? "opacity-0 -translate-y-full"
          : "opacity-100 translate-y-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact bar — always visible */}
        <div className="flex items-center justify-between gap-3 py-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="flex items-center justify-center w-7 h-7 rounded-md bg-amber-200/50 shrink-0"
              aria-hidden="true"
            >
              <Phone className="h-3.5 w-3.5 text-amber-700" />
            </span>

            {/* Mobile: compact with expand toggle */}
            <span className="sm:hidden text-sm font-medium text-amber-900 truncate">
              Need immediate support?
            </span>

            {/* Desktop: inline resources */}
            <div className="hidden sm:flex items-center gap-2 flex-wrap text-sm text-amber-900">
              <span className="font-medium shrink-0">
                Need immediate support?
              </span>
              <span className="text-amber-400" aria-hidden="true">
                &mdash;
              </span>
              <a
                href={`tel:${EMERGENCY.lifeline.phone.replace(/\s/g, "")}`}
                className={cn(
                  "font-semibold text-amber-800 hover:text-amber-950",
                  "underline underline-offset-2 decoration-amber-300 hover:decoration-amber-500",
                  "transition-colors duration-200"
                )}
              >
                {EMERGENCY.lifeline.name} {EMERGENCY.lifeline.phone}
              </a>
              <span className="text-amber-300" aria-hidden="true">
                |
              </span>
              <a
                href={`tel:${EMERGENCY.beyondBlue.phone.replace(/\s/g, "")}`}
                className={cn(
                  "font-semibold text-amber-800 hover:text-amber-950",
                  "underline underline-offset-2 decoration-amber-300 hover:decoration-amber-500",
                  "transition-colors duration-200"
                )}
              >
                {EMERGENCY.beyondBlue.name} {EMERGENCY.beyondBlue.phone}
              </a>
              <span className="text-amber-300" aria-hidden="true">
                |
              </span>
              <a
                href={`tel:${EMERGENCY.emergency.phone}`}
                className={cn(
                  "font-semibold text-amber-800 hover:text-amber-950",
                  "underline underline-offset-2 decoration-amber-300 hover:decoration-amber-500",
                  "transition-colors duration-200"
                )}
              >
                {EMERGENCY.emergency.name} {EMERGENCY.emergency.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Mobile expand/collapse toggle */}
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-label={
                expanded
                  ? "Collapse crisis support numbers"
                  : "Show crisis support numbers"
              }
              className={cn(
                "sm:hidden rounded-lg p-2",
                "min-h-[44px] min-w-[44px] flex items-center justify-center",
                "text-amber-600 hover:text-amber-800 hover:bg-amber-100/80",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-amber-500/40"
              )}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss crisis support banner"
              className={cn(
                "rounded-lg p-2",
                "min-h-[44px] min-w-[44px] flex items-center justify-center",
                "text-amber-600 hover:text-amber-800 hover:bg-amber-100/80",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-amber-500/40"
              )}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile expanded content */}
        <div
          className={cn(
            "sm:hidden overflow-hidden transition-all duration-300 ease-out",
            expanded ? "max-h-40 pb-3" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pl-9">
            <a
              href={`tel:${EMERGENCY.lifeline.phone.replace(/\s/g, "")}`}
              className={cn(
                "flex items-center gap-2 text-sm font-semibold text-amber-800",
                "hover:text-amber-950 transition-colors duration-200",
                "min-h-[44px] rounded-lg px-2 -mx-2 hover:bg-amber-100/60",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-amber-500/40"
              )}
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {EMERGENCY.lifeline.name} &mdash; {EMERGENCY.lifeline.phone}
            </a>
            <a
              href={`tel:${EMERGENCY.beyondBlue.phone.replace(/\s/g, "")}`}
              className={cn(
                "flex items-center gap-2 text-sm font-semibold text-amber-800",
                "hover:text-amber-950 transition-colors duration-200",
                "min-h-[44px] rounded-lg px-2 -mx-2 hover:bg-amber-100/60",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-amber-500/40"
              )}
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {EMERGENCY.beyondBlue.name} &mdash;{" "}
              {EMERGENCY.beyondBlue.phone}
            </a>
            <a
              href={`tel:${EMERGENCY.emergency.phone}`}
              className={cn(
                "flex items-center gap-2 text-sm font-semibold text-amber-800",
                "hover:text-amber-950 transition-colors duration-200",
                "min-h-[44px] rounded-lg px-2 -mx-2 hover:bg-amber-100/60",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-amber-500/40"
              )}
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {EMERGENCY.emergency.name} &mdash; {EMERGENCY.emergency.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
