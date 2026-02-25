"use server";

import prisma from "@/lib/prisma";

export async function name(journalid: number) {
  try {
    const journal = await prisma.journal.findUnique({
      where: { id: journalid },
      include: {
        personals: true,
      },
    });

    if (!journal)
      return {
        ok: false,
        message: "No se encontro Horario",
      };

    return {
      ok: true,
      journal,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener horario",
    };
  }
}
