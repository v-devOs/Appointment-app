"use server";

import prisma from "@/lib/prisma";

export async function deleteUser(userid: number) {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const userToDelete = await tx.user.findUnique({
        where: {
          id: userid,
        },
      });

      if (!userToDelete)
        return {
          ok: false,
          message: "No se encontro usuario para eliminar",
        };

      await tx.user.update({
        where: {
          id: userid,
        },
        data: {
          ...userToDelete,
          status: "NO_ACTIVE",
        },
      });
    });

    return res;
  } catch (error) {
    console.log("Error al eliminar usuario", error);
    return {
      ok: false,
      message: "Error al eliminar usuario",
      error,
    };
  }
}
