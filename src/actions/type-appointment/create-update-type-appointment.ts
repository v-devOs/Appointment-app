"use server";

import prisma from "@/lib/prisma";
import { TypeAppointmentSchema } from "@/schemas/typeAppointment";

export async function createOrUpdateTypeAppointment(typeAppontment: unknown) {
  const { success, data } = TypeAppointmentSchema.safeParse(typeAppontment);

  if (!success)
    return {
      ok: false,
      message: "Información de tipo de cita inválida",
    };

  try {
    await prisma.typeAppointment.upsert({
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
      message: `tipo de cita ${data.id ? "actualizado" : "creado"} exitosamente`,
    };
  } catch (error) {
    console.log(
      `Error al ${data.id ? "actualizar" : "crear"} tipo de cita`,
      error,
    );
    return {
      ok: false,
      message: `Error al ${data.id ? "actualizar" : "crear"} tipo de cita`,
      error,
    };
  }
}
