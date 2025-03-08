import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins/two-factor";
import { betterAuth } from "better-auth";

import TwoFactorEmail from "@/emails/2fa-verification-email";
import { stripe } from "@better-auth/stripe";
import { db } from "@/db";
import {
  account,
  session,
  subscription,
  twoFactor as twoFactorModel,
  user,
  verification,
} from "@/db/schema";

import { hashPassword, verifyPassword } from "./utils";
import { stripeClient } from "./stripe";
import { tryCatch } from "./try-catch";
import { resend } from "./resend";
import { projectHmrEvents } from "next/dist/build/swc/generated-native";
import { handleStripeEvents } from "@/modules/stripe/utils/process-event";

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
      subscription,
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
      subscription: {
        enabled: true,
        plans: [
          {
            name: "Basic",
            priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
          },
        ],
      },
      onEvent: async (event) => {
        await handleStripeEvents(event);
      },
    }),
  ],
});
