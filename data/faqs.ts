import { FAQ } from "@/lib/types";

export const faqs: FAQ[] = [
  // ─── Telehealth ────────────────────────────────────────────────────────────
  {
    id: "telehealth-how",
    question: "How does a telehealth psychology session work?",
    answer:
      "It's simpler than you might think. You connect with your psychologist via a secure, encrypted video link from any private space — your living room, your car on a lunch break, wherever you feel comfortable. Sessions run for the same duration as in-person appointments (typically 50 to 60 minutes) and follow the same clinical structure. Your psychologist uses the same evidence-based approaches they would face-to-face, including CBT, EMDR, and ACT. Over 35,000 Australians have used our platform, and most tell us they forget they're on a screen within the first few minutes. Ready to experience it for yourself? Book your first session today.",
    category: "telehealth",
    order: 1,
  },
  {
    id: "telehealth-tech",
    question: "What technology do I need for a telehealth session?",
    answer:
      "If you can make a video call, you can do telehealth therapy. All you need is a device with a camera and microphone — a laptop, tablet, or smartphone all work well — and a stable internet connection (we recommend at least 5 Mbps download speed). Use a modern browser like Chrome, Safari, or Edge. There's no special software to install. Before your appointment, we'll send you a unique session link that opens directly in your browser — just click and you're in. If you're unsure about your setup, our client services team is happy to do a quick tech check with you before your first session.",
    category: "telehealth",
    order: 2,
  },
  {
    id: "telehealth-effective",
    question: "Is online therapy as effective as face-to-face?",
    answer:
      "Yes — and the research is clear on this. A significant body of peer-reviewed studies shows that telehealth psychology produces outcomes equivalent to in-person therapy for a wide range of conditions, including anxiety, depression, PTSD, and relationship difficulties. The Australian Psychological Society recognises telehealth as a valid and effective mode of service delivery. In fact, many clients tell us that the comfort and convenience of attending from home actually helps them open up more and attend more consistently — both of which are key factors in getting the most out of therapy. If you've been hesitating because you're not sure online sessions can really work, we'd encourage you to give it a try. Book your first session and see how it feels.",
    category: "telehealth",
    order: 3,
  },
  {
    id: "telehealth-switch",
    question: "Can I switch between telehealth and in-person sessions?",
    answer:
      "MindBridge is a telehealth-first clinic, which means all our sessions are delivered via secure video or phone. This model is what allows us to match you with the best psychologist for your needs — not just whoever happens to be geographically nearby. The good news is that most people find telehealth works just as well as in-person, and many prefer it. If at any point you feel you'd benefit from face-to-face support, your psychologist can help you find a suitable local provider and facilitate a warm referral to ensure continuity of care.",
    category: "telehealth",
    order: 4,
  },
  {
    id: "telehealth-connection",
    question: "What happens if my internet connection drops during a session?",
    answer:
      "Don't worry — it happens, and we're prepared for it. If your connection drops, your psychologist will wait a couple of minutes for you to reconnect via the same link. If the video doesn't restore, they'll call you on the phone number you provided at intake to continue the session by phone. We build a small buffer into every appointment to accommodate minor tech hiccups, so you'll still receive your full session time. No stress, no lost minutes.",
    category: "telehealth",
    order: 5,
  },

  // ─── Fees ──────────────────────────────────────────────────────────────────
  {
    id: "fees-cost",
    question: "How much does a session cost?",
    answer:
      "Session fees depend on your psychologist's registration type and the service you're accessing. A standard 50-minute session with a registered psychologist starts from $160, while clinical psychologist sessions start from $220. If cost is a concern, Medicare bulk-billed sessions are available with select psychologists at no out-of-pocket cost. NDIS sessions are billed at NDIS-approved rates. We believe finances shouldn't be a barrier to getting support — visit our Fees page for a full breakdown of costs and funding options, or contact our team to discuss what works for your situation.",
    category: "fees",
    order: 6,
  },
  {
    id: "fees-bulkbill",
    question: "Do you offer Medicare bulk billing?",
    answer:
      "Yes, select psychologists at MindBridge offer Medicare bulk billing — meaning there's no out-of-pocket cost to you at all. To access bulk-billed sessions, you'll need a valid Mental Health Treatment Plan from your GP and a referral to MindBridge Psychology. Bulk-billed places are limited and subject to availability, so we'd recommend getting in touch early. You can filter our team directory by funding type to find psychologists who currently offer bulk billing. Ready to get started? Book your bulk-billed session today.",
    category: "fees",
    order: 7,
  },
  {
    id: "fees-mhcp",
    question: "What is a Mental Health Treatment Plan and how do I get one?",
    answer:
      "A Mental Health Treatment Plan (sometimes called a Mental Health Care Plan) is a document your GP prepares after a brief assessment of your mental health. It's your ticket to accessing up to 10 Medicare-rebated psychology sessions per calendar year — and it's simpler to get than most people think. Just book a longer appointment with your GP (around 30 to 40 minutes), let them know you'd like to discuss your mental health, and they'll take it from there. Once your GP creates the plan and provides a referral, you can request MindBridge Psychology or a specific psychologist by name. Not sure how to bring it up with your GP? We've got a guide that can help — get in touch and we'll send it through.",
    category: "fees",
    order: 8,
  },
  {
    id: "fees-private-health",
    question: "Can I claim sessions through my private health insurance?",
    answer:
      "Most private health insurers don't cover telehealth-delivered psychology under their extras policies, as they typically require face-to-face delivery. However, some funds have expanded their telehealth coverage in recent years, so it's worth checking with your specific insurer. Please note that you can't claim both a Medicare rebate and a private health insurance rebate for the same session. If you're unsure about your options, our client services team can help you understand the most cost-effective pathway for your situation.",
    category: "fees",
    order: 9,
  },

  // ─── Medicare ──────────────────────────────────────────────────────────────
  {
    id: "medicare-rebate",
    question: "How do I get a Medicare rebate for psychology sessions?",
    answer:
      "Getting your Medicare rebate is straightforward. You'll need a valid Mental Health Treatment Plan and a referral from your GP (they can name MindBridge Psychology or your specific psychologist). After each session, we submit your claim directly to Medicare — you don't need to do a thing. If you're not bulk-billed, the rebate is deposited into your nominated bank account, usually within 24 to 48 hours. The current Medicare rebate is $141.85 for a clinical psychologist session and $93.35 for a registered psychologist session. We handle the paperwork so you can focus on your wellbeing.",
    category: "medicare",
    order: 10,
  },
  {
    id: "medicare-bulkbill-vs-rebate",
    question: "What is the difference between Medicare bulk billing and a Medicare rebate?",
    answer:
      "Great question — it's a common point of confusion. With bulk billing, your psychologist accepts the Medicare rebate as full payment, so you pay nothing out of pocket. With a rebate model, you pay the psychologist's full fee upfront and Medicare reimburses a portion back to your bank account. The difference between the full fee and the Medicare rebate is your 'gap' or out-of-pocket cost. Both options require a valid Mental Health Treatment Plan and GP referral. If keeping costs low is important to you, filter our team directory by 'Medicare Bulk Bill' to find psychologists who offer gap-free sessions.",
    category: "medicare",
    order: 11,
  },
  {
    id: "medicare-sessions",
    question: "How many Medicare-subsidised sessions can I access per year?",
    answer:
      "Under the Better Access Initiative, you can access up to 10 individual Medicare-subsidised psychology sessions per calendar year. Your GP will typically approve an initial batch of 6 sessions and may approve an additional 4 after a brief review. The allocation resets on 1 January each year. Your GP can also refer you for up to 10 group therapy sessions on top of your individual sessions. If you need support beyond your Medicare allocation, we offer flexible self-funded options and can discuss what works for your budget.",
    category: "medicare",
    order: 12,
  },

  // ─── NDIS ──────────────────────────────────────────────────────────────────
  {
    id: "ndis-accept",
    question: "Do you accept NDIS funding for psychology sessions?",
    answer:
      "Absolutely. MindBridge Psychology is a registered NDIS provider. We accept NDIS funding for psychology sessions under the Capacity Building — Improved Daily Living support category, billed at NDIS-approved rates. We work with self-managed, plan-managed, and NDIA-managed participants. If you're not sure whether psychology is included in your plan, your support coordinator or plan manager can check for you — or just get in touch with our team and we'll help you figure it out. Ready to use your NDIS funding for psychology? Book your first session today.",
    category: "ndis",
    order: 13,
  },
  {
    id: "ndis-services",
    question: "What NDIS psychology services do you offer?",
    answer:
      "Our NDIS services are designed to help you build skills and confidence at your own pace. We offer individual psychological therapy, capacity-building sessions focused on emotional regulation and social skills, psychoeducation for you and your support network, functional assessments, and behaviour support planning. Because everything is delivered via telehealth, you can access specialist support without the barriers of travel or transport — which is particularly valuable if you're in a regional or remote area where specialist NDIS providers are hard to find.",
    category: "ndis",
    order: 14,
  },
  {
    id: "ndis-plan-manager",
    question: "Can my plan manager pay you directly?",
    answer:
      "Yes — and we've made it as seamless as possible. If you're plan-managed, we invoice your plan manager directly after each session, so there's no out-of-pocket cost to you and nothing you need to chase up. We work with all major plan management providers. Just share your plan manager's details when you book and we'll set up direct invoicing from your very first session. For self-managed participants, we provide a detailed invoice you can submit for reimbursement. Either way, we handle the admin so you can focus on your sessions.",
    category: "ndis",
    order: 15,
  },

  // ─── Referrals ─────────────────────────────────────────────────────────────
  {
    id: "referral-needed",
    question: "Do I need a referral to see a psychologist?",
    answer:
      "Not necessarily — it depends on how you'd like to pay. If you're self-funding, you can book directly with any of our psychologists without a referral. If you'd like to claim a Medicare rebate or access bulk-billed sessions, you'll need a Mental Health Treatment Plan and referral from your GP. NDIS participants need an active plan with psychology funding. WorkCover and DVA clients should check referral requirements with their case manager. Not sure which pathway is right for you? Get in touch and our team will point you in the right direction.",
    category: "referrals",
    order: 16,
  },
  {
    id: "referral-gp",
    question: "How do I get a Mental Health Treatment Plan from my GP?",
    answer:
      "It's easier than you might expect. Book a longer appointment with your GP — usually 30 to 40 minutes — and let them know you'd like to discuss your mental health and get a Mental Health Treatment Plan. Your GP will ask about what you've been experiencing, your medical history, and your current concerns, then create the plan and write a referral. You can ask your GP to refer you specifically to MindBridge Psychology or to a particular psychologist by name. Many GPs can do this via telehealth too, so you don't even need to leave home. Once we receive your referral, we'll be in touch to book your first session — often within the same week.",
    category: "referrals",
    order: 17,
  },
  {
    id: "referral-employer",
    question: "Can my employer refer me through an EAP or corporate program?",
    answer:
      "Yes. MindBridge partners with employers and Employee Assistance Program providers across Australia to deliver workplace psychological support. If your employer has an EAP arrangement with us, you may be able to access sessions at no personal cost and with same-week availability. Ask your HR department or workplace wellbeing coordinator whether MindBridge is an approved provider under your organisation's program. If your employer doesn't yet have an arrangement with us, we'd love to chat with them — our corporate team can set up a tailored program within two weeks.",
    category: "referrals",
    order: 18,
  },

  // ─── Booking ───────────────────────────────────────────────────────────────
  {
    id: "booking-how",
    question: "How do I book an appointment?",
    answer:
      "Booking is quick and easy. You can book directly through our website by browsing our team directory, choosing a psychologist, and selecting an available time — the whole process takes about two minutes. If you'd prefer to speak with someone, call us on 1300 MIND BR during business hours and our client services team will match you with the right psychologist. Not sure who to see? Try our matching questionnaire — it recommends psychologists based on your concerns, preferences, and funding type. Same-week appointments are often available, so you don't have to wait to get started.",
    category: "booking",
    order: 19,
  },
  {
    id: "booking-choose",
    question: "Can I choose which psychologist I see?",
    answer:
      "Absolutely — and we encourage it. Research consistently shows that the therapeutic relationship is one of the most important factors in whether therapy works, so finding the right fit matters. Browse our team directory, read each psychologist's profile, and choose the person you feel drawn to. You can filter by specialisation, therapeutic approach, funding type, and languages spoken. If you're not sure where to start, our matching tool or client services team can suggest a few options based on your needs. And if you try a session and feel the fit isn't quite right, you can switch to a different psychologist — no awkwardness, no hassle.",
    category: "booking",
    order: 20,
  },
  {
    id: "booking-cancellation",
    question: "What is your cancellation policy?",
    answer:
      "We ask for at least 24 hours' notice if you need to cancel or reschedule. Cancellations with less than 24 hours' notice, or missed sessions, may incur a fee equal to the full session cost — and unfortunately this fee can't be claimed through Medicare, NDIS, or other funding. We completely understand that life happens. If you're facing an emergency, please reach out and we'll do our best to work with you. You can reschedule easily through your booking link or by contacting our team.",
    category: "booking",
    order: 21,
  },

  // ─── Privacy ───────────────────────────────────────────────────────────────
  {
    id: "privacy-confidential",
    question: "Is my telehealth session confidential?",
    answer:
      "Completely. Your privacy is protected by the same strict professional obligations that apply to face-to-face psychology — governed by AHPRA and the Australian Psychological Society Code of Ethics. All sessions are conducted over encrypted, HIPAA-compliant video platforms that meet Australian privacy standards. Your psychologist will explain the very limited, legally required exceptions to confidentiality (such as mandatory reporting of imminent risk of harm) at your first session. Beyond that, what you share stays between you and your psychologist.",
    category: "privacy",
    order: 22,
  },
  {
    id: "privacy-data",
    question: "How is my personal and health data stored?",
    answer:
      "Your clinical records are stored in a secure, Australian-hosted practice management system that complies with the Australian Privacy Principles and the Health Records Act. All data is encrypted at rest and in transit. We don't share your information with third parties except where required for your treatment, payment processing, or as required by law. You have the right to access your records at any time. If you have specific questions about our privacy practices, our privacy officer is happy to chat — just get in touch.",
    category: "privacy",
    order: 23,
  },

  // ─── New FAQs — Common Objections ──────────────────────────────────────────
  {
    id: "general-not-sure",
    question: "What if I'm not sure what I need help with?",
    answer:
      "That's completely okay — and more common than you'd think. Many people reach out knowing something doesn't feel right but without being able to name exactly what it is. You don't need a clear diagnosis or a neat summary of your problems to start therapy. Your psychologist is trained to help you untangle what's going on, identify patterns, and figure out what support looks like for you. Think of the first session as a conversation, not an exam. You just need to show up — your psychologist will guide the rest. Ready to take that first step? Book your initial session today.",
    category: "general",
    order: 24,
  },
  {
    id: "booking-switch-psychologist",
    question: "Can I switch psychologists if it's not a good fit?",
    answer:
      "Of course — and there's absolutely no awkwardness involved. The therapeutic relationship is the foundation of good therapy, and sometimes the fit just isn't right. That's not a reflection on you or the psychologist — it's just human chemistry. If you'd like to try someone else, simply let our client services team know and we'll help you transition to a different psychologist. Your previous psychologist can provide a handover summary (with your consent) so you don't have to start from scratch. Finding the right fit is worth the effort, and we'll support you through the process.",
    category: "booking",
    order: 25,
  },
  {
    id: "booking-after-hours",
    question: "Do you offer after-hours appointments?",
    answer:
      "Yes. We understand that your mental health doesn't operate on a 9-to-5 schedule, and neither do we. Several of our psychologists offer early morning, evening, and Saturday appointments. Because we're a telehealth clinic, our psychologists work across different time zones, which means you'll often find availability outside standard business hours. When you browse our team directory and select a psychologist, you'll see their available time slots — including after-hours options. If you can't find a time that works, get in touch and we'll do our best to accommodate you.",
    category: "booking",
    order: 26,
  },
  {
    id: "general-crisis",
    question: "What happens if I have a crisis between sessions?",
    answer:
      "Your safety always comes first. If you're experiencing a mental health crisis or having thoughts of self-harm or suicide, please contact emergency services on 000, Lifeline on 13 11 14, or the Suicide Callback Service on 1300 659 467 — these services are available 24/7. MindBridge is not a crisis service, and your psychologist may not be available outside of scheduled sessions. However, as part of your therapy, your psychologist will work with you to develop a personalised safety plan that includes crisis contacts, coping strategies, and clear steps for when things feel overwhelming. You'll never be left without a plan.",
    category: "general",
    order: 27,
  },
];
