import { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "individual-therapy",
    name: "Individual Therapy",
    shortDescription:
      "Feel like yourself again — work one-on-one with an AHPRA-registered psychologist from the comfort of your home, with same-week appointments available across Australia.",
    longDescription: `You deserve to feel heard. If you're struggling with anxiety that won't let up, a low mood that's hard to shake, or the weight of something you've been carrying for too long — you're not alone. Over 35,000 Australians have trusted MindBridge to help them take that first step, and your journey can start this week.

Individual therapy at MindBridge is built around you. Your psychologist will take the time to understand what you're going through before choosing the approach that fits — whether that's Cognitive Behavioural Therapy (CBT) for managing anxious thoughts, EMDR for processing trauma, Acceptance and Commitment Therapy (ACT) for getting unstuck, or another evidence-based method. There's no one-size-fits-all here.

Sessions are structured but never rigid. You'll work together on practical strategies you can use between sessions, while also building the deeper self-awareness that creates lasting change. Your psychologist will check in regularly to make sure the approach is working for you — and adjust if it isn't.

Because every session is delivered via our secure telehealth platform, you get access to the right psychologist for your needs — not just whoever happens to be nearby. Whether you're in Sydney, a small town in regional Queensland, or anywhere in between, quality psychological support is just a click away. Sessions are eligible for Medicare rebates with a GP Mental Health Treatment Plan, and we also accept NDIS, WorkCover, and DVA funding.

Ready to take the first step? Book your initial session today.`,
    icon: "User",
    heroImage: "/images/services/individual-therapy.jpg",
    approaches: ["CBT", "ACT", "DBT", "EMDR", "Schema Therapy", "Psychodynamic Therapy", "Compassion-Focused Therapy"],
    suitableFor: [
      "Anxiety & panic disorders",
      "Depression & mood disorders",
      "Trauma & PTSD",
      "Stress & burnout",
      "Grief & loss",
      "Self-esteem & identity",
      "Life transitions",
      "Emotion regulation",
    ],
    sessionDuration: "50 minutes",
    deliveryMode: "Video or Phone",
    medicareEligible: true,
    ndisEligible: true,
    itemNumbers: ["80110", "80115", "80120"],
    relatedConditions: [
      "anxiety",
      "depression",
      "ptsd",
      "panic-disorder",
      "burnout",
      "grief",
      "ocd",
      "phobias",
    ],
    order: 1,
  },
  {
    slug: "couples-relationship-therapy",
    name: "Couples & Relationship Therapy",
    shortDescription:
      "Reconnect with your partner from the comfort of your own home — evidence-based couples therapy using the Gottman Method and Emotionally Focused Therapy, no waiting rooms required.",
    longDescription: `When your relationship is struggling, everything else feels harder — work, parenting, sleep, even getting through the day. If you and your partner feel more like roommates than teammates, if the same arguments keep circling back, or if trust has been broken and you're not sure where to go from here — couples therapy can help you find a way forward.

MindBridge's couples therapists are trained in Emotionally Focused Therapy (EFT) and the Gottman Method — two of the most rigorously researched approaches to relationship repair available anywhere. EFT helps you and your partner break free from the negative cycles that keep you stuck — the pursue-withdraw pattern, the shutting down, the feeling of never being enough. The Gottman Method gives you concrete, practical tools for communicating more effectively, managing conflict without escalation, and rebuilding the trust and intimacy that brought you together in the first place.

Because sessions happen via secure video, both partners can attend from wherever is most comfortable — no awkward waiting rooms, no arguments in the car on the way home. Many couples tell us that telehealth actually makes it easier to open up, and the convenience means you're far more likely to attend consistently.

Couples therapy is for relationships at any stage — whether you're wanting to strengthen something good, repair after a breach of trust, navigate becoming parents together, or even figure out the kindest way to part. Your relationship deserves expert support.

Please note that Medicare rebates do not apply to couples sessions; however, private health fund rebates may be available depending on your level of cover.

Ready to reconnect? Book your first couples session today.`,
    icon: "Heart",
    heroImage: "/images/services/couples-therapy.jpg",
    approaches: ["Emotionally Focused Therapy (EFT)", "Gottman Method", "Narrative Therapy", "Imago Therapy"],
    suitableFor: [
      "Communication difficulties",
      "Conflict & arguments",
      "Infidelity & trust repair",
      "Intimacy & connection",
      "Blended family challenges",
      "Pre-marital preparation",
      "Separation & co-parenting",
      "Life transition as a couple",
    ],
    sessionDuration: "80 minutes",
    deliveryMode: "Video",
    medicareEligible: false,
    ndisEligible: false,
    relatedConditions: [
      "relationship-difficulties",
      "communication-issues",
      "attachment-issues",
    ],
    order: 2,
  },
  {
    slug: "group-therapy",
    name: "Group Therapy Programs",
    shortDescription:
      "You're not in this alone — join a small, supportive group of 6–10 people navigating similar challenges, guided by an experienced psychologist via secure video.",
    longDescription: `Sometimes the most powerful thing you can hear is "me too." If you've been feeling isolated in your struggles — whether it's anxiety that makes social situations exhausting, a persistent low mood, or emotions that feel impossible to regulate — group therapy offers something individual sessions can't: the knowledge that you're not the only one going through this.

At MindBridge, our group programs run in small cohorts of 6 to 10 participants via secure video conferencing — intimate enough to feel safe, large enough to offer diverse perspectives. Every group is facilitated by an experienced psychologist who creates a structured, supportive environment where real connection and learning happen.

Our current programs include a 10-week CBT-based anxiety management group, an 8-week behavioural activation program for depression, and a 12-week DBT skills training group covering mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness. Each program follows a structured, evidence-based curriculum while leaving space for the kind of honest conversation and peer support that accelerates growth. You'll receive worksheets, home practice exercises, and access to recorded psychoeducation modules between sessions.

Participants consistently tell us that the group experience was more impactful than they expected — that hearing others articulate feelings they'd never been able to name was a turning point. Groups are Medicare-eligible with a valid Mental Health Treatment Plan, and NDIS funding can also be applied. New groups commence throughout the year, and a brief screening call is required before enrolment to ensure the group is the right fit for you.

Interested in joining a group? Get in touch to find out when our next program starts.`,
    icon: "Users",
    heroImage: "/images/services/group-therapy.jpg",
    approaches: ["CBT", "DBT Skills Training", "Behavioural Activation", "Mindfulness-Based Therapy"],
    suitableFor: [
      "Social anxiety",
      "Generalised anxiety",
      "Depression",
      "Emotion regulation difficulties",
      "Interpersonal difficulties",
      "Those wanting peer support",
    ],
    sessionDuration: "90 minutes",
    deliveryMode: "Video",
    medicareEligible: true,
    ndisEligible: true,
    itemNumbers: ["80115", "80120"],
    relatedConditions: [
      "anxiety",
      "depression",
      "social-anxiety",
      "emotion-dysregulation",
    ],
    order: 3,
  },
  {
    slug: "psychological-assessments",
    name: "Psychological Assessments",
    shortDescription:
      "Finally get the answers you've been looking for — comprehensive ADHD, ASD, cognitive, and personality assessments with a detailed report you can use immediately.",
    longDescription: `If you've spent years wondering why your brain works the way it does — why you can't focus, why social situations drain you, why things that seem easy for everyone else feel so hard — a comprehensive psychological assessment can finally give you the clarity and validation you deserve.

MindBridge's assessment team includes clinical psychologists with specialised training in psychometric assessment. Whether you're exploring a possible ADHD diagnosis, seeking clarity around Autism Spectrum Disorder, or need a thorough cognitive or personality assessment, our process is thorough, professional, and designed to be as comfortable as possible.

Your assessment journey typically includes an initial clinical interview where your psychologist gets to know your history and concerns, administration of gold-standard psychometric instruments (including CAARS-2, DIVA-5, and continuous performance tests for ADHD; ADOS-2, AQ-50, and detailed developmental history for ASD), collateral information gathering where appropriate, and a dedicated feedback session where your results are explained clearly and compassionately. Everything is conducted in line with current best-practice guidelines and DSM-5-TR diagnostic criteria.

You'll receive a comprehensive written report that's accepted by GPs, psychiatrists, the NDIS, educational institutions, and employers. More than just a diagnosis, your report includes a summary of your cognitive and psychological strengths, and personalised recommendations for treatment and support — so you walk away with a clear roadmap, not just a label.

Assessment sessions are conducted primarily via video, with some components requiring in-person attendance depending on the assessment type. Medicare rebates may apply to components of the assessment with a valid referral.

Ready for answers? Book your assessment consultation today.`,
    icon: "ClipboardCheck",
    heroImage: "/images/services/assessments.jpg",
    approaches: ["Psychometric Assessment", "Clinical Interview", "Behavioural Observation", "Neuropsychological Testing"],
    suitableFor: [
      "Suspected ADHD (adults)",
      "Suspected Autism Spectrum Disorder (adults)",
      "Cognitive & intellectual assessment",
      "Personality assessment",
      "Diagnostic clarification",
      "Workplace or educational accommodations",
    ],
    sessionDuration: "3-6 hours (across multiple sessions)",
    deliveryMode: "Video (some components may require in-person)",
    medicareEligible: true,
    ndisEligible: true,
    itemNumbers: ["80110", "80115"],
    relatedConditions: [
      "adhd",
      "autism-spectrum",
      "learning-difficulties",
      "intellectual-disability",
    ],
    order: 4,
  },
  {
    slug: "ndis-psychology",
    name: "NDIS Psychology",
    shortDescription:
      "Psychology that works with your NDIS plan, not against it — person-centred, goal-oriented support from a registered NDIS provider, accessible via telehealth anywhere in Australia.",
    longDescription: `Navigating the NDIS shouldn't feel like a full-time job — and accessing quality psychological support through your plan shouldn't be this hard. If you've been stuck on waiting lists, struggling to find a provider who understands both the NDIS and your lived experience, or feeling like the system is working against you rather than for you, MindBridge is here to make things simpler.

As a registered NDIS provider, MindBridge delivers evidence-based psychological services under the Improved Daily Living and Capacity Building support categories. But more importantly, our psychologists understand the human side of disability — the frustration, the exhaustion, the desire to be seen as a whole person rather than a set of support needs.

Your psychologist will work collaboratively with you, your support coordinator, and your allied health team to deliver support that's genuinely person-centred and goal-oriented. Our NDIS services include individual therapy focused on building emotional regulation, social skills, and daily living capacity; psychosocial recovery coaching to support community participation and independence; and behaviour support planning for participants with complex behavioural needs. We work with participants across a range of primary disabilities including psychosocial disability, intellectual disability, autism spectrum disorder, acquired brain injury, and physical disability with co-occurring mental health conditions.

Our team is experienced in working within NDIS funding frameworks, preparing reports for plan reviews, and liaising with support coordinators to ensure continuity of care. Sessions are billed at NDIS Price Guide rates and can be claimed directly through your plan manager or self-managed funds. We work with self-managed, plan-managed, and NDIA-managed participants.

Because we're telehealth-based, you get access to specialist NDIS psychologists without the barriers of travel, transport, or geography — particularly important if you're in a regional or remote area where specialist providers are scarce.

Ready to get started with your NDIS psychology support? Book a session or get in touch to discuss your plan.`,
    icon: "Shield",
    heroImage: "/images/services/ndis-psychology.jpg",
    approaches: ["CBT", "ACT", "Positive Behaviour Support", "Social Skills Training", "Psychoeducation"],
    suitableFor: [
      "NDIS participants with psychosocial disability",
      "Capacity building goals",
      "Behaviour support needs",
      "Social skills development",
      "Emotional regulation support",
      "Community participation goals",
    ],
    sessionDuration: "50 minutes",
    deliveryMode: "Video or Phone",
    medicareEligible: false,
    ndisEligible: true,
    relatedConditions: [
      "psychosocial-disability",
      "autism-spectrum",
      "intellectual-disability",
      "anxiety",
      "depression",
    ],
    order: 5,
  },
  {
    slug: "corporate-eap",
    name: "Corporate & EAP Services",
    shortDescription:
      "Your team's mental health directly impacts your bottom line — give your people timely, confidential access to qualified psychologists with same-week EAP appointments Australia-wide.",
    longDescription: `Your people are your most important asset — and right now, many of them are struggling. Burnout, anxiety, workplace conflict, and the blurred boundaries of hybrid work are taking a real toll on productivity, engagement, and retention. If you're an HR leader or business owner looking for a proactive, evidence-based approach to workplace mental health, MindBridge can help.

Our Employee Assistance Program (EAP) gives your staff timely, confidential access to qualified psychologists — typically within the same week — for short-term counselling addressing both personal and work-related concerns. Because we're telehealth-based, your team can access support from anywhere in Australia, making us particularly effective for distributed, remote, and hybrid workforces.

Beyond reactive support, we help organisations build psychologically safe workplaces through proactive programs including leadership coaching for psychosocial risk management, team resilience workshops, and bespoke mental health training aligned with the ISO 45003 psychosocial safety standard. Organisations who invest in proactive mental health support see measurable reductions in absenteeism, presenteeism, and staff turnover.

We work with you to develop tailored packages that meet your organisation's specific needs, including de-identified utilisation reporting, manager support consultations, and critical incident debriefing. Our corporate psychologists hold clinical and organisational psychology qualifications and bring extensive experience across sectors including healthcare, technology, education, finance, and government.

Contact us for a confidential discussion about your organisation's needs and a tailored proposal — most packages can be set up within two weeks.`,
    icon: "Building2",
    heroImage: "/images/services/corporate-eap.jpg",
    approaches: ["CBT", "ACT", "Coaching Psychology", "Psychoeducation", "Critical Incident Stress Management"],
    suitableFor: [
      "Employers seeking EAP services",
      "Workplace stress & burnout",
      "Leadership development",
      "Critical incident response",
      "Psychosocial risk management",
      "Remote & hybrid teams",
    ],
    sessionDuration: "Per arrangement",
    deliveryMode: "Video",
    medicareEligible: false,
    ndisEligible: false,
    relatedConditions: [
      "burnout",
      "workplace-stress",
      "anxiety",
      "depression",
    ],
    order: 6,
  },
  {
    slug: "workshops-training",
    name: "Workshops & Training",
    shortDescription:
      "Equip your team with real psychological skills — interactive, evidence-based workshops on resilience, stress management, and psychological safety, delivered live online by practising psychologists.",
    longDescription: `A one-off wellness webinar won't change your workplace culture. But the right training — delivered by psychologists who understand both the science and the real-world pressures your people face — can genuinely shift how your team manages stress, supports each other, and shows up to work.

MindBridge's workshops are interactive, evidence-based, and facilitated by experienced psychologists who combine clinical expertise with engaging facilitation. These aren't passive presentations — your team will practise skills, work through real scenarios, and leave with tools they can use immediately.

Our workshop catalogue includes Mental Health First Aid refresher workshops, resilience and stress management skills for professionals, understanding and supporting neurodivergent colleagues in the workplace, managing psychosocial hazards under WHS legislation, and self-care planning for frontline workers. Each workshop runs between 60 and 180 minutes and includes interactive exercises, case studies, and practical takeaway resources. We also develop bespoke training programs tailored to your organisation's industry, workforce profile, and specific challenges.

All workshops can be delivered to groups of up to 30 participants via Zoom or Microsoft Teams, and recordings can be made available for those unable to attend live. CPD certificates are provided where applicable.

Whether you're an individual looking to strengthen your psychological toolkit or an organisation investing in workforce wellbeing, our workshops provide accessible, high-quality professional development grounded in the latest psychological research.

Ready to invest in your team's wellbeing? Get in touch to discuss your training needs.`,
    icon: "GraduationCap",
    heroImage: "/images/services/workshops.jpg",
    approaches: ["Psychoeducation", "Experiential Learning", "Mindfulness-Based Stress Reduction", "Positive Psychology"],
    suitableFor: [
      "Organisations & teams",
      "Frontline workers",
      "Managers & leaders",
      "Community groups",
      "Individuals seeking skill development",
      "HR & wellbeing professionals",
    ],
    sessionDuration: "60-180 minutes",
    deliveryMode: "Video (Zoom or Microsoft Teams)",
    medicareEligible: false,
    ndisEligible: false,
    relatedConditions: [
      "burnout",
      "workplace-stress",
      "anxiety",
    ],
    order: 7,
  },
  {
    slug: "mental-health-treatment-plans",
    name: "Mental Health Treatment Plans",
    shortDescription:
      "Access up to 10 Medicare-rebated psychology sessions per year — we'll guide you through every step of getting your GP Mental Health Treatment Plan sorted, quickly and simply.",
    longDescription: `Accessing affordable psychology in Australia shouldn't be confusing — but the Medicare system can feel overwhelming when you're already struggling. A Mental Health Treatment Plan (MHTP) is your key to unlocking up to 10 Medicare-rebated psychology sessions per calendar year, and MindBridge makes the entire process as straightforward as possible.

Here's how it works in three simple steps:

First, book an appointment with your GP and let them know you'd like to discuss your mental health and obtain a Mental Health Treatment Plan. Your GP will conduct a brief assessment, outline treatment goals, and provide you with a referral to a psychologist at MindBridge. You can request a specific psychologist by name, or tell your GP you'd like to be referred to MindBridge Psychology and we'll match you to the right practitioner based on your needs.

Second, once we receive your referral and Treatment Plan, we'll be in touch — usually within one business day — to schedule your first session. Same-week appointments are often available.

Third, after each session, we submit your Medicare claim directly so your rebate lands in your bank account, usually within 24 to 48 hours. With select psychologists, bulk-billed sessions are available at no out-of-pocket cost to you.

The Medicare rebate amount depends on whether you see a Clinical Psychologist or a Registered Psychologist, and the duration of the session. After your initial sessions, your GP will conduct a brief review of your Treatment Plan to assess progress and authorise additional sessions if clinically indicated.

Our administration team can assist you with understanding rebate amounts, bulk-billing eligibility, and the referral process. We also provide referral templates and information packs for GPs to streamline the process.

Not sure where to start? Book a free 15-minute consultation call and we'll walk you through it.`,
    icon: "FileText",
    heroImage: "/images/services/treatment-plans.jpg",
    approaches: ["GP Collaboration", "Medicare Better Access", "Stepped Care"],
    suitableFor: [
      "Anyone seeking Medicare-rebated therapy",
      "First-time therapy clients",
      "Clients needing GP referral guidance",
      "GPs seeking referral information",
    ],
    sessionDuration: "30 minutes (review sessions)",
    deliveryMode: "Video or Phone",
    medicareEligible: true,
    ndisEligible: false,
    itemNumbers: ["80110", "80115"],
    relatedConditions: [
      "anxiety",
      "depression",
      "ptsd",
      "ocd",
      "eating-disorders",
    ],
    order: 8,
  },
];
