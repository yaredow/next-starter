import { HydrateClient } from "@/trpc/server";
import { UserProfileSettingsSection } from "../sections/user-profile-settings-section";

type UserProfileSettingsViewProps = {
  userId: string;
};

export const UserProfileSettingsView = ({
  userId,
}: UserProfileSettingsViewProps) => {
  // Client component handles its own data fetching with useSuspenseQuery

  return (
    <div className="container py-10">
      <h1 className="mb-3 font-bold text-3xl">Account settings</h1>
      <div className="space-y-8">
        <HydrateClient>
          <UserProfileSettingsSection userId={userId} />
        </HydrateClient>
      </div>
    </div>
  );
};
