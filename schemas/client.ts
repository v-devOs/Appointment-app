import * as z from "zod";

export const ClientSchema = z.object({
  id: z.number().int().optional(),
  lastNameP: z.string().min(5, "El apellido paterno es requerido"),
  lastNameM: z
    .string()
    .min(5, "El apellido materno debe ser valido")
    .optional(),
  secondName: z.string().min(5, "El segundo nombre debe ser valido").optional(),
  firstName: z.string().min(5, "El nombre es requerido"),
  tel: z.string().max(10, "El número de telefono debe ser valido"),
  businessid: z.number().int(),
});
