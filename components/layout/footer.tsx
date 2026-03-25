"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Brain,
  Heart,
  AlertTriangle,
} from "lucide-react";
import { SITE_CONFIG, EMERGENCY } from "@/lib/constants";
import { footerNav } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Emergency resources bar — warm amber, above footer
   -------------------------------------------------------------------------- */

function EmergencyBar() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100/80 border-y border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-200/60">
              <AlertTriangle
                className="h-4 w-4 text-amber-700"
                aria-hidden="true"
              />
            </span>
            <span className="text-sm font-semibold text-amber-900">
              Crisis Support
            </span>
          </div>
          <div
            className="flex items-center gap-3 flex-wrap text-sm"
            role="list"
            aria-label="Emergency phone numbers"
          >
            <a
              href={`tel:${EMERGENCY.lifeline.phone.replace(/\s/g, "")}`}
              className={cn(
                "inline-flex items-center gap-1.5 font-medium text-amber-800",
                "hover:text-amber-950 transition-colors duration-200",
                "underline underline-offset-2 decoration-amber-300 hover:decoration-amber-500",
                "min-h-[44px] sm:min-h-0"
              )}
              role="listitem"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {EMERGENCY.lifeline.name} {EMERGENCY.lifeline.phone}
            </a>
            <span
              className="text-amber-300 hidden sm:inline"
              aria-hidden="true"
            >
              |
            </span>
            <a
              href={`tel:${EMERGENCY.beyondBlue.phone.replace(/\s/g, "")}`}
              className={cn(
                "inline-flex items-center gap-1.5 font-medium text-amber-800",
                "hover:text-amber-950 transition-colors duration-200",
                "underline underline-offset-2 decoration-amber-300 hover:decoration-amber-500",
                "min-h-[44px] sm:min-h-0"
              )}
              role="listitem"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {EMERGENCY.beyondBlue.name} {EMERGENCY.beyondBlue.phone}
            </a>
            <span
              className="text-amber-300 hidden sm:inline"
              aria-hidden="true"
            >
              |
            </span>
            <a
              href={`tel:${EMERGENCY.emergency.phone}`}
              className={cn(
                "inline-flex items-center gap-1.5 font-medium text-amber-800",
                "hover:text-amber-950 transition-colors duration-200",
                "underline underline-offset-2 decoration-amber-300 hover:decoration-amber-500",
                "min-h-[44px] sm:min-h-0"
              )}
              role="listitem"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {EMERGENCY.emergency.name} {EMERGENCY.emergency.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Newsletter signup inline — premium rounded input + accent button
   -------------------------------------------------------------------------- */

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-sand-200 uppercase tracking-wider mb-3">
        Stay Connected
      </h3>
      <p className="text-sm text-sand-300/80 mb-4 leading-relaxed">
        Mental health tips and updates delivered to your inbox.
      </p>
      {submitted ? (
        <div className="flex items-center gap-2 text-sm text-accent-400">
          <Heart className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Thank you for subscribing!</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex gap-2"
          aria-label="Newsletter signup"
        >
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={cn(
              "flex-1 min-w-0 rounded-full px-5 py-2.5",
              "bg-primary-900/80 border border-primary-700/40",
              "shadow-inner shadow-primary-950/30",
              "text-sm text-sand-200 placeholder:text-sand-500",
              "focus:outline-none focus:ring-[3px] focus:ring-accent-500/30 focus:border-accent-500/50",
              "transition-all duration-200",
              "min-h-[44px]"
            )}
          />
          <button
            type="submit"
            className={cn(
              "shrink-0 min-h-[44px] h-[44px] px-5 rounded-full",
              "bg-accent-400 text-primary-950 text-sm font-semibold",
              "shadow-md shadow-accent-500/20",
              "hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-500/25",
              "active:scale-95 active:shadow-sm",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
            )}
            aria-label="Subscribe to newsletter"
          >
            Join
          </button>
        </form>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Social icons (placeholder SVG circles)
   -------------------------------------------------------------------------- */

const socialLinks = [
  {
    name: "LinkedIn",
    letter: "Li",
    href: "#",
  },
  {
    name: "Instagram",
    letter: "Ig",
    href: "#",
  },
  {
    name: "Facebook",
    letter: "Fb",
    href: "#",
  },
];

function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((platform) => (
        <a
          key={platform.name}
          href={platform.href}
          className={cn(
            "inline-flex items-center justify-center w-10 h-10 rounded-full",
            "bg-primary-800/60 text-sand-300",
            "hover:bg-primary-700 hover:text-sand-100",
            "hover:scale-110",
            "transition-all duration-200 ease-out",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40",
            "text-xs font-medium"
          )}
          title={platform.name}
          aria-label={`Follow us on ${platform.name}`}
        >
          {platform.letter}
        </a>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Footer component — Premium dark gradient
   -------------------------------------------------------------------------- */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" id="site-footer">
      {/* Emergency bar */}
      <EmergencyBar />

      {/* Topographic wave pattern — CSS only */}
      <div className="relative bg-gradient-to-b from-primary-950 to-primary-900">
        {/* Decorative wave top edge */}
        <div
          className="absolute inset-x-0 top-0 h-16 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='40' viewBox='0 0 100 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q25 0 50 20 Q75 40 100 20' fill='none' stroke='white' stroke-width='0.5'/%3E%3Cpath d='M0 30 Q25 10 50 30 Q75 50 100 30' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "200px 40px",
          }}
        />

        {/* Main footer content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20 lg:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Column 1 — Brand + tagline + social */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                className={cn(
                  "inline-flex items-center gap-2 group",
                  "min-h-[44px]",
                  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 rounded-lg"
                )}
                aria-label={`${SITE_CONFIG.name} - Home`}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 shadow-sm">
                  <Brain
                    className="h-5 w-5 text-sand-100"
                    aria-hidden="true"
                    strokeWidth={1.8}
                  />
                </span>
                <span className="flex items-baseline gap-1">
                  <span className="font-heading text-xl text-sand-100 tracking-tight font-semibold">
                    MindBridge
                  </span>
                  <span className="font-sans text-sm text-sand-400 font-light">
                    Psychology
                  </span>
                </span>
              </Link>

              <p className="mt-4 text-sm text-sand-300 leading-relaxed max-w-sm">
                {SITE_CONFIG.tagline}. Expert clinical and registered
                psychologists delivering evidence-based therapy from anywhere
                in Australia.
              </p>

              <div className="mt-6">
                <SocialIcons />
              </div>
            </div>

            {/* Column 2 — Services */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-semibold text-sand-200 uppercase tracking-widest mb-5">
                Services
              </h3>
              <ul className="space-y-3" role="list">
                {footerNav.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-sand-400",
                        "underline decoration-transparent underline-offset-4 decoration-1",
                        "hover:decoration-sand-500/60",
                        "transition-all duration-200",
                        "min-h-[44px] inline-flex items-center",
                        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 rounded"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Quick Links */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold text-sand-200 uppercase tracking-widest mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3" role="list">
                {footerNav.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-sand-400",
                        "underline decoration-transparent underline-offset-4 decoration-1",
                        "hover:decoration-sand-500/60",
                        "transition-all duration-200",
                        "min-h-[44px] inline-flex items-center",
                        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 rounded"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Contact + Newsletter */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold text-sand-200 uppercase tracking-widest mb-5">
                Contact
              </h3>
              <ul className="space-y-3 mb-8" role="list">
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className={cn(
                      "flex items-center gap-2.5 text-sm text-sand-400 group",
                      "underline decoration-transparent underline-offset-4 decoration-1",
                      "hover:decoration-sand-500/60",
                      "transition-all duration-200",
                      "min-h-[44px]",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 rounded"
                    )}
                  >
                    <Mail
                      className="h-4 w-4 shrink-0 text-primary-500 group-hover:text-primary-400 transition-colors"
                      aria-hidden="true"
                    />
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className={cn(
                      "flex items-center gap-2.5 text-sm text-sand-400 group",
                      "underline decoration-transparent underline-offset-4 decoration-1",
                      "hover:decoration-sand-500/60",
                      "transition-all duration-200",
                      "min-h-[44px]",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 rounded"
                    )}
                  >
                    <Phone
                      className="h-4 w-4 shrink-0 text-primary-500 group-hover:text-primary-400 transition-colors"
                      aria-hidden="true"
                    />
                    {SITE_CONFIG.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-sand-400 min-h-[44px]">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-primary-500"
                    aria-hidden="true"
                  />
                  <span>{SITE_CONFIG.address}</span>
                </li>
              </ul>

              <div className="mb-6">
                <Link
                  href="/book"
                  className="focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-400/40 rounded-lg inline-block"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    iconRight={
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    }
                    className="shadow-md shadow-accent-500/20"
                  >
                    Book a Session
                  </Button>
                </Link>
              </div>

              <NewsletterSignup />
            </div>
          </div>
        </div>

        {/* ---- Acknowledgment of Country — warm earth-tone section ---- */}
        <div className="border-t border-primary-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-gradient-to-r from-amber-950/30 via-yellow-950/20 to-orange-950/25 rounded-xl px-6 py-5 border border-amber-900/15">
              <p className="text-xs text-sand-300/90 leading-relaxed max-w-4xl">
                <span className="font-semibold text-amber-400/70">
                  Acknowledgment of Country
                </span>{" "}
                &mdash; We acknowledge Aboriginal and Torres Strait Islander
                peoples as the Traditional Custodians of the lands on which we
                live, work, and connect. We pay our respects to Elders past,
                present, and emerging, and recognise the enduring connection of
                First Nations peoples to Country, culture, and community.
                Sovereignty was never ceded.
              </p>
            </div>
          </div>
        </div>

        {/* ---- Bottom bar — legal + copyright ---- */}
        <div className="border-t border-primary-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Left: AHPRA + ABN */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xs text-sand-500">
                <span>AHPRA registered practitioners</span>
                <span
                  className="hidden sm:inline text-primary-700"
                  aria-hidden="true"
                >
                  &middot;
                </span>
                <span>ABN: {SITE_CONFIG.abn}</span>
              </div>

              {/* Right: Copyright + legal links with dot separators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xs text-sand-500">
                <span>
                  &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
                </span>
                <span
                  className="hidden sm:inline text-primary-700"
                  aria-hidden="true"
                >
                  &middot;
                </span>
                <div className="flex items-center gap-0 flex-wrap">
                  {footerNav.legal.map((link, index) => (
                    <span key={link.href} className="flex items-center">
                      <Link
                        href={link.href}
                        className={cn(
                          "text-sand-400",
                          "underline decoration-transparent underline-offset-4 decoration-1",
                          "hover:decoration-sand-500/60",
                          "transition-all duration-200",
                          "min-h-[44px] sm:min-h-0 inline-flex items-center px-1.5",
                          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400/40 rounded"
                        )}
                      >
                        {link.label}
                      </Link>
                      {index < footerNav.legal.length - 1 && (
                        <span
                          className="text-primary-700 mx-0.5"
                          aria-hidden="true"
                        >
                          &middot;
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
