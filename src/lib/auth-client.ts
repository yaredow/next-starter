import { createAuthClient } from "better-auth/react";
import { stripeClient } from "@better-auth/stripe/client";
import {
  emailOTPClient,
  inferAdditionalFields,
  twoFactorClient,
} from "better-auth/client/plugins";

import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    twoFactorClient(),
    emailOTPClient(),
    stripeClient({ subscription: true }),
  ],
  baseURL: process.env.BETTER_AUTH_BASE_URL,
});
