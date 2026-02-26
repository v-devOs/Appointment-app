"use server";

import prisma from "@/lib/prisma";
import { PersonalSchema } from "@/schemas/personal";

export async function createOrUpdatePersonal(personal: unknown) {
  const { success, data } = PersonalSchema.safeParse(personal);

  if (!success)
    return {
      ok: false,
      message: "Información de personal invalida",
    };

  try {
    const res = await prisma.personal.upsert({
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
      message: `Información de personal ${data.id ? "actualizada" : "creada"} correctamente`,
      personal: !data.id && res,
    };
  } catch (error) {
    console.log("Erro al actualizar o crear información del personal", error);
    return {
      ok: false,
      message: `Error al ${data.id ? "actualizar" : "crear"} personal`,
      error,
    };
  }
}
