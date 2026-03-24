import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Shield, CheckCircle, Phone, Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Complaints & Feedback | MindBridge Psychology",
  description:
    "We take all feedback seriously. Learn how to raise a concern or complaint about your experience with MindBridge Psychology, and how we will respond.",
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/complaints",
  },
};

const process = [
  {
    step: "1",
    title: "Contact Us Directly",
    description:
      "In the first instance, please contact our client services team by email or phone. We aim to acknowledge all complaints within 2 business days.",
  },
  {
    step: "2",
    title: "Formal Review",
    description:
      "Your complaint is reviewed by our clinical director. We will contact you to discuss the matter and gather any further information needed.",
  },
  {
    step: "3",
    title: "Resolution",
    description:
      "We will provide a written response outlining the outcome of our review within 14 business days. We are committed to fair, transparent resolution.",
  },
  {
    step: "4",
    title: "External Bodies",
    description:
      "If you are not satisfied with our response, you may escalate to AHPRA or the relevant Health Complaints Commissioner in your state.",
  },
];

const externalBodies = [
  {
    name: "AHPRA (Australian Health Practitioner Regulation Agency)",
    description: "Regulates health practitioners in Australia, including psychologists.",
    website: "https://www.ahpra.gov.au",
  },
  {
    name: "Health Complaints Commissioner (VIC)",
    description: "Independent body for health service complaints in Victoria.",
    website: "https://hcc.vic.gov.au",
  },
  {
    name: "Australian Psychological Society (APS)",
    description: "The national peak body for psychology in Australia.",
    website: "https://www.psychology.org.au",
  },
];

export default function ComplaintsPage() {
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
              Feedback & Complaints
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              We Value Your Feedback
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Your experience matters to us. If something has not met your
              expectations, we encourage you to let us know. All complaints are
              handled with care, confidentiality, and a commitment to
              continuous improvement.
            </p>
          </div>
        </div>
      </section>

      {/* How to lodge a complaint */}
      <section className="pb-16 lg:pb-20 bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl text-primary-900 mb-8 text-center">
              How to Raise a Concern
            </h2>

            <div className="bg-primary-50/50 rounded-2xl border border-primary-100/60 p-8 mb-10">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-primary-900">Email</span>
                  </div>
                  <a
                    href={`mailto:${SITE_CONFIG.email}?subject=Complaint or Feedback`}
                    className="text-primary-700 hover:text-primary-900 transition-colors underline underline-offset-2"
                  >
                    {SITE_CONFIG.email}
                  </a>
                  <p className="text-sm text-neutral-500 mt-1">
                    Subject: Complaint or Feedback
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-primary-900">Phone</span>
                  </div>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="text-primary-700 hover:text-primary-900 transition-colors underline underline-offset-2"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                  <p className="text-sm text-neutral-500 mt-1">
                    Mon–Fri, 9am–5pm AEST
                  </p>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div className="space-y-6">
              {process.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-5 bg-white rounded-2xl border border-neutral-100 shadow-sm p-6"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-primary-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our commitments */}
      <section className="py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl text-primary-900 mb-8 text-center">
              Our Commitments to You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Acknowledge your complaint within 2 business days",
                "Treat you with dignity, respect, and fairness",
                "Maintain strict confidentiality throughout the process",
                "Provide a written outcome within 14 business days",
                "Learn and improve our services from every complaint",
                "Never disadvantage you for raising a concern",
              ].map((commitment) => (
                <div
                  key={commitment}
                  className="flex items-start gap-3 bg-white rounded-xl border border-neutral-100 p-4 shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700">{commitment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* External bodies */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl text-primary-900 mb-6">
              External Regulatory Bodies
            </h2>
            <p className="text-neutral-600 mb-8">
              If you are not satisfied with the outcome of our internal complaint
              process, you have the right to escalate your complaint to an
              external body:
            </p>
            <div className="space-y-4">
              {externalBodies.map((body) => (
                <div
                  key={body.name}
                  className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-1">
                        {body.name}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {body.description}
                      </p>
                    </div>
                    <a
                      href={body.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 text-sm text-primary-700 font-medium hover:text-primary-900 transition-colors group"
                    >
                      Visit
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
