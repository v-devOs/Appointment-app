import * as z from "zod";

export const AppointmentCommentsSchema = z.object({
  id: z.number().int().optional(),
  comment: z.string().optional(),
  appointmentDetailsid: z.number().int().optional(),
});
