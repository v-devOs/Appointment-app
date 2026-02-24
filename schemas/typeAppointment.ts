import * as z from "zod";

export const TypeAppointmentSchema = z.object({
  id: z.number().int().optional(),
  typeAppointment: z.string().min(5, "El tipo de consulta es obligatorio"),
  description: z
    .string()
    .min(5, "La descripción del tipo de cita debe ser valida")
    .optional(),
  businessid: z.number().int().optional(),
});
