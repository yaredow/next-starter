"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { plans } from "../../constants";

export const ChangePlan = () => {
  const [currentPlan, setCurrentPlan] = useState("pro");
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const handleChangePlan = () => {
    // In a real app, you would call an API here
    setCurrentPlan(selectedPlan);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Plan</CardTitle>
        <CardDescription>Select a different subscription plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          className="space-y-4"
          onValueChange={setSelectedPlan}
          value={selectedPlan}
        >
          {plans.map((plan) => (
            <div
              className={`flex items-start space-x-4 rounded-md border p-4 ${
                selectedPlan === plan.id ? "border-primary" : ""
              }`}
              key={plan.id}
            >
              <RadioGroupItem className="mt-1" id={plan.id} value={plan.id} />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="font-medium" htmlFor={plan.id}>
                    {plan.name}
                  </Label>
                  <div className="text-right">
                    <div className="font-medium">{plan.price}</div>
                    {plan.period && (
                      <div className="text-muted-foreground text-xs">
                        per {plan.period}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
                <ul className="grid gap-2 pt-2 text-sm">
                  {plan.features.map((feature) => (
                    <li className="flex items-center gap-2" key={feature}>
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          disabled={selectedPlan === currentPlan}
          onClick={handleChangePlan}
        >
          {selectedPlan === currentPlan ? "Current Plan" : "Change Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};
