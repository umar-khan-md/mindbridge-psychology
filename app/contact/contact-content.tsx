"use client";

import { Mail, Phone, MapPin, Clock, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/features/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG, EMERGENCY } from "@/lib/constants";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phoneRaw}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: SITE_CONFIG.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address)}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri: 8am – 8pm AEST\nSat: 9am – 5pm AEST",
    href: undefined,
  },
];

const emergencyResources = [
  EMERGENCY.lifeline,
  EMERGENCY.beyondBlue,
  EMERGENCY.emergency,
  EMERGENCY.suicideCallback,
];

export function ContactPageContent() {
  return (
    <>
      <Breadcrumbs />

      {/* Hero */}
      <section className="bg-primary-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Have a question about our services, booking, or how Medicare and NDIS
            work with telehealth? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Contact Form — takes 3/5 */}
            <div className="lg:col-span-3">
              <Card padding="lg" hoverable={false}>
                <h2 className="text-2xl font-semibold text-primary-900 mb-1">
                  Send Us a Message
                </h2>
                <p className="text-neutral-600 mb-6">
                  Fill out the form below and we&apos;ll respond within 1
                  business day.
                </p>
                <ContactForm />
              </Card>
            </div>

            {/* Contact Info — takes 2/5 */}
            <div className="lg:col-span-2 space-y-6">
              <Card padding="lg" hoverable={false}>
                <h2 className="text-xl font-semibold text-primary-900 mb-5">
                  Contact Information
                </h2>
                <ul className="space-y-5">
                  {contactDetails.map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-900">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-neutral-600 hover:text-primary-700 transition-colors whitespace-pre-line"
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-neutral-600 whitespace-pre-line">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Map placeholder */}
              <Card hoverable={false} className="overflow-hidden">
                <div className="aspect-[4/3] bg-neutral-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-neutral-500">
                      Suite 329, 98-100 Elizabeth Street
                    </p>
                    <p className="text-sm text-neutral-400">
                      Melbourne VIC 3000
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm text-primary-700 hover:text-primary-800 font-medium underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="bg-red-50 border-t border-red-100 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-red-900">
                In a Crisis or Emergency?
              </h2>
              <p className="text-sm text-red-700 mt-1">
                If you or someone you know is in immediate danger, please call
                000. For 24/7 crisis support, contact one of these services:
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyResources.map((resource) => (
              <Card
                key={resource.name}
                padding="md"
                hoverable={false}
                className="bg-white border-red-100"
              >
                <CardContent className="p-0">
                  <p className="font-medium text-primary-900 text-sm">
                    {resource.name}
                  </p>
                  <a
                    href={`tel:${resource.phone.replace(/\s/g, "")}`}
                    className="text-lg font-semibold text-red-700 hover:text-red-800 transition-colors"
                  >
                    {resource.phone}
                  </a>
                  {"url" in resource && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-neutral-500 hover:text-primary-700 mt-1"
                    >
                      Visit website
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
