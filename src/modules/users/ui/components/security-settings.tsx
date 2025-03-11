"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/trpc/client";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SecuritySettingsProps {
  userId: string;
}

export const SecuritySettings = ({ userId }: SecuritySettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Manage your account security settings.
        </CardDescription>
      </CardHeader>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<SecuritySkeleton />}>
          <SecurityContent userId={userId} />
        </Suspense>
      </ErrorBoundary>
    </Card>
  );
};

const SecurityContent = ({ userId }: SecuritySettingsProps) => {
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [targetState, setTargetState] = useState(false);

  const utils = trpc.useUtils();
  const verifyPassword = trpc.users.verifyUserPassword.useMutation();
  const [user] = trpc.users.getUser.useSuspenseQuery({ id: userId });

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

    try {
      // First verify the password
      await verifyPassword.mutateAsync(
        { password },
        {
          onSuccess: () => {
            // Password verified, now enable/disable 2FA
            applyTwoFactorChange();
          },
          onError: (error) => {
            toast.error("Incorrect password", {
              description: "Please enter your correct password to continue",
            });
          },
        },
      );
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    }
  };

  // Apply the 2FA change after password verification
  const applyTwoFactorChange = async () => {
    try {
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
              utils.users.getUser.invalidate({ id: userId });
              resetState();
            },
            onError: (ctx) => {
              toast.error("Failed to enable 2FA", {
                description: ctx.error.message,
              });
            },
          },
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
              utils.users.getUser.invalidate({ id: userId });
              resetState();
            },
            onError: (ctx) => {
              toast.error("Failed to disable 2FA", {
                description: ctx.error.message,
              });
            },
          },
        );
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
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
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account
          </p>
        </div>
        <Switch
          id="two-factor"
          checked={user.twoFactorEnabled || false}
          onCheckedChange={handleToggleClick}
          disabled={showPasswordField || verifyPassword.isPending}
        />
      </div>

      <Dialog open={showPasswordField} onOpenChange={setShowPasswordField}>
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
                id="confirm-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={verifyPassword.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerifyAndApply}
              disabled={!password || verifyPassword.isPending}
            >
              {verifyPassword.isPending
                ? "Verifying..."
                : targetState
                  ? "Enable 2FA"
                  : "Disable 2FA"}
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
        <p className="text-sm text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>
      <Skeleton className="h-6 w-12 rounded-full" />
    </div>
  </CardContent>
);
