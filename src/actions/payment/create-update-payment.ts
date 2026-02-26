"use server";

import prisma from "@/lib/prisma";
import { PaymentSchema } from "@/schemas/payment";

export async function createOrUpdatePayment(payment: unknown) {
  const { data, success } = PaymentSchema.safeParse(payment);

  if (!success)
    return {
      ok: false,
      message: "Información de pago invalida",
    };
  try {
    await prisma.payment.upsert({
      where: { id: data.id || 0 },
      create: {
        ...data,
      },
      update: {
        ...data,
      },
    });

    return {
      ok: true,
      message: `Información de pago ${data.id ? "creada" : "actualizada"} correctamente`,
    };
  } catch (error) {
    console.log("Error al actualizar o crear pago", error);
    return {
      ok: false,
      message: `Error al ${data.id ? "crear" : "actualizar"} información del pago`,
      error,
    };
  }
}
