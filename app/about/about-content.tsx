"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Globe,
  Users,
  Award,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  staggerContainerSlow,
} from "@/lib/animations";

/* ==========================================================================
   About Page Content — MindBridge Psychology
   ========================================================================== */

const values = [
  {
    icon: BookOpen,
    title: "Evidence-Based Care",
    description:
      "Every treatment we provide is grounded in the latest peer-reviewed research. Our psychologists use proven approaches such as CBT, EMDR, ACT, and DBT — because when it comes to your wellbeing, evidence is everything.",
  },
  {
    icon: Globe,
    title: "Accessibility First",
    description:
      "Geography should never be a barrier to quality mental health care. Our telehealth-first model ensures that anyone in Australia — from metropolitan centres to remote communities — can access specialist psychological support.",
  },
  {
    icon: Users,
    title: "Cultural Sensitivity",
    description:
      "We serve a wonderfully diverse Australia. Our team includes psychologists who speak multiple languages and hold specialist training in culturally responsive therapy, including Aboriginal and Torres Strait Islander mental health.",
  },
  {
    icon: Award,
    title: "Clinical Excellence",
    description:
      "Every psychologist on our team is AHPRA-registered, holds postgraduate qualifications, and participates in ongoing professional development. We maintain the highest standards of clinical governance and ethical practice.",
  },
];

const stats = [
  { value: "200+", label: "Registered Psychologists" },
  { value: "35,000+", label: "Sessions Delivered" },
  { value: "98%", label: "Session Completion Rate" },
  { value: "4.9", label: "Average Client Rating" },
];

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

export function AboutPageContent() {
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <>
      <Breadcrumbs />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary-600 mb-4">
              About Us
            </p>
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-primary-900 mb-6">
              Psychology Built Around You
            </h1>
            <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              MindBridge Psychology was founded on a simple belief: that every Australian
              deserves access to high-quality psychological care — no matter where they live,
              what they earn, or what barriers they face. Our telehealth-first approach brings
              expert psychologists directly to you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Mission ──────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="font-heading text-3xl lg:text-4xl text-primary-900 mb-8">
                Our Mission
              </h2>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-6 text-neutral-600 leading-relaxed text-lg">
                <p>
                  Too many Australians go without the mental health support they need.
                  Long waitlists, geographic isolation, financial pressure, and the lingering
                  stigma around seeking help continue to prevent people from accessing care at
                  the moment they need it most. We started MindBridge Psychology to change that.
                </p>
                <p>
                  By building a clinic around telehealth from day one — not retrofitting it
                  as an afterthought — we have created a service that genuinely removes
                  barriers. Our clients attend sessions from the comfort and privacy of their
                  own homes, avoiding the time, cost, and stress of travel. Our psychologists
                  can serve communities that have historically been underserviced, including
                  rural and remote Australia, culturally and linguistically diverse
                  populations, and people with disabilities.
                </p>
                <p>
                  We accept Medicare bulk billing, Medicare rebates, NDIS, WorkCover, DVA,
                  and private payment — because funding should never determine whether
                  someone receives quality care. Every session is delivered by an
                  AHPRA-registered psychologist with postgraduate training, using
                  evidence-based approaches tailored to each individual.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Values ───────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl text-primary-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Four principles guide every decision we make — from the psychologists
              we recruit to the technology we build.
            </p>
          </AnimatedSection>

          <motion.div
            ref={valuesRef}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  className="bg-white rounded-xl p-8 border border-neutral-100 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-primary-700" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl text-primary-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Approach ─────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="font-heading text-3xl lg:text-4xl text-primary-900 mb-8">
                Why Telehealth Works
              </h2>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-6 text-neutral-600 leading-relaxed text-lg">
                <p>
                  The research is clear: telehealth psychology delivers outcomes that are
                  clinically equivalent to face-to-face therapy for a wide range of
                  presentations, including depression, generalised anxiety, PTSD,
                  obsessive-compulsive disorder, and relationship difficulties.
                  Multiple systematic reviews and meta-analyses published in leading
                  psychology journals confirm these findings.
                </p>
                <p>
                  Beyond clinical equivalence, telehealth offers distinct advantages.
                  Clients attend from familiar environments where they feel safe, which
                  can accelerate the therapeutic process. Session attendance rates are
                  higher and cancellation rates are lower compared with traditional
                  in-person clinics. For clients managing anxiety — particularly social
                  anxiety or agoraphobia — the ability to begin therapy from home can be
                  the difference between seeking help and not.
                </p>
                <p>
                  Our platform is purpose-built for psychological practice. Sessions are
                  conducted over encrypted video that meets Australian privacy standards.
                  Your psychologist uses the same evidence-based techniques they would use
                  in a consulting room — including cognitive behavioural therapy, EMDR,
                  acceptance and commitment therapy, schema therapy, and more.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Numbers ──────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerContainerSlow}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center"
              >
                <p className="font-heading text-4xl lg:text-5xl text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-300 text-sm lg:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Acknowledgment of Country ────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl lg:text-4xl text-primary-900 mb-8">
              Acknowledgment of Country
            </h2>
            <div className="space-y-5 text-neutral-600 leading-relaxed text-lg">
              <p>
                MindBridge Psychology acknowledges Aboriginal and Torres Strait Islander
                peoples as the Traditional Custodians of the lands on which we live and
                work. We recognise their continuing connection to land, waters, and
                community, and pay our deepest respects to Elders past, present, and
                emerging.
              </p>
              <p>
                We acknowledge that sovereignty was never ceded and that this always was,
                and always will be, Aboriginal land. We are committed to providing
                culturally safe, trauma-informed care and to working alongside Aboriginal
                and Torres Strait Islander communities to address the mental health
                disparities that continue to exist as a result of colonisation and
                intergenerational trauma.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-5xl text-white mb-6">
              Ready to Start?
            </h2>
            <p className="text-lg text-primary-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Take the first step toward feeling better. Browse our team, find the right
              psychologist for you, and book your first session today.
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
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
