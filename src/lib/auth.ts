import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins/two-factor";
import { emailOTP } from "better-auth/plugins/email-otp";
import { betterAuth } from "better-auth";

import {
  account,
  session,
  twoFactor as twoFactorModel,
  user,
  verification,
} from "@/db/schema";
import TwoFactorEmail from "@/emails/2fa-verification-email";
import { db } from "@/db";

import { hashPassword, verifyPassword } from "./utils";
import { tryCatch } from "./try-catch";
import { resend } from "./resend";

export const auth = betterAuth({
  appName: "Next start",

  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      twoFactor: twoFactorModel,
    },
  }),
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Implement the sendVerificationOTP method to send the OTP to the user's email address
      },
    }),
    twoFactor({
      otpOptions: {
        async sendOTP({ otp, user }, request) {
          const { error } = await tryCatch(
            resend.emails.send({
              from: "yaredyilma11@gmail.com",
              to: user.email,
              subject: "Your OTP",
              react: TwoFactorEmail({
                verificationCode: otp,
                companyName: "Next start",
                userName: user.name,
                supportEmail: "yaredyilma11@gmail.com",
              }),
            }),
          );

          if (error) {
            console.error(error);
            throw new Error("Failed to send OTP");
          }
        },
      },
    }),
  ],
});
