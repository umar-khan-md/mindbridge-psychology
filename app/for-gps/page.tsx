import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Users,
  Clock,
  Shield,
  Award,
  FileText,
  CheckCircle,
  Download,
  Send,
  ClipboardList,
  Stethoscope,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "For GPs | MindBridge Psychology - Refer Patients for Telehealth Psychology",
  description:
    "Refer patients to MindBridge Psychology. AHPRA-registered psychologists, same-week availability, bulk billing options & streamlined mental health treatment plan referral process.",
  openGraph: {
    title: "For GPs | Refer to MindBridge Psychology",
    description:
      "Streamlined referral process, same-week appointments, and bulk billing for your patients. AHPRA-registered psychologists.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/for-gps",
  },
  twitter: {
    card: "summary_large_image",
    title: "For GPs | Refer to MindBridge Psychology",
    description: "Streamlined referral process, same-week availability, bulk billing options for patients.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/for-gps",
  },
  keywords: [
    "refer patient to psychologist",
    "mental health treatment plan online",
    "GP referral psychologist",
    "bulk bill psychologist telehealth",
    "telehealth psychologist australia",
  ],
};

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function ForGPsPage() {
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
              For Referring GPs
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Partner With MindBridge
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              We make it easy to connect your patients with evidence-based
              psychological support. Streamlined referrals, same-week
              availability, and transparent communication back to you
              throughout the treatment journey.
            </p>
          </div>
        </div>
      </section>

      {/* Why Refer */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-primary-900 mb-4">
              Why Refer to MindBridge?
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We are built to support you and your patients with minimal
              administrative burden and maximum clinical quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "200+ Psychologists",
                description:
                  "A diverse team of clinical and registered psychologists across all specialisations, so we can match your patient to the right clinician.",
              },
              {
                icon: Clock,
                title: "Same-Week Appointments",
                description:
                  "Most patients are seen within 3 to 5 business days. No lengthy waitlists or delays in care.",
              },
              {
                icon: Shield,
                title: "Bulk Billing Available",
                description:
                  "Select psychologists offer Medicare bulk billing for eligible patients, removing financial barriers to care.",
              },
              {
                icon: Award,
                title: "AHPRA Registered",
                description:
                  "All psychologists are fully registered with AHPRA and hold current registration with the Psychology Board of Australia.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-neutral-100 p-6 hover:shadow-md transition-shadow text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-heading text-lg text-primary-900 mb-2">
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

      {/* How to Refer */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-primary-900 mb-4">
              How to Refer
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Three simple steps to connect your patient with the right
              psychologist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: ClipboardList,
                title: "Prepare the MHTP",
                description:
                  "Complete a Mental Health Treatment Plan with your patient. Include the presenting concerns, relevant history, and your clinical formulation.",
              },
              {
                step: "02",
                icon: Send,
                title: "Complete the Referral",
                description:
                  "Send the referral to MindBridge Psychology via our online referral form, fax, or secure email. Include the MHTP and any relevant clinical notes.",
              },
              {
                step: "03",
                icon: CheckCircle,
                title: "We Handle the Rest",
                description:
                  "We match your patient with an appropriate psychologist, schedule the appointment, and keep you informed with progress reports throughout treatment.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-2xl border border-neutral-100 p-8 hover:shadow-md transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-heading text-primary-200">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl text-primary-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Form / Downloads */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-sand-50 to-primary-50/30 rounded-2xl border border-sand-200 p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-2xl text-primary-900 mb-4">
                    Referral Form
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    Submit a referral online or download our referral form to
                    complete at your convenience. We accept referrals via our
                    secure online portal, fax, or email.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/referrals"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-300 shadow-sm group"
                    >
                      Online Referral Form
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href="/documents/referral-form.pdf"
                      className="inline-flex items-center gap-2 px-5 py-3 border border-neutral-200 bg-white text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-primary-900 mb-4">
                    Send Referrals To
                  </h3>
                  <ul className="space-y-3 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium text-primary-900">
                          Secure email:
                        </span>{" "}
                        referrals@mindbridgepsychology.com.au
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium text-primary-900">
                          Fax:
                        </span>{" "}
                        (03) 9000 0001
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium text-primary-900">
                          GP liaison:
                        </span>{" "}
                        {SITE_CONFIG.phone}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services for GPs */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-primary-900 mb-4">
              Our Services
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              A broad range of evidence-based psychological services to support
              your patients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: "Individual Therapy",
                description: "CBT, ACT, EMDR, Schema Therapy, DBT, and more.",
                medicare: true,
              },
              {
                title: "Couples & Family Therapy",
                description:
                  "Emotionally Focused Therapy and Gottman Method for relationship issues.",
                medicare: false,
              },
              {
                title: "Psychological Assessments",
                description:
                  "ADHD, autism, cognitive, and psychoeducational assessments.",
                medicare: false,
              },
              {
                title: "NDIS Psychology",
                description:
                  "Capacity building, behaviour support, and functional assessments.",
                medicare: false,
              },
              {
                title: "Corporate & EAP",
                description:
                  "Workplace mental health, critical incident response, and manager training.",
                medicare: false,
              },
              {
                title: "Group Programs",
                description:
                  "DBT skills groups, anxiety management, and anger management programs.",
                medicare: true,
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl border border-neutral-100 p-5 hover:shadow-sm transition-shadow"
              >
                <h3 className="font-semibold text-primary-900 mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-2">
                  {service.description}
                </p>
                {service.medicare && (
                  <Badge variant="success" size="sm">
                    Medicare Eligible
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for GPs */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 rounded-3xl px-8 py-16 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-heading text-3xl lg:text-4xl text-white mb-4">
                GP Liaison Team
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                Our dedicated GP liaison team is available to discuss patient
                suitability, treatment approaches, and referral pathways. We
                value collaborative care and keep you informed throughout.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  {SITE_CONFIG.phone}
                </a>
                <a
                  href="mailto:gp@mindbridgepsychology.com.au"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  Email GP Liaison
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
