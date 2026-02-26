"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getPaginatedSubscriptions(
  page: number = 1,
  limit: number = 10,
  searchParam?: string,
  searhParamStatus?: string,
) {
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const skip = (pageNum - 1) * limitNum;
  const where: Prisma.SubscriptionWhereInput = searchParam
    ? {
        createdAt: { equals: searchParam },
        status: { equals: searhParamStatus ? "ACTIVE" : "PENDING_PAYMENT" },
      }
    : {};

  try {
    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        skip,
        take: limitNum,
        where,
        orderBy: {
          createdAt: "desc",
        },
        include: {},
      }),
      prisma.subscription.count({
        where,
      }),
    ]);

    return {
      ok: true,
      subscriptions,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  } catch (error) {
    console.log("Error al obtener Subscriptions", error);
    return {
      ok: false,
      message: "Error al obtener Subscriptions",
    };
  }
}
