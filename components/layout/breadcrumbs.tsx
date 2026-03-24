"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */

function formatSegment(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: formatSegment(segment),
      href: currentPath,
    });
  }

  return breadcrumbs;
}

/* --------------------------------------------------------------------------
   Breadcrumbs component — Premium typography + Home icon
   -------------------------------------------------------------------------- */

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const breadcrumbs = generateBreadcrumbs(pathname);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `https://mindbridgepsychology.com.au${crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb navigation"
        className="py-3 px-4 sm:px-6 lg:px-8"
      >
        <ol className="flex items-center gap-1.5 text-sm max-w-7xl mx-auto flex-wrap">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-primary-300 shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className={cn(
                      "font-medium text-primary-700",
                      "truncate max-w-[200px]"
                    )}
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={cn(
                      "font-medium text-primary-400 hover:text-primary-700",
                      "transition-colors duration-200",
                      "inline-flex items-center gap-1",
                      "truncate max-w-[200px]",
                      "min-h-[44px]",
                      "underline-offset-4 hover:underline decoration-primary-300",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 rounded"
                    )}
                  >
                    {isFirst && (
                      <Home
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {isFirst ? (
                      <span className="sr-only">{crumb.label}</span>
                    ) : (
                      crumb.label
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
