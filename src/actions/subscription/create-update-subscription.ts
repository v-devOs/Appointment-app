"use server";

import prisma from "@/lib/prisma";
import { SubscriptionSchema } from "@/schemas/subscription";

export async function createOrUpdateSubscription(subscription: unknown) {
  const { success, data } = SubscriptionSchema.safeParse(subscription);

  if (!success)
    return {
      ok: false,
      message: "Información de suscripción invalida",
    };

  try {
    await prisma.subscription.upsert({
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
      message: `Suscripción ${data.id ? "actualizada" : "creada"} correctamente`,
    };
  } catch (error) {
    console.log("Error al crear o actualizar subscripción", error);
    return {
      ok: false,
      message: `Error al ${data.id ? "actualizar" : "crear"} suscripción`,
    };
  }
}
