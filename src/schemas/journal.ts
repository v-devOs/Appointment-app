import * as z from "zod";
import { parse } from "date-fns";

export const JournalSchema = z.object({
  id: z.number().int().optional(),
  hourStart: z
    .string()
    .transform((timeStr) => parse(timeStr, "HH:MM", new Date())),
  hourEnd: z
    .string()
    .transform((timeStr) => parse(timeStr, "HH:MM", new Date())),
  freeTime: z
    .string()
    .transform((timeStr) => parse(timeStr, "HH:MM", new Date())),
  startAbsence: z.date(),
  endAbsence: z.date(),
  durationFreeTime: z
    .number()
    .int()
    .positive("La duración debe ser un número positivo")
    .min(1, "La duración debe ser de al menos una hora"),
});
