import { NavItem } from "@/lib/types";

export const mainNav: NavItem[] = [
  {
    label: "How It Works",
    href: "/how-it-works",
    description: "Learn how telehealth psychology works at MindBridge",
  },
  {
    label: "Services",
    href: "/services",
    description: "Explore our full range of psychology services",
    children: [
      {
        label: "Individual Therapy",
        href: "/services/individual-therapy",
        description: "One-on-one evidence-based therapy via video or phone",
        icon: "User",
      },
      {
        label: "Couples & Relationship Therapy",
        href: "/services/couples-therapy",
        description: "Strengthen your relationship with EFT and Gottman Method",
        icon: "Heart",
      },
      {
        label: "Group Therapy Programs",
        href: "/services/group-therapy",
        description: "Structured group programs for anxiety, depression, and DBT skills",
        icon: "Users",
      },
      {
        label: "Psychological Assessments",
        href: "/services/psychological-assessments",
        description: "ADHD, ASD, cognitive, and personality assessments",
        icon: "ClipboardCheck",
      },
      {
        label: "NDIS Psychology",
        href: "/services/ndis-psychology",
        description: "Capacity building and psychosocial support for NDIS participants",
        icon: "Shield",
      },
      {
        label: "Corporate & EAP",
        href: "/services/corporate-eap",
        description: "Employee wellbeing programs and workplace mental health",
        icon: "Building2",
      },
      {
        label: "Workshops & Training",
        href: "/services/workshops",
        description: "Mental health first aid, resilience, and psychosocial safety",
        icon: "GraduationCap",
      },
      {
        label: "Mental Health Treatment Plans",
        href: "/services/mental-health-plans",
        description: "Navigate the Medicare GP referral pathway",
        icon: "FileText",
      },
    ],
  },
  {
    label: "Conditions",
    href: "/conditions",
    description: "Information about the conditions we treat",
    children: [
      {
        label: "Mood Disorders",
        href: "/conditions?category=mood",
        children: [
          { label: "Depression", href: "/conditions/depression" },
          { label: "Bipolar Disorder", href: "/conditions/bipolar-disorder" },
          { label: "Grief & Loss", href: "/conditions/grief" },
          { label: "Perinatal Depression", href: "/conditions/perinatal-depression" },
        ],
      },
      {
        label: "Anxiety Disorders",
        href: "/conditions?category=anxiety",
        children: [
          { label: "Generalised Anxiety", href: "/conditions/generalised-anxiety" },
          { label: "Social Anxiety", href: "/conditions/social-anxiety" },
          { label: "Panic Disorder", href: "/conditions/panic-disorder" },
          { label: "OCD", href: "/conditions/ocd" },
          { label: "Phobias", href: "/conditions/phobias" },
          { label: "Health Anxiety", href: "/conditions/health-anxiety" },
        ],
      },
      {
        label: "Trauma & Stress",
        href: "/conditions?category=trauma",
        children: [
          { label: "PTSD", href: "/conditions/ptsd" },
          { label: "Complex Trauma", href: "/conditions/complex-trauma" },
          { label: "Adjustment Disorder", href: "/conditions/adjustment-disorder" },
        ],
      },
      {
        label: "Relationships",
        href: "/conditions?category=relationships",
        children: [
          { label: "Relationship Difficulties", href: "/conditions/relationship-difficulties" },
          { label: "Communication Issues", href: "/conditions/communication-issues" },
          { label: "Attachment Issues", href: "/conditions/attachment-issues" },
          { label: "Family Conflict", href: "/conditions/family-conflict" },
        ],
      },
      {
        label: "Neurodevelopmental",
        href: "/conditions?category=neurodevelopmental",
        children: [
          { label: "ADHD", href: "/conditions/adhd" },
          { label: "Autism Spectrum", href: "/conditions/autism-spectrum" },
          { label: "Learning Difficulties", href: "/conditions/learning-difficulties" },
        ],
      },
      {
        label: "Behavioural",
        href: "/conditions?category=behavioural",
        children: [
          { label: "Anger Management", href: "/conditions/anger-management" },
          { label: "Substance Use", href: "/conditions/substance-use" },
          { label: "Eating Disorders", href: "/conditions/eating-disorders" },
          { label: "Insomnia", href: "/conditions/insomnia" },
        ],
      },
      {
        label: "Life Transitions",
        href: "/conditions?category=life-transitions",
        children: [
          { label: "Career Transitions", href: "/conditions/career-transitions" },
          { label: "Separation & Divorce", href: "/conditions/separation-divorce" },
          { label: "Retirement", href: "/conditions/retirement" },
          { label: "Identity & Self-Esteem", href: "/conditions/identity-self-esteem" },
        ],
      },
      {
        label: "Workplace",
        href: "/conditions?category=workplace",
        children: [
          { label: "Burnout", href: "/conditions/burnout" },
          { label: "Workplace Stress", href: "/conditions/workplace-stress" },
          { label: "Workplace Bullying", href: "/conditions/workplace-bullying" },
        ],
      },
    ],
  },
  {
    label: "Our Team",
    href: "/team",
    description: "Meet our experienced psychologists",
  },
  {
    label: "Pricing",
    href: "/pricing",
    description: "Transparent fees, Medicare rebates, and funding options",
  },
];

export const ctaNav: NavItem = {
  label: "Book Now",
  href: "/book",
};

export const footerNav: {
  company: NavItem[];
  services: NavItem[];
  resources: NavItem[];
  legal: NavItem[];
} = {
  company: [
    { label: "About MindBridge", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  services: [
    { label: "Individual Therapy", href: "/services/individual-therapy" },
    { label: "Couples Therapy", href: "/services/couples-therapy" },
    { label: "NDIS Psychology", href: "/services/ndis-psychology" },
    { label: "Psychological Assessments", href: "/services/psychological-assessments" },
    { label: "Corporate & EAP", href: "/services/corporate-eap" },
    { label: "Pricing", href: "/pricing" },
  ],
  resources: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog & Resources", href: "/resources" },
    { label: "For GPs & Referrers", href: "/for-gps" },
    { label: "For Employers", href: "/for-employers" },
    { label: "Mental Health Treatment Plans", href: "/services/mental-health-plans" },
    { label: "Crisis Support", href: "/crisis-support" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Telehealth Consent", href: "/consent" },
    { label: "Complaints & Feedback", href: "/complaints" },
  ],
};

export const mobileNav: NavItem[] = [
  {
    label: "How It Works",
    href: "/how-it-works",
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Individual Therapy", href: "/services/individual-therapy" },
      { label: "Couples Therapy", href: "/services/couples-therapy" },
      { label: "Group Therapy", href: "/services/group-therapy" },
      { label: "Assessments", href: "/services/psychological-assessments" },
      { label: "NDIS Psychology", href: "/services/ndis-psychology" },
      { label: "Corporate & EAP", href: "/services/corporate-eap" },
      { label: "Workshops", href: "/services/workshops" },
      { label: "Treatment Plans", href: "/services/mental-health-plans" },
    ],
  },
  {
    label: "Conditions",
    href: "/conditions",
  },
  {
    label: "Our Team",
    href: "/team",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Book Now",
    href: "/book",
  },
  {
    label: "Client Login",
    href: "/login",
  },
  {
    label: "New Client Intake",
    href: "/intake",
  },
];
