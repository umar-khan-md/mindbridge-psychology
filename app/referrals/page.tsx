import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  FileText,
  Stethoscope,
  Shield,
  Briefcase,
  User,
  CheckCircle,
  HelpCircle,
  DollarSign,
  ClipboardList,
  Info,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Referral Pathways | MindBridge Psychology - How to Access Online Psychology",
  description:
    "How to access telehealth psychology: GP referral (Medicare), NDIS, employer/EAP & self-referral pathways. Step-by-step guides for each funding option. Start online therapy today.",
  openGraph: {
    title: "Referral Pathways | MindBridge Psychology",
    description:
      "GP referral, NDIS, EAP, and self-referral pathways explained. Access psychology services with your preferred funding.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/referrals",
  },
  twitter: {
    card: "summary_large_image",
    title: "Referral Pathways | MindBridge Psychology",
    description: "GP referral, NDIS, EAP & self-referral pathways to access online psychology.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/referrals",
  },
  keywords: [
    "mental health treatment plan online",
    "GP referral psychologist",
    "ndis psychology telehealth",
    "online therapy australia medicare",
    "self referral psychologist",
  ],
};

/* --------------------------------------------------------------------------
   Pathway Card
   -------------------------------------------------------------------------- */

interface PathwayProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge?: string;
  badgeVariant?: "default" | "success" | "accent";
  description: string;
  steps: string[];
  whatYouNeed: string[];
  funding: string;
}

function PathwayCard({
  icon: Icon,
  title,
  badge,
  badgeVariant = "default",
  description,
  steps,
  whatYouNeed,
  funding,
}: PathwayProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-8 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="font-heading text-xl text-primary-900">{title}</h3>
          {badge && (
            <Badge variant={badgeVariant} size="sm" className="mt-0.5">
              {badge}
            </Badge>
          )}
        </div>
      </div>

      <p className="text-neutral-600 text-sm leading-relaxed mb-5">
        {description}
      </p>

      {/* Steps */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-3">
          Step-by-step process
        </p>
        <ol className="space-y-2.5">
          {steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-neutral-600">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* What You Need */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-3">
          What you need
        </p>
        <ul className="space-y-1.5">
          {whatYouNeed.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-neutral-600"
            >
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Funding */}
      <div className="flex items-start gap-2 p-3 bg-sand-50 rounded-lg">
        <DollarSign className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
        <p className="text-sm text-neutral-600">{funding}</p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function ReferralsPage() {
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
              Multiple Pathways
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Referral Pathways
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              There are several ways to access psychology services at MindBridge.
              Whether you have a GP referral, NDIS plan, employer program, or
              simply want to self-refer, we have a pathway for you.
            </p>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <PathwayCard
              icon={Stethoscope}
              title="GP Referral (Medicare)"
              badge="Most Common"
              badgeVariant="success"
              description="The most common pathway for accessing rebated psychology sessions. Your GP prepares a Mental Health Treatment Plan (MHTP) and refers you to MindBridge Psychology."
              steps={[
                "Book a longer appointment with your GP (30-40 minutes) and discuss your mental health concerns.",
                "Your GP conducts an assessment and creates a Mental Health Treatment Plan (MHTP).",
                "Ask your GP to refer you to MindBridge Psychology or a specific psychologist by name.",
                "Contact us with your MHTP and referral, and we will match you with the right psychologist.",
                "Attend your session — we handle the Medicare claim on your behalf.",
              ]}
              whatYouNeed={[
                "Mental Health Treatment Plan from your GP",
                "GP referral naming MindBridge Psychology",
                "Medicare card number and IRN",
              ]}
              funding="Medicare subsidises up to 10 individual sessions per calendar year. Bulk billing available with select psychologists. Otherwise, the gap fee is your out-of-pocket cost."
            />

            <PathwayCard
              icon={Shield}
              title="NDIS Referral"
              description="For NDIS participants with psychology funding in their plan. Sessions are billed at NDIS-approved rates under the Capacity Building - Improved Daily Living support category."
              steps={[
                "Check your NDIS plan includes psychology funding under Improved Daily Living.",
                "Contact MindBridge Psychology with your NDIS participant number and plan details.",
                "We match you with a psychologist experienced in NDIS service delivery.",
                "For plan-managed participants, we invoice your plan manager directly. For self-managed, we provide detailed invoices.",
              ]}
              whatYouNeed={[
                "Active NDIS plan with psychology funding",
                "NDIS participant number",
                "Plan manager details (if plan-managed)",
                "Support coordinator contact (if applicable)",
              ]}
              funding="Sessions billed at NDIS Price Guide rates. No out-of-pocket cost for plan-managed and agency-managed participants with sufficient funding."
            />

            <PathwayCard
              icon={Briefcase}
              title="Employer / EAP Referral"
              description="If your employer has a corporate wellness arrangement or Employee Assistance Program with MindBridge, you may access sessions at no personal cost."
              steps={[
                "Check with your HR department or wellbeing coordinator whether MindBridge is an approved EAP provider.",
                "Obtain your organisation's EAP access code or authorisation details.",
                "Contact us or book directly, quoting your employer's program details.",
                "Attend your sessions — your employer is invoiced directly. Sessions are confidential.",
              ]}
              whatYouNeed={[
                "Employer EAP access code or authorisation",
                "Organisation name",
                "Your name and contact details",
              ]}
              funding="EAP sessions are typically funded by your employer at no cost to you. The number of sessions depends on your employer's program (usually 3-8 per issue)."
            />

            <PathwayCard
              icon={User}
              title="Self-Referral"
              badge="No Referral Needed"
              badgeVariant="accent"
              description="No GP referral, Mental Health Treatment Plan, or waiting period required. Book directly with any of our psychologists as a self-funded client."
              steps={[
                "Browse our team directory and choose a psychologist who suits your needs and preferences.",
                "Book an appointment online or call our client services team.",
                "Attend your session — pay by credit or debit card at the time of your appointment.",
              ]}
              whatYouNeed={[
                "No referral or plan required",
                "Payment method (credit or debit card)",
              ]}
              funding="You pay the full session fee. No Medicare rebate applies without a MHTP. Private health fund rebates may apply depending on your level of cover — check with your insurer."
            />
          </div>
        </div>
      </section>

      {/* Professional Referral Form */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-sand-50 to-primary-50/30 rounded-2xl border border-sand-200 p-8 lg:p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6">
              <ClipboardList className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="font-heading text-2xl text-primary-900 mb-3">
              Professional Referral Form
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6 max-w-lg mx-auto">
              GPs, specialists, and allied health professionals can submit
              patient referrals through our secure online form or download a
              PDF version.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/for-gps"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-300 shadow-sm group"
              >
                GP Referral Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="/documents/referral-form.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 bg-white text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Download Referral Form
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure Which Pathway */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-primary-50 rounded-2xl border border-primary-100">
              <HelpCircle className="w-6 h-6 text-primary-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  Not sure which pathway is right for you?
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  Our client services team can help you understand your options,
                  check your eligibility for Medicare or NDIS funding, and guide
                  you through the referral process. There is no cost or
                  obligation for this initial conversation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
                  >
                    Read our FAQ
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {SITE_CONFIG.phone}
                  </a>
                </div>
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
                Ready to Get Started?
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                Whichever pathway you choose, we are here to make the process as
                smooth as possible. Book online or call us today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Book a Session
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
