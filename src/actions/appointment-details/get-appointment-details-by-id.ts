"use server";

import prisma from "@/lib/prisma";

export async function getAppointmentDetailsById(appointmentDetailsid: number) {
  try {
    const appointmentDetails = await prisma.appointmentDetails.findUnique({
      where: {
        id: appointmentDetailsid,
      },
      include: {
        business: true,
        client: true,
        personal: true,
        typeAppointment: true,
      },
    });

    if (!appointmentDetails)
      return {
        ok: false,
        message: "No se encontró información de detalles de cita",
      };

    return {
      ok: true,
      appointmentDetails,
    };
  } catch (error) {
    console.log("Error al obtener información de detalles de cita", error);
    return {
      ok: false,
      message: "Error al obtener información de detalles de cita",
    };
  }
}
