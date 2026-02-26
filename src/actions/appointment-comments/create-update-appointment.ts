"use server";

import prisma from "@/lib/prisma";
import { AppointmentCommentsSchema } from "@/schemas/appointmentComments";

export async function createOrUpdateAppointmentComments(
  appointmentComment: unknown,
) {
  const { success, data } =
    AppointmentCommentsSchema.safeParse(appointmentComment);

  if (!success)
    return {
      ok: false,
      message: "Información de comentario de cita inválida",
    };

  try {
    await prisma.appointmentComments.upsert({
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
      message: `comentario de cita ${data.id ? "actualizado" : "creado"} exitosamente`,
    };
  } catch (error) {
    console.log(
      `Error al ${data.id ? "actualizar" : "crear"} comentario de cita`,
      error,
    );
    return {
      ok: false,
      message: `Error al ${data.id ? "actualizar" : "crear"} comentario de cita`,
      error,
    };
  }
}
