"use server";

import prisma from "@/lib/prisma";

export async function getBusinessByOwner(ownerid: number) {
  try {
    const businesses = await prisma.business.findMany({
      where: {
        ownerid,
        status: "ACTIVE",
      },
      orderBy: {
        id: "desc",
      },
    });

    return {
      ok: true,
      businesses,
    };
  } catch (error) {
    console.log("Error al obtener negocios del propietario", error);
    return {
      ok: false,
      message: "Error al obtener negocios del propietario",
      error,
    };
  }
}
