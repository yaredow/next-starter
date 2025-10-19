"use client";

import { Loader2 } from "lucide-react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/trpc/client";

type TwoFactorToggleProps = {
  userId: string;
};

export const TwoFactorToggle = ({ userId }: TwoFactorToggleProps) => (
  <Suspense fallback={<Loader2 className="animate-spin" />}>
    <ErrorBoundary fallback={<p>Error</p>}>
      <TwoFactorToggleSuspense userId={userId} />
    </ErrorBoundary>
  </Suspense>
);

const TwoFactorToggleSuspense = ({ userId }: TwoFactorToggleProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [showPasswordInput, _setShowPasswordInput] = useState(false);

  const utils = trpc.useUtils();
  const { data: user } = trpc.users.getUser.useSuspenseQuery({
    id: userId as string,
  });
  const verifyPassword = trpc.users.verifyUserPassword.useMutation({
    onSuccess: () => {
      utils.users.invalidate();
      handleToggle();
    },
  });

  const handleToggle = async () => {
    if (user.twoFactorEnabled) {
      setIsLoading(true);
      await authClient.twoFactor.disable(
        {
          password: "password",
        },
        {
          onSuccess() {
            toast("2FA disabled", {
              description: "Two-factor authentication has been disabled",
            });
          },
          onError(ctx) {
            toast("Error", {
              description: ctx.error.message || "Failed to disable 2FA",
            });
          },
        }
      );
    } else {
      await authClient.twoFactor.disable(
        {
          password,
        },
        {
          onSuccess: () => {
            toast("2FA disabled", {
              description: "2FA has been disabled",
            });
          },
          onError: (ctx) => {
            toast("Error", {
              description: ctx.error.message || "Failed to disable 2FA",
            });
          },
        }
      );
    }
  };

  const handleVerifyPassword = () => {
    verifyPassword.mutate({ password });
  };

  return (
    <>
      {showPasswordInput ? (
        <div className="flex flex-col space-y-2">
          <Label htmlFor="password">Password:</Label>
          <Input
            disabled={isLoading}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          <Button disabled={isLoading} onClick={handleVerifyPassword}>
            Verify Password and Enable 2FA
          </Button>
        </div>
      ) : (
        <Switch
          aria-label="Toggle 2FA"
          checked={user.twoFactorEnabled}
          disabled={isLoading}
          onCheckedChange={handleToggle}
        />
      )}
    </>
  );
};
