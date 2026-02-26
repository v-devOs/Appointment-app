"use server";

import prisma from "@/lib/prisma";
import { UserSchema } from "@/schemas/user";

export async function createOrUpdateUser(user: unknown) {
  const { success, data } = UserSchema.safeParse(user);

  if (!success)
    return {
      ok: false,
      message: "Información de usuario inválida",
    };

  try {
    const createOrUpdateRes = await prisma.user.upsert({
      where: {
        id: data.id || 0,
      },
      create: {
        ...data,
      },
      update: {
        ...data,
      },
    });

    return {
      ok: true,
      message: `Usuario ${data.id ? "actualizado" : "creado"} correctamente`,
      user: !data.id && createOrUpdateRes,
    };
  } catch (error) {
    console.log("Error al actualizar o crear usuario", error);
    return {
      ok: false,
      message: `Error al ${data.id ? "actualizar" : "crear"} usuario`,
      error,
    };
  }
}
