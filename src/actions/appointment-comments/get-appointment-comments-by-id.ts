"use server";

import prisma from "@/lib/prisma";

export async function getAppointmentCommentsById(
  appointmentCommentsid: number,
) {
  try {
    const AppointmentComments = await prisma.appointmentComments.findUnique({
      where: {
        id: appointmentCommentsid,
      },
      include: {
        appointmentDetails: true,
      },
    });

    if (!AppointmentComments)
      return {
        ok: false,
        message: "No se encontró comentarios de cita",
      };

    return {
      ok: true,
      AppointmentComments,
    };
  } catch (error) {
    console.log("Error al obtener comentarios de cita", error);
    return {
      ok: false,
      message: "Error al obtener comentarios de cita",
    };
  }
}
