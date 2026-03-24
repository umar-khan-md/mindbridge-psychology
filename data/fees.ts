import { FeeItem } from "@/lib/types";

export const fees: FeeItem[] = [
  {
    id: "individual-general-50",
    service: "Individual Therapy",
    sessionType: "Registered Psychologist",
    duration: "50 minutes",
    privateFee: 160,
    medicareRebate: 93.35,
    gapFee: 66.65,
    itemNumber: "80110",
    notes:
      "Medicare rebate applies with a valid GP Mental Health Treatment Plan. Up to 10 sessions per calendar year.",
  },
  {
    id: "individual-clinical-50",
    service: "Individual Therapy",
    sessionType: "Clinical Psychologist",
    duration: "50 minutes",
    privateFee: 210,
    medicareRebate: 141.85,
    gapFee: 68.15,
    itemNumber: "80110",
    notes:
      "Medicare rebate applies with a valid GP Mental Health Treatment Plan. Up to 10 sessions per calendar year.",
  },
  {
    id: "individual-general-extended",
    service: "Individual Therapy (Extended)",
    sessionType: "Registered Psychologist",
    duration: "80 minutes",
    privateFee: 240,
    medicareRebate: 93.35,
    gapFee: 146.65,
    itemNumber: "80115",
    notes:
      "Extended sessions available for complex presentations. Standard Medicare rebate applies.",
  },
  {
    id: "individual-clinical-extended",
    service: "Individual Therapy (Extended)",
    sessionType: "Clinical Psychologist",
    duration: "80 minutes",
    privateFee: 310,
    medicareRebate: 141.85,
    gapFee: 168.15,
    itemNumber: "80115",
    notes:
      "Extended sessions available for complex presentations. Standard Medicare rebate applies.",
  },
  {
    id: "couples-therapy",
    service: "Couples & Relationship Therapy",
    sessionType: "Clinical Psychologist",
    duration: "80 minutes",
    privateFee: 280,
    notes:
      "Medicare rebates do not apply to couples sessions. Private health fund rebates may be available depending on your level of cover. Please check with your insurer.",
  },
  {
    id: "group-therapy",
    service: "Group Therapy Program",
    sessionType: "Facilitated by Clinical or Registered Psychologist",
    duration: "90 minutes",
    privateFee: 60,
    medicareRebate: 93.35,
    gapFee: 0,
    itemNumber: "80120",
    notes:
      "Per session cost. Programs run for 8-12 weeks. Medicare rebate applies with a valid Mental Health Treatment Plan. Out-of-pocket cost is typically nil when Medicare rebate exceeds the session fee.",
  },
  {
    id: "assessment-adhd",
    service: "Psychological Assessment (ADHD)",
    sessionType: "Clinical Psychologist",
    duration: "3-4 hours (across 2-3 sessions)",
    privateFee: 1500,
    medicareRebate: 141.85,
    gapFee: 1358.15,
    itemNumber: "80110",
    notes:
      "Includes clinical interview, psychometric testing, feedback session, and comprehensive written report. Medicare rebate applies to the initial assessment session only. Fee range $1,200-$1,800 depending on complexity.",
  },
  {
    id: "assessment-asd",
    service: "Psychological Assessment (ASD)",
    sessionType: "Clinical Psychologist",
    duration: "4-6 hours (across 3-4 sessions)",
    privateFee: 2200,
    medicareRebate: 141.85,
    gapFee: 2058.15,
    itemNumber: "80110",
    notes:
      "Includes clinical interview, ADOS-2, psychometric testing, collateral interview, feedback session, and comprehensive written report. Medicare rebate applies to the initial assessment session only. Fee range $1,800-$2,500 depending on complexity.",
  },
  {
    id: "ndis-general",
    service: "NDIS Psychology",
    sessionType: "Registered Psychologist",
    duration: "50 minutes",
    privateFee: 214.41,
    ndisPrice: 214.41,
    notes:
      "Billed at NDIS Price Guide rates under Improved Daily Living (Therapeutic Supports). No out-of-pocket cost for NDIS participants with sufficient plan funding. Agency-managed, plan-managed, and self-managed plans accepted.",
  },
  {
    id: "ndis-clinical",
    service: "NDIS Psychology",
    sessionType: "Clinical Psychologist",
    duration: "50 minutes",
    privateFee: 253.74,
    ndisPrice: 253.74,
    notes:
      "Billed at NDIS Price Guide rates under Improved Daily Living (Therapeutic Supports). No out-of-pocket cost for NDIS participants with sufficient plan funding. Agency-managed, plan-managed, and self-managed plans accepted.",
  },
  {
    id: "ndis-assessment-report",
    service: "NDIS Assessment & Report Writing",
    sessionType: "Clinical Psychologist",
    duration: "Per arrangement",
    privateFee: 253.74,
    ndisPrice: 253.74,
    notes:
      "Billed per hour at NDIS Price Guide rates. Includes functional capacity assessments, behaviour support plans, and evidence reports for plan reviews. Total cost depends on scope and complexity.",
  },
  {
    id: "corporate-eap",
    service: "Corporate & EAP Counselling",
    sessionType: "Clinical or Registered Psychologist",
    duration: "50 minutes",
    privateFee: 0,
    notes:
      "Fee per session is determined by contract arrangement with the employer or EAP provider. No cost to the employee. Contact us for a tailored corporate proposal.",
  },
  {
    id: "mhtp-review",
    service: "Mental Health Plan Review",
    sessionType: "Clinical or Registered Psychologist",
    duration: "30 minutes",
    privateFee: 120,
    medicareRebate: 93.35,
    gapFee: 26.65,
    itemNumber: "80110",
    notes:
      "Review sessions conducted at the request of the referring GP to assess treatment progress and update goals. Medicare rebate applies.",
  },
  {
    id: "workshop-individual",
    service: "Workshop (Individual Registration)",
    sessionType: "Facilitated by Psychologist",
    duration: "60-180 minutes",
    privateFee: 95,
    notes:
      "Per-person registration for scheduled public workshops. See our events calendar for upcoming sessions. Group and organisation pricing available on request.",
  },
  {
    id: "cancellation-fee",
    service: "Late Cancellation / No-Show",
    sessionType: "All Practitioners",
    duration: "N/A",
    privateFee: 100,
    notes:
      "Applies to cancellations with less than 24 hours notice and no-shows. The full session fee may be charged at the practitioner's discretion. Medicare rebates cannot be claimed for cancelled sessions.",
  },
];
