import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServiceGrid } from "@/components/sections/service-grid";
import { PageTransition } from "@/components/ui/page-transition";
import { Skeleton } from "@/components/ui/skeleton";

/* --------------------------------------------------------------------------
   Below-fold lazy-loaded sections with loading skeletons
   -------------------------------------------------------------------------- */

const HowItWorksSteps = dynamic(
  () =>
    import("@/components/sections/how-it-works-steps").then(
      (mod) => mod.HowItWorksSteps
    ),
  {
    loading: () => (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton variant="heading" className="mx-auto" width="40%" />
          <Skeleton variant="text" className="mx-auto" width="60%" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                <Skeleton variant="heading" className="mx-auto" width="60%" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="80%" />
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    ssr: true,
  }
);

const TeamCarousel = dynamic(
  () =>
    import("@/components/sections/team-carousel").then(
      (mod) => mod.TeamCarousel
    ),
  {
    loading: () => (
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton variant="heading" className="mx-auto" width="35%" />
          <Skeleton variant="text" className="mx-auto" width="50%" />
          <div className="flex gap-6 mt-12 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 bg-white rounded-xl border border-neutral-100 p-6 space-y-4"
              >
                <Skeleton className="h-20 w-20 rounded-full mx-auto" />
                <Skeleton variant="heading" className="mx-auto" width="70%" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    ssr: true,
  }
);

const PricingPreview = dynamic(
  () =>
    import("@/components/sections/pricing-preview").then(
      (mod) => mod.PricingPreview
    ),
  {
    loading: () => (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton variant="heading" className="mx-auto" width="30%" />
          <Skeleton variant="text" className="mx-auto" width="50%" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-neutral-100 p-8 space-y-4"
              >
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="heading" width="50%" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="70%" />
                <Skeleton className="h-12 w-full rounded-xl mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    ssr: true,
  }
);

const Testimonials = dynamic(
  () =>
    import("@/components/sections/testimonials").then(
      (mod) => mod.Testimonials
    ),
  {
    loading: () => (
      <section className="py-16 lg:py-24 bg-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton variant="heading" className="mx-auto" width="35%" />
          <Skeleton variant="text" className="mx-auto" width="45%" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 space-y-4"
              >
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
                <div className="flex items-center gap-3 pt-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="30%" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    ssr: true,
  }
);

const CTABanner = dynamic(
  () =>
    import("@/components/sections/cta-banner").then((mod) => mod.CTABanner),
  {
    loading: () => (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-100 rounded-3xl p-16 animate-pulse">
            <div className="max-w-2xl mx-auto space-y-6 text-center">
              <Skeleton variant="heading" className="mx-auto" width="50%" />
              <Skeleton variant="text" className="mx-auto" width="70%" />
              <div className="flex gap-4 justify-center mt-8">
                <Skeleton className="h-14 w-40 rounded-xl" />
                <Skeleton className="h-14 w-40 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    ssr: true,
  }
);

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title:
    "MindBridge Psychology | Telehealth Psychologist Australia | Online Therapy",
  description:
    "Access Australia's leading telehealth psychologists from home. Bulk bill psychologist telehealth, NDIS, WorkCover & DVA. AHPRA registered clinical psychologists. Book today.",
  openGraph: {
    title:
      "MindBridge Psychology | Telehealth Psychologist Australia",
    description:
      "AHPRA-registered psychologists delivering evidence-based therapy via secure telehealth. $0 bulk bill available. Medicare, NDIS, WorkCover & DVA accepted.",
    type: "website",
    locale: "en_AU",
    siteName: "MindBridge Psychology",
    url: "https://mindbridgepsychology.com.au",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindBridge Psychology | Telehealth Psychologist Australia",
    description:
      "Access clinical psychologists from home via secure telehealth. Medicare bulk billing, NDIS & DVA accepted.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au",
  },
  keywords: [
    "telehealth psychologist australia",
    "online psychology australia",
    "bulk bill psychologist telehealth",
    "ndis psychology telehealth",
    "psychologist near me telehealth",
    "online therapy australia medicare",
    "clinical psychologist telehealth melbourne",
    "mental health treatment plan online",
    "couples therapy online australia",
    "corporate eap psychology",
  ],
};

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <PageTransition>
      <main>
        {/* Above-fold — eagerly loaded for fast LCP */}
        <Hero />
        <TrustStrip />
        <ServiceGrid />

        {/* Below-fold — lazy loaded with skeleton placeholders */}
        <HowItWorksSteps />
        <TeamCarousel />
        <PricingPreview />
        <Testimonials />
        <CTABanner />
      </main>
    </PageTransition>
  );
}
