"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  return (
    <Suspense
      fallback={
        <Loader2 className="mx-auto flex min-h-screen animate-spin items-center justify-center" />
      }
    >
      <ErrorBoundary fallback={<div>Failed to load user profile</div>}>
        <UserProfileSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserProfileSuspense = ({ userId }: UserProfileProps) => {
  const [user] = trpc.users.getUser.useSuspenseQuery({ id: userId });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>View your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.image || "/images/placeholder"} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm font-medium">Member since</p>
            <p className="text-sm text-muted-foreground">
              {user.createdAt.toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Two-factor authentication</p>
            <p className="text-sm text-muted-foreground">
              {user.twoFactorEnabled ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
