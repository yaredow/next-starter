"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UpdatePasswordForm } from "@/modules/auth/ui/components/update-password-form";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DangerZoneCard } from "../components/danger-zone-card";
import { UpdatePersonalInformationSection } from "./update-personal-information-section";

interface UserProfileSettingsSectionProps {
  userId: string;
}

// Main component that renders immediately
export const UserProfileSettingsSection = ({
  userId,
}: UserProfileSettingsSectionProps) => {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <ErrorBoundary fallback={<p>Error</p>}>
            <Suspense fallback={<PersonalInfoSkeleton />}>
              <UpdatePersonalInformationSection userId={userId} />
            </Suspense>
          </ErrorBoundary>
        </Card>

        <UpdatePasswordForm />

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

        {/* Danger Zone Card */}
        <DangerZoneCard />
      </div>
    </div>
  );
};

// Personal Information content with data dependencies

// Security content with data dependencies
const SecurityContent = ({ userId }: { userId: string }) => {
  const [user] = trpc.users.getUser.useSuspenseQuery({ id: userId });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    user?.twoFactorEnabled || false,
  );

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
          onCheckedChange={setTwoFactorEnabled}
        />
      </div>
    </CardContent>
  );
};

// Skeletons for loading states
const PersonalInfoSkeleton = () => (
  <>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Skeleton className="h-10 w-full" />
      </div>
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-28" />
    </CardFooter>
  </>
);

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
