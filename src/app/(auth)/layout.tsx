import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AppointmentApp - Autenticación",
  description: "Inicia sesión o regístrate en AppointmentApp",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
