import { Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.Ref<HTMLInputElement>;
}

const PasswordInput = ({
  className,
  value,
  ref,
  ...props
}: PasswordInputProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  const [showPassword, setShowPassword] = useState(false);
  const hasPassword = value !== undefined && value !== "";

  return (
    <div className="relative w-full">
      <Input
        className={cn(
          "pe-10 placeholder:text-muted-foreground/50 placeholder:text-sm",
          className
        )}
        ref={ref}
        type={showPassword ? "text" : "password"}
        value={value}
        {...props}
      />

      <button
        className={cn(
          "-translate-y-1/2 absolute top-1/2 right-3 transform",
          hasPassword
            ? "cursor-pointer text-muted-foreground"
            : "cursor-not-allowed text-muted-foreground/50"
        )}
        disabled={!hasPassword}
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? "Hide password" : "Show password"}
        type="button"
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
