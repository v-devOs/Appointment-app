"use client";

import { Sidebar } from "./Sidebar";

interface DashboardWrapperProps {
  userRole: "ADMIN" | "OWNER_BUSSINES" | "EMPLOYEE";
  children: React.ReactNode;
}

export function DashboardWrapper({ userRole, children }: DashboardWrapperProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userRole={userRole} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
