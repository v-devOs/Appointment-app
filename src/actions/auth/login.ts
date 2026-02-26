"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

interface LoginData {
  email: string;
  password: string;
}

export async function loginUser(data: LoginData) {
  try {
    if (!data.email || !data.password) {
      return {
        ok: false,
        message: "Email y contraseña son requeridos",
      };
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user || !user.password) {
      return {
        ok: false,
        message: "Credenciales inválidas",
      };
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return {
        ok: false,
        message: "Credenciales inválidas",
      };
    }

    // Verificar que el usuario esté activo
    if (user.status !== "ACTIVE") {
      return {
        ok: false,
        message: "Tu cuenta está inactiva. Contacta al administrador",
      };
    }

    // Retornar datos del usuario para crear la sesión
    return {
      ok: true,
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id.toString(),
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Error en login:", error);
    return {
      ok: false,
      message: "Error al iniciar sesión. Por favor intenta de nuevo",
    };
  }
}
