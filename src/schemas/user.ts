import * as z from "zod";
import { typeStatusEnum } from "./generalEnums";

export const UserSchema = z.object({
  id: z.number().int().optional(),
  email: z.email(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  status: typeStatusEnum.optional().default("ACTIVE"),
});
