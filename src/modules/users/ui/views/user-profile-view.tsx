import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HydrateClient } from "@/trpc/server";
import { UserProfileSection } from "../sections/user-profile-section";

type UserProfileViewProps = {
  userId: string;
};

export const UserProfileView = ({ userId }: UserProfileViewProps) => {
  // Client component handles its own data fetching with useSuspenseQuery

  return (
    <div className="container py-10">
      <h1 className="mb-6 font-bold text-3xl">Your Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>View your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <HydrateClient>
            <UserProfileSection userId={userId} />
          </HydrateClient>
        </CardContent>
      </Card>
    </div>
  );
};
