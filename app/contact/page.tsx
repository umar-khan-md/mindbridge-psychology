import type { Metadata } from "next";
import { ContactPageContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us | MindBridge Psychology - Telehealth Psychology Australia",
  description:
    "Contact MindBridge Psychology for bookings, NDIS enquiries, corporate programs, or general questions. Telehealth psychologist Australia. We respond within 1 business day.",
  openGraph: {
    title: "Contact Us | MindBridge Psychology",
    description:
      "Reach out to our telehealth psychology team for bookings, NDIS enquiries, or general questions. We respond within 1 business day.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact MindBridge Psychology | Telehealth Psychology Australia",
    description:
      "Get in touch for bookings, NDIS enquiries, or general questions. We respond within 1 business day.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/contact",
  },
  keywords: [
    "contact psychologist australia",
    "telehealth psychologist australia",
    "book psychologist online",
    "psychology clinic contact",
    "ndis psychology enquiry",
  ],
};

export default function ContactPage() {
  return <ContactPageContent />;
}
