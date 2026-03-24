import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Users, Laptop, GraduationCap, CheckCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers | MindBridge Psychology — Join Our Team",
  description:
    "Join the MindBridge Psychology team. We're looking for passionate AHPRA-registered psychologists to help deliver evidence-based telehealth care across Australia.",
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/careers",
  },
};

const benefits = [
  {
    icon: Laptop,
    title: "100% Telehealth",
    description:
      "Work from anywhere in Australia. No commute, no clinic overhead — just meaningful clinical work.",
  },
  {
    icon: Heart,
    title: "Supportive Culture",
    description:
      "Regular clinical supervision, peer consultation groups, and a genuine commitment to practitioner wellbeing.",
  },
  {
    icon: GraduationCap,
    title: "CPD & Growth",
    description:
      "Funded continuing professional development, access to specialist training, and clear career progression pathways.",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description:
      "Work alongside a multidisciplinary team of clinical and registered psychologists with diverse specialisations.",
  },
];

const openRoles = [
  {
    title: "Clinical Psychologist",
    type: "Part-time / Full-time",
    description:
      "AHPRA-registered clinical psychologist to deliver evidence-based individual therapy via telehealth. Experience with anxiety, depression, or trauma preferred.",
  },
  {
    title: "Registered Psychologist",
    type: "Part-time / Contractor",
    description:
      "AHPRA-registered psychologist to join our growing telehealth team. Strong CBT skills and Medicare provider number required.",
  },
  {
    title: "NDIS Specialist Psychologist",
    type: "Part-time",
    description:
      "Psychologist with NDIS experience to support participants with psychosocial disability. Capacity building and functional assessments.",
  },
];

export default function CareersPage() {
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
              Join Our Team
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Build a Career That Matters
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              MindBridge Psychology is looking for passionate, AHPRA-registered
              psychologists to join our telehealth-first team. Help us make
              quality psychological care accessible to all Australians.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${SITE_CONFIG.email}?subject=Career Enquiry`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:-translate-y-0.5 group"
              >
                Express Interest
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-primary-900 mb-4">
              Why Join MindBridge?
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We believe that happy, supported practitioners deliver the best
              outcomes. Here&apos;s what we offer our team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-primary-50/50 rounded-2xl p-6 border border-primary-100/60"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="font-heading text-lg text-primary-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl text-primary-900 mb-4 text-center">
              Current Openings
            </h2>
            <p className="text-neutral-600 text-center mb-12">
              We are currently recruiting for the following positions. Don&apos;t see
              the right role? We welcome speculative applications from
              experienced psychologists.
            </p>

            <div className="space-y-6">
              {openRoles.map((role) => (
                <div
                  key={role.title}
                  className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 lg:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <h3 className="font-heading text-xl text-primary-900">
                      {role.title}
                    </h3>
                    <Badge variant="default" className="shrink-0">
                      {role.type}
                    </Badge>
                  </div>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-sm text-primary-600">
                      <CheckCircle className="w-4 h-4" />
                      AHPRA registration required
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-primary-600">
                      <CheckCircle className="w-4 h-4" />
                      Medicare provider number
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-primary-600">
                      <CheckCircle className="w-4 h-4" />
                      Telehealth experience preferred
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-neutral-100">
                    <a
                      href={`mailto:${SITE_CONFIG.email}?subject=Application: ${role.title}`}
                      className="inline-flex items-center gap-2 text-primary-700 font-medium hover:text-primary-900 transition-colors group"
                    >
                      Apply via email
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
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
                Ready to Make a Difference?
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                Send your CV and a brief cover letter to our clinical director.
                We aim to respond to all applications within 5 business days.
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}?subject=Career Enquiry — MindBridge Psychology`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
