"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Página no encontrada
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
              Lo sentimos, la página que estás buscando no existe o ha sido
              movida a otra ubicación.
            </p>
          </div>

          {/* Illustration */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl" />
              <div className="relative rounded-full bg-zinc-100 dark:bg-zinc-800 p-8">
                <Search className="h-24 w-24 text-zinc-400 dark:text-zinc-500" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button size="lg" className="group">
                <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Volver al inicio
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Página anterior
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              ¿Necesitas ayuda? Intenta con estos enlaces:
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link
                href="/#features"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Características
              </Link>
              <Link
                href="/#pricing"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Precios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
