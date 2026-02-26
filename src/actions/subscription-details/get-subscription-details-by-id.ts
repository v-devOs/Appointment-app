"use server";

import prisma from "@/lib/prisma";

export async function getSubscriptionDetailsById(suscriptionDetailsid: number) {
  try {
    const susciptionDetails = await prisma.subscriptionDetails.findUnique({
      where: {
        id: suscriptionDetailsid,
      },
      include: {
        payment: true,
        subscription: true,
        user: true,
      },
    });

    if (!susciptionDetails)
      return {
        ok: false,
        message: "No se encontró detalles de suscripción",
      };

    return {
      ok: true,
      susciptionDetails,
    };
  } catch (error) {
    console.log("Error al obtener detalles de suscripción", error);
    return {
      ok: false,
      message: "Error al obtener detalles de suscripción",
    };
  }
}
