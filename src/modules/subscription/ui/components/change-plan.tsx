"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { plans } from "../../constants";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          value={selectedPlan}
          onValueChange={setSelectedPlan}
          className="space-y-4"
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex items-start space-x-4 rounded-md border p-4 ${
                selectedPlan === plan.id ? "border-primary" : ""
              }`}
            >
              <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={plan.id} className="font-medium">
                    {plan.name}
                  </Label>
                  <div className="text-right">
                    <div className="font-medium">{plan.price}</div>
                    {plan.period && (
                      <div className="text-xs text-muted-foreground">
                        per {plan.period}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <ul className="grid gap-2 pt-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
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
          onClick={handleChangePlan}
          disabled={selectedPlan === currentPlan}
        >
          {selectedPlan === currentPlan ? "Current Plan" : "Change Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};
