"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import { tryCatch } from "@/lib/try-catch";
import { trpc } from "@/trpc/client";

type SecuritySettingsProps = {
  userId: string;
};

export const SecuritySettings = ({ userId }: SecuritySettingsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Security</CardTitle>
      <CardDescription>Manage your account security settings.</CardDescription>
    </CardHeader>
    <ErrorBoundary fallback={<p>Error</p>}>
      <Suspense fallback={<SecuritySkeleton />}>
        <SecurityContent userId={userId} />
      </Suspense>
    </ErrorBoundary>
  </Card>
);

const SecurityContent = ({ userId }: SecuritySettingsProps) => {
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [targetState, setTargetState] = useState(false);

  const utils = trpc.useUtils();
  const verifyPasswordMutation = trpc.users.verifyUserPassword.useMutation();

  const { data: user } = trpc.users.getUser.useSuspenseQuery({ id: userId });

  // invalidate the user query when the password is verified
  const invalidateUser = async () => {
    await utils.users.getUser.invalidate({ id: userId });
  };

  // Handle when user clicks the toggle
  const handleToggleClick = (enabled: boolean) => {
    setTargetState(enabled);
    setShowPasswordField(true);
  };

  // Handle verify password and 2FA action
  const handleVerifyAndApply = async () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    const { error } = await tryCatch(
      verifyPasswordMutation.mutateAsync(
        { password },
        {
          onSuccess: () => {
            applyTwoFactorChange();
          },
          onError: (_error) => {
            toast.error("Incorrect password", {
              description: "Please enter your correct password to continue",
            });
          },
        }
      )
    );

    if (error) {
      toast("Error", {
        description: "An error occurred while verifying your password",
      });
    }
  };

  // Apply the 2FA change after password verification
  const applyTwoFactorChange = async () => {
    if (targetState) {
      // Enable 2FA
      await authClient.twoFactor.enable(
        { password },
        {
          onSuccess: () => {
            toast.success("2FA Enabled", {
              description:
                "Two-factor authentication has been enabled on your account",
            });
            invalidateUser();
            resetState();
          },
          onError: (ctx) => {
            toast.error("Failed to enable 2FA", {
              description: ctx.error.message,
            });
          },
        }
      );
    } else {
      // Disable 2FA
      await authClient.twoFactor.disable(
        { password },
        {
          onSuccess: () => {
            toast.success("2FA Disabled", {
              description:
                "Two-factor authentication has been disabled on your account",
            });
            invalidateUser();
            resetState();
          },
          onError: (ctx) => {
            toast.error("Failed to disable 2FA", {
              description: ctx.error.message,
            });
          },
        }
      );
    }
  };

  // Reset the state after operation completes
  const resetState = () => {
    setPassword("");
    setShowPasswordField(false);
  };

  // Cancel the operation
  const handleCancel = () => {
    resetState();
  };

  return (
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="two-factor">Two-factor authentication</Label>
          <p className="text-muted-foreground text-sm">
            Add an extra layer of security to your account
          </p>
        </div>
        <Switch
          checked={user.twoFactorEnabled}
          disabled={showPasswordField || verifyPasswordMutation.isPending}
          id="two-factor"
          onCheckedChange={handleToggleClick}
        />
      </div>

      <Dialog onOpenChange={setShowPasswordField} open={showPasswordField}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm with your password</DialogTitle>
            <DialogDescription>
              Please enter your current password to{" "}
              {targetState ? "enable" : "disable"} two-factor authentication
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Password</Label>
              <Input
                autoComplete="current-password"
                id="confirm-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                value={password}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={verifyPasswordMutation.isPending}
              onClick={handleCancel}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={!password || verifyPasswordMutation.isPending}
              onClick={handleVerifyAndApply}
            >
              {(() => {
                if (verifyPasswordMutation.isPending) {
                  return "Verifying...";
                }
                if (targetState) {
                  return "Enable 2FA";
                }
                return "Disable 2FA";
              })()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardContent>
  );
};

const SecuritySkeleton = () => (
  <CardContent className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="two-factor">Two-factor authentication</Label>
        <p className="text-muted-foreground text-sm">
          Add an extra layer of security to your account
        </p>
      </div>
      <Skeleton className="h-6 w-12 rounded-full" />
    </div>
  </CardContent>
);
