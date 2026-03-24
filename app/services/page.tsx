import type { Metadata } from "next";
import Link from "next/link";
import {
  User,
  Heart,
  Users,
  ClipboardCheck,
  Shield,
  Building2,
  GraduationCap,
  FileText,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title:
    "Telehealth Psychology Services | MindBridge Psychology - Online Therapy Australia",
  description:
    "Explore our telehealth psychology services: individual therapy, couples therapy, ADHD assessments, NDIS psychology, corporate EAP & more. Medicare bulk bill available Australia-wide.",
  openGraph: {
    title: "Telehealth Psychology Services | MindBridge Psychology",
    description:
      "Comprehensive telehealth psychology services across Australia. Medicare, NDIS, WorkCover & DVA accepted.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Telehealth Psychology Services | MindBridge Psychology",
    description:
      "Individual therapy, couples therapy, ADHD assessments, NDIS psychology & more. Medicare bulk bill available.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/services",
  },
  keywords: [
    "telehealth psychologist australia",
    "online psychology australia",
    "bulk bill psychologist telehealth",
    "ndis psychology telehealth",
    "couples therapy online australia",
    "corporate eap psychology",
    "ADHD assessment online",
  ],
};

const iconMap: Record<string, LucideIcon> = {
  User,
  Heart,
  Users,
  ClipboardCheck,
  Shield,
  Building2,
  GraduationCap,
  FileText,
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs />

      {/* Hero */}
      <section className="bg-primary-50 section-padding">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-4">Our Services</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
              Comprehensive Mental Health Support
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              From individual therapy to corporate programs, our team delivers
              evidence-based psychological care tailored to your situation --
              all via secure telehealth from anywhere in Australia.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-bg-primary">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services
              .sort((a, b) => a.order - b.order)
              .map((service) => {
                const IconComponent = iconMap[service.icon] || User;
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group block bg-white rounded-xl p-6 border border-border-subtle hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full no-underline"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>

                    {/* Title */}
                    <h2 className="font-heading text-xl text-text-primary mb-2 group-hover:text-primary-700 transition-colors duration-300">
                      {service.name}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-text-tertiary leading-relaxed mb-4 line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.medicareEligible && (
                        <Badge variant="default" size="sm">
                          Medicare
                        </Badge>
                      )}
                      {service.ndisEligible && (
                        <Badge variant="accent" size="sm">
                          NDIS
                        </Badge>
                      )}
                    </div>

                    {/* Link cue */}
                    <span className="inline-flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
