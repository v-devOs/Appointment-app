"use server";

import prisma from "@/lib/prisma";

export async function deleteBusiness(businessid: number) {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const businessToDelete = await tx.business.findUnique({
        where: {
          id: businessid,
        },
      });

      if (!businessToDelete)
        return {
          ok: false,
          message: "No se encontro negocio para eliminar",
        };

      const [
        totalTypesAppointment,
        totalClients,
        totalPersonals,
        totalAppointmentDetails,
      ] = await Promise.all([
        tx.typeAppointment.count({
          where: {
            businessid: businessToDelete.id,
          },
        }),

        tx.client.count({
          where: {
            businessid: businessToDelete.id,
          },
        }),

        tx.personal.count({
          where: {
            businessid: businessToDelete.id,
          },
        }),

        tx.appointmentDetails.count({
          where: {
            businessid: businessToDelete.id,
          },
        }),
      ]);

      if (
        totalAppointmentDetails === 0 &&
        totalClients === 0 &&
        totalPersonals === 0 &&
        totalTypesAppointment === 0
      ) {
        await tx.business.update({
          where: {
            id: businessToDelete.id,
          },
          data: {
            ...businessToDelete,
            status: "NO_ACTIVE",
          },
        });

        return {
          ok: true,
          message: "Negocio eliminado de forma correcta",
        };
      }

      return {
        ok: false,
        message: "No se puede eliminar negocio",
      };
    });

    return res;
  } catch (error) {
    console.log("Error al eliminar negocio", error);
    return {
      ok: false,
      message: "Error inesperado al eliminar negocio",
      error,
    };
  }
}
