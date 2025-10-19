"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { plans } from "../../constants";
import { PlanCard } from "./plan-card";

export function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex justify-center space-x-2">
        <Label
          className={`cursor-pointer ${isAnnual ? "text-muted-foreground" : ""}`}
          htmlFor="billing-toggle"
        >
          Monthly
        </Label>
        <Switch
          checked={isAnnual}
          id="billing-toggle"
          onCheckedChange={setIsAnnual}
        />
        <Label
          className={`cursor-pointer ${isAnnual ? "" : "text-muted-foreground"}`}
          htmlFor="billing-toggle"
        >
          Annual
          <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
            Save 20%
          </span>
        </Label>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            ctaText={plan.ctaText}
            description={plan.description}
            features={plan.features}
            interval={isAnnual ? "year" : "month"}
            key={plan.name}
            name={plan.name}
            planId={plan.planId}
            popular={plan.popular}
            price={isAnnual ? plan.annualPrice : plan.monthlyPrice}
          />
        ))}
      </div>
    </div>
  );
}
