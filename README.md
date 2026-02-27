# Appointment App - SaaS Multi-tenant

Sistema de gestión de citas con arquitectura multi-inquilino, control de acceso basado en roles y sistema de suscripciones.

## 🚀 Stack Tecnológico

- **Frontend/Backend**: Next.js 16.1.6 (App Router + Turbopack)
- **Base de Datos**: PostgreSQL 17 con Prisma ORM
- **Autenticación**: NextAuth.js 4.24.13 (JWT Strategy)
- **Estilos**: Tailwind CSS + shadcn/ui
- **Temas**: next-themes (soporte dark/light mode)
- **Validación**: Zod schemas

## ⚠️ IMPORTANTE: Next.js 16 - Cambio de Middleware

**Next.js 16 cambió el nombre del archivo de middleware:**

- ❌ Next.js 13-15: `middleware.ts`
- ✅ Next.js 16+: `proxy.ts`

Este proyecto usa **`proxy.ts`** para el control de acceso basado en roles. Si migras desde una versión anterior o encuentras referencias a `middleware.ts`, usa `proxy.ts` en su lugar.

## 🛡️ Sistema de Seguridad

El proyecto implementa un sistema de seguridad completo con 3 roles:

### Roles Disponibles

- **ADMIN**: Acceso completo al sistema (solo asignable desde BD)
- **OWNER_BUSSINES**: Dueño de negocio con su dashboard
- **EMPLOYEE**: Empleado con funcionalidades limitadas

### Protección de Rutas (`proxy.ts`)

- Los roles solo pueden acceder a sus rutas designadas
- El proxy redirige automáticamente a usuarios no autorizados
- Logging detallado con emojis para debugging (🔒, 📍, 🔑, 🛡️, 🚫, ✅)

Para más detalles, consulta:

- [`docs/SECURITY.md`](docs/SECURITY.md) - Guía completa de seguridad
- [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) - Solución de problemas

## 🏃 Getting Started

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` con:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5439/db_name"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 3. Configurar Base de Datos

```bash
# Iniciar PostgreSQL
docker-compose up -d

# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
├── src/
│   ├── proxy.ts             # Control de acceso basado en roles (Next.js 16)
│   ├── app/
├── auth.config.ts          # Configuración de NextAuth
├── prisma/
│   └── schema.prisma       # Esquema de base de datos
├── src/
│   ├── actions/            # Server Actions por módulo
│   ├── app/
│   │   ├── (admin)/       # Dashboard de administrador
│   │   ├── (owner-business)/ # Dashboard de dueños
│   │   ├── (employee)/    # Dashboard de empleados
│   │   └── (auth)/        # Páginas de autenticación
│   ├── components/        # Componentes reutilizables
│   ├── lib/               # Utilidades y configuración
│   ├── schemas/           # Esquemas de validación Zod
│   └── types/             # TypeScript types
└── docs/
    ├── SECURITY.md        # Guía de seguridad
    └── TROUBLESHOOTING.md # Solución de problemas
```

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev           # Servidor de desarrollo (Turbopack)
npm run build         # Build de producción
npm run start         # Servidor de producción
npm run lint          # Linter

# Base de Datos
npx prisma migrate dev    # Crear y aplicar migraciones
npx prisma generate       # Generar Prisma Client
npx prisma studio         # GUI para base de datos
npx prisma db push        # Push cambios sin migración

# Debugging
# Visita /debug para ver información de sesión y JWT
```

## 🐛 Debugging

El proyecto incluye herramientas de debugging:

- **`/debug`**: Página que muestra el estado de sesión y JWT
- **`/api/debug/token`**: Endpoint para verificar el token JWT

Consulta [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) para problemas comunes.

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📝 Notas de Desarrollo

- **Rol ADMIN**: Solo puede ser asignado directamente en la base de datos por seguridad
- **Sesiones JWT**: Duración de 30 días configurada en `auth.config.ts`
- **Subcripciones**: Sistema de prueba gratuita de 15 días implementado
- **Proxy Logging**: Logs detallados en consola para debugging de autenticación

---

Built with ❤️ using Next.js 16
