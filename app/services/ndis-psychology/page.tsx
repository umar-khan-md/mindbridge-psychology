import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import { fees } from "@/data/fees";
import { ServicePageTemplate } from "@/components/features/service-page-template";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const service = services.find((s) => s.slug === "ndis-psychology");

export function generateMetadata(): Metadata {
  if (!service) return {};
  return {
    title: "NDIS Psychology Telehealth | MindBridge Psychology - NDIS Registered Provider",
    description:
      "NDIS-registered telehealth psychology services. Capacity building, therapeutic supports & assessments. Plan-managed & self-managed accepted. Book NDIS psychology online.",
    openGraph: {
      title: "NDIS Psychology Telehealth | MindBridge Psychology",
      description: service.shortDescription,
      type: "website",
      locale: "en_AU",
      url: "https://mindbridgepsychology.com.au/services/ndis-psychology",
    },
    twitter: {
      card: "summary_large_image",
      title: "NDIS Psychology Telehealth | MindBridge Psychology",
      description: "NDIS-registered telehealth psychology. Capacity building & therapeutic supports.",
    },
    alternates: {
      canonical: "https://mindbridgepsychology.com.au/services/ndis-psychology",
    },
    keywords: [
      "ndis psychology telehealth",
      "ndis psychologist online",
      "ndis registered provider psychology",
      "ndis capacity building psychology",
      "telehealth psychologist australia",
    ],
  };
}

export default function NdisPsychologyPage() {
  if (!service) notFound();

  const ndisFees = fees.filter((f) => f.id.startsWith("ndis-"));

  return (
    <ServicePageTemplate
      service={service}
      extraSections={
        <>
          {/* NDIS Support Categories */}
          <section className="section-padding bg-bg-primary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  NDIS Support Categories We Deliver Under
                </h2>
                <p className="text-text-secondary mb-8">
                  MindBridge Psychology is a registered NDIS provider. Our
                  psychology services are typically funded under the following
                  NDIS support categories:
                </p>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 border border-border-subtle">
                    <h3 className="font-sans font-semibold text-text-primary mb-2 text-base">
                      Improved Daily Living (Therapeutic Supports)
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Individual psychology sessions focused on building
                      emotional regulation, coping skills, social functioning,
                      and daily living capacity. This is the most common funding
                      category for our NDIS psychology services.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-border-subtle">
                    <h3 className="font-sans font-semibold text-text-primary mb-2 text-base">
                      Capacity Building -- Daily Activities
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Psychosocial recovery coaching and skill development
                      programs designed to increase independence, support
                      community participation, and build the skills needed for
                      daily living and social engagement.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-border-subtle">
                    <h3 className="font-sans font-semibold text-text-primary mb-2 text-base">
                      Improved Relationships
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Social skills training and interpersonal effectiveness
                      programs to help participants develop and maintain
                      meaningful relationships and navigate social situations
                      with greater confidence.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-border-subtle">
                    <h3 className="font-sans font-semibold text-text-primary mb-2 text-base">
                      Behaviour Support
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Functional behaviour assessments, positive behaviour
                      support plan development, and implementation support for
                      participants with complex behavioural needs. Our behaviour
                      support practitioners are registered with the NDIS Quality
                      and Safeguards Commission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NDIS Pricing */}
          <section className="section-padding bg-bg-secondary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  NDIS Pricing
                </h2>
                <p className="text-text-secondary mb-8">
                  All NDIS services are billed at the current NDIS Price Guide
                  rates. There is no out-of-pocket cost for NDIS participants
                  with sufficient plan funding.
                </p>

                <div className="space-y-4">
                  {ndisFees.map((fee) => (
                    <div
                      key={fee.id}
                      className="bg-white rounded-xl p-6 border border-border-subtle"
                    >
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h3 className="font-sans font-semibold text-text-primary text-base">
                          {fee.service}
                        </h3>
                        {fee.ndisPrice && (
                          <span className="text-primary-700 font-semibold">
                            {formatCurrency(fee.ndisPrice)}/hr
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm mb-1">
                        {fee.sessionType} -- {fee.duration}
                      </p>
                      <p className="text-text-tertiary text-xs">
                        {fee.notes}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-primary-50 rounded-xl p-6 border border-primary-100">
                  <h3 className="font-sans font-semibold text-primary-800 mb-2 text-base">
                    Plan Management Options
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Agency-managed plans -- we invoice the NDIA directly",
                      "Plan-managed plans -- we invoice your plan manager",
                      "Self-managed plans -- we provide invoices for you to claim",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                        <span className="text-primary-800 text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Plan Reviews */}
          <section className="section-padding bg-bg-primary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  NDIS Plan Reviews & Reports
                </h2>
                <p className="text-text-secondary mb-4">
                  We understand how important it is to have quality evidence
                  supporting your NDIS plan review. Our psychologists have
                  extensive experience preparing reports that clearly
                  articulate your functional capacity, progress towards goals,
                  and ongoing support needs.
                </p>
                <p className="text-text-secondary">
                  We work collaboratively with your support coordinator and
                  allied health team to ensure a coordinated approach to your
                  plan review. Report writing is billed at NDIS Price Guide
                  rates under the Assessment, Recommendation, and Therapy
                  support item. Contact our team to discuss your plan review
                  needs.
                </p>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
