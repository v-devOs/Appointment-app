import * as z from "zod";
import { StatusAppointment } from "@/app/generated/prisma/enums";
import { parse } from "date-fns";

export const typeStatusAppointmentEnum = z.enum(StatusAppointment);

export const AppointmentDetailsSchema = z.object({
  id: z.number().int().optional(),
  status: typeStatusAppointmentEnum,
  date: z.date(),
  estimatedDuration: z.number().positive(),
  realDuration: z.number().positive(),

  hourStart: z
    .string()
    .transform((strDate) => parse(strDate, "HH:mm", new Date())),
  hourEnd: z
    .string()
    .transform((strDate) => parse(strDate, "HH:mm", new Date())),

  businessid: z.number().int().optional(),
  clientid: z.number().int().optional(),
  typeAppointmentid: z.number().int().optional(),
  personalid: z.number().int().optional(),
});
