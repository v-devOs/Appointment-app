"use server";

import prisma from "@/lib/prisma";

export async function getBusinessById(businessid: number) {
  try {
    const business = await prisma.business.findUnique({
      where: {
        id: businessid,
      },
      include: {
        clients: true,
        owner: true,
        personals: true,
      },
    });

    if (!business)
      return {
        ok: false,
        message: "No se encontro información del negocio",
      };

    return {
      ok: true,
      business,
    };
  } catch (error) {
    console.log("Error al obtener información del negocio", error);
    return {
      ok: false,
      message: "Error al obtener información del negocio",
      error,
    };
  }
}
