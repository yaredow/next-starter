"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type RefObject,
  useContext,
} from "react";

import { cn } from "@/lib/utils";

const InputOTP = ({
  ref,
  className,
  containerClassName,
  ...props
}: ComponentPropsWithoutRef<typeof OTPInput> & {
  ref?: RefObject<ElementRef<typeof OTPInput>>;
}) => (
  <OTPInput
    className={cn("disabled:cursor-not-allowed", className)}
    containerClassName={cn(
      "flex items-center gap-2 has-disabled:opacity-50",
      containerClassName
    )}
    ref={ref}
    {...props}
  />
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = ({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  ref?: RefObject<ElementRef<"div">>;
}) => (
  <div className={cn("flex items-center", className)} ref={ref} {...props} />
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = ({
  index,
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { index: number } & {
  ref?: RefObject<HTMLDivElement | null>;
}) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-input border-y border-r text-sm shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      ref={ref}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
};
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = ({
  ref,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  ref?: RefObject<ElementRef<"div">>;
}) => (
  <div ref={ref} {...props}>
    <Minus />
  </div>
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
