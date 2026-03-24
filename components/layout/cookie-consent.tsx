"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "mindbridge-cookie-consent";

type ConsentChoice = "all" | "essential" | null;

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentChoice;
    if (!stored) {
      // Small delay before showing banner for smoother UX
      const timer = setTimeout(() => {
        setVisible(true);
        // Trigger slide-up animation on next frame
        requestAnimationFrame(() => setAnimateIn(true));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleChoice(choice: "all" | "essential") {
    localStorage.setItem(CONSENT_KEY, choice);
    setAnimateIn(false);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => setVisible(false), 300);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-out",
        animateIn ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-white border-t border-sand-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Message */}
            <p className="text-sand-700 text-sm leading-relaxed flex-1">
              We use cookies to improve your experience and analyse website
              usage. For more details, see our{" "}
              <Link
                href="/privacy-policy#cookies-analytics"
                className="text-primary-700 hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleChoice("essential")}
              >
                Essential Only
              </Button>
              <Button size="sm" onClick={() => handleChoice("all")}>
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
