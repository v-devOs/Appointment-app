"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getPaginatedBusiness(
  page: number = 1,
  limit: number = 1,
  searhParamName?: string,
  searchParamStatus?: string,
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limitNum;
  const where: Prisma.BusinessWhereInput = {
    name: {
      contains: searhParamName,
      mode: "insensitive" as Prisma.QueryMode,
    },
    status: {
      equals: searchParamStatus ? "ACTIVE" : "NO_ACTIVE",
    },
  };

  try {
    const [business, total] = await Promise.all([
      prisma.business.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          id: "desc",
          name: "desc",
        },
      }),
      prisma.business.count({
        where,
      }),
    ]);

    return {
      ok: true,
      business,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener negocios", error);
    return {
      ok: false,
      message: "Error al obtener negocios",
      error,
    };
  }
}
