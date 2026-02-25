import * as z from "zod";
import { format } from "date-fns";

export const JournalSchema = z.object({
  id: z.number().int().optional(),
  hourStart: z.date().transform((val) => format(val, "HH:MM")),
  hourEnd: z.date().transform((val) => format(val, "HH:MM")),
  freeTime: z.date().transform((val) => format(val, "HH:MM")),
  startAbsence: z.date(),
  endAbsence: z.date(),
  durationFreeTime: z
    .number()
    .int()
    .positive("La duración debe ser un número positivo")
    .min(1, "La duración debe ser de al menos una hora"),
});
