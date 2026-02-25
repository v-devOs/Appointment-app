"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Schema de validación para registro
const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  typeUser: z.enum(["ADMIN", "OWNER_BUSSINES", "EMPLOYEE"]).optional(),
});

// Schema de validación para login
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export async function registerUser(formData: {
  email: string;
  password: string;
  typeUser?: "ADMIN" | "OWNER_BUSSINES" | "EMPLOYEE";
}) {
  try {
    // Validar datos
    const validatedData = registerSchema.parse(formData);

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "El email ya está registrado",
      };
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        typeUser: validatedData.typeUser || "OWNER_BUSSINES",
      },
      select: {
        id: true,
        email: true,
        typeUser: true,
      },
    });

    return {
      success: true,
      user: {
        id: user.id,
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

    console.error("Error en registro:", error);
    return {
      success: false,
      error: "Error al registrar usuario",
    };
  }
}

export async function validateCredentials(email: string, password: string) {
  try {
    const validatedData = loginSchema.parse({ email, password });

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      typeUser: user.typeUser,
    };
  } catch (error) {
    console.error("Error en validación:", error);
    return null;
  }
}
