"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  ChevronDown,
  User,
  Heart,
  Users,
  ClipboardCheck,
  Shield,
  Building2,
  GraduationCap,
  FileText,
  ArrowRight,
  Calendar,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNav, ctaNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import {
  mobileMenuPanel,
  mobileNavItem,
  mobileNavStagger,
  dropdownVariants,
} from "@/lib/animations";

/* --------------------------------------------------------------------------
   Icon map for services mega menu
   -------------------------------------------------------------------------- */

const iconMap: Record<string, React.ReactNode> = {
  User: <User className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  ClipboardCheck: <ClipboardCheck className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
  GraduationCap: <GraduationCap className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
};

/* --------------------------------------------------------------------------
   Header component — 21st.dev Premium Glassmorphism
   -------------------------------------------------------------------------- */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  /* ---- Scroll listener ---- */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Close mobile on route change ---- */
  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  /* ---- Lock body scroll when mobile menu open ---- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---- Close mega menu on outside click ---- */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(e.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ---- Escape key closes mega menu & mobile; focus trap in mobile menu ---- */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (megaMenuOpen) {
          setMegaMenuOpen(false);
          // Return focus to the Services button
          megaMenuRef.current?.querySelector("button")?.focus();
        }
        if (mobileOpen) {
          setMobileOpen(false);
          // Return focus to the hamburger button
          mobileMenuBtnRef.current?.focus();
        }
      }

      // Focus trap for mobile menu
      if (mobileOpen && e.key === "Tab") {
        const mobileNav = document.getElementById("mobile-nav-panel");
        if (!mobileNav) return;
        const focusableEls = mobileNav.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableEls.length === 0) return;
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [megaMenuOpen, mobileOpen]);

  /* ---- Check active link ---- */
  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  /* ---- Mega menu hover handlers with delay ---- */
  function handleMegaMenuEnter() {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setMegaMenuOpen(true);
  }

  function handleMegaMenuLeave() {
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 200);
  }

  /* ---- Nav item references ---- */
  const servicesNav = mainNav.find((item) => item.label === "Services");
  const topLevelLinks = mainNav.filter(
    (item) => item.label !== "Services" && item.label !== "Conditions"
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-200 ease-out",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-primary-100/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ---- Logo with Brain icon ---- */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group min-h-[44px] min-w-[44px]"
            aria-label={`${SITE_CONFIG.name} - Home`}
          >
            <span className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 shadow-md group-hover:shadow-lg transition-shadow duration-200 motion-safe:animate-[logoPulse_1.5s_ease-out_0.3s_1_both]">
              <Brain
                className="h-5.5 w-5.5 text-white"
                aria-hidden="true"
                strokeWidth={1.8}
              />
            </span>
            <span className="flex items-baseline gap-1">
              <span className="font-heading text-xl lg:text-2xl text-primary-800 tracking-tight font-semibold">
                MindBridge
              </span>
              <span className="hidden sm:inline font-sans text-sm lg:text-base text-primary-500 font-light">
                Psychology
              </span>
            </span>
          </Link>

          {/* ---- Desktop Navigation ---- */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Primary navigation"
          >
            {topLevelLinks.map((item, index) => (
              <span key={item.href} className="flex items-center">
                {index > 0 && (
                  <span
                    className="w-px h-4 bg-primary-200/60 mx-1"
                    aria-hidden="true"
                  />
                )}
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 rounded-full text-sm font-medium",
                    "transition-all duration-200 min-h-[44px] inline-flex items-center",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 focus-visible:ring-offset-2",
                    isActive(item.href)
                      ? "text-primary-800 bg-primary-100/80"
                      : "text-primary-700 hover:text-primary-900 hover:bg-primary-50/80"
                  )}
                >
                  {item.label}
                </Link>
              </span>
            ))}

            {/* Separator before Services */}
            <span
              className="w-px h-4 bg-primary-200/60 mx-1"
              aria-hidden="true"
            />

            {/* Services with mega-menu */}
            {servicesNav && (
              <div
                ref={megaMenuRef}
                className="relative"
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
              >
                <button
                  type="button"
                  onClick={() => setMegaMenuOpen((prev) => !prev)}
                  aria-expanded={megaMenuOpen}
                  aria-controls="mega-menu-panel"
                  aria-haspopup="true"
                  className={cn(
                    "relative px-3.5 py-2 rounded-full text-sm font-medium",
                    "transition-all duration-200 min-h-[44px] inline-flex items-center gap-1",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 focus-visible:ring-offset-2",
                    isActive("/services")
                      ? "text-primary-800 bg-primary-100/80"
                      : "text-primary-700 hover:text-primary-900 hover:bg-primary-50/80"
                  )}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      megaMenuOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {/* Mega menu dropdown */}
                <AnimatePresence>
                  {megaMenuOpen && (
                    <motion.div
                      id="mega-menu-panel"
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-3",
                        "w-[680px] rounded-2xl",
                        "bg-white/95 backdrop-blur-xl",
                        "shadow-xl shadow-primary-950/8",
                        "border border-primary-100/80",
                        "p-6"
                      )}
                      role="menu"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {servicesNav.children?.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            role="menuitem"
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-xl",
                              "hover:bg-primary-50/80 transition-all duration-200",
                              "group min-h-[44px]",
                              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40"
                            )}
                          >
                            <span
                              className={cn(
                                "mt-0.5 flex items-center justify-center w-9 h-9 rounded-lg shrink-0",
                                "bg-primary-50 text-primary-600",
                                "group-hover:bg-primary-100 group-hover:text-primary-700",
                                "transition-colors duration-200"
                              )}
                            >
                              {service.icon
                                ? iconMap[service.icon] || (
                                    <FileText className="h-5 w-5" />
                                  )
                                : <FileText className="h-5 w-5" />}
                            </span>
                            <div className="min-w-0">
                              <span className="text-sm font-medium text-primary-900 group-hover:text-primary-700 transition-colors block">
                                {service.label}
                              </span>
                              {service.description && (
                                <p className="text-xs text-primary-500 mt-0.5 line-clamp-2 leading-relaxed">
                                  {service.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-primary-100">
                        <Link
                          href="/services"
                          className={cn(
                            "inline-flex items-center gap-1.5 text-sm font-medium",
                            "text-primary-700 hover:text-primary-900 transition-colors",
                            "min-h-[44px] px-3 -ml-3 rounded-lg",
                            "hover:bg-primary-50/60",
                            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40"
                          )}
                        >
                          View All Services
                          <ArrowRight
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </nav>

          {/* ---- Desktop CTA ---- */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={ctaNav.href}
              className="focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-400/40 focus-visible:ring-offset-2 rounded-lg"
            >
              <Button
                variant="secondary"
                size="md"
                iconLeft={
                  <Calendar className="h-4.5 w-4.5" aria-hidden="true" />
                }
                className={cn(
                  "shadow-lg shadow-accent-500/25 font-bold",
                  "hover:shadow-xl hover:shadow-accent-500/35",
                  "hover:-translate-y-0.5",
                  "transition-all duration-200"
                )}
              >
                {ctaNav.label}
              </Button>
            </Link>
          </div>

          {/* ---- Mobile hamburger ---- */}
          <button
            ref={mobileMenuBtnRef}
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              "lg:hidden relative z-50 p-2.5 -mr-2 rounded-xl",
              "min-h-[44px] min-w-[44px] flex items-center justify-center",
              "text-primary-700 hover:bg-primary-50 transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40"
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            <span className="sr-only">
              {mobileOpen ? "Close menu" : "Open menu"}
            </span>
            <div className="relative w-6 h-6">
              <span
                className={cn(
                  "absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-200 ease-out",
                  mobileOpen
                    ? "top-[11px] rotate-45"
                    : "top-[5px] rotate-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[11px] w-6 h-0.5 bg-current rounded-full transition-opacity duration-200",
                  mobileOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-200 ease-out",
                  mobileOpen
                    ? "top-[11px] -rotate-45"
                    : "top-[17px] rotate-0"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ---- Mobile full-screen overlay + menu ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — glass */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-primary-950/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Full-screen panel — glass background */}
            <motion.nav
              id="mobile-nav-panel"
              variants={mobileMenuPanel}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                "fixed inset-0 z-40 lg:hidden",
                "bg-white/95 backdrop-blur-xl",
                "flex flex-col overflow-y-auto"
              )}
              aria-label="Mobile navigation"
            >
              {/* Top bar with logo and close hint */}
              <div className="flex items-center justify-between px-6 h-16 shrink-0 border-b border-primary-100/60">
                <span className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-700 to-primary-800">
                    <Brain
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="font-heading text-lg text-primary-800 font-semibold">
                    MindBridge
                  </span>
                </span>
              </div>

              {/* Nav links — staggered animation */}
              <motion.div
                variants={mobileNavStagger}
                initial="closed"
                animate="open"
                className="flex flex-col px-4 py-6 gap-1 flex-1"
              >
                {mainNav
                  .filter((item) => item.label !== "Conditions")
                  .map((item) => (
                    <motion.div key={item.href} variants={mobileNavItem}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-3.5 px-4 rounded-xl text-base font-medium transition-all duration-200",
                          "min-h-[44px] flex items-center",
                          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40",
                          isActive(item.href)
                            ? "text-primary-800 bg-primary-100/80"
                            : "text-primary-700 hover:bg-primary-50/80 hover:text-primary-900"
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>

                      {/* Sub-items for services */}
                      {item.children && (
                        <div className="ml-4 mt-1 mb-2 flex flex-col gap-0.5 border-l-2 border-primary-100 pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "block py-2.5 px-3 rounded-lg text-sm",
                                "text-primary-600 hover:text-primary-800 hover:bg-primary-50/60",
                                "transition-colors duration-200 min-h-[44px] flex items-center",
                                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40"
                              )}
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}

                {/* Additional links */}
                <motion.div variants={mobileNavItem}>
                  <Link
                    href="/faq"
                    className={cn(
                      "block py-3.5 px-4 rounded-xl text-base font-medium",
                      "text-primary-700 hover:bg-primary-50/80 transition-all duration-200",
                      "min-h-[44px] flex items-center",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    FAQ
                  </Link>
                </motion.div>

                <motion.div variants={mobileNavItem}>
                  <Link
                    href="/contact"
                    className={cn(
                      "block py-3.5 px-4 rounded-xl text-base font-medium",
                      "text-primary-700 hover:bg-primary-50/80 transition-all duration-200",
                      "min-h-[44px] flex items-center",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.div>

              {/* Bottom CTA section */}
              <div className="px-6 py-6 border-t border-primary-100/60 bg-primary-50/40 shrink-0">
                <Link
                  href={ctaNav.href}
                  onClick={() => setMobileOpen(false)}
                  className="focus-visible:outline-none"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    iconLeft={
                      <Calendar className="h-5 w-5" aria-hidden="true" />
                    }
                    className="shadow-md shadow-accent-500/20"
                  >
                    {ctaNav.label}
                  </Button>
                </Link>
                <p className="mt-3 text-xs text-center text-primary-500">
                  Free 15-minute consultation available
                </p>

                {/* Quick contact */}
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className={cn(
                    "mt-3 flex items-center justify-center gap-2 text-sm text-primary-600",
                    "hover:text-primary-800 transition-colors duration-200",
                    "min-h-[44px]"
                  )}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Logo pulse keyframe (one-time on first load, very subtle) */}
      <style jsx global>{`
        @keyframes logoPulse {
          0%   { box-shadow: 0 0 0 0 rgba(13,115,119,0.4); }
          50%  { box-shadow: 0 0 0 6px rgba(13,115,119,0.0); }
          100% { box-shadow: 0 0 0 0 rgba(13,115,119,0.0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[logoPulse_1\\.5s_ease-out_0\\.3s_1_both\\] {
            animation: none !important;
          }
        }
      `}</style>
    </header>
  );
}
