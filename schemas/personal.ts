import * as z from "zod";

export const PersonalSchema = z.object({
  id: z.number().int().optional(),
  secondName: z.string().min(5, "El segundo nombre debe ser valido").optional(),
  lastNameM: z.string().min(5, "El segundo apellido debe ser valido"),
  firstName: z.string().min(5, "El nombre es obligatorio"),
  lastNameP: z.string().min(5, "El primer apellido es obligatorio"),
  tel: z.string().max(10, "El número de telefono debe ser valido"),
  userid: z.number().int().optional(),
  journalid: z.number().int().optional(),
  businessid: z.number().int().optional(),
});
