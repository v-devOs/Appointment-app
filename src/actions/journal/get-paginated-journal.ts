"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getPaginatedJournals(
  page: number = 1,
  limit: number = 10,
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limitNum;
  const where: Prisma.JournalWhereInput = {};

  try {
    const [journals, total] = await Promise.all([
      prisma.journal.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          id: "desc",
        },
      }),
      prisma.journal.count({
        where,
      }),
    ]);

    return {
      ok: true,
      journals,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener Horarios",
    };
  }
}
