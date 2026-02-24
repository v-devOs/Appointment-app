import * as z from "zod";

export const PersonalBusinessDetailsSchema = z.object({
  id: z.number().int().optional(),
  personalid: z.number().int().optional(),
  businessid: z.number().int().optional(),
  paymentid: z.number().int().optional(),
});
