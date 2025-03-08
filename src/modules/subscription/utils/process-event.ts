import { Stripe } from "stripe";

import { tryCatch } from "@/lib/try-catch";
import { stripeClient } from "@/lib/stripe";

import { syncStripeDataToDatabase } from "./sync-stripe-data";
import { allowedEvents } from "../constants";

async function getCustomerId(session: any) {
  if (typeof session?.customer === "string") {
    return session.customer;
  }

  // Handle other cases where customer is an object or doesn't exist
  console.warn("No customer ID found in session", session);
  return null;
}

async function processCheckoutSessionCompleted(event: any) {
  const { data: session, error } = await tryCatch(
    stripeClient.checkout.sessions.retrieve(event.data.object.id, {
      expand: ["line_items"],
    }),
  );

  if (error) {
    throw new Error(`Error retrieving session: ${error.message}`);
  }

  const customerId = await getCustomerId(session);
  if (!customerId) {
    throw new Error("No customer ID found");
  }

  const priceId = session?.line_items?.data[0]?.price?.id;

  if (priceId !== process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID) {
    throw new Error("Price ID doesn't match");
  }

  await syncStripeDataToDatabase(customerId);
}

const customerSubscriptionCreated = async (event: any) => {
  try {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    console.log(
      `[STRIPE HOOK] Subscription created for customer ${customerId}`,
    );

    // Verify that the subscription exists in Stripe
    const { data: retrievedSubscription, error } = await tryCatch(
      stripeClient.subscriptions.retrieve(subscription.id),
    );

    if (error) {
      throw new Error(
        `Error retrieving subscription ${subscription.id}: ${error.message}`,
      );
    }

    // Validate data
    if (retrievedSubscription.customer !== customerId) {
      console.warn(
        `[STRIPE HOOK] Customer ID mismatch: Event ${customerId}, Retrieved ${retrievedSubscription.customer}`,
      );
    }

    await syncStripeDataToDatabase(customerId);
  } catch (error: any) {
    console.error(
      "[STRIPE HOOK] Error processing customer.subscription.created event",
      error,
    );
  }
};

export async function handleStripeEvents(event: Stripe.Event): Promise<void> {
  if (!allowedEvents.includes(event.type)) return;
  const eventType = event.type;

  switch (eventType) {
    case "checkout.session.completed":
      await processCheckoutSessionCompleted(event);
      break;
    case "customer.subscription.created":
      await customerSubscriptionCreated(event);
      break;
    default:
      console.log(`Unhandled event type ${eventType}`);
  }
}
