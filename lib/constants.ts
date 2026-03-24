export const SITE_CONFIG = {
  name: "MindBridge Psychology",
  tagline: "Professional Psychology, Wherever You Are",
  description: "Access AHPRA-registered psychologists from the comfort of your home — same-week appointments, Medicare bulk billing available, and trusted by over 35,000 Australians. Individual therapy, couples counselling, ADHD & ASD assessments, NDIS psychology, and corporate EAP services delivered via secure telehealth across Australia.",
  url: "https://mindbridgepsychology.com.au",
  email: "hello@mindbridgepsychology.com.au",
  phone: "1300 MIND BR",
  phoneRaw: "1300646327",
  abn: "TBC",
  acn: "TBC",
  address: "Suite 329, 98-100 Elizabeth Street, Melbourne VIC 3000",
} as const;

export const EMERGENCY = {
  lifeline: { name: "Lifeline", phone: "13 11 14", url: "https://www.lifeline.org.au" },
  beyondBlue: { name: "Beyond Blue", phone: "1300 22 4636", url: "https://www.beyondblue.org.au" },
  emergency: { name: "Emergency Services", phone: "000" },
  suicideCallback: { name: "Suicide Callback Service", phone: "1300 659 467" },
  mensLine: { name: "MensLine Australia", phone: "1300 78 99 78" },
  kidsHelpline: { name: "Kids Helpline", phone: "1800 55 1800" },
} as const;

export const FUNDING_LABELS: Record<string, string> = {
  "bulk-bill": "Medicare Bulk Bill",
  "rebate": "Medicare Rebate",
  "self-funded": "Self-Funded",
  "ndis": "NDIS",
  "workcover": "WorkCover",
  "dva": "DVA",
};

export const APPROACH_LABELS: Record<string, string> = {
  "cbt": "Cognitive Behavioural Therapy (CBT)",
  "act": "Acceptance & Commitment Therapy (ACT)",
  "dbt": "Dialectical Behaviour Therapy (DBT)",
  "emdr": "Eye Movement Desensitisation & Reprocessing (EMDR)",
  "schema": "Schema Therapy",
  "psychodynamic": "Psychodynamic Therapy",
  "solution-focused": "Solution-Focused Brief Therapy",
  "motivational": "Motivational Interviewing",
  "narrative": "Narrative Therapy",
  "mindfulness": "Mindfulness-Based Therapy",
  "eft": "Emotionally Focused Therapy (EFT)",
  "play": "Play Therapy",
};

export const CONDITION_CATEGORIES = {
  mood: { label: "Mood & Depression", icon: "CloudRain" },
  anxiety: { label: "Anxiety & Stress", icon: "Wind" },
  trauma: { label: "Trauma & PTSD", icon: "Shield" },
  relationships: { label: "Relationships & Family", icon: "Heart" },
  neurodevelopmental: { label: "ADHD & Autism", icon: "Brain" },
  behavioural: { label: "Behavioural & Addiction", icon: "Flame" },
  "life-transitions": { label: "Life Transitions", icon: "Compass" },
  workplace: { label: "Workplace & Burnout", icon: "Briefcase" },
} as const;

export const MEDICARE_INFO = {
  maxSessions: 10,
  referralRequired: true,
  mentalHealthPlanRequired: true,
  rebateGeneral: 93.35,
  rebateClinical: 141.85,
  itemNumberGeneral: "80110",
  itemNumberClinical: "80110",
  validityMonths: 12,
} as const;
