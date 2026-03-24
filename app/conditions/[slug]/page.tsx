import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Home,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { conditions, getConditionBySlug, getConditionsByCategory } from "@/data/conditions";
import { practitioners } from "@/data/practitioners";
import { services } from "@/data/services";
import { CONDITION_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import type { ConditionCategory } from "@/lib/types";

/* --------------------------------------------------------------------------
   Static Params
   -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) return {};

  const categoryInfo = CONDITION_CATEGORIES[condition.category as keyof typeof CONDITION_CATEGORIES];

  return {
    title: `${condition.name} Treatment Online | MindBridge Psychology - Telehealth Psychology Australia`,
    description: `${condition.shortDescription} Evidence-based telehealth therapy for ${condition.name.toLowerCase()} from AHPRA-registered psychologists. Medicare, NDIS & self-funded.`,
    openGraph: {
      title: `${condition.name} — Evidence-Based Online Therapy | MindBridge Psychology`,
      description: condition.shortDescription,
      url: `${SITE_CONFIG.url}/conditions/${condition.slug}`,
      type: "article",
      locale: "en_AU",
    },
    twitter: {
      card: "summary_large_image",
      title: `${condition.name} Treatment | MindBridge Psychology`,
      description: `Evidence-based telehealth therapy for ${condition.name.toLowerCase()}. AHPRA-registered psychologists.`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/conditions/${condition.slug}`,
    },
    keywords: [
      `${condition.name.toLowerCase()} treatment online`,
      `${condition.name.toLowerCase()} therapy telehealth`,
      "telehealth psychologist australia",
      "online psychology australia",
      "evidence-based therapy",
    ],
  };
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default async function ConditionPage({ params }: PageProps) {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) notFound();

  const categoryInfo =
    CONDITION_CATEGORIES[condition.category as keyof typeof CONDITION_CATEGORIES];

  // Matched practitioners — those whose specialisations overlap with this condition's name or category
  const matchedPractitioners = practitioners.filter((p) =>
    p.specialisations.some(
      (s) =>
        s.toLowerCase().includes(condition.name.toLowerCase()) ||
        s.toLowerCase().includes(condition.category.replace("-", " "))
    )
  );

  // Related services
  const relatedServices = services.filter((s) =>
    condition.relatedServices.includes(s.slug)
  );

  // Related conditions — same category, excluding self
  const relatedConditions = getConditionsByCategory(condition.category)
    .filter((c) => c.slug !== condition.slug)
    .slice(0, 4);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: condition.name,
    description: condition.shortDescription,
    signOrSymptom: condition.symptoms.map((s) => ({
      "@type": "MedicalSignOrSymptom",
      name: s,
    })),
    possibleTreatment: condition.recommendedApproaches.map((a) => ({
      "@type": "MedicalTherapy",
      name: a,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb navigation" className="py-3 px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-sm text-sand-600 max-w-7xl mx-auto flex-wrap">
          <li className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary-700 transition-colors inline-flex items-center gap-1">
              <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-sand-400 shrink-0" aria-hidden="true" />
            <Link href="/conditions" className="hover:text-primary-700 transition-colors">
              Conditions
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-sand-400 shrink-0" aria-hidden="true" />
            <span className="font-medium text-primary-700 truncate max-w-[200px]" aria-current="page">
              {condition.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary-100/30 blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <Badge variant="default" className="mb-4">
              {categoryInfo?.label ?? condition.category}
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              {condition.name}
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {condition.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Understanding */}
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl text-primary-900 mb-6">
                  Understanding {condition.name}
                </h2>
                <div className="prose prose-neutral max-w-none">
                  {condition.longDescription.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-neutral-700 leading-relaxed mb-4 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>

              {/* Symptoms */}
              <div className="bg-primary-50/50 rounded-2xl p-8">
                <h2 className="font-heading text-2xl text-primary-900 mb-6">
                  Common Symptoms
                </h2>
                <ul className="space-y-3">
                  {condition.symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                      <span className="text-neutral-700 leading-relaxed">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How Therapy Helps */}
              <div>
                <h2 className="font-heading text-2xl text-primary-900 mb-6">
                  How Therapy Can Help
                </h2>
                <p className="text-neutral-700 leading-relaxed">{condition.howTherapyHelps}</p>
              </div>

              {/* Recommended Approaches */}
              <div>
                <h2 className="font-heading text-2xl text-primary-900 mb-4">
                  Recommended Approaches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {condition.recommendedApproaches.map((approach) => (
                    <Badge key={approach} variant="default" size="md">
                      {approach}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Our Specialists */}
              {matchedPractitioners.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl text-primary-900 mb-6">
                    Our Specialists
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchedPractitioners.map((practitioner) => (
                      <Link
                        key={practitioner.slug}
                        href={`/practitioners/${practitioner.slug}`}
                        className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all"
                      >
                        <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-lg shrink-0">
                          {practitioner.firstName[0]}
                          {practitioner.lastName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                            {practitioner.firstName} {practitioner.lastName}
                          </p>
                          <p className="text-sm text-neutral-500">{practitioner.title}</p>
                          {practitioner.acceptingNewClients && (
                            <Badge variant="success" size="sm" className="mt-1">
                              Accepting new clients
                            </Badge>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 ml-auto shrink-0 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-8 text-white sticky top-24">
                <h3 className="font-heading text-xl mb-3">
                  Get Support for {condition.name}
                </h3>
                <p className="text-primary-200/80 text-sm leading-relaxed mb-6">
                  Take the first step toward feeling better. Our psychologists
                  are experienced in treating {condition.name.toLowerCase()} using
                  evidence-based approaches.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/practitioners"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
                  >
                    Find a Psychologist
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">
                    Related Services
                  </h3>
                  <ul className="space-y-3">
                    {relatedServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex items-center gap-3 text-sm text-neutral-600 hover:text-primary-700 transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-primary-400 group-hover:translate-x-0.5 transition-transform" />
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Conditions */}
              {relatedConditions.length > 0 && (
                <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">
                    Related Conditions
                  </h3>
                  <ul className="space-y-3">
                    {relatedConditions.map((related) => (
                      <li key={related.slug}>
                        <Link
                          href={`/conditions/${related.slug}`}
                          className="group flex items-center gap-3 text-sm text-neutral-600 hover:text-primary-700 transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-primary-400 group-hover:translate-x-0.5 transition-transform" />
                          {related.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
