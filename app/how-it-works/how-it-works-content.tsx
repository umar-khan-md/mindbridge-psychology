"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Search,
  CreditCard,
  CalendarCheck,
  Video,
  ArrowRight,
  Phone,
  Monitor,
  Wifi,
  Lock,
  UserCheck,
  FileText,
  Shield,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  AccordionGroup,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG, FUNDING_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/faqs";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  staggerContainerSlow,
} from "@/lib/animations";

/* ==========================================================================
   How It Works — MindBridge Psychology
   ========================================================================== */

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find Your Psychologist",
    description:
      "Browse our team of AHPRA-registered psychologists and find the right fit for your needs.",
    details: [
      {
        heading: "Browse the directory",
        text: "Our team page lets you filter psychologists by specialisation, therapeutic approach, funding accepted, and languages spoken. Each profile includes qualifications, a detailed bio, and areas of expertise so you can make an informed choice.",
      },
      {
        heading: "Use our matching tool",
        text: "Not sure where to start? Our matching questionnaire takes a few minutes and recommends psychologists based on your presenting concerns, preferred communication style, and funding type. It is designed to help you find someone who genuinely fits.",
      },
      {
        heading: "Call our client services team",
        text: "If you prefer a conversation, our client services team can walk you through the options and suggest psychologists who are currently accepting new clients with availability that suits your schedule.",
      },
    ],
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Choose Your Funding",
    description:
      "We accept a wide range of funding options to make psychology accessible and affordable.",
    details: [
      {
        heading: "Medicare Bulk Bill",
        text: "With bulk billing, there is no out-of-pocket cost to you. Medicare covers the full session fee. You will need a Mental Health Care Plan and GP referral. Bulk-billed places are limited and available with select psychologists.",
      },
      {
        heading: "Medicare Rebate",
        text: "Pay the session fee upfront and receive a Medicare rebate deposited to your bank account within 24 to 48 hours. Your out-of-pocket cost is the gap between the session fee and the Medicare rebate amount. Requires a Mental Health Care Plan and GP referral.",
      },
      {
        heading: "NDIS",
        text: "We are a registered NDIS provider and accept self-managed, plan-managed, and NDIA-managed funding. Sessions are billed at NDIS-approved rates under the Capacity Building — Improved Daily Living support category.",
      },
      {
        heading: "WorkCover",
        text: "If you have a WorkCover claim that includes psychological support, we can bill your insurer directly. Speak with your case manager to confirm that psychology sessions are included in your approved treatment plan.",
      },
      {
        heading: "DVA",
        text: "We accept Department of Veterans' Affairs funding for eligible veterans and their families. A referral from your GP or specialist is required. Sessions are billed directly to DVA at approved rates.",
      },
      {
        heading: "Self-Funded",
        text: "No referral is needed to see a psychologist privately. Self-funded sessions give you the flexibility to book immediately without waiting for a Mental Health Care Plan. Session fees vary by psychologist — see our fees page for details.",
      },
    ],
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Book Your Appointment",
    description:
      "Choose a time that suits you and receive instant confirmation with everything you need.",
    details: [
      {
        heading: "Select your time",
        text: "Once you have chosen a psychologist, select an available time slot from their online calendar. We offer appointments from early morning through to evening, including some weekends, so you can find a time that works around your life.",
      },
      {
        heading: "Complete your intake",
        text: "Before your first session, you will be asked to fill in a brief intake form covering your contact details, presenting concerns, funding information, and emergency contacts. This helps your psychologist prepare and ensures your session time is used effectively.",
      },
      {
        heading: "Receive your confirmation",
        text: "You will receive an email and SMS confirmation with your appointment details and a unique link to join your session. A reminder is sent 24 hours before and again 30 minutes prior, so you never miss an appointment.",
      },
    ],
  },
  {
    number: "04",
    icon: Video,
    title: "Attend Your Session",
    description:
      "Join your session from any private, comfortable space with an internet connection.",
    details: [
      {
        heading: "What you need",
        text: "A device with a camera and microphone (laptop, tablet, or phone), a stable internet connection (minimum 5 Mbps recommended), a private space where you will not be interrupted, and a modern web browser. No special software to install.",
      },
      {
        heading: "Your first session",
        text: "Your psychologist will start by getting to know you — your history, what brought you to therapy, and what you hope to achieve. They will explain their approach, discuss confidentiality, and collaborate with you to set goals for your treatment. First sessions typically run for 50 to 60 minutes.",
      },
      {
        heading: "Ongoing sessions",
        text: "After your initial appointment, your psychologist will work with you to determine the right session frequency — typically weekly or fortnightly. Each session builds on the last, using evidence-based techniques tailored to your goals. You can rebook at the end of each session or through our online booking system.",
      },
    ],
  },
];

const techRequirements = [
  {
    icon: Monitor,
    label: "Any device with a camera",
    detail: "Laptop, desktop, tablet, or smartphone",
  },
  {
    icon: Wifi,
    label: "Stable internet connection",
    detail: "Minimum 5 Mbps recommended",
  },
  {
    icon: Lock,
    label: "Private, quiet space",
    detail: "Where you will not be overheard",
  },
  {
    icon: FileText,
    label: "Modern browser",
    detail: "Chrome, Safari, Edge, or Firefox",
  },
];

// Select telehealth-relevant FAQs for this page
const pageFaqs = faqs
  .filter((f) =>
    ["telehealth-how", "telehealth-tech", "telehealth-effective", "telehealth-connection", "booking-cancellation", "fees-bulkbill"].includes(f.id)
  )
  .sort((a, b) => a.order - b.order);

export function HowItWorksPageContent() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  const techRef = useRef<HTMLDivElement>(null);
  const techInView = useInView(techRef, { once: true, margin: "-60px" });

  return (
    <>
      <Breadcrumbs />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary-600 mb-4">
              Getting Started
            </p>
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-primary-900 mb-6">
              How Telehealth Psychology Works
            </h1>
            <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              From finding the right psychologist to attending your first session,
              here is everything you need to know about starting therapy with
              MindBridge Psychology.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Steps ────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={stepsRef}
            initial="hidden"
            animate={stepsInView ? "visible" : "hidden"}
            variants={staggerContainerSlow}
            className="space-y-20 lg:space-y-28"
          >
            {steps.map((step, stepIndex) => {
              const Icon = step.icon;
              const isEven = stepIndex % 2 === 1;

              return (
                <motion.div
                  key={step.number}
                  variants={staggerItem}
                  className={cn(
                    "flex flex-col gap-10",
                    isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                  )}
                >
                  {/* Step info card */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                        <Icon className="h-7 w-7 text-primary-700" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-accent-600 tracking-wider uppercase">
                          Step {step.number}
                        </p>
                        <h2 className="font-heading text-2xl lg:text-3xl text-primary-900">
                          {step.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                      {step.description}
                    </p>

                    <div className="space-y-6">
                      {step.details.map((detail) => (
                        <div key={detail.heading}>
                          <h3 className="font-semibold text-primary-900 mb-1.5">
                            {detail.heading}
                          </h3>
                          <p className="text-neutral-600 leading-relaxed">
                            {detail.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual card */}
                  <div className="flex-1 flex items-start justify-center">
                    <div
                      className={cn(
                        "w-full max-w-md rounded-2xl p-10 lg:p-12",
                        "flex flex-col items-center justify-center text-center",
                        stepIndex === 0 && "bg-primary-50",
                        stepIndex === 1 && "bg-sand-50",
                        stepIndex === 2 && "bg-accent-50/50",
                        stepIndex === 3 && "bg-primary-50"
                      )}
                    >
                      <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                        <Icon className="h-10 w-10 text-primary-600" aria-hidden="true" />
                      </div>
                      <p className="font-heading text-6xl text-primary-300 mb-3">
                        {step.number}
                      </p>
                      <p className="font-heading text-xl text-primary-900">
                        {step.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Tech Requirements ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-heading text-3xl lg:text-4xl text-primary-900 mb-4">
              What You Need
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              No special software required. Just these four essentials.
            </p>
          </AnimatedSection>

          <motion.div
            ref={techRef}
            initial="hidden"
            animate={techInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {techRequirements.map((req) => {
              const Icon = req.icon;
              return (
                <motion.div
                  key={req.label}
                  variants={staggerItem}
                  className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary-700" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-1">
                    {req.label}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {req.detail}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-heading text-3xl lg:text-4xl text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Common questions about telehealth psychology, answered by our team.
            </p>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <AccordionGroup single>
              {pageFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-base lg:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </AccordionGroup>

            <div className="text-center mt-10">
              <Link
                href="/faqs"
                className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
              >
                View all FAQs &rarr;
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-5xl text-white mb-6">
              Ready to Begin?
            </h2>
            <p className="text-lg text-primary-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Finding the right psychologist does not have to be overwhelming.
              Browse our team, choose a time, and take the first step toward
              feeling better — all in under five minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/team"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group text-base"
              >
                Find a Psychologist
                <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-base"
              >
                <Phone className="w-4.5 h-4.5" />
                Call {SITE_CONFIG.phone}
              </a>
            </div>
            <p className="mt-8 text-sm text-primary-400/60">
              Free initial consultation &middot; Same-week availability &middot;
              Secure &amp; confidential
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
