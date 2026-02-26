"use server";

import prisma from "@/lib/prisma";

export async function getTypeAppointmentById(typeAppointmentid: number) {
  try {
    const typeAppointment = await prisma.typeAppointment.findUnique({
      where: {
        id: typeAppointmentid,
      },
      include: {
        appointmentDetails: true,
        business: true,
      },
    });

    if (!typeAppointment)
      return {
        ok: false,
        message: "No se encontró el tipo de cita",
      };

    return {
      ok: true,
      typeAppointment,
    };
  } catch (error) {
    console.log("Error al obtener el tipo de cita", error);
    return {
      ok: false,
      message: "Error al obtener el tipo de cita",
    };
  }
}
