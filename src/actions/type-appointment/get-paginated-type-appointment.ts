"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function getPaginatedTypeAppointments(
  page: number = 1,
  limit: number = 10,
  searchParam?: string,
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limitNum;
  const where: Prisma.TypeAppointmentWhereInput = searchParam ? {} : {};

  try {
    const [typeAppontments, total] = await Promise.all([
      prisma.typeAppointment.findMany({
        skip,
        take: limitNum,
        where,
        orderBy: {
          status: "desc",
        },
        include: {},
      }),
      prisma.typeAppointment.count({
        where,
      }),
    ]);

    return {
      ok: true,
      typeAppontments,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener TypeAppointments", error);
    return {
      ok: false,
      message: "Error al obtener TypeAppointments",
    };
  }
}
