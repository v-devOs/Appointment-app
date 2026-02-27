import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AppointPro - Gestión de Citas Profesional",
  description: "La solución SaaS definitiva para gestionar tus citas y negocios de manera profesional.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
