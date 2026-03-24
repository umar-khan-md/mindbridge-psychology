import type { MetadataRoute } from "next";
import { practitioners } from "@/data/practitioners";
import { services } from "@/data/services";
import { conditions } from "@/data/conditions";
import { blogPosts } from "@/data/blog-posts";

const BASE_URL = "https://mindbridgepsychology.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* --------------------------------------------------------------------------
     Static routes
     -------------------------------------------------------------------------- */

  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage — highest priority
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    // Services hub
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Book / CTA
    {
      url: `${BASE_URL}/book`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Conditions hub
    {
      url: `${BASE_URL}/conditions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Team hub
    {
      url: `${BASE_URL}/team`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // About
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Pricing
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // How it works
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // FAQ
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Referrals
    {
      url: `${BASE_URL}/referrals`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // For GPs
    {
      url: `${BASE_URL}/for-gps`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // For employers
    {
      url: `${BASE_URL}/for-employers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Contact
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // Self-assessment
    {
      url: `${BASE_URL}/self-assessment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // Resources / Blog hub
    {
      url: `${BASE_URL}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },

    // Legal pages
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  /* --------------------------------------------------------------------------
     Dynamic: individual service pages
     -------------------------------------------------------------------------- */

  const serviceSlugMap: Record<string, string> = {
    "individual-therapy": "individual-therapy",
    "couples-relationship-therapy": "couples-therapy",
    "group-therapy": "group-therapy",
    "psychological-assessments": "psychological-assessments",
    "ndis-psychology": "ndis-psychology",
    "corporate-eap": "corporate-eap",
    "workshops-training": "workshops",
    "mental-health-treatment-plans": "mental-health-plans",
  };

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${serviceSlugMap[s.slug] ?? s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  /* --------------------------------------------------------------------------
     Dynamic: condition pages
     -------------------------------------------------------------------------- */

  const conditionRoutes: MetadataRoute.Sitemap = conditions.map((c) => ({
    url: `${BASE_URL}/conditions/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  /* --------------------------------------------------------------------------
     Dynamic: team member profiles
     -------------------------------------------------------------------------- */

  const teamRoutes: MetadataRoute.Sitemap = practitioners.map((p) => ({
    url: `${BASE_URL}/team/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  /* --------------------------------------------------------------------------
     Dynamic: blog / resource articles
     -------------------------------------------------------------------------- */

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((p) => p.published)
    .map((post) => ({
      url: `${BASE_URL}/resources/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  /* --------------------------------------------------------------------------
     Combine all
     -------------------------------------------------------------------------- */

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...conditionRoutes,
    ...teamRoutes,
    ...blogRoutes,
  ];
}
