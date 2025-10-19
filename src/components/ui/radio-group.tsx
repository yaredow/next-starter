"use client";

import {
  Indicator as RadioGroupIndicator,
  Item as RadioGroupItemPrimitive,
  Root as RadioGroupRoot,
} from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const RadioGroup = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupRoot> & {
  ref: React.RefObject<React.ElementRef<typeof RadioGroupRoot>>;
}) => (
  <RadioGroupRoot
    className={cn("grid gap-2", className)}
    {...props}
    ref={ref}
  />
);
RadioGroup.displayName = RadioGroupRoot.displayName;

const RadioGroupItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupItemPrimitive> & {
  ref: React.RefObject<React.ElementRef<typeof RadioGroupItemPrimitive>>;
}) => (
  <RadioGroupItemPrimitive
    className={cn(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow-sm focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  >
    <RadioGroupIndicator className="flex items-center justify-center">
      <Circle className="h-3.5 w-3.5 fill-primary" />
    </RadioGroupIndicator>
  </RadioGroupItemPrimitive>
);
RadioGroupItem.displayName = RadioGroupItemPrimitive.displayName;

export { RadioGroup, RadioGroupItem };
