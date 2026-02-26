"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
          {/* Background gradients */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-l from-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600/20">
                <Sparkles className="h-4 w-4" />
                <span>La solución #1 para gestión de citas</span>
              </div>

              <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Gestiona tus citas
                </span>
                <br />
                <span className="text-zinc-900 dark:text-zinc-50">
                  como un profesional
                </span>
              </h1>

              <p className="mb-10 text-lg text-zinc-600 dark:text-zinc-400 md:text-xl max-w-2xl mx-auto">
                Automatiza tu negocio, aumenta tu productividad y ofrece una
                experiencia excepcional a tus clientes con AppointPro.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="group">
                  Comenzar gratis
                  <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  Ver demo
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "10k+", label: "Clientes activos" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "500k+", label: "Citas gestionadas" },
                  { value: "4.9/5", label: "Calificación" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Características
                </span>{" "}
                increíbles
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                Todo lo que necesitas para llevar tu negocio al siguiente nivel
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  title: "Gestión inteligente",
                  description:
                    "Organiza tus citas de manera eficiente con nuestro calendario inteligente y notificaciones automáticas.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Users,
                  title: "Multi-negocio",
                  description:
                    "Administra múltiples negocios desde una sola cuenta. Perfecto para emprendedores.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: Clock,
                  title: "Ahorro de tiempo",
                  description:
                    "Automatiza recordatorios, confirmaciones y seguimiento de clientes.",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: TrendingUp,
                  title: "Analytics avanzados",
                  description:
                    "Obtén insights de tu negocio con reportes detallados y métricas en tiempo real.",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: Shield,
                  title: "Seguridad garantizada",
                  description:
                    "Tus datos están protegidos con encriptación de nivel empresarial.",
                  gradient: "from-indigo-500 to-blue-500",
                },
                {
                  icon: Zap,
                  title: "Super rápido",
                  description:
                    "Interfaz ultra optimizada para que trabajes sin interrupciones.",
                  gradient: "from-yellow-500 to-orange-500",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl bg-white dark:bg-zinc-800 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-zinc-200 dark:border-zinc-700"
                >
                  <div
                    className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Precios{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  transparentes
                </span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                Elige el plan que mejor se adapte a tus necesidades
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Monthly Plan */}
              <div className="relative rounded-3xl bg-white dark:bg-zinc-800 p-8 shadow-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                    Plan Mensual
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Flexibilidad total
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      $299.99
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">/mes</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Citas ilimitadas",
                    "Multi-negocio (primer negocio gratis)",
                    "Notificaciones automáticas",
                    "Reportes básicos",
                    "Soporte por email",
                    "App móvil incluida",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup" className="block">
                  <Button className="w-full" size="lg">
                    Comenzar ahora
                  </Button>
                </Link>
              </div>

              {/* Annual Plan */}
              <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                  ¡Ahorra 17%!
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Plan Anual
                  </h3>
                  <p className="text-blue-100">Mejor valor</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-white">
                      $999.99
                    </span>
                    <span className="text-blue-100">/año</span>
                  </div>
                  <p className="text-sm text-blue-100 mt-2">
                    Equivale a $83.33/mes
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Todo del plan mensual",
                    "Reportes avanzados",
                    "Soporte prioritario 24/7",
                    "Integraciones premium",
                    "API acceso completo",
                    "Capacitación personalizada",
                    "2 meses gratis",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup" className="block">
                  <Button
                    className="w-full bg-white text-purple-600 hover:bg-zinc-100"
                    size="lg"
                  >
                    Comenzar ahora
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AppointPro
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                © 2026 AppointPro. Todos los derechos reservados.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                >
                  Privacidad
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                >
                  Términos
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
