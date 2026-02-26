"use server";

import prisma from "@/lib/prisma";
import { BusinessSchema } from "@/schemas/business";

export async function createOrUpdateBusiness(business: unknown) {
  const { success, data } = BusinessSchema.safeParse(business);

  if (!success)
    return {
      ok: false,
      message: "Información de negocio invalida",
    };

  try {
    const res = await prisma.business.upsert({
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
      message: `Información de negocio ${data.id ? "actualizada" : "creada"} correctamente`,
      business: !data.id && res,
    };
  } catch (error) {
    console.log("Error al actualizar o crear negocio", error);
    return {
      ok: false,
      message: `Error al ${data.id ? "actualizar" : "crear"} negocio`,
      error,
    };
  }
}
