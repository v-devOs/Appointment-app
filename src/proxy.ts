import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Función Proxy: Se ejecuta en cada solicitud que coincida con el matcher.
 * Next.js 16+ usa proxy.ts en lugar de middleware.ts
 */
export default async function proxy(request: NextRequest) {
  console.log("\n========================================");
  console.log("🔒 [PROXY] EJECUTÁNDOSE");
  console.log("========================================");

  const { pathname } = request.nextUrl;
  console.log("📍 [PROXY] Pathname:", pathname);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("🔑 [PROXY] Token exists:", !!token);
  console.log("👤 [PROXY] Role:", token?.role);
  console.log("📧 [PROXY] Email:", token?.email);

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/", "/auth/login", "/auth/signup", "/debug"];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route),
  );

  console.log("🌐 [PROXY] Is public route:", isPublicRoute);

  // Si no hay token y la ruta no es pública, redirigir al login
  if (!token && !isPublicRoute) {
    console.log("❌ [PROXY] No token, redirecting to login");
    const url = new URL("/auth/login", request.url);
    return NextResponse.redirect(url);
  }

  // Si hay token y está en ruta pública (incluyendo /), redirigir según su rol
  if (token && isPublicRoute && pathname !== "/debug") {
    const role = token.role as string;
    let redirectPath = "/";

    if (role === "ADMIN") {
      redirectPath = "/admin";
    } else if (role === "OWNER_BUSSINES") {
      redirectPath = "/owner-business";
    } else if (role === "EMPLOYEE") {
      redirectPath = "/employee";
    }

    console.log(
      "↪️ [PROXY] User authenticated on public route, redirecting to:",
      redirectPath,
    );

    // Solo redirigir si no es la misma ruta (evitar loops)
    if (pathname !== redirectPath) {
      const url = new URL(redirectPath, request.url);
      return NextResponse.redirect(url);
    }
  }

  // Protección de rutas por rol
  if (token) {
    const role = token.role as string;
    console.log("🛡️ [PROXY] Checking role-based access for:", role);

    // ADMIN: Puede acceder solo a /admin
    // NO puede acceder a /owner-business ni /employee
    if (role === "ADMIN") {
      if (
        pathname.startsWith("/owner-business") ||
        pathname.startsWith("/employee")
      ) {
        console.log(
          "🚫 [PROXY] ADMIN trying to access unauthorized route, redirecting to /admin",
        );
        const url = new URL("/admin", request.url);
        return NextResponse.redirect(url);
      }
    }

    // OWNER_BUSSINES: Puede acceder solo a /owner-business
    // NO puede acceder a /admin ni /employee
    if (role === "OWNER_BUSSINES") {
      if (pathname.startsWith("/admin") || pathname.startsWith("/employee")) {
        console.log(
          "🚫 [PROXY] OWNER_BUSSINES trying to access unauthorized route, redirecting to /owner-business",
        );
        const url = new URL("/owner-business", request.url);
        return NextResponse.redirect(url);
      }
    }

    // EMPLOYEE: Puede acceder solo a /employee
    // NO puede acceder a /admin ni /owner-business
    if (role === "EMPLOYEE") {
      if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/owner-business")
      ) {
        console.log(
          "🚫 [PROXY] EMPLOYEE trying to access unauthorized route, redirecting to /employee",
        );
        const url = new URL("/employee", request.url);
        return NextResponse.redirect(url);
      }
    }
  }

  console.log("✅ [PROXY] Allowing access to:", pathname);
  console.log("========================================\n");
  return NextResponse.next();
}

/**
 * Configuración del Matcher
 * Define en qué rutas debe activarse el proxy.
 * Next.js 16 buscará automáticamente la exportación 'config'
 */
export const config = {
  matcher: [
    /*
     * Intercepta todas las rutas EXCEPTO:
     * - /api/* (API routes)
     * - /_next/static (archivos estáticos)
     * - /_next/image (optimización de imágenes)
     * - /favicon.ico, /sitemap.xml, /robots.txt (metadatos)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
