import { z } from "zod";

const MAX_NAME_LENGTH = 100;

export const updateUserSchema = z.object({
  name: z.string().min(2).max(MAX_NAME_LENGTH).optional(),
  email: z.string().email().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
