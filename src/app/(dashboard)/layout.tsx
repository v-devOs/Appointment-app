import { DashboardWrapper } from "@/components/dashboard/DashboardWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth.config";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Si no hay sesión, redirigir al login (esto también lo maneja el middleware)
  if (!session) {
    redirect("/auth/login");
  }

  const userRole = session.user.role as "ADMIN" | "OWNER_BUSSINES" | "EMPLOYEE";

  return <DashboardWrapper userRole={userRole}>{children}</DashboardWrapper>;
}
