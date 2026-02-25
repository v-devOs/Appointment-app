"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Schema de validación para login
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export async function loginUser(formData: { email: string; password: string }) {
  try {
    // Validar datos
    const validatedData = loginSchema.parse(formData);

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user || !user.password) {
      return {
        success: false,
        error: "Credenciales inválidas",
      };
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password,
    );

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Credenciales inválidas",
      };
    }

    // Retornar éxito - El cliente manejará el signIn
    return {
      success: true,
      message: "Credenciales válidas",
      user: {
        email: user.email,
        typeUser: user.typeUser,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }

    console.error("Error en login:", error);
    return {
      success: false,
      error: "Error al iniciar sesión",
    };
  }
}
