"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function getPaginatedAppointmentDetailss(
  page: number = 1,
  limit: number = 10,
  searchParam: "PENDING" | "CANCELED" | "ATTENDED" | "NO_ATTENDED" = "PENDING",
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limitNum;
  const where: Prisma.AppointmentDetailsWhereInput = searchParam
    ? {
        status: { equals: searchParam },
      }
    : {};

  try {
    const [appointmentDetails, total] = await Promise.all([
      prisma.appointmentDetails.findMany({
        skip,
        take: limitNum,
        where,
        orderBy: {
          status: "desc",
        },
        include: {},
      }),
      prisma.appointmentDetails.count({
        where,
      }),
    ]);

    return {
      ok: true,
      appointmentDetails,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener AppointmentDetailss", error);
    return {
      ok: false,
      message: "Error al obtener AppointmentDetailss",
    };
  }
}
