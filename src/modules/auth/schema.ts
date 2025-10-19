import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;
const MIN_PASSWORD_LENGTH_LEGACY = 6;
const OTP_CODE_LENGTH = 6;

const baseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
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
    newPassword: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordFormValues = z.infer<typeof PasswordSchema>;

export const TwoFactorFormSchema = z.object({
  code: z
    .string()
    .min(OTP_CODE_LENGTH, `Code must be ${OTP_CODE_LENGTH} digits`)
    .max(OTP_CODE_LENGTH),
});

export type TwoFactorFormValues = z.infer<typeof TwoFactorFormSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH_LEGACY, "Current password is required"),
    newPassword: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `New password must be at least ${MIN_PASSWORD_LENGTH} characters`
      )
      .regex(/[A-Z]/, "New password must include at least one uppercase letter")
      .regex(/[a-z]/, "New password must include at least one lowercase letter")
      .regex(/[0-9]/, "New password must include at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "New password must include at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
