"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "bg-white/80 backdrop-blur-lg dark:bg-zinc-900/80 shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-zinc-50 transition-transform hover:scale-105"
        >
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AppointPro
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Características
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Precios
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="hidden md:inline-flex h-10 items-center justify-center rounded-lg px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/50"
          >
            Comenzar
          </Link>
        </div>
      </div>
    </nav>
  );
}
