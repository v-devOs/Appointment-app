import * as z from "zod";

export const SubscriptionDetailsSchema = z.object({
  id: z.number().int().optional(),
  subscriptionid: z.number().int().optional(),
  paymentid: z.number().int().optional(),
  personalid: z.number().int().optional(),
});
