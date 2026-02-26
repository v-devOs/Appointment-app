"use server";

import prisma from "@/lib/prisma";

export async function getPaginatedPayments(
  page: number = 1,
  limit: number = 1,
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limit;

  try {
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        skip,
        take: limitNum,
        orderBy: {
          id: "desc",
        },
      }),

      prisma.payment.count({}),
    ]);

    return {
      ok: true,
      payments,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener pagos paginados", error);
    return {
      ok: false,
      message: "Error al obtener pagos",
      error,
    };
  }
}
