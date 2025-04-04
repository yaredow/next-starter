import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.Ref<HTMLInputElement>;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const hasPassword = value !== undefined && value !== "";

    return (
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "placeholder:text-muted-foreground/50 pe-10 placeholder:text-sm",
            className,
          )}
          ref={ref}
          value={value}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? "Hide password" : "Show password"}
          className={cn(
            "absolute top-1/2 right-3 -translate-y-1/2 transform",
            hasPassword
              ? "text-muted-foreground cursor-pointer"
              : "text-muted-foreground/50 cursor-not-allowed",
          )}
          disabled={!hasPassword}
        >
          {showPassword ? (
            <EyeOff className="size-5" />
          ) : (
            <Eye className="size-5" />
          )}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
