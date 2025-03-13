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
import { SecuritySettings } from "../components/security-settings";

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
        <UpdatePersonalInformationSection userId={userId} />

        <UpdatePasswordForm />

        <SecuritySettings userId={userId} />

        <DangerZoneCard />
      </div>
    </div>
  );
};
