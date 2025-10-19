import Stripe from "stripe";

// Only initialize Stripe if the secret key is available
// This allows the app to run in test/development environments without Stripe
export const stripeClient = process.env.STRIPE_SECRET_KEY
	? new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2025-09-30.clover",
			typescript: true,
		})
	: null;
