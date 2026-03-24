import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight, AlertTriangle, Heart, Shield } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG, EMERGENCY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Crisis Support | MindBridge Psychology — Immediate Help",
  description:
    "If you or someone you know is in crisis, help is available right now. Australian crisis lines including Lifeline, Beyond Blue, and 000.",
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/crisis-support",
  },
};

const crisisServices = [
  {
    name: "Lifeline",
    phone: "13 11 14",
    phoneRaw: "131114",
    description:
      "24/7 crisis support and suicide prevention. Free call from any phone in Australia.",
    hours: "24 hours, 7 days",
    type: "crisis",
  },
  {
    name: "Beyond Blue",
    phone: "1300 22 4636",
    phoneRaw: "1300224636",
    description:
      "Support for anxiety, depression, and mental health. Trained counsellors available around the clock.",
    hours: "24 hours, 7 days",
    type: "crisis",
  },
  {
    name: "Suicide Call Back Service",
    phone: "1300 659 467",
    phoneRaw: "1300659467",
    description:
      "Free professional telephone and online counselling for people at risk of suicide.",
    hours: "24 hours, 7 days",
    type: "crisis",
  },
  {
    name: "Kids Helpline",
    phone: "1800 55 1800",
    phoneRaw: "1800551800",
    description:
      "Free, private and confidential 24/7 phone and online counselling for young people aged 5–25.",
    hours: "24 hours, 7 days",
    type: "youth",
  },
  {
    name: "MensLine Australia",
    phone: "1300 78 99 78",
    phoneRaw: "1300789978",
    description:
      "Professional telephone and online support service for Australian men with emotional health and relationship concerns.",
    hours: "24 hours, 7 days",
    type: "men",
  },
  {
    name: "1800RESPECT",
    phone: "1800 737 732",
    phoneRaw: "1800737732",
    description:
      "National sexual assault, domestic violence and family violence counselling service.",
    hours: "24 hours, 7 days",
    type: "safety",
  },
  {
    name: "Emergency Services",
    phone: "000",
    phoneRaw: "000",
    description:
      "Call 000 immediately if there is an immediate risk to life — yours or someone else&apos;s.",
    hours: "Always",
    type: "emergency",
  },
];

export default function CrisisSupportPage() {
  return (
    <>
      <Breadcrumbs />

      {/* Alert Banner */}
      <div className="bg-red-50 border-b border-red-200">
        <div className="container-wide py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">
              <strong>If you are in immediate danger,</strong> please call{" "}
              <a
                href="tel:000"
                className="font-bold underline hover:text-red-950"
              >
                000
              </a>{" "}
              now or go to your nearest emergency department.
            </p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="default" className="mb-4">
              You Are Not Alone
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Crisis Support Resources
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              If you or someone you know is experiencing a mental health crisis,
              immediate help is available. The services below are free, confidential,
              and available 24 hours a day, 7 days a week.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Services */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto space-y-4">
            {crisisServices.map((service) => (
              <div
                key={service.name}
                className={`bg-white rounded-2xl border shadow-sm p-6 lg:p-8 ${
                  service.type === "emergency"
                    ? "border-red-200 bg-red-50/30"
                    : "border-neutral-100"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="font-heading text-xl text-primary-900">
                        {service.name}
                      </h2>
                      {service.type === "emergency" && (
                        <Badge variant="default" className="text-xs bg-red-100 text-red-800 border-red-200">
                          Emergency
                        </Badge>
                      )}
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <p className="text-xs text-neutral-400">
                      Available: {service.hours}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <a
                      href={`tel:${service.phoneRaw}`}
                      className={`inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                        service.type === "emergency"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-primary-700 text-white hover:bg-primary-800"
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      {service.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not in crisis, need regular support */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 rounded-3xl px-8 py-16 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-heading text-3xl lg:text-4xl text-white mb-4">
                Ready for Ongoing Support?
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                Once you are safe, MindBridge Psychology can provide ongoing,
                evidence-based therapy via telehealth. Our AHPRA-registered
                psychologists are here to support your recovery.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Book a Session
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  <Shield className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
