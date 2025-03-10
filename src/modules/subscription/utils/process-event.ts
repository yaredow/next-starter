import { Stripe } from "stripe";

import { allowedEvents } from "../constants";

const handleInvoicePaid = (event: Stripe.Event) => {
  console.log("Invoice paid event received", event);
};

export async function handleStripeEvents(event: Stripe.Event): Promise<void> {
  if (!allowedEvents.includes(event.type)) return;
  const eventType = event.type;

  switch (eventType) {
    case "invoice.paid":
      //Handle paid invoice
      handleInvoicePaid(event);
      break;
    default:
  }
}
