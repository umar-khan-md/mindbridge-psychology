"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  User,
  Send,
  BookOpen,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog-posts";
import { practitioners } from "@/data/practitioners";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Categories
   -------------------------------------------------------------------------- */

const CATEGORIES = [
  "All",
  "Anxiety",
  "Depression",
  "Relationships",
  "Workplace",
  "NDIS",
  "General",
] as const;

type Category = (typeof CATEGORIES)[number];

/* --------------------------------------------------------------------------
   Blog Card
   -------------------------------------------------------------------------- */

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  coverImage: string;
}

function BlogCard({
  slug,
  title,
  excerpt,
  category,
  author,
  publishedAt,
  readingTime,
}: BlogCardProps) {
  const practitioner = practitioners.find((p) => p.slug === author);
  const authorName = practitioner
    ? `${practitioner.firstName} ${practitioner.lastName}`
    : author;
  const authorTitle = practitioner?.title ?? "";

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/resources/${slug}`}
      className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-md hover:border-primary-200 transition-all duration-300"
    >
      {/* Cover Image Placeholder */}
      <div className="aspect-[16/9] bg-gradient-to-br from-primary-100 to-sand-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-primary-300" />
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="default" size="sm">
            {category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="font-heading text-xl text-primary-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
          {title}
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{authorName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{formattedDate}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTime} min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredPosts = useMemo(() => {
    const published = blogPosts.filter((p) => p.published);
    if (activeCategory === "All") return published;
    return published.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

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
              Evidence-Based Insights
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary-900 mb-6">
              Mental Health Resources
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Expert articles written by our psychologists to help you
              understand mental health, navigate the healthcare system, and
              build wellbeing strategies that work.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-4">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  activeCategory === cat
                    ? "bg-primary-700 text-white shadow-sm"
                    : "bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-primary-900 mb-2">
                No articles in this category yet
              </p>
              <p className="text-neutral-500">
                Check back soon or browse another category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-sand-50 to-primary-50/30 rounded-2xl border border-sand-200 p-8 lg:p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6">
              <Send className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="font-heading text-2xl text-primary-900 mb-3">
              Stay Informed
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6 max-w-lg mx-auto">
              Subscribe to receive new articles, mental health tips, and
              practice updates directly to your inbox. No spam, unsubscribe
              anytime.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white border border-neutral-200 rounded-xl text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors shadow-sm shrink-0"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-neutral-400 mt-3">
              We respect your privacy. Read our{" "}
              <Link href="/privacy" className="underline hover:text-primary-600">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
