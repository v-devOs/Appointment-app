"use server";

import prisma from "@/lib/prisma";

export async function getClientById(clientid: number) {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id: clientid,
      },
      include: {
        appointmentDetails: true,
        business: true,
      },
    });

    if (!client)
      return {
        ok: false,
        message: "No se encontró Cliente",
      };

    return {
      ok: true,
      client,
    };
  } catch (error) {
    console.log("Error al obtener Cliente", error);
    return {
      ok: false,
      message: "Error al obtener Cliente",
    };
  }
}
