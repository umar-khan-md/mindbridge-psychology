import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/consent"],
        crawlDelay: 1,
      },
    ],
    sitemap: "https://mindbridgepsychology.com.au/sitemap.xml",
  };
}
