"use client";

import { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ErrorBoundary } from "react-error-boundary";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { tryCatch } from "@/lib/try-catch";
import { authClient } from "@/lib/auth-client";
import { UpdatePasswordForm } from "@/modules/auth/ui/components/update-password-form";

interface UserProfileSettingsProps {
  userId: string;
}

export const UserProfileSettings = ({ userId }: UserProfileSettingsProps) => {
  return (
    <Suspense
      fallback={
        <Loader2 className="mx-auto flex min-h-screen animate-spin items-center justify-center" />
      }
    >
      <ErrorBoundary fallback={<div>Failed to load user profile settings</div>}>
        <UserProfileSettingsSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserProfileSettingsSuspense = ({ userId }: UserProfileSettingsProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [user] = trpc.users.getUser.useSuspenseQuery({ id: userId });

  // Handle profile update
  const handleUpdateProfile = async () => {
    const { error } = await tryCatch(
      authClient.updateUser({
        name,
      }),
    );

    if (error) {
      toast("Failed to update profile", {
        description: error.message,
      });
    }
  };

  // Handle password update
  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      toast("Passwords don't match", {
        description: "New password and confirmation don't match.",
      });
      return;
    }

    // In a real app, you would call an API here
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    toast("Password updated", {
      description: "Your password has been updated successfully.",
    });
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    // In a real app, you would call an API here
    toast("Account deleted", {
      description: "Your account has been permanently deleted.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpdateProfile}>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <UpdatePasswordForm />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
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
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Permanently delete your account and all of your data.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
