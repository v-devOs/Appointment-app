"use server";
import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getPaginatedPersonal(
  limit: number = 1,
  page: number = 1,
  searchParam?: string,
  searchParamStatus: "ACTIVE" | "NO_ACTIVE" = "ACTIVE",
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limit;

  const where: Prisma.PersonalWhereInput = searchParam
    ? {
        firstName: {
          contains: searchParam,
          mode: "insensitive" as Prisma.QueryMode,
        },

        status: {
          equals: searchParamStatus,
        },
      }
    : {};

  try {
    const [personals, total] = await Promise.all([
      prisma.personal.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          id: "desc",
          lastNameP: "desc",
        },
      }),
      prisma.personal.count({
        where,
      }),
    ]);

    return {
      ok: true,
      personals,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener información del personal");
    return {
      ok: false,
      message: "Error al obtener información del personal",
      error,
    };
  }
}
