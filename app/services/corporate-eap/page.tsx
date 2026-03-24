import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import { ServicePageTemplate } from "@/components/features/service-page-template";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Users,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const service = services.find((s) => s.slug === "corporate-eap");

export function generateMetadata(): Metadata {
  if (!service) return {};
  return {
    title: "Corporate EAP Psychology | MindBridge Psychology - Workplace Mental Health Australia",
    description:
      "Employee assistance programs & workplace mental health solutions. Critical incident response, manager training & wellbeing workshops. ISO 45003 aligned. Custom packages.",
    openGraph: {
      title: "Corporate EAP Psychology | MindBridge Psychology",
      description: service.shortDescription,
      type: "website",
      locale: "en_AU",
      url: "https://mindbridgepsychology.com.au/services/corporate-eap",
    },
    twitter: {
      card: "summary_large_image",
      title: "Corporate EAP Psychology | MindBridge Psychology",
      description: "EAP, critical incident response & workplace wellbeing programs. ISO 45003 aligned.",
    },
    alternates: {
      canonical: "https://mindbridgepsychology.com.au/services/corporate-eap",
    },
    keywords: [
      "corporate eap psychology",
      "workplace mental health programs",
      "employee assistance program australia",
      "critical incident response psychology",
      "workplace wellbeing programs",
    ],
  };
}

export default function CorporateEapPage() {
  if (!service) notFound();

  return (
    <ServicePageTemplate
      service={service}
      extraSections={
        <>
          {/* What's Included */}
          <section className="section-padding bg-bg-primary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  What Our Corporate Packages Include
                </h2>
                <p className="text-text-secondary mb-8">
                  We design tailored workplace mental health solutions for
                  organisations of all sizes. Our packages can include any
                  combination of the following services:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: HeartHandshake,
                      title: "EAP Counselling",
                      description:
                        "Confidential short-term counselling for employees and their immediate family members, available within 48 hours of referral.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Critical Incident Response",
                      description:
                        "Rapid-response psychological debriefing and support following workplace incidents, traumatic events, or sudden loss.",
                    },
                    {
                      icon: Users,
                      title: "Manager Support Line",
                      description:
                        "Dedicated consultation service for managers dealing with complex team situations, performance concerns related to mental health, or psychosocial risk management.",
                    },
                    {
                      icon: BarChart3,
                      title: "Utilisation Reporting",
                      description:
                        "De-identified quarterly reports covering service utilisation, presenting concerns, and organisational wellbeing trends to inform your people strategy.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="bg-white rounded-xl p-6 border border-border-subtle"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-sans font-semibold text-text-primary mb-2 text-base">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Sectors We Serve */}
          <section className="section-padding bg-bg-secondary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  Sectors We Serve
                </h2>
                <p className="text-text-secondary mb-6">
                  Our corporate psychologists hold both clinical and
                  organisational psychology qualifications and bring deep
                  sector expertise to every engagement:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Healthcare & Hospitals",
                    "Technology & Startups",
                    "Education & Universities",
                    "Financial Services",
                    "Government & Public Sector",
                    "Legal & Professional Services",
                    "Mining & Resources",
                    "Emergency Services",
                    "Not-for-Profit",
                    "Retail & Hospitality",
                  ].map((sector) => (
                    <Badge key={sector} variant="default" size="md">
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Psychosocial Safety */}
          <section className="section-padding bg-bg-primary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  Psychosocial Safety & Compliance
                </h2>
                <p className="text-text-secondary mb-4">
                  Australian work health and safety legislation now places
                  explicit obligations on employers to identify and manage
                  psychosocial hazards in the workplace. Our organisational
                  psychologists can support your compliance efforts through
                  psychosocial risk assessments, policy development, and
                  training programs aligned with the ISO 45003 standard for
                  psychological health and safety at work.
                </p>
                <p className="text-text-secondary">
                  We offer complimentary 30-minute consultations for HR leaders
                  and executives to discuss your organisation&apos;s needs and
                  how we can help. Contact us to arrange a confidential
                  conversation.
                </p>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
