"use server";

import prisma from "@/lib/prisma";

export async function getSubscriptionById(subscriptionid: number) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        id: subscriptionid,
      },
      include: {
        subscriptionDetails: true,
      },
    });

    if (!subscription)
      return {
        ok: false,
        message: "No se encontró suscripción",
      };

    return {
      ok: true,
      subscription,
    };
  } catch (error) {
    console.log("Error al obtener suscripción", error);
    return {
      ok: false,
      message: "Error al obtener suscripción",
    };
  }
}
