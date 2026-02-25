import * as z from "zod";
import { StatusAppointment } from "@/app/generated/prisma/enums";

export const typeStatusAppointmentEnum = z.enum(StatusAppointment);

export const AppointmentSchema = z.object({
  id: z.number().int().optional(),
  status: typeStatusAppointmentEnum,
  date: z.date(),
  estimatedDuration: z.number(),
  realDuration: z.number(),

  clientid: z.number().int(),
  typeAppointmentid: z.number().int(),
  personalid: z.number().int(),
});
