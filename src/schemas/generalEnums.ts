import { Status } from "@/app/generated/prisma/enums";
import * as z from "zod";

export const typeStatusEnum = z.enum(Status);
