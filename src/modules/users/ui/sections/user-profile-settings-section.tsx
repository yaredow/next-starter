"use client";

import { UpdatePasswordForm } from "@/modules/auth/ui/components/update-password-form";

import { UpdatePersonalInformationSection } from "./update-personal-information-section";
import { SecuritySettings } from "../components/security-settings";
import { DangerZoneCard } from "../components/danger-zone-card";

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
