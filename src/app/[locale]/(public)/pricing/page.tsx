import type { Metadata } from "next";
import { PricingPlans } from "@/modules/pricing/ui/components/pricing-plans";

export const metadata: Metadata = {
  title: "Pricing - NextSaaS",
  description: "Simple and predictable pricing for all your SaaS needs.",
};

export default function PricingPage() {
  return (
    <div className="container py-6 md:py-16">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <div className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
          Simple, transparent pricing
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that&apos;s right for you and get started with your
          project today.
        </p>
      </div>
      <PricingPlans />
    </div>
  );
}
