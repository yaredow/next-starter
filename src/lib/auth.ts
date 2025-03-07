import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins/two-factor";
import { betterAuth } from "better-auth";
import Stripe from "stripe";

import TwoFactorEmail from "@/emails/2fa-verification-email";
import { stripe } from "@better-auth/stripe";
import { db } from "@/db";
import {
  account,
  session,
  twoFactor as twoFactorModel,
  user,
  verification,
} from "@/db/schema";

import { hashPassword, verifyPassword } from "./utils";
import { tryCatch } from "./try-catch";
import { resend } from "./resend";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    twoFactor({
      skipVerificationOnEnable: true,
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
                name: user.name,
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
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
    }),
  ],
});
