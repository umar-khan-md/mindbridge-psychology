import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ExternalLink,
  Shield,
  Info,
  BookOpen,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SelfAssessmentTool } from "@/components/features/self-assessment-tool";
import { SITE_CONFIG } from "@/lib/constants";

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Mental Health Self-Assessment | MindBridge Psychology - Free K10 Screening Tool",
  description:
    "Free K10 psychological distress self-assessment. Understand your mental health in under 3 minutes. Confidential, evidence-based screening with personalised recommendations.",
  openGraph: {
    title: "Mental Health Self-Assessment | MindBridge Psychology",
    description:
      "Free K10 psychological distress screening. Understand your mental health and get personalised recommendations in under 3 minutes.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/self-assessment",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mental Health Self-Assessment | MindBridge Psychology",
    description: "Free K10 screening tool. Understand your mental health in under 3 minutes.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/self-assessment",
  },
  keywords: [
    "mental health self assessment",
    "K10 screening tool",
    "psychological distress test",
    "mental health quiz australia",
    "online psychology australia",
  ],
};

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function SelfAssessmentPage() {
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
            <Badge variant="default" className="mb-4">
              Free & Confidential
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Mental Health Self-Assessment
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed mb-4">
              The Kessler Psychological Distress Scale (K10) is a clinically
              validated screening tool used by GPs and mental health
              professionals across Australia to measure psychological distress.
            </p>
            <p className="text-neutral-500">
              Answer 10 questions about your experience over the past 4 weeks.
              It takes less than 3 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-8">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start gap-3 p-4 bg-sand-50 rounded-xl border border-sand-200">
              <Shield className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  <strong className="text-primary-900">
                    Screening, not diagnosis.
                  </strong>{" "}
                  This tool provides an indication of your current level of
                  psychological distress. It is not a diagnostic instrument and
                  cannot replace a comprehensive assessment by a qualified
                  psychologist. Your responses are not stored or transmitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Tool */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <SelfAssessmentTool />
          </div>
        </div>
      </section>

      {/* Other Resources */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl text-primary-900 mb-8 text-center">
              Other Mental Health Resources
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <a
                href="https://www.beyondblue.org.au"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-neutral-100 p-6 hover:shadow-md hover:border-primary-200 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-primary-900">
                        Beyond Blue
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      Information and support for anxiety, depression, and
                      suicide prevention. 24/7 support line available.
                    </p>
                    <p className="text-sm font-medium text-blue-600 mt-2">
                      1300 22 4636
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.blackdoginstitute.org.au"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-neutral-100 p-6 hover:shadow-md hover:border-primary-200 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-primary-900">
                        Black Dog Institute
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      Leading research institute focused on mental health.
                      Self-help tools, fact sheets, and screening resources.
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.lifeline.org.au"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-neutral-100 p-6 hover:shadow-md hover:border-primary-200 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-primary-900">
                        Lifeline Australia
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      24/7 crisis support and suicide prevention. Free,
                      confidential phone and online chat available.
                    </p>
                    <p className="text-sm font-medium text-emerald-600 mt-2">
                      13 11 14
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://headtohealth.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-neutral-100 p-6 hover:shadow-md hover:border-primary-200 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-primary-900">
                        Head to Health
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      Australian Government mental health portal. Find services,
                      apps, online programs, and local support options.
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 rounded-3xl px-8 py-16 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl lg:text-4xl text-white mb-4">
                Speak to a Professional
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                A self-assessment is a useful starting point, but nothing
                replaces a conversation with a qualified psychologist. We are
                here to help you take the next step.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Book a Session
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
