"use server";

import prisma from "@/lib/prisma";
import { AppointmentDetailsSchema } from "@/schemas/appointmentDetails";

export async function createOrUpdateAppointmentDetails(
  appointmentDetails: unknown,
) {
  const { success, data } =
    AppointmentDetailsSchema.safeParse(appointmentDetails);

  if (!success)
    return {
      ok: false,
      message: "Información de Detalle de Cita inválida",
    };

  try {
    await prisma.appointmentDetails.upsert({
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
      message: `Detalle de Cita ${data.id ? "actualizado" : "creado"} exitosamente`,
    };
  } catch (error) {
    console.log(
      `Error al ${data.id ? "actualizar" : "crear"} Detalle de Cita`,
      error,
    );
    return {
      ok: false,
      message: `Error al ${data.id ? "actualizar" : "crear"} Detalle de Cita`,
      error,
    };
  }
}
