import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | MindBridge Psychology - Telehealth Psychology Australia",
  description:
    "MindBridge Psychology Privacy Policy: how we collect, use, store & protect your personal and health information under the Australian Privacy Act 1988. HIPAA-compliant telehealth.",
  openGraph: {
    title: "Privacy Policy | MindBridge Psychology",
    description:
      "How MindBridge Psychology collects, uses, and protects your personal information under the Australian Privacy Act 1988.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/privacy-policy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | MindBridge Psychology",
    description: "Our privacy commitments under the Australian Privacy Act 1988.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/privacy-policy",
  },
  keywords: [
    "telehealth privacy policy",
    "psychology privacy australia",
    "health data privacy",
  ],
};

/* --------------------------------------------------------------------------
   Table of contents sections
   -------------------------------------------------------------------------- */

const sections = [
  { id: "who-we-are", title: "1. Who We Are" },
  { id: "information-we-collect", title: "2. What Personal Information We Collect" },
  { id: "how-we-collect", title: "3. How We Collect Your Information" },
  { id: "why-we-collect", title: "4. Why We Collect Your Information" },
  { id: "use-and-disclosure", title: "5. How We Use and Disclose Your Information" },
  { id: "data-storage-security", title: "6. Data Storage and Security" },
  { id: "access-and-correction", title: "7. Access and Correction Rights" },
  { id: "data-retention", title: "8. Data Retention and Destruction" },
  { id: "cross-border-disclosure", title: "9. Cross-Border Disclosure" },
  { id: "complaints", title: "10. Complaints Process" },
  { id: "telehealth-privacy", title: "11. Telehealth-Specific Privacy Considerations" },
  { id: "cookies-analytics", title: "12. Cookies and Analytics" },
  { id: "changes-to-policy", title: "13. Changes to This Policy" },
  { id: "contact", title: "14. Contact Our Privacy Officer" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs />

      <section className="py-12 sm:py-16 lg:py-20 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-sand-600 text-sm">
              Last updated: 24 March 2026
            </p>
            <p className="mt-4 text-sand-700 leading-relaxed">
              MindBridge Psychology Pty Ltd is committed to protecting your privacy and
              handling your personal information in accordance with the{" "}
              <em>Privacy Act 1988</em> (Cth) and the Australian Privacy
              Principles (APPs). This policy explains how we collect, use,
              store, disclose, and protect your personal and health information.
            </p>
          </div>

          {/* Table of Contents */}
          <nav
            aria-label="Privacy policy table of contents"
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
            {/* 1. Who We Are */}
            <section id="who-we-are">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                1. Who We Are
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                MindBridge Psychology Pty Ltd (ABN: {SITE_CONFIG.abn}) is a
                telehealth-first psychology clinic registered in Victoria,
                Australia. We provide evidence-based psychological services to
                individuals, couples, and organisations across Australia via
                secure video and phone consultations.
              </p>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>
                  <strong>Registered Address:</strong> {SITE_CONFIG.address}
                </li>
                <li>
                  <strong>Phone:</strong> {SITE_CONFIG.phone}
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-primary-700 hover:underline"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a
                    href={SITE_CONFIG.url}
                    className="text-primary-700 hover:underline"
                  >
                    {SITE_CONFIG.url}
                  </a>
                </li>
              </ul>
              <p className="text-sand-700 leading-relaxed mt-4">
                All our psychologists are registered with the Australian Health
                Practitioner Regulation Agency (AHPRA) and comply with the{" "}
                <em>Psychology Board of Australia&apos;s Code of Ethics</em>,{" "}
                the <em>Health Practitioner Regulation National Law Act 2009</em>,
                and the <em>Health Records Act 2001</em> (Vic).
              </p>
            </section>

            {/* 2. What Information We Collect */}
            <section id="information-we-collect">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                2. What Personal Information We Collect
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                We may collect the following categories of personal information:
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                2.1 Identity and Contact Information
              </h3>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>Full name, date of birth, pronouns, gender identity</li>
                <li>Residential and postal address</li>
                <li>Email address and phone number</li>
                <li>Emergency contact details</li>
              </ul>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                2.2 Health Information (Sensitive Information)
              </h3>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>
                  Mental health history, presenting concerns, and treatment
                  records
                </li>
                <li>
                  Clinical notes, assessment results, and treatment plans
                </li>
                <li>Medication history and relevant medical conditions</li>
                <li>
                  Referral letters, GP Mental Health Treatment Plans, and
                  correspondence with other health professionals
                </li>
                <li>Risk assessments and safety plans</li>
              </ul>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                2.3 Billing and Funding Information
              </h3>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>Medicare card number and Individual Reference Number (IRN)</li>
                <li>NDIS participant number and plan details</li>
                <li>WorkCover and DVA claim numbers</li>
                <li>
                  Private health insurance details (where relevant)
                </li>
                <li>Payment and billing records</li>
              </ul>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                2.4 Technical and Website Information
              </h3>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>IP address, browser type, and device information</li>
                <li>
                  Pages visited, referral sources, and interaction data
                  (via anonymised analytics)
                </li>
                <li>Cookie preferences</li>
              </ul>
            </section>

            {/* 3. How We Collect */}
            <section id="how-we-collect">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                3. How We Collect Your Information
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                We collect personal information in the following ways:
              </p>
              <ol className="list-decimal pl-6 text-sand-700 space-y-3">
                <li>
                  <strong>Directly from you:</strong> When you complete our
                  intake forms, book an appointment, attend a session, contact
                  us by phone or email, complete self-assessment questionnaires,
                  or submit a contact form on our website.
                </li>
                <li>
                  <strong>From referring professionals:</strong> When your GP,
                  psychiatrist, paediatrician, or other health professional
                  provides a referral or Mental Health Treatment Plan.
                </li>
                <li>
                  <strong>From funding bodies:</strong> When we verify your
                  eligibility through Medicare, NDIS portals, or WorkCover/DVA
                  systems.
                </li>
                <li>
                  <strong>Through our telehealth platform:</strong> Technical
                  metadata necessary for the secure delivery of video and phone
                  consultations (we do not record sessions unless we obtain your
                  explicit written consent).
                </li>
                <li>
                  <strong>Through our website:</strong> Via cookies and
                  analytics tools when you browse our site (see Section 12).
                </li>
              </ol>
              <p className="text-sand-700 leading-relaxed mt-4">
                We will always endeavour to collect personal information directly
                from you. Where we collect information from a third party, we
                will take reasonable steps to ensure you are aware of the
                information collected and the circumstances of its collection
                (APP 5).
              </p>
            </section>

            {/* 4. Why We Collect */}
            <section id="why-we-collect">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                4. Why We Collect Your Information
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                We collect and hold your personal information for the following
                purposes (APP 6):
              </p>
              <ol className="list-decimal pl-6 text-sand-700 space-y-2">
                <li>
                  To provide you with professional psychological assessment,
                  treatment, and therapeutic services
                </li>
                <li>
                  To maintain accurate clinical records as required by
                  professional and legal obligations
                </li>
                <li>
                  To communicate with you about your appointments, treatment
                  progress, and administrative matters
                </li>
                <li>
                  To process billing, Medicare claims, NDIS service bookings,
                  WorkCover and DVA claims
                </li>
                <li>
                  To correspond with your GP or other treating professionals
                  (with your consent)
                </li>
                <li>
                  To comply with mandatory reporting obligations, court orders,
                  and other legal requirements
                </li>
                <li>
                  To manage risk and ensure your safety, including maintaining
                  safety plans
                </li>
                <li>
                  To improve our services and website through anonymised,
                  aggregated data
                </li>
              </ol>
              <p className="text-sand-700 leading-relaxed mt-4">
                We will not collect personal information unless it is reasonably
                necessary for one or more of our functions or activities, or
                unless we are required by law to do so. We do not collect
                sensitive health information without your consent except where
                required or authorised by law.
              </p>
            </section>

            {/* 5. Use and Disclosure */}
            <section id="use-and-disclosure">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                5. How We Use and Disclose Your Information
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                We use and disclose your information only for the purposes for
                which it was collected, or for a directly related secondary
                purpose that you would reasonably expect (APP 6).
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                5.1 Disclosure With Your Consent
              </h3>
              <p className="text-sand-700 leading-relaxed mb-4">
                With your written consent, we may share information with:
              </p>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>
                  Your GP or referring practitioner (treatment summaries,
                  progress reports)
                </li>
                <li>Other treating health professionals</li>
                <li>
                  Schools, employers, or other parties you nominate (e.g. for
                  workplace adjustment reports)
                </li>
                <li>NDIS plan managers, support coordinators, or LACs</li>
              </ul>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                5.2 Disclosure Without Your Consent
              </h3>
              <p className="text-sand-700 leading-relaxed mb-4">
                In limited circumstances, we may be required or authorised to
                disclose your information without your consent, including:
              </p>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>
                  Where there is a serious and imminent threat to your life,
                  health, or safety, or to the life, health, or safety of
                  another person
                </li>
                <li>
                  Where we are required by law, including mandatory reporting of
                  child abuse or neglect
                </li>
                <li>
                  Where required by a court order, subpoena, or statutory
                  authority
                </li>
                <li>
                  For Medicare, NDIS, or other funding body audit and compliance
                  purposes
                </li>
                <li>
                  Where reasonably necessary for law enforcement purposes
                </li>
              </ul>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                5.3 Direct Marketing
              </h3>
              <p className="text-sand-700 leading-relaxed">
                We do not use your personal or health information for direct
                marketing purposes. If you subscribe to our newsletter or blog
                updates, you may opt out at any time using the unsubscribe link
                in each communication.
              </p>
            </section>

            {/* 6. Data Storage and Security */}
            <section id="data-storage-security">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                6. Data Storage and Security
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                We take all reasonable steps to protect your personal and health
                information from misuse, interference, loss, unauthorised
                access, modification, and disclosure (APP 11).
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                6.1 Technical Safeguards
              </h3>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>
                  All clinical records are stored in encrypted, access-controlled
                  systems hosted on Australian-based servers
                </li>
                <li>
                  Our telehealth platform uses end-to-end encryption for all
                  video and phone sessions
                </li>
                <li>
                  Our website uses TLS/SSL encryption for all data transmitted
                  between your browser and our servers
                </li>
                <li>
                  Multi-factor authentication is required for practitioner
                  access to clinical records
                </li>
                <li>
                  Automatic session timeouts and audit logging are enforced
                  across all systems
                </li>
              </ul>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                6.2 Organisational Safeguards
              </h3>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>
                  Access to personal and health information is restricted to
                  authorised practitioners and administrative staff on a
                  need-to-know basis
                </li>
                <li>
                  All staff complete regular privacy and information security
                  training
                </li>
                <li>
                  Confidentiality agreements are in place with all staff,
                  contractors, and third-party service providers
                </li>
                <li>
                  Regular security audits and vulnerability assessments are
                  conducted
                </li>
              </ul>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                6.3 Physical Safeguards
              </h3>
              <p className="text-sand-700 leading-relaxed">
                Any paper-based records (where applicable) are stored in
                locked, secure cabinets with restricted access. As a
                telehealth-first practice, we maintain minimal paper records.
              </p>
            </section>

            {/* 7. Access and Correction */}
            <section id="access-and-correction">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                7. Access and Correction Rights
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                Under APP 12 and APP 13, you have the right to:
              </p>
              <ol className="list-decimal pl-6 text-sand-700 space-y-3">
                <li>
                  <strong>Request access</strong> to the personal and health
                  information we hold about you. We will respond to your request
                  within 30 days and provide access in the manner you request
                  (where reasonable and practicable).
                </li>
                <li>
                  <strong>Request correction</strong> of any personal
                  information that is inaccurate, out-of-date, incomplete,
                  irrelevant, or misleading.
                </li>
                <li>
                  <strong>Receive a copy</strong> of your clinical records
                  (subject to applicable fees for administrative time and
                  copying).
                </li>
              </ol>
              <p className="text-sand-700 leading-relaxed mt-4">
                In limited circumstances, we may refuse access where:
              </p>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>
                  Providing access would pose a serious threat to the life,
                  health, or safety of any individual
                </li>
                <li>
                  The information relates to existing or anticipated legal
                  proceedings and would not be accessible through the discovery
                  process
                </li>
                <li>
                  Providing access would be unlawful or would prejudice law
                  enforcement activities
                </li>
              </ul>
              <p className="text-sand-700 leading-relaxed mt-4">
                If we refuse access, we will provide written reasons for the
                refusal and the mechanisms available to you to make a complaint.
              </p>
            </section>

            {/* 8. Data Retention */}
            <section id="data-retention">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                8. Data Retention and Destruction
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                We retain your personal and health information in accordance
                with our legal obligations:
              </p>
              <ul className="list-disc pl-6 text-sand-700 space-y-2">
                <li>
                  <strong>Adult client records:</strong> Retained for a minimum
                  of 7 years from the date of last contact, as required by the{" "}
                  <em>Health Records Act 2001</em> (Vic) and AHPRA guidelines.
                </li>
                <li>
                  <strong>Records of clients who were minors:</strong> Retained
                  until the client reaches 25 years of age, or for 7 years from
                  the date of last contact, whichever is later.
                </li>
                <li>
                  <strong>Medicare and billing records:</strong> Retained for a
                  minimum of 6 years as required by the{" "}
                  <em>Health Insurance Act 1973</em>.
                </li>
                <li>
                  <strong>NDIS records:</strong> Retained for a minimum of 7
                  years from the end of the NDIS plan period.
                </li>
              </ul>
              <p className="text-sand-700 leading-relaxed mt-4">
                When personal information is no longer required for any purpose
                and is not subject to a retention obligation, we will take
                reasonable steps to permanently destroy or de-identify the
                information (APP 11.2). Electronic records are securely deleted
                using industry-standard data destruction methods.
              </p>
            </section>

            {/* 9. Cross-Border Disclosure */}
            <section id="cross-border-disclosure">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                9. Cross-Border Disclosure
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                MindBridge Psychology stores all personal and health information
                on servers located within Australia. We do not routinely
                disclose your personal information to overseas recipients (APP
                8).
              </p>
              <p className="text-sand-700 leading-relaxed">
                Some of our website analytics and communication tools may
                process limited, anonymised technical data (such as aggregated
                website usage statistics) on servers outside Australia. This
                data does not include any personal or health information. Where
                any cross-border disclosure of personal information is required,
                we will comply with APP 8 and take reasonable steps to ensure
                the overseas recipient handles your information in accordance
                with the Australian Privacy Principles.
              </p>
            </section>

            {/* 10. Complaints */}
            <section id="complaints">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                10. Complaints Process
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                If you believe we have breached your privacy or mishandled your
                personal information, you may lodge a complaint:
              </p>
              <ol className="list-decimal pl-6 text-sand-700 space-y-3">
                <li>
                  <strong>Contact our Privacy Officer</strong> in writing at{" "}
                  <a
                    href={`mailto:privacy@mindbridgepsychology.com.au`}
                    className="text-primary-700 hover:underline"
                  >
                    privacy@mindbridgepsychology.com.au
                  </a>{" "}
                  or by post to our registered address. Please include details
                  of the alleged breach and any supporting information.
                </li>
                <li>
                  We will acknowledge your complaint within{" "}
                  <strong>5 business days</strong> and investigate the matter
                  thoroughly.
                </li>
                <li>
                  We aim to resolve all complaints within{" "}
                  <strong>30 days</strong>. We will notify you of the outcome in
                  writing, including any corrective action taken.
                </li>
                <li>
                  If you are not satisfied with our response, you may lodge a
                  complaint with the{" "}
                  <strong>
                    Office of the Australian Information Commissioner (OAIC)
                  </strong>
                  :
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      Website:{" "}
                      <a
                        href="https://www.oaic.gov.au"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-700 hover:underline"
                      >
                        www.oaic.gov.au
                      </a>
                    </li>
                    <li>Phone: 1300 363 992</li>
                    <li>
                      Post: GPO Box 5218, Sydney NSW 2001
                    </li>
                  </ul>
                </li>
                <li>
                  You may also contact the{" "}
                  <strong>Health Complaints Commissioner (Victoria)</strong> at{" "}
                  <a
                    href="https://www.hcc.vic.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-700 hover:underline"
                  >
                    www.hcc.vic.gov.au
                  </a>{" "}
                  or the <strong>AHPRA</strong> at{" "}
                  <a
                    href="https://www.ahpra.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-700 hover:underline"
                  >
                    www.ahpra.gov.au
                  </a>
                  .
                </li>
              </ol>
            </section>

            {/* 11. Telehealth Privacy */}
            <section id="telehealth-privacy">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                11. Telehealth-Specific Privacy Considerations
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                As a telehealth-first practice, we implement additional privacy
                safeguards specific to the remote delivery of psychological
                services:
              </p>
              <ul className="list-disc pl-6 text-sand-700 space-y-2">
                <li>
                  <strong>Session privacy:</strong> We encourage clients to
                  attend sessions from a private, quiet location where they will
                  not be overheard. Your practitioner will also ensure they are
                  in a private, confidential environment.
                </li>
                <li>
                  <strong>No recording:</strong> Sessions are not recorded
                  unless we obtain your explicit written consent. Clients are
                  prohibited from recording sessions without the practitioner&apos;s
                  written consent.
                </li>
                <li>
                  <strong>Secure platform:</strong> Our telehealth platform
                  meets Australian privacy standards and uses end-to-end
                  encryption. Session data is not stored on our platform
                  servers.
                </li>
                <li>
                  <strong>Informed consent:</strong> Before your first
                  telehealth session, you will be asked to provide informed
                  consent acknowledging the inherent limitations of telehealth
                  (e.g. technology failures, reduced non-verbal cues) and
                  confirming your agreement to the telehealth service model.
                </li>
                <li>
                  <strong>Emergency protocols:</strong> Your practitioner will
                  confirm your physical location at the start of each session
                  and maintain an up-to-date emergency contact and safety plan.
                </li>
                <li>
                  <strong>Device security:</strong> We recommend clients use a
                  private, password-protected device and a secure internet
                  connection when attending sessions.
                </li>
              </ul>
            </section>

            {/* 12. Cookies and Analytics */}
            <section id="cookies-analytics">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                12. Cookies and Analytics
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                Our website uses cookies and similar technologies to improve
                your browsing experience and to collect anonymised usage
                statistics.
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                12.1 Essential Cookies
              </h3>
              <p className="text-sand-700 leading-relaxed">
                These are necessary for the website to function properly (e.g.
                session management, cookie consent preferences). They cannot be
                disabled.
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                12.2 Analytics Cookies
              </h3>
              <p className="text-sand-700 leading-relaxed">
                We use Google Analytics (with IP anonymisation enabled) to
                understand how visitors use our website. This data is
                aggregated and does not identify individual users. You can opt
                out of analytics cookies through our cookie consent banner or by
                installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-700 hover:underline"
                >
                  Google Analytics Opt-Out Browser Add-on
                </a>
                .
              </p>

              <h3 className="font-semibold text-primary-800 mt-6 mb-2">
                12.3 Your Cookie Choices
              </h3>
              <p className="text-sand-700 leading-relaxed">
                When you first visit our website, you will be presented with a
                cookie consent banner allowing you to accept all cookies or
                limit your preference to essential cookies only. You can change
                your cookie preferences at any time through your browser
                settings.
              </p>
            </section>

            {/* 13. Changes to Policy */}
            <section id="changes-to-policy">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                13. Changes to This Policy
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, applicable laws, or regulatory
                requirements. When we make material changes, we will:
              </p>
              <ul className="list-disc pl-6 text-sand-700 space-y-1">
                <li>
                  Update the &quot;Last updated&quot; date at the top of this page
                </li>
                <li>
                  Post a notice on our website for a reasonable period
                </li>
                <li>
                  Notify active clients directly where changes materially
                  affect how we handle their health information
                </li>
              </ul>
              <p className="text-sand-700 leading-relaxed mt-4">
                We encourage you to review this policy periodically to stay
                informed about how we protect your information.
              </p>
            </section>

            {/* 14. Contact */}
            <section id="contact">
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
                14. Contact Our Privacy Officer
              </h2>
              <p className="text-sand-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding your
                privacy or this policy, please contact our Privacy Officer:
              </p>
              <div className="bg-sand-50 rounded-xl p-6 border border-sand-200">
                <ul className="text-sand-700 space-y-2">
                  <li>
                    <strong>Privacy Officer</strong>
                  </li>
                  <li>MindBridge Psychology Pty Ltd</li>
                  <li>{SITE_CONFIG.address}</li>
                  <li>
                    Email:{" "}
                    <a
                      href="mailto:privacy@mindbridgepsychology.com.au"
                      className="text-primary-700 hover:underline"
                    >
                      privacy@mindbridgepsychology.com.au
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
