import { z } from "zod";

const baseSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const signUpSchema = baseSchema.extend({
	name: z.string().min(1, "Name is required"),
});

export const signInSchema = baseSchema;

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;

export type userAuthData = SignUpData | SignInData;

export const PasswordSchema = z
	.object({
		currentPassword: z.string().min(1, "Current password is required"),
		newPassword: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type PasswordFormValues = z.infer<typeof PasswordSchema>;

export const TwoFactorFormSchema = z.object({
	code: z.string().min(6, "Code must be 6 digits").max(6),
});

export type TwoFactorFormValues = z.infer<typeof TwoFactorFormSchema>;

export const updatePasswordSchema = z
	.object({
		currentPassword: z.string().min(6, "Current password is required"),
		newPassword: z
			.string()
			.min(8, "New password must be at least 8 characters")
			.regex(/[A-Z]/, "New password must include at least one uppercase letter")
			.regex(/[a-z]/, "New password must include at least one lowercase letter")
			.regex(/[0-9]/, "New password must include at least one number")
			.regex(
				/[^A-Za-z0-9]/,
				"New password must include at least one special character",
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
