import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Calendar,
  Monitor,
  FileText,
  Clock,
  CreditCard,
  Shield,
  CheckCircle,
  Info,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title:
    "Book a Telehealth Psychologist | MindBridge Psychology - Online Therapy Australia",
  description:
    "Book a telehealth psychology appointment online. Same-week availability, Medicare bulk billing, NDIS & DVA accepted. AHPRA-registered psychologists Australia-wide.",
  openGraph: {
    title: "Book a Telehealth Psychologist | MindBridge Psychology",
    description:
      "Book a telehealth psychology appointment online or by phone. Same-week availability, Medicare bulk billing, and NDIS accepted.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/book",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Telehealth Psychologist | MindBridge Psychology",
    description:
      "Book your telehealth psychology session online in minutes. Same-week availability. Medicare & NDIS accepted.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/book",
  },
  keywords: [
    "book psychologist online australia",
    "telehealth psychologist australia",
    "online therapy australia medicare",
    "bulk bill psychologist telehealth",
    "psychologist near me telehealth",
  ],
};

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function BookPage() {
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
              Same-Week Availability
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Book Your Session
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Take the first step toward better mental health. Book your
              telehealth psychology session online in minutes, or call our
              friendly team to find the right psychologist for you.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Options */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Book Online */}
            <div className="bg-white rounded-2xl border-2 border-primary-200 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                  <Monitor className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="font-heading text-2xl text-primary-900 mb-3">
                  Book Online
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Choose your preferred psychologist, select a time that suits
                  you, and receive instant confirmation. Available 24/7.
                </p>

                {/* Calendly Placeholder */}
                <div className="bg-sand-50 border-2 border-dashed border-sand-300 rounded-xl p-8 text-center mb-6">
                  <Calendar className="w-10 h-10 text-primary-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-primary-700 mb-2">
                    Calendly scheduling widget will be embedded here
                  </p>
                  <a
                    href="https://calendly.com/mindbridge-psychology"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Open Calendly booking page
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" size="sm">
                    Instant Confirmation
                  </Badge>
                  <Badge variant="default" size="sm">
                    24/7 Booking
                  </Badge>
                </div>
              </div>
            </div>

            {/* Call Us */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-50 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent-100 flex items-center justify-center mb-6">
                  <Phone className="w-7 h-7 text-accent-600" />
                </div>
                <h2 className="font-heading text-2xl text-primary-900 mb-3">
                  Call Us
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Prefer to speak with someone? Our client services team can
                  help match you with the right psychologist and book your
                  appointment over the phone.
                </p>

                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-primary-700 to-primary-800 text-white font-semibold rounded-xl hover:from-primary-800 hover:to-primary-900 transition-all duration-300 shadow-md hover:shadow-lg group mb-4"
                >
                  <Phone className="w-5 h-5" />
                  <div>
                    <span className="block text-lg">{SITE_CONFIG.phone}</span>
                    <span className="block text-xs text-primary-200 font-normal">
                      Mon - Fri, 8am - 6pm AEST
                    </span>
                  </div>
                </a>

                <p className="text-sm text-neutral-500">
                  Our team can answer questions about fees, Medicare eligibility,
                  NDIS funding, and help you choose a practitioner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure Who to See */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-sand-50 to-primary-50/30 rounded-2xl border border-sand-200 p-8 lg:p-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                <Sparkles className="w-8 h-8 text-accent-500" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-heading text-xl text-primary-900 mb-2">
                  Not sure who to see?
                </h3>
                <p className="text-neutral-600">
                  Our matching tool recommends psychologists based on your
                  concerns, preferences, and funding type. It takes less than
                  two minutes.
                </p>
              </div>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 hover:border-primary-200 transition-all duration-300 shadow-sm shrink-0 group"
              >
                Find My Match
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl text-primary-900 mb-8 text-center">
              What to Bring to Your First Session
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: FileText,
                  title: "Mental Health Treatment Plan",
                  description:
                    "If you have one from your GP. Required for Medicare rebates.",
                },
                {
                  icon: CreditCard,
                  title: "Medicare / NDIS Card",
                  description:
                    "Your Medicare number and IRN, or NDIS participant number.",
                },
                {
                  icon: Shield,
                  title: "Referral Letter",
                  description:
                    "GP referral, NDIS plan, or employer EAP authorisation.",
                },
                {
                  icon: Monitor,
                  title: "Working Technology",
                  description:
                    "Device with camera and microphone, plus a stable internet connection.",
                },
                {
                  icon: Clock,
                  title: "A Private Space",
                  description:
                    "Find a quiet, private location where you will not be interrupted.",
                },
                {
                  icon: FileText,
                  title: "Notes or Questions",
                  description:
                    "Jot down anything you would like to discuss. There is no wrong thing to raise.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-neutral-100 p-5 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-200">
              <Info className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">
                  Cancellation Policy
                </h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  We require at least <strong>24 hours' notice</strong> for
                  cancellations or rescheduling. Late cancellations (less than 24
                  hours) and missed appointments may incur a fee equal to the
                  full session cost. This fee cannot be claimed through Medicare,
                  NDIS, or other funding bodies. If you experience an emergency,
                  please contact us and we will do our best to accommodate you.
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
                Your Wellbeing Starts Here
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                Whether you are seeking support for anxiety, depression,
                relationships, or simply want to talk to someone, we are here to
                help. Same-week availability for most practitioners.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Browse Our Team
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/self-assessment"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  Take Self-Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
