"use client";

import Link from "next/link";
import { Calendar, User, LogOut } from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AppointmentApp
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/client"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline">Mis Citas</span>
              </Link>

              <Link
                href="/client/profile"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Mi Perfil</span>
              </Link>

              <Link
                href="/auth/login"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Salir</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
