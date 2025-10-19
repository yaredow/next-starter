import type { Stripe } from "stripe";

import { allowedEvents } from "@/modules/subscription/constants";

const handleInvoicePaid = (_event: Stripe.Event) => {
  // TODO: Implement invoice paid handler
};

export function handleStripeEvents(event: Stripe.Event): void {
  if (!allowedEvents.includes(event.type)) {
    return;
  }
  const eventType = event.type;

  switch (eventType) {
    case "invoice.paid":
      //Handle paid invoice
      handleInvoicePaid(event);
      break;
    default:
  }
}
