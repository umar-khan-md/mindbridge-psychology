"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Globe,
  ArrowRight,
  Phone,
  Video,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Practitioner } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FUNDING_LABELS, SITE_CONFIG } from "@/lib/constants";
import { cn, getInitials } from "@/lib/utils";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

/* ==========================================================================
   Practitioner Profile Content
   ========================================================================== */

interface PractitionerProfileProps {
  practitioner: Practitioner;
}

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PractitionerProfile({ practitioner }: PractitionerProfileProps) {
  const initials = getInitials(practitioner.firstName, practitioner.lastName);
  const fullName = `${practitioner.firstName} ${practitioner.lastName}`;

  const specsRef = useRef<HTMLDivElement>(null);
  const specsInView = useInView(specsRef, { once: true, margin: "-60px" });

  const fundingRef = useRef<HTMLDivElement>(null);
  const fundingInView = useInView(fundingRef, { once: true, margin: "-60px" });

  return (
    <>
      <Breadcrumbs />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Photo placeholder */}
            <AnimatedSection>
              <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl bg-primary-100 flex items-center justify-center shrink-0 mx-auto lg:mx-0">
                <span className="font-heading text-6xl lg:text-7xl text-primary-400 select-none">
                  {initials}
                </span>
              </div>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection className="flex-1 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-3">
                <h1 className="font-heading text-3xl lg:text-4xl xl:text-5xl text-primary-900">
                  {fullName}
                </h1>
                {practitioner.acceptingNewClients ? (
                  <Badge variant="success" size="md">
                    Accepting New Clients
                  </Badge>
                ) : (
                  <Badge variant="warning" size="md">
                    Waitlist
                  </Badge>
                )}
              </div>
              <p className="text-lg text-neutral-600 mb-1">
                {practitioner.title} &middot;{" "}
                <span className="text-neutral-400">{practitioner.pronouns}</span>
              </p>
              <p className="text-sm text-neutral-400 mb-6">
                AHPRA: {practitioner.ahpraNumber} &middot; {practitioner.yearsExperience} years experience
              </p>

              {/* Qualifications */}
              <div className="space-y-2 mb-8">
                {practitioner.qualifications.map((qual) => (
                  <div
                    key={qual}
                    className="flex items-start gap-2.5 text-neutral-600"
                  >
                    <GraduationCap
                      className="h-4.5 w-4.5 text-primary-500 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">{qual}</span>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {practitioner.calendlyUrl ? (
                  <a
                    href={practitioner.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold rounded-xl",
                      "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900",
                      "transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    )}
                  >
                    Book a Session
                    <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href="/book"
                    className={cn(
                      "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold rounded-xl",
                      "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900",
                      "transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    )}
                  >
                    Book a Session
                    <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
                  </Link>
                )}
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className={cn(
                    "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-medium rounded-xl",
                    "border border-primary-700 text-primary-700 bg-transparent",
                    "hover:bg-primary-50 transition-colors"
                  )}
                >
                  <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                  Call Us
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Main Content + Sidebar ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Main content */}
            <div className="flex-1 space-y-16">
              {/* About */}
              <AnimatedSection>
                <h2 className="font-heading text-2xl lg:text-3xl text-primary-900 mb-6">
                  About {practitioner.firstName}
                </h2>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  {practitioner.bio}
                </p>
              </AnimatedSection>

              {/* Specialisations */}
              <div>
                <AnimatedSection>
                  <h2 className="font-heading text-2xl lg:text-3xl text-primary-900 mb-6">
                    Specialisations
                  </h2>
                </AnimatedSection>
                <motion.div
                  ref={specsRef}
                  initial="hidden"
                  animate={specsInView ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="flex flex-wrap gap-2.5"
                >
                  {practitioner.specialisations.map((spec) => (
                    <motion.span key={spec} variants={staggerItem}>
                      <Badge variant="default" size="md">
                        {spec}
                      </Badge>
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Therapeutic Approaches */}
              <AnimatedSection>
                <h2 className="font-heading text-2xl lg:text-3xl text-primary-900 mb-6">
                  Therapeutic Approaches
                </h2>
                <div className="space-y-3">
                  {practitioner.approaches.map((approach) => (
                    <div
                      key={approach}
                      className="flex items-center gap-3 text-neutral-600"
                    >
                      <CheckCircle
                        className="h-5 w-5 text-primary-500 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-base">{approach}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Funding Accepted */}
              <div>
                <AnimatedSection>
                  <h2 className="font-heading text-2xl lg:text-3xl text-primary-900 mb-6">
                    Funding Accepted
                  </h2>
                </AnimatedSection>
                <motion.div
                  ref={fundingRef}
                  initial="hidden"
                  animate={fundingInView ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {practitioner.fundingAccepted.map((fund) => (
                    <motion.div
                      key={fund}
                      variants={staggerItem}
                      className="flex items-center gap-3 rounded-lg bg-sand-50 border border-neutral-100 px-5 py-4"
                    >
                      <CheckCircle
                        className="h-5 w-5 text-emerald-500 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-primary-900 font-medium text-sm">
                        {FUNDING_LABELS[fund] ?? fund}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Languages */}
              {practitioner.languages.length > 0 && (
                <AnimatedSection>
                  <h2 className="font-heading text-2xl lg:text-3xl text-primary-900 mb-6">
                    Languages
                  </h2>
                  <div className="flex items-center gap-3 text-neutral-600">
                    <Globe
                      className="h-5 w-5 text-primary-500 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-lg">
                      {practitioner.languages.join(", ")}
                    </span>
                  </div>
                </AnimatedSection>
              )}

              {/* Session Format */}
              <AnimatedSection>
                <h2 className="font-heading text-2xl lg:text-3xl text-primary-900 mb-6">
                  Session Format
                </h2>
                <div className="flex flex-wrap gap-4">
                  {practitioner.sessionFormats.includes("video") && (
                    <div className="flex items-center gap-3 rounded-lg bg-primary-50 px-5 py-3">
                      <Video
                        className="h-5 w-5 text-primary-600"
                        aria-hidden="true"
                      />
                      <span className="text-primary-900 font-medium text-sm">
                        Video Sessions
                      </span>
                    </div>
                  )}
                  {practitioner.sessionFormats.includes("phone") && (
                    <div className="flex items-center gap-3 rounded-lg bg-primary-50 px-5 py-3">
                      <Phone
                        className="h-5 w-5 text-primary-600"
                        aria-hidden="true"
                      />
                      <span className="text-primary-900 font-medium text-sm">
                        Phone Sessions
                      </span>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* ─── Sidebar ──────────────────────────────────────────────── */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Quick Info Card */}
                <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-6 space-y-5">
                  <h3 className="font-heading text-lg text-primary-900">
                    Quick Info
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-neutral-400 text-xs uppercase tracking-wide">Title</p>
                        <p className="text-primary-900 font-medium">{practitioner.title}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-neutral-400 text-xs uppercase tracking-wide">Experience</p>
                        <p className="text-primary-900 font-medium">{practitioner.yearsExperience} years</p>
                      </div>
                    </div>

                    {practitioner.languages.length > 1 && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-neutral-400 text-xs uppercase tracking-wide">Languages</p>
                          <p className="text-primary-900 font-medium">
                            {practitioner.languages.join(", ")}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <Video className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-neutral-400 text-xs uppercase tracking-wide">Formats</p>
                        <p className="text-primary-900 font-medium capitalize">
                          {practitioner.sessionFormats.join(" & ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100">
                    <p className="text-xs text-neutral-400 mb-3">Funding accepted</p>
                    <div className="flex flex-wrap gap-1.5">
                      {practitioner.fundingAccepted.map((fund) => (
                        <Badge key={fund} size="sm" variant="accent">
                          {FUNDING_LABELS[fund] ?? fund}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Book CTA */}
                  {practitioner.calendlyUrl ? (
                    <a
                      href={practitioner.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg",
                        "bg-primary-700 text-white hover:bg-primary-800 transition-colors"
                      )}
                    >
                      Book with {practitioner.firstName}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href="/book"
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg",
                        "bg-primary-700 text-white hover:bg-primary-800 transition-colors"
                      )}
                    >
                      Book with {practitioner.firstName}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>

                {/* Back to team */}
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 transition-colors"
                >
                  &larr; Back to all psychologists
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl text-white mb-6">
              Book a Session with {practitioner.firstName}
            </h2>
            <p className="text-lg text-primary-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Take the first step today. {practitioner.firstName} provides secure,
              confidential telehealth sessions from the comfort of your own space.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {practitioner.calendlyUrl ? (
                <a
                  href={practitioner.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group text-base"
                >
                  Book Now
                  <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ) : (
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group text-base"
                >
                  Book Now
                  <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-base"
              >
                <Phone className="w-4.5 h-4.5" />
                Call {SITE_CONFIG.phone}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
