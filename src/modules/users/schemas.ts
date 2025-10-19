import { z } from "zod";

export const updateUserSchema = z.object({
	name: z.string().min(2).max(100).optional(),
	email: z.string().email().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
