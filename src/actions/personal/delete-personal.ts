"use server";

import prisma from "@/lib/prisma";

export async function deletePersonal(personalid: number) {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const personalToDelete = await tx.personal.findUnique({
        where: {
          id: personalid,
        },
      });

      if (!personalToDelete)
        return {
          ok: false,
          message: "No se encontro personal a eliminar",
        };

      const totalAppointmentDetails = await tx.appointmentDetails.count({
        where: {
          personalid: personalToDelete.id,
        },
      });

      if (totalAppointmentDetails !== 0)
        return {
          ok: false,
          message: `No se puede eliminar al personal tiene ${totalAppointmentDetails} registro(s) de citas`,
        };

      await tx.personal.delete({
        where: {
          id: personalToDelete.id,
        },
      });

      return {
        ok: true,
        message: "Personal eliminado correctamente",
      };
    });

    return res;
  } catch (error) {
    console.log("Error al eliminar el personal", error);
    return {
      ok: false,
      message: "Error al eliminar al personal",
      error,
    };
  }
}
