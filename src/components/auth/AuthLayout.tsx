import Link from "next/link";
import { Calendar } from "lucide-react";
import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  maxWidth?: "md" | "lg" | "xl" | "2xl";
}

export function AuthLayout({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  maxWidth = "md",
}: AuthLayoutProps) {
  const maxWidthClasses = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 relative overflow-hidden py-12">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-250 bg-linear-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-200 h-200 bg-linear-to-l from-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className={`relative z-10 w-full ${maxWidthClasses[maxWidth]} px-6`}>
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-linear-to-br from-blue-500 to-purple-600 p-2">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AppointmentSaaS
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
          {children}

          {/* Footer links */}
          {footerText && footerLinkText && footerLinkHref && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {footerText}{" "}
                <Link
                  href={footerLinkHref}
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {footerLinkText}
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
