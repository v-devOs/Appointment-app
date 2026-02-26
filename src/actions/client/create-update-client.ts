"use server";

import prisma from "@/lib/prisma";
import { ClientSchema } from "@/schemas/client";

export async function createOrUpdateClient(client: unknown) {
  const { success, data } = ClientSchema.safeParse(client);

  if (!success)
    return {
      ok: false,
      message: "Información de Ciente inválida",
    };

  try {
    await prisma.client.upsert({
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
      message: `Ciente ${data.id ? "actualizado" : "creado"} exitosamente`,
    };
  } catch (error) {
    console.log(`Error al ${data.id ? "actualizar" : "crear"} Ciente`, error);
    return {
      ok: false,
      message: `Error al ${data.id ? "actualizar" : "crear"} Ciente`,
      error,
    };
  }
}
