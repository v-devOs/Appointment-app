"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function getPaginatedAppointmentCommentss(
  page: number = 1,
  limit: number = 10,
  searchParam?: string,
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limitNum;
  const where: Prisma.AppointmentCommentsWhereInput = searchParam ? {} : {};

  try {
    const [appointmentComments, total] = await Promise.all([
      prisma.appointmentComments.findMany({
        skip,
        take: limitNum,
        where,
        orderBy: {
          createdAt: "desc",
        },
        include: {},
      }),
      prisma.appointmentComments.count({
        where,
      }),
    ]);

    return {
      ok: true,
      appointmentComments,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener AppointmentCommentss", error);
    return {
      ok: false,
      message: "Error al obtener AppointmentCommentss",
    };
  }
}
