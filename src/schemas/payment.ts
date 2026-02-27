import { StatusPayment } from "@/app/generated/prisma/enums";
import * as z from "zod";

export const typePaymentStatusEnum = z.enum(StatusPayment);

export const PaymentSchema = z.object({
  id: z.number().int().optional(),
  amount: z
    .number()
    .nonnegative("El monto no puede ser negativo")
    .transform((val) => parseFloat(val.toFixed(2))),
  discount: z.number().nonnegative().optional().default(0),
  datePayment: z.date(),
  status: typePaymentStatusEnum,
  comentaries: z.string().optional(),
});
