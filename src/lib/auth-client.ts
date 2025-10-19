import { stripeClient } from "@better-auth/stripe/client";
import {
	emailOTPClient,
	inferAdditionalFields,
	organizationClient,
	twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "./auth";

export const authClient = createAuthClient({
	plugins: [
		inferAdditionalFields<typeof auth>(),
		twoFactorClient(),
		emailOTPClient(),
		stripeClient({ subscription: true }),
		organizationClient(),
	],
	baseURL: process.env.BETTER_AUTH_BASE_URL,
});
