import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Users,
  Shield,
  TrendingUp,
  Award,
  Briefcase,
  Heart,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Building2,
  Scale,
  BarChart3,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "For Employers | MindBridge Psychology - Corporate EAP & Workplace Wellbeing",
  description:
    "Corporate mental health programs: EAP, critical incident response, manager training & wellbeing workshops. ISO 45003 aligned. Flexible packages. Get a custom quote.",
  openGraph: {
    title: "Workplace Mental Health Solutions | MindBridge Psychology",
    description:
      "Customised EAP, critical incident response, and workplace wellbeing programs. ISO 45003 aligned.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/for-employers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workplace Mental Health Solutions | MindBridge Psychology",
    description: "EAP, critical incident response & workplace wellbeing programs. ISO 45003 aligned.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/for-employers",
  },
  keywords: [
    "corporate eap psychology",
    "workplace mental health programs australia",
    "employee assistance program",
    "critical incident response psychology",
    "workplace wellbeing workshops",
  ],
};

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function ForEmployersPage() {
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
              Corporate & EAP
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Workplace Mental Health Solutions
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Invest in your people and your bottom line. MindBridge Psychology
              delivers evidence-based workplace mental health programs that
              reduce absenteeism, improve productivity, and meet your
              psychosocial safety obligations.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                value: "87%",
                label: "of employees report improved productivity after therapy",
                icon: TrendingUp,
              },
              {
                value: "6x",
                label: "return on investment for mental health programs",
                icon: BarChart3,
              },
              {
                value: "$17B",
                label: "annual cost of untreated mental health to Australian employers",
                icon: Building2,
              },
              {
                value: "45%",
                label: "reduction in absenteeism with proactive EAP",
                icon: Users,
              },
            ].map((stat) => (
              <div
                key={stat.value}
                className="bg-white rounded-2xl border border-neutral-100 p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <p className="font-heading text-3xl text-primary-700 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Services */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-primary-900 mb-4">
              Our Corporate Services
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Tailored programs designed to support employee wellbeing at every
              level of your organisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Employee Assistance Program (EAP)",
                description:
                  "Confidential, short-term counselling for employees and their immediate family members. Telehealth delivery means nationwide access with no geographic limitations. Covers personal, work, and relationship concerns.",
                features: [
                  "Confidential individual sessions",
                  "Same-week appointment availability",
                  "Manager consultations included",
                  "Usage reporting (de-identified)",
                ],
              },
              {
                icon: AlertTriangle,
                title: "Critical Incident Response",
                description:
                  "Rapid-response psychological support following workplace incidents, including on-site traumatic events, sudden employee death, workplace violence, or natural disasters. Available within 24 hours.",
                features: [
                  "24-hour response commitment",
                  "Group debriefing sessions",
                  "Individual follow-up sessions",
                  "Manager support and guidance",
                ],
              },
              {
                icon: GraduationCap,
                title: "Manager Mental Health Training",
                description:
                  "Equip your leaders with the skills to recognise early signs of distress, have supportive conversations, and make appropriate referrals. Aligned with ISO 45003 and Australian psychosocial safety legislation.",
                features: [
                  "Mental health literacy workshops",
                  "Difficult conversations training",
                  "Psychosocial risk awareness",
                  "Self-care for leaders",
                ],
              },
              {
                icon: Users,
                title: "Wellbeing Workshops",
                description:
                  "Interactive group sessions on topics such as stress management, resilience, burnout prevention, sleep hygiene, and communication skills. Delivered via webinar or in-person for groups of 10 to 200.",
                features: [
                  "Customised to your industry",
                  "Interactive and evidence-based",
                  "Available in-person or online",
                  "Post-workshop resources included",
                ],
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl border border-neutral-100 p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <service.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-heading text-xl text-primary-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-neutral-600"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-primary-900 mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Getting started is straightforward. We design a program around
              your organisation's size, industry, and needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Discovery Call",
                description:
                  "We learn about your organisation, workforce demographics, current wellbeing initiatives, and specific challenges. No obligation.",
              },
              {
                step: "02",
                title: "Custom Proposal",
                description:
                  "We design a tailored program with clear pricing, service scope, KPIs, and implementation timeline. Flexible packages to suit your budget.",
              },
              {
                step: "03",
                title: "Launch & Support",
                description:
                  "We onboard your team, distribute access details, and provide ongoing account management with quarterly utilisation reporting.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-neutral-100 p-8 hover:shadow-md transition-shadow text-center"
              >
                <span className="text-5xl font-heading text-primary-200">
                  {item.step}
                </span>
                <h3 className="font-heading text-xl text-primary-900 mt-3 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl text-primary-900 mb-4">
              Sectors We Serve
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Healthcare",
              "Education",
              "Government",
              "Finance & Banking",
              "Legal",
              "Mining & Resources",
              "Construction",
              "Emergency Services",
              "Technology",
              "Retail & Hospitality",
              "Not-for-Profit",
              "Manufacturing",
              "Transport & Logistics",
              "Professional Services",
            ].map((sector) => (
              <Badge
                key={sector}
                variant="outline"
                className="text-primary-700 border-primary-200 px-4 py-1.5"
              >
                {sector}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-sand-50 to-primary-50/30 rounded-2xl border border-sand-200 p-8 lg:p-10 text-center">
            <h2 className="font-heading text-3xl text-primary-900 mb-4">
              Flexible Pricing
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6 max-w-xl mx-auto">
              Our corporate programs start from{" "}
              <span className="font-semibold text-primary-700">
                $8.50 per employee per month
              </span>{" "}
              for EAP coverage. We offer tiered packages for organisations of
              all sizes, from SMEs to enterprise.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
            >
              Get a Custom Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl text-primary-900 mb-4">
                Compliance & Standards
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-neutral-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="w-6 h-6 text-primary-600" />
                  <h3 className="font-semibold text-primary-900">
                    ISO 45003 Aligned
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Our programs are designed to align with ISO 45003 guidelines
                  for managing psychosocial risks in the workplace, supporting
                  your compliance obligations under WHS legislation.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-neutral-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-primary-600" />
                  <h3 className="font-semibold text-primary-900">
                    Psychosocial Safety Legislation
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Australian jurisdictions are progressively introducing
                  psychosocial safety regulations. Our corporate programs help
                  you meet these obligations proactively and protect your
                  workforce.
                </p>
              </div>
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
                Ready to Support Your Team?
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                Let us design a workplace mental health program that fits your
                organisation. No obligation discovery call available.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Get a Custom Quote
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
