"use client";

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
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export const DangerZoneCard = () => {
  // State for password verification
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const trpc = useTRPC();
  const { mutate: verifyPassword, isPending } = useMutation(
    trpc.users.verifyUserPassword.mutationOptions(),
  );

  // Step 1: Show password dialog when delete button is clicked
  const handleDeleteButtonClick = () => {
    setShowPasswordDialog(true);
    setIsVerified(false);
  };

  // Step 2: Verify password
  const handlePasswordVerify = async () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    verifyPassword(
      { password },
      {
        onSuccess: async () => {
          setIsVerified(true);
        },
        onError: () => {
          toast.error("Incorrect password", {
            description: "Please enter your correct password to continue",
          });
        },
      },
    );
  };

  // Step 3: Delete account after password verification
  const handleDeleteAccount = async () => {
    setIsLoading(true);

    try {
      await authClient.deleteUser(
        {
          password: password,
          callbackURL: "/login",
        },
        {
          onSuccess: () => {
            toast.success("Account deleted successfully");
            // User will be redirected by auth client
          },
          onError: (ctx) => {
            toast.error("Error", {
              description: ctx.error.message || "Failed to delete account",
            });
            setIsLoading(false);
            setShowPasswordDialog(false);
          },
        },
      );
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    }
  };

  // Cancel password dialog
  const handleCancel = () => {
    setShowPasswordDialog(false);
    setPassword("");
    setIsVerified(false);
  };

  return (
    <>
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all of your data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Once you delete your account, there is no going back. This action
              permanently removes your account and all associated data.
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteButtonClick}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password verification dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              {isVerified
                ? "Your password has been verified. Click delete to permanently remove your account."
                : "Please enter your password to continue with account deletion."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-destructive h-5 w-5" />
              <p className="text-muted-foreground text-sm">
                This action is irreversible. All your data will be permanently
                deleted.
              </p>
            </div>

            {!isVerified && (
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
            )}

            {isVerified && (
              <div className="bg-destructive/10 rounded-md p-4">
                <div className="flex items-center justify-center">
                  <p className="text-destructive text-sm font-medium">
                    Are you sure you want to delete your account?
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isPending || isLoading}
            >
              Cancel
            </Button>

            {!isVerified ? (
              <Button
                variant="destructive"
                onClick={handlePasswordVerify}
                disabled={!password || isPending}
              >
                {isPending ? "Verifying..." : "Verify"}
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
