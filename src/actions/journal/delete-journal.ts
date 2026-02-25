"use server";

import prisma from "@/lib/prisma";

export async function deleteJournal(journalid: number) {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const journalDelete = await tx.journal.findUnique({
        where: { id: journalid },
      });

      if (!journalDelete)
        return {
          ok: false,
          message: "No se encontro Horario para eliminar",
        };

      const personalCount = await tx.personal.count({
        where: { journalid: journalid },
      });

      if (personalCount > 0) {
        return {
          ok: false,
          message: `No se puede eliminar. ${personalCount} empleado(s) está usando este horario`,
        };
      }

      await tx.journal.delete({
        where: { id: journalid },
      });

      return {
        ok: true,
        message: "Horario eliminado correctamente",
      };
    });

    return res;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error inesperadoal eliminar Horario",
      error,
    };
  }
}
