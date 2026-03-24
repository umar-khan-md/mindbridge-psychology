import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Calendar,
  User,
  BookOpen,
  Phone,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog-posts";
import { practitioners } from "@/data/practitioners";
import { SITE_CONFIG } from "@/lib/constants";

/* --------------------------------------------------------------------------
   Static Params
   -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return blogPosts
    .filter((p) => p.published)
    .map((post) => ({ slug: post.slug }));
}

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  const practitioner = practitioners.find((p) => p.slug === post.author);
  const authorName = practitioner
    ? `${practitioner.firstName} ${practitioner.lastName}`
    : post.author;

  return {
    title: `${post.title} | MindBridge Psychology - Online Psychology Australia`,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "en_AU",
      publishedTime: post.publishedAt,
      authors: [authorName],
      url: `https://mindbridgepsychology.com.au/resources/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | MindBridge Psychology`,
      description: post.excerpt.slice(0, 120),
    },
    alternates: {
      canonical: `https://mindbridgepsychology.com.au/resources/${slug}`,
    },
    keywords: [
      ...(post.tags ?? []),
      "telehealth psychology",
      "mental health australia",
    ],
  };
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.published);
  if (!post) notFound();

  const practitioner = practitioners.find((p) => p.slug === post.author);
  const authorName = practitioner
    ? `${practitioner.firstName} ${practitioner.lastName}`
    : post.author;
  const authorTitle = practitioner?.title ?? "";
  const authorBio = practitioner?.bio ?? "";

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Related articles (same category, exclude current)
  const relatedPosts = blogPosts
    .filter((p) => p.published && p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  // If not enough in same category, fill with others
  const morePosts =
    relatedPosts.length < 2
      ? blogPosts
          .filter(
            (p) =>
              p.published &&
              p.slug !== post.slug &&
              !relatedPosts.some((r) => r.slug === p.slug)
          )
          .slice(0, 3 - relatedPosts.length)
      : [];

  const allRelated = [...relatedPosts, ...morePosts];

  // Render markdown-like content as paragraphs
  const contentSections = post.content.split("\n\n").filter(Boolean);

  return (
    <>
      <Breadcrumbs />

      {/* Article Hero */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary-100/20 blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary-700 transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Resources
            </Link>

            {/* Category Badge */}
            <Badge variant="default" className="mb-4">
              {post.category}
            </Badge>

            {/* Title */}
            <h1 className="font-heading text-3xl lg:text-5xl text-primary-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-primary-900">{authorName}</p>
                  {authorTitle && (
                    <p className="text-xs text-neutral-400">{authorTitle}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <article className="prose-width">
              {contentSections.map((section, idx) => {
                const trimmed = section.trim();

                // Headings
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2
                      key={idx}
                      className="font-heading text-2xl lg:text-3xl text-primary-900 mt-10 mb-4"
                    >
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                }

                if (trimmed.startsWith("### ")) {
                  return (
                    <h3
                      key={idx}
                      className="font-heading text-xl lg:text-2xl text-primary-900 mt-8 mb-3"
                    >
                      {trimmed.replace("### ", "")}
                    </h3>
                  );
                }

                // Regular paragraph
                return (
                  <p
                    key={idx}
                    className="text-neutral-600 leading-relaxed mb-5 text-[1.0625rem]"
                  >
                    {trimmed}
                  </p>
                );
              })}
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-neutral-100">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="text-neutral-500 border-neutral-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author Card */}
      {practitioner && (
        <section className="pb-16 lg:pb-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="bg-sand-50 rounded-2xl border border-sand-200 p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center shrink-0">
                    <User className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-1">
                      Written by
                    </p>
                    <h3 className="font-heading text-xl text-primary-900 mb-1">
                      {authorName}
                    </h3>
                    <p className="text-sm text-primary-600 mb-3">
                      {practitioner.title}
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                      {authorBio}
                    </p>
                    <Link
                      href={`/team/${practitioner.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 group"
                    >
                      View Profile
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {allRelated.length > 0 && (
        <section className="pb-16 lg:pb-24">
          <div className="container-wide">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-3xl text-primary-900 mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allRelated.map((related) => {
                  const relatedPractitioner = practitioners.find(
                    (p) => p.slug === related.author
                  );
                  const relatedAuthor = relatedPractitioner
                    ? `${relatedPractitioner.firstName} ${relatedPractitioner.lastName}`
                    : related.author;

                  return (
                    <Link
                      key={related.slug}
                      href={`/resources/${related.slug}`}
                      className="group bg-white rounded-xl border border-neutral-100 overflow-hidden hover:shadow-md hover:border-primary-200 transition-all"
                    >
                      <div className="aspect-[16/9] bg-gradient-to-br from-primary-100 to-sand-100 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-primary-300" />
                      </div>
                      <div className="p-5">
                        <Badge variant="default" size="sm" className="mb-2">
                          {related.category}
                        </Badge>
                        <h3 className="font-heading text-lg text-primary-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-neutral-400">
                          <span>{relatedAuthor}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{related.readingTime} min</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 rounded-3xl px-8 py-16 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/8 blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl lg:text-4xl text-white mb-4">
                Ready to Book a Session?
              </h2>
              <p className="text-primary-200/80 text-lg mb-8 leading-relaxed">
                If this article resonated with you, speaking with a psychologist
                can help you take the next step. Book a telehealth session
                today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Book a Session
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
