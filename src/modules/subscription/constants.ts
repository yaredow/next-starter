import type Stripe from "stripe";

export const allowedEvents: Stripe.Event.Type[] = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "customer.subscription.paused",
  "customer.subscription.resumed",
  "customer.subscription.pending_update_applied",
  "customer.subscription.pending_update_expired",
  "customer.subscription.trial_will_end",
  "invoice.paid",
  "invoice.payment_failed",
  "invoice.payment_action_required",
  "invoice.upcoming",
  "invoice.marked_uncollectible",
  "invoice.payment_succeeded",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
  "payment_intent.canceled",
];

export const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Basic features for personal use",
    features: [
      "1 user",
      "5 projects",
      "Basic analytics",
      "24-hour support response time",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$15",
    period: "monthly",
    description: "Everything in Free, plus more features for professionals",
    features: [
      "5 users",
      "20 projects",
      "Advanced analytics",
      "4-hour support response time",
      "API access",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$49",
    period: "monthly",
    description: "Advanced features for teams",
    features: [
      "Unlimited users",
      "Unlimited projects",
      "Custom analytics",
      "1-hour support response time",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
];

export const billingHistory = [
  { id: 1, date: "Mar 1, 2023", amount: "$15.00", status: "Paid" },
  { id: 2, date: "Feb 1, 2023", amount: "$15.00", status: "Paid" },
  { id: 3, date: "Jan 1, 2023", amount: "$15.00", status: "Paid" },
];
