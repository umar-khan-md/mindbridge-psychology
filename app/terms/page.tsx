import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms and Conditions | MindBridge Psychology - Telehealth Psychology Australia",
  description:
    "Terms and Conditions for MindBridge Psychology telehealth services: booking, cancellation, payment, Medicare & NDIS billing policies. Read before your first session.",
  openGraph: {
    title: "Terms and Conditions | MindBridge Psychology",
    description:
      "Terms and Conditions for MindBridge Psychology telehealth services.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/terms",
  },
  twitter: {
    card: "summary",
    title: "Terms and Conditions | MindBridge Psychology",
    description: "Terms and Conditions for MindBridge Psychology telehealth services.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/terms",
  },
  keywords: [
    "telehealth terms and conditions",
    "psychology service terms",
    "online therapy terms australia",
  ],
};

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "services", title: "3. Services" },
  { id: "telehealth", title: "4. Telehealth" },
  { id: "booking-cancellation", title: "5. Booking and Cancellation" },
  { id: "payment", title: "6. Payment" },
  { id: "medicare-ndis", title: "7. Medicare, NDIS and Third-Party Billing" },
  { id: "intellectual-property", title: "8. Intellectual Property" },
  { id: "limitation-liability", title: "9. Limitation of Liability" },
  { id: "privacy", title: "10. Privacy" },
  { id: "governing-law", title: "11. Governing Law" },
  { id: "dispute-resolution", title: "12. Dispute Resolution" },
  { id: "changes-to-terms", title: "13. Changes to These Terms" },
  { id: "contact", title: "14. Contact" },
];

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs />

      <section className="py-12 sm:py-16 lg:py-20 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-sand-600 text-sm">Last updated: 24 March 2026</p>
            <p className="mt-4 text-sand-700 leading-relaxed">
              Please read these Terms and Conditions carefully before using the
              services provided by MindBridge Psychology Pty Ltd. By booking an
              appointment or using our website, you agree to be bound by these
              terms.
            </p>
          </div>

          {/* Table of Contents */}
          <nav
            aria-label="Terms and conditions table of contents"
            className="mb-12 p-6 bg-primary-50 rounded-2xl border border-primary-100"
          >
            <h2 className="font-serif text-lg font-semibold text-primary-900 mb-4">
              Table of Contents
            </h2>
            <ol className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-primary-700 hover:text-primary-900 hover:underline transition-colors text-sm sm:text-base"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Content */}
          <div className="prose prose-sand max-w-none space-y-12">
            {/* 1. Introduction */}
            <section id="introduction">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                These Terms and Conditions (&quot;Terms&quot;) govern your use of the
                services, website, and telehealth platform operated by
                MindBridge Psychology Pty Ltd (ABN: {SITE_CONFIG.abn}),
                trading as MindBridge Psychology (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
              </p>
              <p className="text-sand-700 leading-relaxed">
                By accessing our website at{" "}
                <a
                  href={SITE_CONFIG.url}
                  className="text-primary-700 hover:underline"
                >
                  {SITE_CONFIG.url}
                </a>{" "}
                or booking an appointment with any of our practitioners, you
                acknowledge that you have read, understood, and agree to be bound
                by these Terms. If you do not agree to these Terms, please do
                not use our services.
              </p>
            </section>

            {/* 2. Eligibility */}
            <section id="eligibility">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                2. Eligibility
              </h2>
              <ul className="list-disc pl-6 text-sand-700 space-y-2">
                <li>
                  Our services are available to individuals located within
                  Australia at the time of their session.
                </li>
                <li>
                  Clients under 18 years of age require parental or guardian
                  consent to access our services. A parent or guardian must be
                  available during the initial consultation and provide signed
                  consent.
                </li>
                <li>
                  You must have access to a reliable internet connection and a
                  device capable of supporting video conferencing for telehealth
                  sessions, or a working phone for phone consultations.
                </li>
                <li>
                  You confirm that the information you provide to us is
                  accurate, complete, and up to date.
                </li>
              </ul>
            </section>

            {/* 3. Services */}
            <section id="services">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                3. Services
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                MindBridge Psychology provides telehealth psychological services
                including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>Individual therapy and counselling</li>
                <li>Couples and relationship therapy</li>
                <li>Group therapy programs</li>
                <li>Psychological assessments (ADHD, ASD, cognitive, and personality)</li>
                <li>NDIS psychological services and capacity-building supports</li>
                <li>Corporate and employee assistance programs (EAP)</li>
                <li>Workshops and psychoeducation programs</li>
                <li>Mental Health Treatment Plan guidance</li>
              </ul>
              <p className="text-sand-700 leading-relaxed mt-4">
                Our services are therapeutic in nature and do not replace
                emergency or crisis services. If you are in immediate danger or
                experiencing a mental health crisis, please call 000 or contact
                Lifeline on 13 11 14. Our services are not a substitute for
                medical advice from a general practitioner or psychiatrist.
              </p>
            </section>

            {/* 4. Telehealth */}
            <section id="telehealth">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                4. Telehealth
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                All services are delivered via secure telehealth technology
                (video or phone). By using our telehealth services, you
                acknowledge and agree that:
              </p>
              <ol className="list-decimal pl-6 text-sand-700 space-y-2">
                <li>
                  Telehealth has inherent limitations, including potential
                  technology failures, reduced ability to observe non-verbal
                  cues, and privacy risks associated with remote communication.
                </li>
                <li>
                  You are responsible for ensuring you attend sessions from a
                  private, quiet, and safe environment.
                </li>
                <li>
                  You must not record sessions (audio or video) without the
                  explicit written consent of your practitioner.
                </li>
                <li>
                  In the event of a technology failure during a session, your
                  practitioner will attempt to re-establish contact. If the
                  session cannot be resumed within 10 minutes, you will be
                  offered a rescheduled session at no additional charge.
                </li>
                <li>
                  You consent to your practitioner confirming your physical
                  location at the start of each session for safety purposes.
                </li>
              </ol>
            </section>

            {/* 5. Booking and Cancellation */}
            <section id="booking-cancellation">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                5. Booking and Cancellation
              </h2>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                5.1 Booking
              </h3>
              <p className="text-sand-700 leading-relaxed">
                Appointments can be booked through our online booking system,
                by contacting us via email or phone, or through your
                practitioner directly. Booking confirmations and reminders will
                be sent to the email address you provide.
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                5.2 Cancellation Policy
              </h3>
              <p className="text-sand-700 leading-relaxed mb-4">
                We require a minimum of <strong>24 hours&apos; notice</strong>{" "}
                for all cancellations or rescheduling requests. Cancellations
                or changes made with less than 24 hours&apos; notice, or failure
                to attend a scheduled session (&quot;no-show&quot;), will incur the
                following fees:
              </p>
              <ul className="list-disc pl-6 text-sand-700 space-y-2">
                <li>
                  <strong>Late cancellation (less than 24 hours):</strong>{" "}
                  50% of the full session fee
                </li>
                <li>
                  <strong>No-show:</strong> 100% of the full session fee
                </li>
              </ul>
              <p className="text-sand-700 leading-relaxed mt-4">
                Cancellation fees cannot be claimed through Medicare, NDIS, or
                any other third-party funding scheme. Exceptions may be made at
                the discretion of your practitioner for genuine emergencies.
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                5.3 Practitioner Cancellations
              </h3>
              <p className="text-sand-700 leading-relaxed">
                In the event that your practitioner needs to cancel or
                reschedule a session, we will provide as much notice as
                possible and offer you an alternative appointment time. No fees
                will be charged for practitioner-initiated cancellations.
              </p>
            </section>

            {/* 6. Payment */}
            <section id="payment">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                6. Payment
              </h2>
              <ul className="list-disc pl-6 text-sand-700 space-y-2">
                <li>
                  Payment is due at the time of service unless alternative
                  arrangements have been agreed in advance.
                </li>
                <li>
                  We accept payment via credit card, debit card, and bank
                  transfer. Payment details are processed securely through our
                  payment provider and are not stored on our systems.
                </li>
                <li>
                  All fees are listed in Australian Dollars (AUD) and are GST-free
                  for health services as per the{" "}
                  <em>A New Tax System (Goods and Services Tax) Act 1999</em>.
                </li>
                <li>
                  A receipt will be provided for all payments, including any
                  Medicare rebate information where applicable.
                </li>
                <li>
                  Overdue accounts may be referred to a debt collection agency.
                  You will be notified in writing before any such referral.
                </li>
              </ul>
            </section>

            {/* 7. Medicare/NDIS */}
            <section id="medicare-ndis">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                7. Medicare, NDIS and Third-Party Billing
              </h2>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                7.1 Medicare
              </h3>
              <p className="text-sand-700 leading-relaxed mb-4">
                To access Medicare rebates for psychological services, you must
                have a valid GP Mental Health Treatment Plan (MHTP) and referral.
                Medicare provides rebates for up to 10 individual sessions per
                calendar year. We can process Medicare claims on your behalf via
                direct billing, with any gap fee payable at the time of service.
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                7.2 NDIS
              </h3>
              <p className="text-sand-700 leading-relaxed mb-4">
                For NDIS-funded clients, services are billed in accordance with
                the NDIS Pricing Arrangements and Price Limits. We are a
                registered NDIS provider and can process claims directly through
                the NDIS portal or via your plan manager. You must have
                psychology included in your NDIS plan.
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                7.3 WorkCover and DVA
              </h3>
              <p className="text-sand-700 leading-relaxed">
                For WorkCover and DVA-funded clients, prior approval from the
                relevant authority is required before commencing treatment. We
                will work with you and the funding body to obtain necessary
                approvals. Sessions are billed directly to the funding body at
                the approved rates.
              </p>
            </section>

            {/* 8. Intellectual Property */}
            <section id="intellectual-property">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                8. Intellectual Property
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                All content on the MindBridge Psychology website, including
                text, graphics, logos, images, blog articles, worksheets, and
                psychoeducation materials, is the intellectual property of
                MindBridge Psychology Pty Ltd or its licensors and is protected
                by Australian copyright law.
              </p>
              <p className="text-sand-700 leading-relaxed">
                You may not reproduce, distribute, modify, or create derivative
                works from any content on our website without our prior written
                consent. Worksheets and resources provided to you as part of
                your treatment are for your personal use only and may not be
                shared publicly or commercially.
              </p>
            </section>

            {/* 9. Limitation of Liability */}
            <section id="limitation-liability">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                To the maximum extent permitted by law:
              </p>
              <ol className="list-decimal pl-6 text-sand-700 space-y-2">
                <li>
                  MindBridge Psychology provides psychological services on an
                  &quot;as is&quot; basis and makes no guarantees regarding specific
                  therapeutic outcomes. Therapy outcomes depend on many factors
                  including the nature and severity of concerns, client
                  engagement, and external circumstances.
                </li>
                <li>
                  We are not liable for any indirect, incidental, special, or
                  consequential damages arising from or related to your use of
                  our services, website, or telehealth platform.
                </li>
                <li>
                  We are not liable for any loss, damage, or disruption caused
                  by technology failures, internet outages, or third-party
                  software issues beyond our reasonable control.
                </li>
                <li>
                  Nothing in these Terms excludes or limits any consumer
                  guarantees or rights that cannot be excluded under the{" "}
                  <em>Australian Consumer Law</em> (Schedule 2 of the{" "}
                  <em>Competition and Consumer Act 2010</em>).
                </li>
              </ol>
            </section>

            {/* 10. Privacy */}
            <section id="privacy">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                10. Privacy
              </h2>
              <p className="text-sand-700 leading-relaxed">
                Your privacy is extremely important to us. Our collection, use,
                storage, and disclosure of your personal and health information
                is governed by our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary-700 hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                , which forms part of these Terms. By using our services, you
                consent to the handling of your information as described in our
                Privacy Policy.
              </p>
            </section>

            {/* 11. Governing Law */}
            <section id="governing-law">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                11. Governing Law
              </h2>
              <p className="text-sand-700 leading-relaxed">
                These Terms are governed by and construed in accordance with the
                laws of the State of Victoria, Australia. You submit to the
                non-exclusive jurisdiction of the courts of Victoria and any
                courts that may hear appeals from those courts.
              </p>
            </section>

            {/* 12. Dispute Resolution */}
            <section id="dispute-resolution">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                12. Dispute Resolution
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                If a dispute arises between you and MindBridge Psychology in
                relation to these Terms or our services, the parties agree to
                the following process:
              </p>
              <ol className="list-decimal pl-6 text-sand-700 space-y-2">
                <li>
                  <strong>Negotiation:</strong> The parties will first attempt
                  to resolve the dispute through direct communication and
                  negotiation in good faith.
                </li>
                <li>
                  <strong>Mediation:</strong> If the dispute cannot be resolved
                  through negotiation within 30 days, the parties agree to
                  participate in mediation facilitated by an independent
                  mediator agreed upon by both parties (or appointed by the
                  Resolution Institute).
                </li>
                <li>
                  <strong>Escalation:</strong> If mediation is unsuccessful,
                  either party may commence legal proceedings in the courts of
                  Victoria, Australia.
                </li>
              </ol>
              <p className="text-sand-700 leading-relaxed mt-4">
                Nothing in this clause prevents either party from seeking urgent
                injunctive or interlocutory relief from a court of competent
                jurisdiction.
              </p>
            </section>

            {/* 13. Changes */}
            <section id="changes-to-terms">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                13. Changes to These Terms
              </h2>
              <p className="text-sand-700 leading-relaxed">
                We reserve the right to update or modify these Terms at any
                time. Material changes will be communicated by updating the
                &quot;Last updated&quot; date and posting a notice on our website.
                Continued use of our services following any changes constitutes
                your acceptance of the revised Terms. We encourage you to
                review these Terms periodically.
              </p>
            </section>

            {/* 14. Contact */}
            <section id="contact">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                14. Contact
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-sand-50 rounded-xl p-6 border border-sand-200">
                <ul className="text-sand-700 space-y-2">
                  <li>
                    <strong>MindBridge Psychology Pty Ltd</strong>
                  </li>
                  <li>{SITE_CONFIG.address}</li>
                  <li>
                    Email:{" "}
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-primary-700 hover:underline"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </li>
                  <li>
                    Phone:{" "}
                    <a
                      href={`tel:${SITE_CONFIG.phoneRaw}`}
                      className="text-primary-700 hover:underline"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* Back link */}
            <div className="pt-8 border-t border-sand-200">
              <Link
                href="/"
                className="text-primary-700 hover:text-primary-900 hover:underline transition-colors font-medium"
              >
                &larr; Return to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
