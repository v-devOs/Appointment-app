"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  Building2,
  UserCog,
  ClipboardList,
} from "lucide-react";

interface SidebarProps {
  userRole: "ADMIN" | "OWNER_BUSSINES" | "EMPLOYEE";
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/auth/login";
  };

  const getMenuItems = () => {
    // Normalizar el nombre del rol para las URLs
    const roleUrl = userRole === "OWNER_BUSSINES" ? "owner-business" : userRole.toLowerCase().replace("_", "-");

    const baseItems = [
      {
        href: `/${roleUrl}`,
        icon: userRole === "OWNER_BUSSINES" ? Building2 : LayoutDashboard,
        label: userRole === "OWNER_BUSSINES" ? "Mis Negocios" : "Dashboard",
      },
      {
        href: `/${roleUrl}/appointments`,
        icon: Calendar,
        label: "Citas",
      },
    ];

    if (userRole === "ADMIN") {
      return [
        ...baseItems,
        {
          href: "/admin/users",
          icon: Users,
          label: "Usuarios",
        },
        {
          href: "/admin/businesses",
          icon: Building2,
          label: "Negocios",
        },
        {
          href: "/admin/subscriptions",
          icon: ClipboardList,
          label: "Suscripciones",
        },
      ];
    }

    if (userRole === "OWNER_BUSSINES") {
      return [
        ...baseItems,
        {
          href: "/owner-business/employees",
          icon: Users,
          label: "Empleados",
        },
        {
          href: "/owner-business/clients",
          icon: UserCog,
          label: "Clientes",
        },
      ];
    }

    // EMPLOYEE
    return [
      ...baseItems,
      {
        href: "/employee/clients",
        icon: UserCog,
        label: "Clientes",
      },
    ];
  };

  const menuItems = getMenuItems();
  const roleUrl = userRole === "OWNER_BUSSINES" ? "owner-business" : userRole.toLowerCase().replace("_", "-");

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AppointmentApp
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {userRole === "ADMIN" && "Administrador"}
          {userRole === "OWNER_BUSSINES" && "Propietario"}
          {userRole === "EMPLOYEE" && "Empleado"}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </button>

        <Link
          href={`/${roleUrl}/settings`}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all mt-1"
        >
          <Settings className="w-5 h-5" />
          <span>Configuración</span>
        </Link>
      </div>
    </aside>
  );
}
