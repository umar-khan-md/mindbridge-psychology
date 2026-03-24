import { Practitioner } from "@/lib/types";

export const practitioners: Practitioner[] = [
  {
    slug: "sarah-chen",
    firstName: "Sarah",
    lastName: "Chen",
    pronouns: "she/her",
    title: "Clinical Psychologist",
    qualifications: [
      "DPsych (Clinical Psychology), Swinburne University",
      "BPsychSc (Hons), University of Melbourne",
      "EMDR Accredited Practitioner",
    ],
    ahpraNumber: "PSY0001842376",
    specialisations: [
      "Trauma & PTSD",
      "Complex Trauma",
      "Anxiety Disorders",
      "Perinatal Mental Health",
      "Cultural Identity & Adjustment",
    ],
    approaches: ["EMDR", "CBT", "Schema Therapy", "ACT", "Trauma-Focused CBT"],
    bio: `If you're carrying the weight of trauma — whether it's a single event that changed everything, or years of experiences that have quietly shaped how you see yourself and the world — Dr Sarah Chen can help you find your way through. With over 14 years of clinical experience, Sarah specialises in helping adults process trauma, manage anxiety, and navigate the complex intersection of cultural identity and mental health.

Sarah has a particular passion for supporting first- and second-generation Australians who are balancing the expectations of multiple cultures while trying to figure out who they are on their own terms. She's also deeply experienced in perinatal mental health, supporting new and expectant parents through what can be a profoundly vulnerable time.

Her approach is warm, culturally attuned, and grounded in evidence — she'll draw on EMDR, CBT, Schema Therapy, or ACT depending on what fits your situation best. Sessions with Sarah feel safe, unhurried, and genuine. She speaks English, Mandarin, and Cantonese.

Outside the consulting room, Sarah is a keen bushwalker and amateur ceramicist who believes strongly that creativity and time in nature are essential ingredients for wellbeing.`,
    photoUrl: "/images/team/sarah-chen.jpg",
    fundingAccepted: ["rebate", "self-funded", "ndis", "workcover"],
    languages: ["English", "Mandarin", "Cantonese"],
    acceptingNewClients: true,
    sessionFormats: ["video", "phone"],
    calendlyUrl: "https://calendly.com/mindbridge/sarah-chen",
    yearsExperience: 14,
    order: 1,
  },
  {
    slug: "james-harrison",
    firstName: "James",
    lastName: "Harrison",
    pronouns: "he/him",
    title: "Clinical Psychologist",
    qualifications: [
      "MPsych (Clinical), University of New South Wales",
      "BSc (Psychology) (Hons), University of Sydney",
      "Gottman Level 3 Trained Therapist",
    ],
    ahpraNumber: "PSY0001765498",
    specialisations: [
      "Couples & Relationship Therapy",
      "Depression & Mood Disorders",
      "Men's Mental Health",
      "Life Transitions",
      "Grief & Loss",
    ],
    approaches: ["EFT", "Gottman Method", "CBT", "ACT", "Psychodynamic Therapy"],
    bio: `If your relationship feels stuck — the same arguments on repeat, the growing distance, the sense that you're living parallel lives — James Harrison can help you and your partner find your way back to each other. As one of a small number of Gottman Level 3 trained therapists in Australia, James brings over 12 years of experience helping couples break free from destructive patterns and rebuild genuine connection.

James is equally passionate about working with individuals, particularly men navigating depression, grief, or major life transitions who might be reaching out for support for the first time. He understands that asking for help can feel like the hardest part, and he makes that first conversation as straightforward and pressure-free as possible.

His style is direct but never cold — clients describe him as someone who combines real warmth with practical, no-nonsense guidance. Whether you're working through a relationship crisis or untangling years of unprocessed grief, James creates a space where honesty feels safe and progress feels achievable.

Outside of work, James is a dad of two, an enthusiastic (if unremarkable) weekend cricketer, and a firm believer that a good cup of coffee solves at least 10% of life's problems.`,
    photoUrl: "/images/team/james-harrison.jpg",
    fundingAccepted: ["rebate", "self-funded", "workcover"],
    languages: ["English"],
    acceptingNewClients: true,
    sessionFormats: ["video", "phone"],
    calendlyUrl: "https://calendly.com/mindbridge/james-harrison",
    yearsExperience: 12,
    order: 2,
  },
  {
    slug: "priya-sharma",
    firstName: "Priya",
    lastName: "Sharma",
    pronouns: "she/her",
    title: "Clinical Psychologist",
    qualifications: [
      "PhD (Clinical Psychology), Monash University",
      "MPsych (Clinical), Monash University",
      "BPsychSc (Hons), Deakin University",
    ],
    ahpraNumber: "PSY0001923105",
    specialisations: [
      "ADHD & ASD Assessment",
      "Neurodevelopmental Conditions",
      "Cognitive Assessments",
      "Anxiety in Neurodivergent Adults",
      "Executive Functioning",
    ],
    approaches: ["CBT", "ACT", "Neuropsychological Assessment", "Psychoeducation", "Strengths-Based Therapy"],
    bio: `If you've spent years feeling like your brain works differently from everyone else's — struggling to focus, burning out from masking, or wondering why 'simple' things feel so hard — Dr Priya Sharma can help you understand why, and what to do about it. Priya is a clinical psychologist and neuropsychological assessment specialist with 9 years of experience in the assessment and support of neurodivergent adults.

Her PhD research focused on late-diagnosed ADHD in Australian women — a topic she's deeply passionate about, having seen firsthand how many women reach adulthood without the diagnosis and support they needed. Priya combines rigorous, gold-standard assessment methodology with a compassionate, strengths-based approach that centres your experience rather than treating you like a checklist of symptoms.

Beyond assessment, Priya works therapeutically with neurodivergent adults navigating anxiety, executive functioning challenges, and the emotional toll of late diagnosis. She speaks English, Hindi, and Punjabi, and is committed to making the assessment process accessible and affirming for people from all cultural backgrounds.

Outside of work, Priya is an avid reader of speculative fiction, a mediocre but enthusiastic home cook, and a strong advocate for neurodiversity in the workplace.`,
    photoUrl: "/images/team/priya-sharma.jpg",
    fundingAccepted: ["rebate", "self-funded", "ndis"],
    languages: ["English", "Hindi", "Punjabi"],
    acceptingNewClients: true,
    sessionFormats: ["video"],
    calendlyUrl: "https://calendly.com/mindbridge/priya-sharma",
    yearsExperience: 9,
    order: 3,
  },
  {
    slug: "daniel-nguyen",
    firstName: "Daniel",
    lastName: "Nguyen",
    pronouns: "he/him",
    title: "Registered Psychologist",
    qualifications: [
      "MPsych (Counselling), Queensland University of Technology",
      "BPsychSc (Hons), University of Queensland",
      "Certificate in DBT Intensive Training, Behavioral Tech",
    ],
    ahpraNumber: "PSY0001687234",
    specialisations: [
      "Emotion Regulation",
      "Borderline Personality Traits",
      "Self-Harm & Crisis Support",
      "Young Adult Mental Health",
      "LGBTQIA+ Affirming Therapy",
    ],
    approaches: ["DBT", "CBT", "ACT", "Motivational Interviewing", "Mindfulness-Based Therapy"],
    bio: `If your emotions feel overwhelming — if you swing between extremes, if relationships are intense and exhausting, if you're hurting yourself to cope — Daniel Nguyen gets it, and he can help. Daniel is a registered psychologist who has dedicated his career to supporting young adults and individuals navigating intense emotions, self-harm, and interpersonal difficulties.

With 6 years of clinical experience across community mental health and private practice, Daniel brings both genuine warmth and the kind of structured, skills-based approach that actually makes a difference when everything feels chaotic. He's intensively trained in Dialectical Behaviour Therapy (DBT) and draws on CBT, ACT, and mindfulness to help you build a life that feels worth living — not just survivable.

Daniel is an LGBTQIA+ affirming practitioner who creates a genuinely non-judgemental space for clients of all identities, backgrounds, and experiences. He speaks English and Vietnamese, and is particularly passionate about reaching young people who might otherwise fall through the gaps of the mental health system.

Outside the consulting room, Daniel is a board game enthusiast, a regular at his local bouldering gym, and a volunteer with a youth mental health organisation.`,
    photoUrl: "/images/team/daniel-nguyen.jpg",
    fundingAccepted: ["rebate", "self-funded", "ndis", "dva"],
    languages: ["English", "Vietnamese"],
    acceptingNewClients: true,
    sessionFormats: ["video", "phone"],
    calendlyUrl: "https://calendly.com/mindbridge/daniel-nguyen",
    yearsExperience: 6,
    order: 4,
  },
  {
    slug: "elise-williams",
    firstName: "Elise",
    lastName: "Williams",
    pronouns: "she/her",
    title: "Clinical Psychologist",
    qualifications: [
      "DPsych (Clinical Psychology), University of Western Australia",
      "BPsych (Hons), Curtin University",
      "Certified Schema Therapist (ISST)",
    ],
    ahpraNumber: "PSY0001534892",
    specialisations: [
      "Chronic Pain & Health Psychology",
      "WorkCover & Injury Recovery",
      "Corporate & Workplace Psychology",
      "Burnout & Stress Management",
      "Perfectionism & High Achievers",
    ],
    approaches: ["Schema Therapy", "CBT", "ACT", "Motivational Interviewing", "Compassion-Focused Therapy"],
    bio: `If you're a high achiever who's burning out, a professional pushing through chronic pain, or someone whose workplace injury has taken a toll on your mental health as much as your body — Dr Elise Williams understands the unique pressures you're facing. With 20 years of experience spanning hospital, community, and private practice settings, Elise is one of MindBridge's most experienced clinicians.

Elise specialises in the intersection of physical health and psychological wellbeing — helping clients manage chronic pain, navigate WorkCover claims, and recover from workplace injuries that have affected their sense of identity and purpose. She also works extensively with corporate clients and EAP programs, supporting leaders and professionals who are expected to perform at the highest level while quietly falling apart.

Her style is direct, compassionate, and refreshingly practical. Clients describe her as someone who sees through the surface quickly but never makes you feel exposed — she meets you where you are and helps you build sustainable approaches to performance and wellbeing that don't require sacrificing one for the other.

Outside of work, Elise is an ocean swimmer, a podcast enthusiast, and a devoted dog mum who firmly believes that a morning walk with her border collie is the best therapy money can't buy.

Please note: Elise is currently not accepting new clients. Join the waitlist to be notified when availability opens up.`,
    photoUrl: "/images/team/elise-williams.jpg",
    fundingAccepted: ["rebate", "self-funded", "workcover", "dva"],
    languages: ["English"],
    acceptingNewClients: false,
    sessionFormats: ["video", "phone"],
    calendlyUrl: "https://calendly.com/mindbridge/elise-williams",
    yearsExperience: 20,
    order: 5,
  },
  {
    slug: "marcus-ryan",
    firstName: "Marcus",
    lastName: "Ryan",
    pronouns: "he/him",
    title: "Registered Psychologist",
    qualifications: [
      "MPsych (Counselling), Charles Sturt University",
      "BPsychSc, University of South Australia",
      "Graduate Certificate in Indigenous Mental Health, University of Melbourne",
    ],
    ahpraNumber: "PSY0001401567",
    specialisations: [
      "NDIS Psychosocial Support",
      "Aboriginal & Torres Strait Islander Mental Health",
      "Substance Use & Dual Diagnosis",
      "Rural & Remote Mental Health",
      "Group Therapy Facilitation",
    ],
    approaches: ["ACT", "Narrative Therapy", "Motivational Interviewing", "Yarning-Based Therapy", "CBT"],
    bio: `If you've been let down by a mental health system that doesn't understand your story, your community, or your lived experience, Marcus Ryan offers something different. A proud Wiradjuri man and registered psychologist with 8 years of experience, Marcus is deeply committed to delivering culturally safe, trauma-informed care that respects who you are and where you come from.

Marcus has worked extensively across community mental health, NDIS, and Aboriginal Community Controlled Health Organisations. He brings a particular expertise in supporting NDIS participants through capacity-building programs, helping people build emotional regulation, social skills, and genuine independence at their own pace. He also works with individuals navigating substance use and dual diagnosis, using a strengths-based, non-judgemental approach.

As someone who has spent much of his career working in regional and remote Australia, Marcus understands the unique challenges of accessing quality mental health support outside the capital cities — the isolation, the stigma, the feeling that services aren't designed for you. Through MindBridge's telehealth platform, he's able to bring specialist psychological support to communities that have traditionally been underserved.

Marcus is also an experienced group therapy facilitator and is passionate about the power of shared experience in healing. He offers bulk-billed sessions for eligible clients.

Outside of work, Marcus is a keen fisherman, a community footy coach, and an uncle to an ever-growing number of nieces and nephews.`,
    photoUrl: "/images/team/marcus-ryan.jpg",
    fundingAccepted: ["rebate", "self-funded", "ndis", "dva", "bulk-bill"],
    languages: ["English"],
    acceptingNewClients: true,
    sessionFormats: ["video", "phone"],
    calendlyUrl: "https://calendly.com/mindbridge/marcus-ryan",
    yearsExperience: 8,
    order: 6,
  },
];
