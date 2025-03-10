import { stripeClient } from "@/lib/stripe";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";

import { tryCatch } from "@/lib/try-catch";

export async function syncStripeDataToDatabase(customerId: string) {
  const { data, error } = await tryCatch(
    stripeClient.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: "all",
      expand: ["data.default_payment_method"],
    }),
  );

  if (error) {
    console.error("[STRIPE SYNC ERROR]", error.message);
    return;
  }

  console.log({ data });

  if (data.data.length === 0) {
    await db
      .update(user)
      .set({
        stripeSubscriptionId: null,
        stripeSubscriptionStatus: "none",
        stripePriceId: null,
      })
      .where(eq(user.stripeCustomerId, customerId));
    return;
  }

  const subscription = data.data[0];

  let paymentMethodBrand: string | null = null;
  let paymentMethodLast4: string | null = null;

  if (
    subscription.default_payment_method &&
    typeof subscription.default_payment_method !== "string"
  ) {
    paymentMethodBrand =
      subscription.default_payment_method.card?.brand ?? null;
    paymentMethodLast4 =
      subscription.default_payment_method.card?.last4 ?? null;
  }

  await db
    .update(user)
    .set({
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionStatus: subscription.status,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000), // Convert to Date
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      paymentMethodBrand,
      paymentMethodLast4,
    })
    .where(eq(user.stripeCustomerId, customerId));
}
