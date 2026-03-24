// Practitioner
export interface Practitioner {
  slug: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  title: "Clinical Psychologist" | "Registered Psychologist" | "Counselling Psychologist";
  qualifications: string[];
  ahpraNumber: string;
  specialisations: string[];
  approaches: string[];  // CBT, ACT, DBT, EMDR, Schema, Psychodynamic, etc.
  bio: string;
  photoUrl: string;
  fundingAccepted: FundingType[];
  languages: string[];
  acceptingNewClients: boolean;
  sessionFormats: ("video" | "phone")[];
  calendlyUrl?: string;
  yearsExperience: number;
  order: number;
}

export type FundingType = "bulk-bill" | "rebate" | "self-funded" | "ndis" | "workcover" | "dva";

// Service
export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  heroImage: string;
  approaches: string[];
  suitableFor: string[];
  sessionDuration: string;
  deliveryMode: string;
  medicareEligible: boolean;
  ndisEligible: boolean;
  itemNumbers?: string[];
  relatedConditions: string[];
  order: number;
}

// Condition
export interface Condition {
  slug: string;
  name: string;
  category: ConditionCategory;
  shortDescription: string;
  longDescription: string;
  symptoms: string[];
  howTherapyHelps: string;
  recommendedApproaches: string[];
  relatedServices: string[];
  icon: string;
}

export type ConditionCategory = "mood" | "anxiety" | "trauma" | "relationships" | "neurodevelopmental" | "behavioural" | "life-transitions" | "workplace";

// Fee
export interface FeeItem {
  id: string;
  service: string;
  sessionType: string;
  duration: string;
  privateFee: number;
  medicareRebate?: number;
  gapFee?: number;
  ndisPrice?: number;
  itemNumber?: string;
  notes?: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  initials: string;
  location: string;
  quote: string;
  service: string;
  rating: number;
}

// FAQ
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "telehealth" | "fees" | "referrals" | "ndis" | "medicare" | "general" | "privacy" | "booking";
  order: number;
}

// Blog Post
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  coverImage: string;
  readingTime: number;
  published: boolean;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

// Form submissions
export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface IntakeSubmission {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  referralSource: "gp" | "ndis" | "self" | "employer" | "other";
  gpName?: string;
  gpPractice?: string;
  hasMentalHealthPlan: boolean;
  ndisNumber?: string;
  presentingConcerns: string[];
  previousTherapy: boolean;
  currentMedications?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  preferredPractitioner?: string;
  preferredSessionTime: string;
  fundingMethod: FundingType;
  privacyConsent: boolean;
  telehealthConsent: boolean;
}

// Stat for trust section
export interface Stat {
  value: string;
  label: string;
  icon?: string;
}
