import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordInput = (
  {
    ref,
    className,
    ...props
  }: InputProps & {
    ref: React.RefObject<HTMLInputElement>;
  }
) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pe-10", className)}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
      >
        {showPassword ? (
          <EyeOff className="size-5" />
        ) : (
          <Eye className="size-5" />
        )}
      </button>
    </div>
  );
};

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
