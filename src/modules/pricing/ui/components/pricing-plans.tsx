"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { plans } from "../../constants";
import { PlanCard } from "./plan-card";

export function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex justify-center space-x-2">
        <Label
          htmlFor="billing-toggle"
          className={`cursor-pointer ${isAnnual ? "text-muted-foreground" : ""}`}
        >
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
        />
        <Label
          htmlFor="billing-toggle"
          className={`cursor-pointer ${isAnnual ? "" : "text-muted-foreground"}`}
        >
          Annual{" "}
          <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            Save 20%
          </span>
        </Label>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            name={plan.name}
            description={plan.description}
            price={isAnnual ? plan.annualPrice : plan.monthlyPrice}
            features={plan.features}
            popular={plan.popular}
            ctaText={plan.ctaText}
            interval={isAnnual ? "year" : "month"}
          />
        ))}
      </div>
    </div>
  );
}
