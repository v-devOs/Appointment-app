"use server";

import prisma from "@/lib/prisma";

export async function getPersonalById(personalid: number) {
  try {
    const personal = await prisma.personal.findUnique({
      where: {
        id: personalid,
      },
    });

    if (!personal) {
      return {
        ok: false,
        message: "No se encontro información del personal",
      };
    }

    return {
      ok: true,
      personal,
    };
  } catch (error) {
    console.log("Error al buscar información del personal", error);
    return {
      ok: false,
      message: "Error al buscar información del personal",
      error,
    };
  }
}
