"use server";

import prisma from "@/lib/prisma";

export async function deleteTypeAppointment(typeAppointmentid: number) {
  try {
    return await prisma.$transaction(async (tx) => {
      const typeAppointmentToDelete = await tx.typeAppointment.findUnique({
        where: { id: typeAppointmentid },
      });

      if (!typeAppointmentToDelete)
        return {
          ok: false,
          message: "No se encontro información del tipo de cita",
        };

      await tx.typeAppointment.update({
        where: { id: typeAppointmentid },
        data: {
          ...typeAppointmentToDelete,
          status: "NO_ACTIVE",
        },
      });

      return {
        ok: true,
        message: "Tipo de cita eliminada correctamente",
      };
    });
  } catch (error) {
    console.log("Error al eliminar tipo de cita", error);
    return {
      ok: false,
      message: "Error al eliminar tipo de cita",
    };
  }
}
