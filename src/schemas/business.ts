import * as z from "zod";
import { format } from "date-fns";

export const BusinessSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(8, "El nombre del negocio es requerido"),
  email: z.email().optional(),
  tel: z.string().max(10, "El número de telefono debe contener 10 digítos"),
  direction: z.string().min(10, "La dirección es obligatoría"),
  hourOpen: z.date().transform((val) => format(val, "HH:mm")),
  hourClose: z.date().transform((val) => format(val, "HH:mm")),
});
