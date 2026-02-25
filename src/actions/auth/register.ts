"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UserSchema } from "@/schemas/user";
import { z } from "zod";

export async function registerUser(formData: {
  email: string;
  password: string;
  typeUser?: "OWNER_BUSSINES" | "EMPLOYEE";
}) {
  try {
    // Validar datos con el schema existente
    const validatedData = UserSchema.parse(formData);

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
        typeUser: validatedData.typeUser,
      },
      select: {
        id: true,
        email: true,
        typeUser: true,
      },
    });

    return {
      success: true,
      message: "Usuario registrado exitosamente",
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
