import { StatusPayment } from "@/app/generated/prisma/enums";
import * as z from "zod";

export const typePaymentStatusEnum = z.enum(StatusPayment);

export const PaymentSchema = z.object({
  id: z.number().int().optional(),
  amount: z
    .number()
    .positive("El monto debe ser positivo")
    .transform((val) => parseFloat(val.toFixed(2))),
  discount: z.number().positive(),
  datePayment: z.date(),
  status: typePaymentStatusEnum,
  comentaries: z.string().optional(),
});
