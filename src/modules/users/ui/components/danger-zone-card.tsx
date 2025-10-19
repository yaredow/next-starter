"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";
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
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/trpc/client";

export const DangerZoneCard = () => {
  // State for password verification
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { mutate: verifyPassword, isPending } =
    trpc.users.verifyUserPassword.useMutation();

  // Step 1: Show password dialog when delete button is clicked
  const handleDeleteButtonClick = () => {
    setShowPasswordDialog(true);
    setIsVerified(false);
  };

  // Step 2: Verify password
  const handlePasswordVerify = () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    verifyPassword(
      { password },
      {
        onSuccess: () => {
          setIsVerified(true);
        },
        onError: () => {
          toast.error("Incorrect password", {
            description: "Please enter your correct password to continue",
          });
        },
      }
    );
  };

  // Step 3: Delete account after password verification
  const handleDeleteAccount = async () => {
    setIsLoading(true);

    try {
      await authClient.deleteUser(
        {
          password,
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
        }
      );
    } catch (_error) {
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
              disabled={isLoading}
              onClick={handleDeleteButtonClick}
              variant="destructive"
            >
              {isLoading ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password verification dialog */}
      <Dialog onOpenChange={setShowPasswordDialog} open={showPasswordDialog}>
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
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <p className="text-muted-foreground text-sm">
                This action is irreversible. All your data will be permanently
                deleted.
              </p>
            </div>

            {!isVerified && (
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
            )}

            {isVerified && (
              <div className="rounded-md bg-destructive/10 p-4">
                <div className="flex items-center justify-center">
                  <p className="font-medium text-destructive text-sm">
                    Are you sure you want to delete your account?
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              disabled={isPending || isLoading}
              onClick={handleCancel}
              variant="outline"
            >
              Cancel
            </Button>

            {isVerified ? (
              <Button
                disabled={isLoading}
                onClick={handleDeleteAccount}
                variant="destructive"
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </Button>
            ) : (
              <Button
                disabled={!password || isPending}
                onClick={handlePasswordVerify}
                variant="destructive"
              >
                {isPending ? "Verifying..." : "Verify"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
