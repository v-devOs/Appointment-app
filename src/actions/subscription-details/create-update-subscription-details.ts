"use server";

import prisma from "@/lib/prisma";
import { SubscriptionDetailsSchema } from "@/schemas/subscriptionDetails";

export async function createOrUpdateSubscriptionDetails(
  susbcriptionDetails: unknown,
) {
  const { success, data } =
    SubscriptionDetailsSchema.safeParse(susbcriptionDetails);

  if (!success)
    return {
      ok: false,
      message: "Información de detalles de suscripción inválida",
    };

  try {
    await prisma.subscriptionDetails.upsert({
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
      message: `detalles de suscripción ${data.id ? "actualizado" : "creado"} exitosamente`,
    };
  } catch (error) {
    console.log(
      `Error al ${data.id ? "actualizar" : "crear"} detalles de suscripción`,
      error,
    );
    return {
      ok: false,
      message: `Error al ${data.id ? "actualizar" : "crear"} detalles de suscripción`,
      error,
    };
  }
}
