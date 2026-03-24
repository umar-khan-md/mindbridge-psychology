import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  CheckCircle,
  Shield,
  DollarSign,
  Briefcase,
  Medal,
  CreditCard,
  FileText,
  Info,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PricingCalculator } from "@/components/features/pricing-calculator";
import { Badge } from "@/components/ui/badge";
import {
  AccordionGroup,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { fees } from "@/data/fees";
import { formatCurrency } from "@/lib/utils";
import { SITE_CONFIG, MEDICARE_INFO } from "@/lib/constants";

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Psychology Pricing & Fees | MindBridge Psychology - Medicare & NDIS Accepted",
  description:
    "Transparent telehealth psychology pricing. Medicare rebates, bulk billing, NDIS, WorkCover & DVA. Use our calculator to see your out-of-pocket cost. No hidden fees.",
  openGraph: {
    title: "Psychology Pricing & Fees | MindBridge Psychology",
    description:
      "Clear, upfront pricing. Medicare rebates, bulk billing, NDIS, WorkCover & DVA accepted. Use our cost calculator.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psychology Pricing & Fees | MindBridge Psychology",
    description: "Transparent telehealth psychology pricing. Medicare, NDIS & bulk billing accepted.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/pricing",
  },
  keywords: [
    "bulk bill psychologist telehealth",
    "online therapy australia medicare",
    "psychology pricing australia",
    "ndis psychology telehealth",
    "telehealth psychologist cost",
  ],
};

/* --------------------------------------------------------------------------
   Fee Table (Server Component)
   -------------------------------------------------------------------------- */

function FeeTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-primary-100">
            <th className="py-4 pr-4 text-sm font-semibold text-primary-900">
              Service
            </th>
            <th className="py-4 px-4 text-sm font-semibold text-primary-900">
              Practitioner
            </th>
            <th className="py-4 px-4 text-sm font-semibold text-primary-900">
              Duration
            </th>
            <th className="py-4 px-4 text-sm font-semibold text-primary-900 text-right">
              Fee
            </th>
            <th className="py-4 px-4 text-sm font-semibold text-primary-900 text-right">
              Medicare Rebate
            </th>
            <th className="py-4 pl-4 text-sm font-semibold text-primary-900 text-right">
              Gap
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {fees
            .filter((f) => f.id !== "cancellation-fee")
            .map((fee) => (
              <tr key={fee.id} className="hover:bg-primary-50/30 transition-colors">
                <td className="py-4 pr-4 text-sm font-medium text-primary-900">
                  {fee.service}
                </td>
                <td className="py-4 px-4 text-sm text-neutral-600">
                  {fee.sessionType}
                </td>
                <td className="py-4 px-4 text-sm text-neutral-600">{fee.duration}</td>
                <td className="py-4 px-4 text-sm font-semibold text-primary-900 text-right">
                  {fee.privateFee > 0 ? formatCurrency(fee.privateFee) : "Contact us"}
                </td>
                <td className="py-4 px-4 text-sm text-emerald-700 text-right">
                  {fee.medicareRebate ? formatCurrency(fee.medicareRebate) : "—"}
                </td>
                <td className="py-4 pl-4 text-sm font-medium text-primary-900 text-right">
                  {fee.gapFee !== undefined ? formatCurrency(fee.gapFee) : "—"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Funding Section Card
   -------------------------------------------------------------------------- */

interface FundingSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge?: string;
  children: React.ReactNode;
}

function FundingSection({ icon: Icon, title, badge, children }: FundingSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-8 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="font-heading text-xl text-primary-900">{title}</h3>
          {badge && (
            <Badge variant="success" size="sm" className="mt-0.5">
              {badge}
            </Badge>
          )}
        </div>
      </div>
      <div className="text-neutral-600 leading-relaxed text-sm space-y-3">
        {children}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function PricingPage() {
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
              No Hidden Fees
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Transparent Pricing
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              We believe you deserve to know exactly what you will pay before
              your first session. Use our pricing calculator to see your
              out-of-pocket cost based on your service and funding method.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <PricingCalculator />
          </div>
        </div>
      </section>

      {/* Full Fee Table */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <h2 className="font-heading text-3xl text-primary-900 mb-8 text-center">
            Full Fee Schedule
          </h2>
          <div className="bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8 shadow-sm">
            <FeeTable />
            <div className="mt-6 flex items-start gap-2 p-4 bg-amber-50 rounded-xl">
              <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800">
                Late cancellations (less than 24 hours notice) and no-shows incur a fee
                of {formatCurrency(100)}. Medicare rebates cannot be claimed for
                cancelled sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Options */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-primary-900 mb-4">
              Funding Options Explained
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We accept a wide range of funding methods to make psychology
              accessible. Here is how each option works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FundingSection
              icon={Shield}
              title="Medicare Bulk Bill"
              badge="No out-of-pocket cost"
            >
              <p>
                Bulk billing means we bill Medicare directly and you pay nothing
                out of pocket. This option is available for eligible concession card
                holders seeing a Registered Psychologist, subject to practitioner
                availability.
              </p>
              <div>
                <p className="font-medium text-primary-900 mb-2">How to access:</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Visit your GP for a Mental Health Treatment Plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Request a referral to MindBridge Psychology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Confirm your concession card eligibility at booking</span>
                  </li>
                </ul>
              </div>
            </FundingSection>

            <FundingSection icon={DollarSign} title="Medicare Rebate">
              <p>
                With a valid GP Mental Health Treatment Plan, Medicare provides a
                rebate for up to {MEDICARE_INFO.maxSessions} psychology sessions per calendar
                year. You pay the full fee at each session and claim the rebate
                back through Medicare.
              </p>
              <div>
                <p className="font-medium text-primary-900 mb-2">Rebate amounts:</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>
                      Registered Psychologist: {formatCurrency(MEDICARE_INFO.rebateGeneral)} rebate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>
                      Clinical Psychologist: {formatCurrency(MEDICARE_INFO.rebateClinical)} rebate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Claim via Medicare app, MyGov, or your health fund</span>
                  </li>
                </ul>
              </div>
            </FundingSection>

            <FundingSection icon={Shield} title="NDIS">
              <p>
                MindBridge Psychology is a registered NDIS provider. Sessions are
                billed at NDIS Price Guide rates under Improved Daily Living
                (Therapeutic Supports). No out-of-pocket cost with sufficient
                plan funding.
              </p>
              <div>
                <p className="font-medium text-primary-900 mb-2">We accept:</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Agency-managed plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Plan-managed plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Self-managed plans</span>
                  </li>
                </ul>
              </div>
            </FundingSection>

            <FundingSection icon={Briefcase} title="WorkCover">
              <p>
                If you have sustained a psychological injury at work, your
                WorkCover insurance may cover the cost of psychology sessions. We
                work with WorkCover insurers across all Australian states and
                territories.
              </p>
              <div>
                <p className="font-medium text-primary-900 mb-2">Process:</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Lodge a WorkCover claim with your employer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Obtain pre-approval from your insurer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>We bill the insurer directly — no out-of-pocket cost</span>
                  </li>
                </ul>
              </div>
            </FundingSection>

            <FundingSection icon={Medal} title="DVA">
              <p>
                Veterans with a DVA Gold or White Card are eligible for
                psychology sessions at no out-of-pocket cost. We honour DVA
                funding and appreciate the service of our veteran clients.
              </p>
              <div>
                <p className="font-medium text-primary-900 mb-2">Eligible cards:</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>DVA Gold Card — all services covered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>DVA White Card — accepted conditions covered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>GP or psychiatrist referral required</span>
                  </li>
                </ul>
              </div>
            </FundingSection>

            <FundingSection icon={CreditCard} title="Self-Funded">
              <p>
                Self-funded sessions require no referral, no Mental Health
                Treatment Plan, and have no session limits. You have complete
                freedom to choose your practitioner and session frequency.
              </p>
              <div>
                <p className="font-medium text-primary-900 mb-2">Benefits:</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>No referral or GP visit required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>No limit on sessions per year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Private health fund rebates may apply</span>
                  </li>
                </ul>
              </div>
            </FundingSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl text-primary-900 mb-8 text-center">
              Pricing FAQs
            </h2>
            <AccordionGroup single>
              <AccordionItem value="referral">
                <AccordionTrigger>
                  Do I need a referral to see a psychologist?
                </AccordionTrigger>
                <AccordionContent>
                  If you are self-funding, no referral is required. To access
                  Medicare rebates, you will need a Mental Health Treatment Plan
                  from your GP. NDIS, WorkCover, and DVA each have their own
                  referral requirements — we can guide you through the process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sessions">
                <AccordionTrigger>
                  How many Medicare sessions can I get per year?
                </AccordionTrigger>
                <AccordionContent>
                  Under the Better Access initiative, you are entitled to up to{" "}
                  {MEDICARE_INFO.maxSessions} individually rebated psychology
                  sessions per calendar year. Your GP will review your Treatment
                  Plan after the initial sessions to authorise additional
                  sessions if clinically indicated.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="gap">
                <AccordionTrigger>
                  What is a gap fee?
                </AccordionTrigger>
                <AccordionContent>
                  The gap fee is the difference between the psychologist's
                  session fee and the Medicare rebate amount. This is your
                  out-of-pocket cost per session when using Medicare. Our pricing
                  calculator above shows you the exact gap fee for each service
                  type.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger>
                  How do I pay for sessions?
                </AccordionTrigger>
                <AccordionContent>
                  Payment is made at the time of your session via credit or debit
                  card. If you are using Medicare, you pay the full fee and claim
                  the rebate back through Medicare (via the Medicare app, MyGov,
                  or at a Medicare office). For NDIS, WorkCover, and DVA clients,
                  we bill the funder directly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cancellation">
                <AccordionTrigger>
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent>
                  We require at least 24 hours notice for cancellations. Late
                  cancellations and no-shows incur a fee of {formatCurrency(100)}.
                  Medicare rebates cannot be claimed for cancelled sessions. We
                  understand that emergencies happen and will exercise discretion
                  on a case-by-case basis.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="phf">
                <AccordionTrigger>
                  Can I claim through my private health fund?
                </AccordionTrigger>
                <AccordionContent>
                  Private health fund rebates for psychology depend on your level
                  of cover and insurer. We recommend checking with your fund
                  before your first appointment. Note that you cannot claim both
                  a Medicare rebate and a private health fund rebate for the same
                  session.
                </AccordionContent>
              </AccordionItem>
            </AccordionGroup>
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
                Ready to Book?
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                Find a psychologist who matches your needs and book your first
                session today. Same-week availability for most practitioners.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/practitioners"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Find a Psychologist
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
