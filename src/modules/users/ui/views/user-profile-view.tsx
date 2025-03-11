import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HydrateClient, trpc } from "@/trpc/server";
import { UserProfileSection } from "../sections/user-profile-section";

interface UserProfileViewProps {
  userId: string;
}

export const UserProfileView = ({ userId }: UserProfileViewProps) => {
  void trpc.users.getUser.prefetch({ id: userId });

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold">Your Profile</h1>
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
