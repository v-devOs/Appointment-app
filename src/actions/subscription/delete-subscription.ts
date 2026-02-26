"use server";

import prisma from "@/lib/prisma";

export async function deleteSubscription(subscriptionid: number) {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const subToDelete = await tx.subscription.findUnique({
        where: { id: subscriptionid },
      });

      if (!subToDelete)
        return {
          ok: false,
          message: "No se encontro suscripción para eliminar",
        };

      await tx.subscription.update({
        where: { id: subscriptionid },
        data: {
          ...subToDelete,
          status: "CANCELED",
        },
      });

      return {
        ok: true,
        message: "Suscripción cancelada correctamente",
      };
    });

    return res;
  } catch (error) {
    console.log("Error al cancelar suscripción", error);
    return {
      ok: false,
      message: "Error al cancelar suscripción",
    };
  }
}
