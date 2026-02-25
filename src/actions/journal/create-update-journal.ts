"use server";

import prisma from "@/lib/prisma";
import { JournalSchema } from "@/schemas/journal";

export async function createOrUpdateJournal(journal: unknown) {
  const { success, data: dataJournal } = JournalSchema.safeParse(journal);

  if (!success)
    return {
      ok: false,
      message: "Información de jornada inválida",
    };

  try {
    await prisma.journal.upsert({
      where: { id: dataJournal.id || 0 },
      create: {
        ...dataJournal,
      },
      update: {
        ...dataJournal,
      },
    });

    return {
      ok: true,
      message: `Información de jornada 
        ${dataJournal.id ? "actualizada" : "creada"} 
        correctamente`,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Error al ${dataJournal.id ? "actualizar" : "crear"} jornada`,
      error,
    };
  }
}
