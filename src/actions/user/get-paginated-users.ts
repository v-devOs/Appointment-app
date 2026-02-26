"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getPaginatedUserss(
  page: number = 1,
  limit: number = 10,
  searchParam?: string,
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limitNum;
  const where: Prisma.UserWhereInput = searchParam
    ? {
        email: {
          contains: searchParam,
          mode: "insensitive" as Prisma.QueryMode,
        },
      }
    : {};

  try {
    const [items, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limitNum,
        where,
        include: {},
      }),
      prisma.user.count({
        where,
      }),
    ]);

    return {
      ok: true,
      items,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener Usuarios", error);
    return {
      ok: false,
      message: "Error al obtener Usuarios",
    };
  }
}
