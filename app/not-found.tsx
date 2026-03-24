import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const linkBase = cn(
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg",
    "transition-colors duration-150 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "h-11 px-5 text-sm"
  );

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-bg-primary">
      <div className="text-center max-w-lg">
        {/* 404 badge */}
        <p className="text-7xl sm:text-8xl font-serif font-bold text-primary-200 mb-6">
          404
        </p>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-sand-600 leading-relaxed mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved, renamed, or may no longer exist. If you need support,
          don&apos;t hesitate to reach out.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className={cn(
              linkBase,
              "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 focus-visible:ring-primary-500"
            )}
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>

          <Link
            href="/contact"
            className={cn(
              linkBase,
              "border border-primary-700 text-primary-700 bg-transparent hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500"
            )}
          >
            <MessageCircle className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
