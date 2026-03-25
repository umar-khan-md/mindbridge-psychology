import type { Metadata } from "next";
import { Raleway, Lora } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CrisisBanner } from "@/components/layout/crisis-strip";
import { BookingFab } from "@/components/layout/booking-fab";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

/* --------------------------------------------------------------------------
   Fonts
   -------------------------------------------------------------------------- */

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: {
    default: "MindBridge Psychology | Expert Telehealth Psychology Australia",
    template: "%s | MindBridge Psychology",
  },
  description:
    "Australia's premier telehealth psychology clinic. Access clinical psychologists, registered psychologists, and evidence-based mental health support from anywhere in Australia. Medicare, NDIS, WorkCover & DVA accepted.",
  keywords: [
    "telehealth psychology",
    "online psychologist Australia",
    "clinical psychologist telehealth",
    "Medicare psychology",
    "NDIS psychology",
    "online therapy Australia",
    "mental health support",
    "CBT therapy online",
    "couples therapy telehealth",
    "ADHD assessment online",
    "anxiety treatment",
    "depression therapy",
    "MindBridge Psychology",
  ],
  authors: [{ name: "MindBridge Psychology" }],
  creator: "MindBridge Psychology",
  publisher: "MindBridge Psychology",
  metadataBase: new URL("https://mindbridgepsychology.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au",
    siteName: "MindBridge Psychology",
    title: "MindBridge Psychology | Expert Telehealth Psychology Australia",
    description:
      "Access clinical psychologists and evidence-based mental health support from anywhere in Australia. Medicare, NDIS, WorkCover & DVA accepted.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MindBridge Psychology - Expert Telehealth Psychology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindBridge Psychology | Expert Telehealth Psychology Australia",
    description:
      "Access clinical psychologists and evidence-based mental health support from anywhere in Australia.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* --------------------------------------------------------------------------
   Root Layout
   -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${raleway.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS-prefetch fallback for older browsers */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="font-sans antialiased bg-bg-primary text-text-primary min-h-screen flex flex-col">
        <ToastProvider>
          {/* Skip navigation link — first focusable element (WCAG 2.4.1) */}
          <a
            href="#main-content"
            className="skip-link"
          >
            Skip to main content
          </a>
          <CrisisBanner />
          <Header />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
          <BookingFab />
        </ToastProvider>
      </body>
    </html>
  );
}
