import * as z from "zod";

export const SubscriptionDetailsSchema = z.object({
  id: z.number().int().optional(),
  subscriptionid: z.number().int(),
  paymentid: z.number().int(),
  userid: z.number().int(),
});
