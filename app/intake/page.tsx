import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, Shield, CheckCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "New Client Intake | MindBridge Psychology",
  description:
    "Complete your new client intake form for MindBridge Psychology. Provide us with some background information so we can match you with the right psychologist.",
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/intake",
  },
};

const steps = [
  {
    number: "1",
    title: "Complete This Form",
    description: "Share some background about yourself and what you are looking for help with.",
  },
  {
    number: "2",
    title: "Psychologist Matching",
    description: "We will match you with the most suitable psychologist for your needs.",
  },
  {
    number: "3",
    title: "Confirmation",
    description: "You will receive a confirmation email with your appointment details within 1 business day.",
  },
];

export default function IntakePage() {
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
              New Clients
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              New Client Intake Form
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Welcome to MindBridge Psychology. Please complete the form below
              so we can best understand your needs and match you with the right
              psychologist. All information is strictly confidential.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="pb-12">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="text-center bg-primary-50/50 rounded-2xl p-6 border border-primary-100/60"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-700 text-white font-bold flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-heading text-base text-primary-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-primary-700" />
                </div>
                <h2 className="font-heading text-2xl text-primary-900">
                  About You
                </h2>
              </div>

              <form className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-primary-900 mb-1.5">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-primary-900 mb-1.5">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="intake-email" className="block text-sm font-medium text-primary-900 mb-1.5">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="intake-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="intake-phone" className="block text-sm font-medium text-primary-900 mb-1.5">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="intake-phone"
                    type="tel"
                    required
                    placeholder="04xx xxx xxx"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-primary-900 mb-1.5">
                    What brings you to therapy? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="reason"
                    rows={4}
                    required
                    placeholder="Briefly describe what you are hoping to get support with..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white resize-none"
                  />
                </div>

                {/* Funding */}
                <div>
                  <label htmlFor="funding" className="block text-sm font-medium text-primary-900 mb-1.5">
                    How will you be funding your sessions?
                  </label>
                  <select
                    id="funding"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white"
                  >
                    <option value="">Please select...</option>
                    <option value="medicare">Medicare (Mental Health Treatment Plan)</option>
                    <option value="ndis">NDIS</option>
                    <option value="private">Private (out of pocket)</option>
                    <option value="eap">EAP / Employer funded</option>
                    <option value="insurance">Private health insurance</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3 bg-primary-50/50 rounded-xl p-4 border border-primary-100/60">
                  <input
                    id="consent"
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="consent" className="text-sm text-neutral-600 leading-relaxed">
                    I consent to MindBridge Psychology collecting and storing my
                    personal information in accordance with the{" "}
                    <Link href="/privacy-policy" className="text-primary-700 hover:text-primary-900 underline underline-offset-2">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/consent" className="text-primary-700 hover:text-primary-900 underline underline-offset-2">
                      Telehealth Consent Form
                    </Link>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-200 shadow-md shadow-primary-500/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  Submit Intake Form
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
                <Shield className="w-3.5 h-3.5" />
                <span>All information is kept strictly confidential</span>
              </div>
            </div>

            <div className="mt-6 bg-primary-50/50 rounded-2xl p-5 border border-primary-100/60">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary-900 mb-1">
                    Already have a referral?
                  </p>
                  <p className="text-sm text-neutral-600">
                    If your GP has provided a Mental Health Treatment Plan, you can{" "}
                    <Link href="/book" className="text-primary-700 hover:text-primary-900 underline underline-offset-2">
                      book directly
                    </Link>{" "}
                    or email your referral to{" "}
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary-700 hover:text-primary-900 underline underline-offset-2">
                      {SITE_CONFIG.email}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
