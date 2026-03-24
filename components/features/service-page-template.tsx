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
  Clock,
  Video,
  Phone,
  CalendarCheck,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Service } from "@/lib/types";
import { practitioners } from "@/data/practitioners";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE_CONFIG, MEDICARE_INFO } from "@/lib/constants";

/* --------------------------------------------------------------------------
   Icon Mapping
   -------------------------------------------------------------------------- */

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

/* --------------------------------------------------------------------------
   Helper: Determine which practitioners specialise in this service
   -------------------------------------------------------------------------- */

function getSpecialistsForService(service: Service) {
  const serviceKeywords = [
    service.name.toLowerCase(),
    ...service.approaches.map((a) => a.toLowerCase()),
    ...service.suitableFor.map((s) => s.toLowerCase()),
  ];

  return practitioners.filter((p) => {
    const practitionerKeywords = [
      ...p.specialisations.map((s) => s.toLowerCase()),
      ...p.approaches.map((a) => a.toLowerCase()),
    ].join(" ");

    // Match on overlapping approaches or specialisation keywords
    return service.approaches.some(
      (approach) =>
        p.approaches.some(
          (pa) => pa.toLowerCase() === approach.toLowerCase()
        ) ||
        practitionerKeywords.includes(approach.toLowerCase())
    );
  });
}

/* --------------------------------------------------------------------------
   Condition label formatting
   -------------------------------------------------------------------------- */

function formatConditionLabel(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* --------------------------------------------------------------------------
   Service Page Template
   -------------------------------------------------------------------------- */

interface ServicePageTemplateProps {
  service: Service;
  extraSections?: React.ReactNode;
}

export function ServicePageTemplate({
  service,
  extraSections,
}: ServicePageTemplateProps) {
  const IconComponent = iconMap[service.icon] || User;
  const specialists = getSpecialistsForService(service);
  const paragraphs = service.longDescription.split("\n\n").filter(Boolean);

  return (
    <>
      <Breadcrumbs />

      {/* ----------------------------------------------------------------
          HERO SECTION
          ---------------------------------------------------------------- */}
      <section className="bg-primary-50 section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 mb-6">
              <IconComponent className="w-8 h-8 text-primary-700" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
              {service.name}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {service.medicareEligible && (
                <Badge variant="success" size="md">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Medicare Eligible
                </Badge>
              )}
              {service.ndisEligible && (
                <Badge variant="accent" size="md">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  NDIS Registered
                </Badge>
              )}
              <Badge variant="default" size="md">
                <Video className="w-3.5 h-3.5 mr-1" />
                {service.deliveryMode}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
          WHAT IS THIS SERVICE?
          ---------------------------------------------------------------- */}
      <section className="section-padding bg-bg-primary">
        <div className="container-content">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
              What Is {service.name}?
            </h2>
            <div className="space-y-5">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-text-secondary leading-relaxed text-base md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
          WHO IS THIS FOR?
          ---------------------------------------------------------------- */}
      <section className="section-padding bg-bg-secondary">
        <div className="container-content">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
              Who Is This For?
            </h2>
            <p className="text-text-secondary mb-8">
              {service.name} may be helpful if you are experiencing any of the
              following:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.suitableFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
          OUR APPROACH
          ---------------------------------------------------------------- */}
      <section className="section-padding bg-bg-primary">
        <div className="container-content">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
              Our Approach
            </h2>
            <p className="text-text-secondary mb-8">
              Our psychologists draw on the following evidence-based modalities,
              selecting the most appropriate framework for your unique situation:
            </p>
            <div className="flex flex-wrap gap-2">
              {service.approaches.map((approach) => (
                <Badge key={approach} variant="default" size="md">
                  {approach}
                </Badge>
              ))}
            </div>
            <p className="text-text-secondary mt-6">
              Your psychologist will tailor the therapeutic approach to your
              individual needs, preferences, and goals. Sessions are structured
              yet flexible, with regular progress reviews to ensure you are
              getting the most out of your treatment.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
          SESSION DETAILS
          ---------------------------------------------------------------- */}
      <section className="section-padding bg-bg-secondary">
        <div className="container-content">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-8">
              Session Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Duration */}
              <div className="bg-white rounded-xl p-6 border border-border-subtle">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-sans font-semibold text-text-primary mb-1 text-base">
                  Duration
                </h3>
                <p className="text-text-secondary text-sm">
                  {service.sessionDuration}
                </p>
              </div>

              {/* Delivery Mode */}
              <div className="bg-white rounded-xl p-6 border border-border-subtle">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                  <Video className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-sans font-semibold text-text-primary mb-1 text-base">
                  Delivery Mode
                </h3>
                <p className="text-text-secondary text-sm">
                  {service.deliveryMode}
                </p>
              </div>

              {/* Frequency */}
              <div className="bg-white rounded-xl p-6 border border-border-subtle">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                  <CalendarCheck className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-sans font-semibold text-text-primary mb-1 text-base">
                  Frequency
                </h3>
                <p className="text-text-secondary text-sm">
                  Weekly or fortnightly, based on clinical need
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
          FUNDING OPTIONS
          ---------------------------------------------------------------- */}
      <section className="section-padding bg-bg-primary">
        <div className="container-content">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
              Funding Options
            </h2>
            <div className="space-y-4">
              {service.medicareEligible && (
                <div className="bg-white rounded-xl p-6 border border-border-subtle">
                  <h3 className="font-sans font-semibold text-text-primary mb-2 text-base">
                    Medicare Rebate
                  </h3>
                  <p className="text-text-secondary text-sm">
                    This service is eligible for a Medicare rebate with a valid
                    GP Mental Health Treatment Plan. You can access up to{" "}
                    {MEDICARE_INFO.maxSessions} individually rebated sessions per
                    calendar year. The rebate amount depends on whether you see a
                    Clinical Psychologist or a Registered Psychologist.
                  </p>
                </div>
              )}

              {service.ndisEligible && (
                <div className="bg-white rounded-xl p-6 border border-border-subtle">
                  <h3 className="font-sans font-semibold text-text-primary mb-2 text-base">
                    NDIS Funding
                  </h3>
                  <p className="text-text-secondary text-sm">
                    This service can be funded through NDIS plans under the
                    Improved Daily Living and Capacity Building support
                    categories. We accept agency-managed, plan-managed, and
                    self-managed participants. Sessions are billed at NDIS Price
                    Guide rates.
                  </p>
                </div>
              )}

              {!service.medicareEligible && !service.ndisEligible && (
                <div className="bg-white rounded-xl p-6 border border-border-subtle">
                  <h3 className="font-sans font-semibold text-text-primary mb-2 text-base">
                    Private Fee
                  </h3>
                  <p className="text-text-secondary text-sm">
                    This service is offered on a private fee basis. Some private
                    health funds may provide rebates depending on your level of
                    cover. Please check with your insurer for details.
                  </p>
                </div>
              )}

              <div className="bg-white rounded-xl p-6 border border-border-subtle">
                <h3 className="font-sans font-semibold text-text-primary mb-2 text-base">
                  Self-Funded & Other Options
                </h3>
                <p className="text-text-secondary text-sm">
                  We also accept self-funded clients, WorkCover, and DVA
                  referrals where applicable. Visit our{" "}
                  <Link
                    href="/fees"
                    className="text-primary-700 font-medium hover:text-primary-600"
                  >
                    Fees &amp; Rebates
                  </Link>{" "}
                  page for a full breakdown of costs and rebate amounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
          EXTRA SECTIONS (service-specific)
          ---------------------------------------------------------------- */}
      {extraSections}

      {/* ----------------------------------------------------------------
          CONDITIONS WE ADDRESS
          ---------------------------------------------------------------- */}
      {service.relatedConditions.length > 0 && (
        <section className="section-padding bg-bg-secondary">
          <div className="container-content">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                Conditions We Address
              </h2>
              <p className="text-text-secondary mb-6">
                Through {service.name.toLowerCase()}, we support clients
                experiencing a wide range of mental health conditions, including:
              </p>
              <div className="flex flex-wrap gap-2">
                {service.relatedConditions.map((condition) => (
                  <Link
                    key={condition}
                    href={`/conditions/${condition}`}
                    className="no-underline"
                  >
                    <Badge
                      variant="outline"
                      size="md"
                      className="hover:bg-primary-50 transition-colors cursor-pointer"
                    >
                      {formatConditionLabel(condition)}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------
          MEET OUR SPECIALISTS
          ---------------------------------------------------------------- */}
      {specialists.length > 0 && (
        <section className="section-padding bg-bg-primary">
          <div className="container-content">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-3">
                Meet Our Specialists
              </h2>
              <p className="text-text-secondary mb-8">
                Our team members who specialise in{" "}
                {service.name.toLowerCase()} bring extensive training and
                clinical experience to your sessions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {specialists.map((practitioner) => (
                  <Link
                    key={practitioner.slug}
                    href={`/our-team/${practitioner.slug}`}
                    className="group block bg-white rounded-xl p-6 border border-border-subtle hover:border-primary-200 hover:shadow-md transition-all duration-300 no-underline"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <span className="text-primary-700 font-semibold text-sm">
                          {practitioner.firstName[0]}
                          {practitioner.lastName[0]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-sans font-semibold text-text-primary group-hover:text-primary-700 transition-colors text-base">
                          {practitioner.firstName} {practitioner.lastName}
                        </h3>
                        <p className="text-text-tertiary text-sm">
                          {practitioner.title}
                        </p>
                        <p className="text-text-tertiary text-xs mt-1">
                          {practitioner.yearsExperience} years experience
                        </p>
                        {practitioner.acceptingNewClients ? (
                          <Badge
                            variant="success"
                            size="sm"
                            className="mt-2"
                          >
                            Accepting new clients
                          </Badge>
                        ) : (
                          <Badge
                            variant="warning"
                            size="sm"
                            className="mt-2"
                          >
                            Waitlist
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------
          CTA
          ---------------------------------------------------------------- */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-content">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl text-white mb-4">
              Book a {service.name} Session
            </h2>
            <p className="text-primary-100 mb-8 text-lg">
              Take the first step towards better mental health. Our team is
              ready to support you from anywhere in Australia via secure
              telehealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button variant="white" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
                  Book Online
                </Button>
              </Link>
              <Link href={`tel:${SITE_CONFIG.phoneRaw}`}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Phone className="w-4 h-4 mr-2" />
                  {SITE_CONFIG.phone}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
