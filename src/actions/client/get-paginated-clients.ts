"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function getPaginatedClients(
  page: number = 1,
  limit: number = 10,
  searchParam?: string,
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limitNum;
  const where: Prisma.ClientWhereInput = searchParam
    ? {
        firstName: {
          contains: searchParam,
          mode: "insensitive" as Prisma.QueryMode,
        },
      }
    : {};

  try {
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        skip,
        take: limitNum,
        where,
        orderBy: {
          firstName: "desc",
        },
        include: {},
      }),
      prisma.client.count({
        where,
      }),
    ]);

    return {
      ok: true,
      clients,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener Clients", error);
    return {
      ok: false,
      message: "Error al obtener Clients",
    };
  }
}
