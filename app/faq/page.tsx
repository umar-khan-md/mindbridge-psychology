"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Search,
  MessageCircle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import {
  AccordionGroup,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Category Config
   -------------------------------------------------------------------------- */

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "telehealth", label: "Telehealth" },
  { key: "fees", label: "Fees" },
  { key: "medicare", label: "Medicare" },
  { key: "ndis", label: "NDIS" },
  { key: "referrals", label: "Referrals" },
  { key: "booking", label: "Booking" },
  { key: "privacy", label: "Privacy" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    let filtered = [...faqs];

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.order - b.order);
  }, [activeCategory, searchQuery]);

  return (
    <>
      <Breadcrumbs />

      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary-100/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-accent-100/20 blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="default" className="mb-4">
              Answers & Guidance
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Find answers to common questions about telehealth psychology,
              Medicare, NDIS funding, referrals, fees, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="pb-4">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-neutral-200 rounded-xl text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    activeCategory === cat.key
                      ? "bg-primary-700 text-white shadow-sm"
                      : "bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-700"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length > 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm divide-y divide-neutral-100 overflow-hidden">
                <AccordionGroup single>
                  {filteredFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <div className="px-6">
                        <AccordionTrigger>
                          <div className="flex items-start gap-3 pr-2">
                            <span className="flex-1">{faq.question}</span>
                            <Badge
                              variant="default"
                              size="sm"
                              className="shrink-0 mt-0.5 capitalize"
                            >
                              {faq.category}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                      </div>
                      <div className="px-6">
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </div>
                    </AccordionItem>
                  ))}
                </AccordionGroup>
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-primary-900 mb-2">
                  No matching questions found
                </p>
                <p className="text-neutral-500">
                  Try adjusting your search terms or browse a different category.
                </p>
              </div>
            )}

            <p className="text-center text-sm text-neutral-500 mt-6">
              Showing {filteredFaqs.length} of {faqs.length} questions
            </p>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 rounded-3xl px-8 py-16 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-heading text-3xl lg:text-4xl text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                Our client services team is happy to help with any questions
                about our services, fees, referral process, or how telehealth
                works. No question is too small.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
