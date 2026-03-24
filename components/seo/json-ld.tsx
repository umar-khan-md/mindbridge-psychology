import { SITE_CONFIG } from "@/lib/constants";

/* --------------------------------------------------------------------------
   Types
   -------------------------------------------------------------------------- */

interface OrganizationProps {
  type: "organization";
}

interface MedicalBusinessProps {
  type: "medicalBusiness";
}

interface FAQPageProps {
  type: "faqPage";
  faqs: { question: string; answer: string }[];
}

interface ArticleProps {
  type: "article";
  title: string;
  author: string;
  datePublished: string;
  image?: string;
  description?: string;
  url?: string;
}

interface PersonProps {
  type: "person";
  name: string;
  jobTitle: string;
  qualifications?: string[];
  image?: string;
  url?: string;
  description?: string;
}

interface BreadcrumbProps {
  type: "breadcrumb";
  items: { name: string; href: string }[];
}

interface ServiceProps {
  type: "service";
  name: string;
  description: string;
  url: string;
  provider?: string;
}

interface MedicalConditionProps {
  type: "medicalCondition";
  name: string;
  description: string;
  url: string;
  symptoms?: string[];
  possibleTreatment?: string[];
}

interface LocalBusinessProps {
  type: "localBusiness";
}

interface ProfessionalServiceProps {
  type: "professionalService";
}

type JsonLdProps =
  | OrganizationProps
  | MedicalBusinessProps
  | FAQPageProps
  | ArticleProps
  | PersonProps
  | BreadcrumbProps
  | ServiceProps
  | MedicalConditionProps
  | LocalBusinessProps
  | ProfessionalServiceProps;

/* --------------------------------------------------------------------------
   Shared fragments
   -------------------------------------------------------------------------- */

const ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "Suite 329, 98-100 Elizabeth Street",
  addressLocality: "Melbourne",
  addressRegion: "VIC",
  postalCode: "3000",
  addressCountry: "AU",
};

const GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: -37.8136,
  longitude: 144.9631,
};

const LOGO_URL = `${SITE_CONFIG.url}/images/logo.png`;

const SAME_AS = [
  "https://www.facebook.com/mindbridgepsychology",
  "https://www.instagram.com/mindbridgepsychology",
  "https://www.linkedin.com/company/mindbridgepsychology",
];

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "20:00",
  },
  {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: "Saturday",
    opens: "09:00",
    closes: "15:00",
  },
];

const AVAILABLE_SERVICES = [
  {
    "@type": "MedicalTherapy",
    name: "Individual Therapy",
    description:
      "Evidence-based one-on-one therapy via telehealth for anxiety, depression, trauma, and more.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Couples Therapy",
    description:
      "Relationship and couples counselling delivered via secure video conferencing.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Group Therapy",
    description:
      "Facilitated online group therapy programs for shared mental health concerns.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Psychological Assessments",
    description:
      "Comprehensive ADHD, ASD, cognitive, and personality assessments.",
  },
  {
    "@type": "MedicalTherapy",
    name: "NDIS Psychology",
    description:
      "NDIS-funded psychological services and capacity-building supports.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Mental Health Treatment Plans",
    description:
      "Guidance on Medicare mental health treatment plans and GP referrals.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Corporate EAP",
    description:
      "Employee assistance programs and workplace mental health solutions.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Workshops & Training",
    description:
      "Mental health workshops and psychoeducation for organisations and groups.",
  },
];

/* --------------------------------------------------------------------------
   Builders
   -------------------------------------------------------------------------- */

function buildOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    description: SITE_CONFIG.description,
    address: ADDRESS,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    sameAs: SAME_AS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phoneRaw,
        contactType: "customer service",
        areaServed: "AU",
        availableLanguage: ["English", "Mandarin", "Cantonese", "Hindi", "Vietnamese"],
      },
      {
        "@type": "ContactPoint",
        email: SITE_CONFIG.email,
        contactType: "customer service",
        areaServed: "AU",
      },
    ],
    foundingLocation: {
      "@type": "Place",
      address: ADDRESS,
    },
    knowsAbout: [
      "Clinical Psychology",
      "Telehealth Psychology",
      "Cognitive Behavioural Therapy",
      "NDIS Psychology",
      "Couples Therapy",
      "ADHD Assessment",
      "Mental Health Treatment Plans",
    ],
  };
}

function buildMedicalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "HealthAndBeautyBusiness"],
    "@id": `${SITE_CONFIG.url}/#medicalbusiness`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    description: SITE_CONFIG.description,
    address: ADDRESS,
    geo: GEO,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    medicalSpecialty: [
      "http://schema.org/Psychiatric",
      "Psychology",
      "Clinical Psychology",
      "Counselling Psychology",
    ],
    availableService: AVAILABLE_SERVICES,
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Credit Card, Debit Card, Bank Transfer, Medicare, NDIS, WorkCover, DVA",
    openingHoursSpecification: OPENING_HOURS,
    sameAs: SAME_AS,
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Psychology Services",
      itemListElement: AVAILABLE_SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
    isAcceptingNewPatients: true,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

function buildFAQPage(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildArticle(props: ArticleProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.title,
    author: {
      "@type": "Person",
      name: props.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    datePublished: props.datePublished,
    dateModified: props.datePublished,
    ...(props.image && {
      image: props.image.startsWith("http")
        ? props.image
        : `${SITE_CONFIG.url}${props.image}`,
    }),
    ...(props.description && { description: props.description }),
    ...(props.url && { url: props.url }),
    mainEntityOfPage: {
      "@type": "WebPage",
      ...(props.url && { "@id": props.url }),
    },
    inLanguage: "en-AU",
  };
}

function buildPerson(props: PersonProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: props.name,
    jobTitle: props.jobTitle,
    ...(props.qualifications && {
      hasCredential: props.qualifications.map((q) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: q,
      })),
    }),
    ...(props.image && {
      image: props.image.startsWith("http")
        ? props.image
        : `${SITE_CONFIG.url}${props.image}`,
    }),
    ...(props.url && { url: props.url }),
    ...(props.description && { description: props.description }),
    worksFor: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    affiliation: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    knowsAbout: ["Psychology", "Mental Health", "Telehealth"],
    memberOf: {
      "@type": "Organization",
      name: "Australian Health Practitioner Regulation Agency (AHPRA)",
    },
  };
}

function buildBreadcrumb(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };
}

function buildService(props: ServiceProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: props.name,
    description: props.description,
    url: props.url,
    provider: {
      "@type": "Organization",
      name: props.provider ?? SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    serviceType: "Telehealth Psychology",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: props.name,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: props.name,
            description: props.description,
          },
        },
      ],
    },
  };
}

function buildMedicalCondition(props: MedicalConditionProps) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: props.name,
    description: props.description,
    url: props.url,
    ...(props.symptoms && {
      signOrSymptom: props.symptoms.map((s) => ({
        "@type": "MedicalSignOrSymptom",
        name: s,
      })),
    }),
    ...(props.possibleTreatment && {
      possibleTreatment: props.possibleTreatment.map((t) => ({
        "@type": "MedicalTherapy",
        name: t,
      })),
    }),
    medicineSystem: "http://schema.org/WesternConventional",
  };
}

function buildLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: LOGO_URL,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    description: SITE_CONFIG.description,
    address: ADDRESS,
    geo: GEO,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "$$",
    currenciesAccepted: "AUD",
    openingHoursSpecification: OPENING_HOURS,
    sameAs: SAME_AS,
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: GEO,
      geoRadius: "5000000",
    },
    hasMap: "https://maps.google.com/?q=Suite+329,+98-100+Elizabeth+Street,+Melbourne+VIC+3000",
  };
}

function buildProfessionalService() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_CONFIG.url}/#professionalservice`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: LOGO_URL,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    description: SITE_CONFIG.description,
    address: ADDRESS,
    geo: GEO,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "$$",
    openingHoursSpecification: OPENING_HOURS,
    sameAs: SAME_AS,
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    knowsAbout: [
      "Clinical Psychology",
      "Telehealth Psychology",
      "Cognitive Behavioural Therapy",
      "NDIS Psychology",
      "Medicare Psychology",
      "Couples Therapy",
      "ADHD Assessment",
      "Mental Health Treatment Plans",
      "Employee Assistance Programs",
    ],
  };
}

/* --------------------------------------------------------------------------
   Component
   -------------------------------------------------------------------------- */

export function JsonLd(props: JsonLdProps) {
  let data: Record<string, unknown>;

  switch (props.type) {
    case "organization":
      data = buildOrganization();
      break;
    case "medicalBusiness":
      data = buildMedicalBusiness();
      break;
    case "faqPage":
      data = buildFAQPage(props.faqs);
      break;
    case "article":
      data = buildArticle(props);
      break;
    case "person":
      data = buildPerson(props);
      break;
    case "breadcrumb":
      data = buildBreadcrumb(props.items);
      break;
    case "service":
      data = buildService(props);
      break;
    case "medicalCondition":
      data = buildMedicalCondition(props);
      break;
    case "localBusiness":
      data = buildLocalBusiness();
      break;
    case "professionalService":
      data = buildProfessionalService();
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
