import { StatusSubscription } from "@/app/generated/prisma/enums";
import * as z from "zod";

export const typeSubscriptionStatusEnum = z.enum(StatusSubscription);

export const SubscriptionSchema = z.object({
  id: z.number().int().optional(),
  amount: z.number().transform((val) => parseFloat(val.toFixed(2))),
  dateEndCurrentPeriod: z.date(),
  dateStartCurrentPeriod: z.date(),
  status: typeSubscriptionStatusEnum,
});
