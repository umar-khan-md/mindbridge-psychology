import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import { ServicePageTemplate } from "@/components/features/service-page-template";
import { MEDICARE_INFO } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

const service = services.find(
  (s) => s.slug === "mental-health-treatment-plans"
);

export function generateMetadata(): Metadata {
  if (!service) return {};
  return {
    title: "Mental Health Treatment Plan Online | MindBridge Psychology - Medicare Rebates",
    description:
      "Learn how to access Medicare psychology rebates with a mental health treatment plan. Up to 10 sessions per year. GP referral guide & bulk bill options. Start online today.",
    openGraph: {
      title: "Mental Health Treatment Plan Online | MindBridge Psychology",
      description: service.shortDescription,
      type: "website",
      locale: "en_AU",
      url: "https://mindbridgepsychology.com.au/services/mental-health-plans",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mental Health Treatment Plan Online | MindBridge Psychology",
      description: "Access Medicare psychology rebates with a mental health treatment plan. Up to 10 sessions.",
    },
    alternates: {
      canonical: "https://mindbridgepsychology.com.au/services/mental-health-plans",
    },
    keywords: [
      "mental health treatment plan online",
      "online therapy australia medicare",
      "medicare psychology rebate",
      "bulk bill psychologist telehealth",
      "GP mental health referral",
    ],
  };
}

export default function MentalHealthPlansPage() {
  if (!service) notFound();

  return (
    <ServicePageTemplate
      service={service}
      extraSections={
        <>
          {/* Step-by-Step Guide */}
          <section className="section-padding bg-bg-primary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  How to Get a Mental Health Treatment Plan
                </h2>
                <p className="text-text-secondary mb-8">
                  Accessing Medicare-rebated psychology sessions is
                  straightforward. Follow these steps to get started:
                </p>

                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Book an Appointment with Your GP",
                      description:
                        "Schedule a longer appointment (at least 20 minutes) with your GP. Let the receptionist know you would like to discuss your mental health. You can see any GP -- it does not need to be a specific doctor.",
                    },
                    {
                      step: "2",
                      title: "Discuss Your Mental Health with Your GP",
                      description:
                        "Your GP will ask about your current concerns, symptoms, and how they are affecting your daily life. This is a confidential conversation and there is no right or wrong way to describe what you are experiencing. Your GP will conduct a brief assessment to determine whether a Mental Health Treatment Plan is appropriate.",
                    },
                    {
                      step: "3",
                      title: "Receive Your Mental Health Treatment Plan",
                      description:
                        "If your GP determines that psychological support would be beneficial, they will prepare a Mental Health Treatment Plan. This document outlines your presenting concerns, treatment goals, and a referral to a psychologist. You can request a specific psychologist at MindBridge by name.",
                    },
                    {
                      step: "4",
                      title: "Send Us Your Referral",
                      description:
                        "Ask your GP to send your Mental Health Treatment Plan and referral directly to MindBridge Psychology, or you can upload it through our online booking form. Our team will be in touch within one business day to schedule your first session.",
                    },
                    {
                      step: "5",
                      title: "Attend Your Sessions & Claim Your Rebate",
                      description:
                        "Attend your psychology sessions via secure telehealth. After each session, you will receive a receipt that you can submit to Medicare to claim your rebate. If you have registered with Medicare online, rebates can be processed automatically.",
                    },
                    {
                      step: "6",
                      title: "GP Review After Initial Sessions",
                      description:
                        "After your first 6 sessions, your GP will conduct a review of your Treatment Plan to assess your progress. If further sessions are clinically indicated, your GP can authorise an additional 4 sessions, bringing the total to 10 per calendar year.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary-700 font-semibold text-sm">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-text-primary mb-1 text-base">
                          {item.title}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Medicare Rebate Amounts */}
          <section className="section-padding bg-bg-secondary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  Medicare Rebate Amounts
                </h2>
                <p className="text-text-secondary mb-8">
                  The Medicare rebate amount depends on whether you see a
                  Clinical Psychologist or a Registered Psychologist:
                </p>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 border border-border-subtle">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-sans font-semibold text-text-primary text-base">
                        Clinical Psychologist
                      </h3>
                      <span className="text-primary-700 font-semibold">
                        {formatCurrency(MEDICARE_INFO.rebateClinical)} rebate
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">
                      Clinical Psychologists hold a Masters or Doctorate in
                      Clinical Psychology and are endorsed by AHPRA. The higher
                      rebate reflects additional training and specialisation.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-border-subtle">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-sans font-semibold text-text-primary text-base">
                        Registered Psychologist
                      </h3>
                      <span className="text-primary-700 font-semibold">
                        {formatCurrency(MEDICARE_INFO.rebateGeneral)} rebate
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">
                      Registered Psychologists hold a minimum 6-year
                      qualification and are fully registered with AHPRA. They
                      provide the same evidence-based therapies as Clinical
                      Psychologists.
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-amber-50 rounded-xl p-6 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-sans font-semibold text-amber-800 mb-1 text-base">
                        Important Information
                      </h3>
                      <ul className="space-y-1.5 text-amber-800 text-sm">
                        <li>
                          You can access a maximum of{" "}
                          {MEDICARE_INFO.maxSessions} Medicare-rebated sessions
                          per calendar year (January to December).
                        </li>
                        <li>
                          A GP review is required after your first 6 sessions
                          before the remaining 4 can be accessed.
                        </li>
                        <li>
                          Medicare rebates do not cover couples therapy sessions.
                        </li>
                        <li>
                          Referrals are valid for{" "}
                          {MEDICARE_INFO.validityMonths} months from the date
                          of the Mental Health Treatment Plan.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* For GPs */}
          <section className="section-padding bg-bg-primary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  Information for GPs
                </h2>
                <p className="text-text-secondary mb-4">
                  We value our relationships with referring GPs and are
                  committed to collaborative care. When you refer a patient to
                  MindBridge Psychology, you can expect:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Acknowledgement of referral within one business day",
                    "Initial appointment scheduled within 1-2 weeks",
                    "Progress reports at the 6-session review point and at treatment completion",
                    "Communication regarding any significant clinical concerns with the patient's consent",
                    "Discharge summaries including treatment outcomes and recommendations for ongoing care",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                      <span className="text-text-secondary text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-text-secondary text-sm">
                  We can provide referral templates and information packs for
                  your practice. Please{" "}
                  <Link
                    href="/contact"
                    className="text-primary-700 font-medium hover:text-primary-600"
                  >
                    contact us
                  </Link>{" "}
                  or call our referral line to request materials.
                </p>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
