"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function getPaginatedSubscriptionDetailss(
  page: number = 1,
  limit: number = 10,
  searchParam?: number,
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limitNum;
  const where: Prisma.SubscriptionDetailsWhereInput = searchParam
    ? {
        userid: { equals: searchParam },
      }
    : {};

  try {
    const [subscriptionDetails, total] = await Promise.all([
      prisma.subscriptionDetails.findMany({
        skip,
        take: limitNum,
        where,
        orderBy: {
          userid: "desc",
        },
        include: {},
      }),
      prisma.subscriptionDetails.count({
        where,
      }),
    ]);

    return {
      ok: true,
      subscriptionDetails,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener SubscriptionDetailss", error);
    return {
      ok: false,
      message: "Error al obtener SubscriptionDetailss",
    };
  }
}
