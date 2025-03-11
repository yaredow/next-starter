import { HydrateClient, trpc } from "@/trpc/server";
import { UserProfileSettingsSection } from "../sections/user-profile-settings-section";

interface UserProfileSettingsViewProps {
  userId: string;
}

export const UserProfileSettingsView = ({
  userId,
}: UserProfileSettingsViewProps) => {
  void trpc.users.getUser.prefetch({ id: userId });

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Account settings</h1>
      <div className="space-y-8">
        <HydrateClient>
          <UserProfileSettingsSection userId={userId} />
        </HydrateClient>
      </div>
    </div>
  );
};
