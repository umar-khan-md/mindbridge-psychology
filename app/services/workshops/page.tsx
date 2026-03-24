import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { ServicePageTemplate } from "@/components/features/service-page-template";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award } from "lucide-react";

const service = services.find((s) => s.slug === "workshops-training");

export function generateMetadata(): Metadata {
  if (!service) return {};
  return {
    title: "Mental Health Workshops Online | MindBridge Psychology - Telehealth Australia",
    description:
      "Online mental health workshops & psychoeducation for organisations and groups. Stress management, resilience building & wellbeing training. Led by registered psychologists.",
    openGraph: {
      title: "Mental Health Workshops Online | MindBridge Psychology",
      description: service.shortDescription,
      type: "website",
      locale: "en_AU",
      url: "https://mindbridgepsychology.com.au/services/workshops",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mental Health Workshops Online | MindBridge Psychology",
      description: "Online mental health workshops & psychoeducation led by registered psychologists.",
    },
    alternates: {
      canonical: "https://mindbridgepsychology.com.au/services/workshops",
    },
    keywords: [
      "mental health workshops online",
      "workplace wellbeing training",
      "psychology workshops australia",
      "stress management workshop",
      "corporate eap psychology",
    ],
  };
}

export default function WorkshopsPage() {
  if (!service) notFound();

  return (
    <ServicePageTemplate
      service={service}
      extraSections={
        <section className="section-padding bg-bg-primary">
          <div className="container-content">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                Workshop Catalogue
              </h2>
              <p className="text-text-secondary mb-8">
                Our workshops are facilitated by experienced psychologists and
                combine clinical expertise with practical, interactive
                learning. All workshops can be customised to your
                organisation&apos;s needs.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Mental Health First Aid Refresher",
                    duration: "90 minutes",
                    audience: "All staff",
                    description:
                      "A refresher workshop for those who have completed MHFA training, covering updated protocols for recognising signs of mental health difficulties and providing initial support to colleagues in distress.",
                  },
                  {
                    title: "Resilience & Stress Management for Professionals",
                    duration: "120 minutes",
                    audience: "All staff",
                    description:
                      "Evidence-based strategies for building psychological resilience, managing workplace stress, and preventing burnout. Includes practical tools such as cognitive reframing, values-based action planning, and nervous system regulation techniques.",
                  },
                  {
                    title:
                      "Supporting Neurodivergent Colleagues in the Workplace",
                    duration: "90 minutes",
                    audience: "Managers & HR",
                    description:
                      "Understanding ADHD, autism, and other neurodevelopmental differences in the workplace. Covers reasonable adjustments, communication strategies, strengths-based approaches, and creating neuroinclusive team cultures.",
                  },
                  {
                    title:
                      "Managing Psychosocial Hazards Under WHS Legislation",
                    duration: "180 minutes",
                    audience: "Leaders & WHS Officers",
                    description:
                      "A comprehensive workshop covering employer obligations under Australian WHS legislation for managing psychosocial hazards, aligned with the ISO 45003 standard. Includes risk assessment frameworks, policy development guidance, and case studies.",
                  },
                  {
                    title: "Self-Care Planning for Frontline Workers",
                    duration: "60 minutes",
                    audience: "Frontline & emergency services staff",
                    description:
                      "Practical self-care and wellbeing maintenance strategies tailored for people working in high-stress, emotionally demanding roles. Covers vicarious trauma, compassion fatigue, boundary setting, and sustainable self-care planning.",
                  },
                  {
                    title: "Introduction to Mindfulness for the Workplace",
                    duration: "60 minutes",
                    audience: "All staff",
                    description:
                      "An accessible introduction to mindfulness practices that can be integrated into the workday. Participants learn brief mindfulness exercises, attentional focus techniques, and strategies for managing cognitive overload.",
                  },
                ].map((workshop) => (
                  <div
                    key={workshop.title}
                    className="bg-white rounded-xl p-6 border border-border-subtle"
                  >
                    <h3 className="font-sans font-semibold text-text-primary mb-3 text-base">
                      {workshop.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className="inline-flex items-center text-xs text-text-tertiary">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {workshop.duration}
                      </span>
                      <span className="inline-flex items-center text-xs text-text-tertiary">
                        <Users className="w-3.5 h-3.5 mr-1" />
                        {workshop.audience}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">
                      {workshop.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-100">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary-700 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-sans font-semibold text-primary-800 mb-1 text-base">
                      CPD Certificates & Custom Programs
                    </h3>
                    <p className="text-primary-800 text-sm">
                      CPD certificates are provided where applicable. We also
                      develop bespoke training programs tailored to your
                      organisation&apos;s industry, workforce profile, and
                      specific challenges. Contact us to discuss your
                      requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    />
  );
}
