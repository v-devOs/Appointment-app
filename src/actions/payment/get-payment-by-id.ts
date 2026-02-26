"use server";

import prisma from "@/lib/prisma";

export async function getPaymentById(paymnetid: number) {
  try {
    const payment = await prisma.payment.findUnique({
      where: {
        id: paymnetid,
      },
      include: {
        subscriptionDetails: true,
      },
    });

    if (!payment)
      return {
        ok: false,
        message: "No se encontro información del pago",
      };

    return {
      ok: true,
      payment,
    };
  } catch (error) {
    console.log("Error al buscar información del pago", error);
    return {
      ok: false,
      message: "Error al buscar información del pago",
      error,
    };
  }
}
