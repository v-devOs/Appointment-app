"use server";

"use server";

import prisma from "@/lib/prisma";

export async function getUserById(userid: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userid,
      },
      include: {
        businesses: true,
        personals: true,
        subscriptionDetails: true,
      },
    });

    if (!user)
      return {
        ok: false,
        message: "No se encontró user",
      };

    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.log("Error al obtener user", error);
    return {
      ok: false,
      message: "Error al obtener user",
    };
  }
}
