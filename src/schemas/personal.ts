import { TypeUser } from "@/app/generated/prisma/enums";
import * as z from "zod";

export const typeUserEnum = z.enum(TypeUser);

export const PersonalSchema = z.object({
  id: z.number().int().optional(),
  firstName: z.string().min(5, "El nombre es obligatorio"),
  secondName: z.string().min(5, "El segundo nombre debe ser valido").optional(),
  lastNameP: z.string().min(5, "El primer apellido es obligatorio"),
  lastNameM: z
    .string()
    .min(5, "El segundo apellido debe ser valido")
    .optional(),
  tel: z.string().max(10, "El número de telefono debe ser valido"),
  typePersonal: typeUserEnum,
  userid: z.number().int(),
  businessid: z.number().int(),
  journalid: z.number().int().optional(),
});
