"use client";

import { useState, useEffect, useCallback } from "react";
import { EMERGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "mindbridge-crisis-banner-dismissed";

export function CrisisBanner() {
  const [dismissed, setDismissed] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY) === "true";
    setDismissed(wasDismissed);
    if (!wasDismissed) {
      document.documentElement.style.setProperty("--crisis-banner-h", "28px");
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setIsAnimatingOut(true);
    document.documentElement.style.setProperty("--crisis-banner-h", "0px");
    const timer = setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem(DISMISS_KEY, "true");
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div
      role="banner"
      aria-label="Crisis support resources — call for immediate help"
      className={cn(
        "fixed top-0 left-0 right-0 z-[60]",
        "bg-primary-950/90 backdrop-blur-sm",
        "transition-all duration-250 ease-out",
        isAnimatingOut
          ? "opacity-0 -translate-y-full"
          : "opacity-100 translate-y-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-1.5 text-[11px] tracking-wide text-white/70 overflow-hidden">
            <span className="shrink-0 font-medium text-white/50 uppercase tracking-widest">
              Crisis
            </span>
            <span className="text-white/20 shrink-0" aria-hidden="true">|</span>
            <a
              href={`tel:${EMERGENCY.lifeline.phone.replace(/\s/g, "")}`}
              className="shrink-0 hover:text-white transition-colors"
            >
              Lifeline {EMERGENCY.lifeline.phone}
            </a>
            <span className="text-white/20 shrink-0 hidden sm:inline" aria-hidden="true">·</span>
            <a
              href={`tel:${EMERGENCY.beyondBlue.phone.replace(/\s/g, "")}`}
              className="shrink-0 hover:text-white transition-colors hidden sm:inline"
            >
              Beyond Blue {EMERGENCY.beyondBlue.phone}
            </a>
            <span className="text-white/20 shrink-0 hidden sm:inline" aria-hidden="true">·</span>
            <a
              href={`tel:${EMERGENCY.emergency.phone}`}
              className="shrink-0 hover:text-white transition-colors hidden sm:inline"
            >
              Emergency {EMERGENCY.emergency.phone}
            </a>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss crisis support banner"
            className={cn(
              "shrink-0 ml-3 p-1 rounded",
              "text-white/40 hover:text-white/80",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            )}
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
