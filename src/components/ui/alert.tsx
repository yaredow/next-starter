import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, RefObject } from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
// add ref as well
type AlertProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    ref?: RefObject<HTMLDivElement | null>;
  };

const Alert = ({ className, variant, ref, ...props }: AlertProps) => (
  <div
    className={cn(alertVariants({ variant }), className)}
    ref={ref}
    role="alert"
    {...props}
  />
);
Alert.displayName = "Alert";

const AlertTitle = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & {
  ref: RefObject<HTMLParagraphElement>;
}) => (
  <h5
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    ref={ref}
    {...props}
  />
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & {
  ref: RefObject<HTMLParagraphElement>;
}) => (
  <div
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    ref={ref}
    {...props}
  />
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
