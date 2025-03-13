"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/trpc/client";

import { Skeleton } from "@/components/ui/skeleton";

interface UserProfileSectionProps {
  userId: string;
}

export const UserProfileSection = ({ userId }: UserProfileSectionProps) => {
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <ErrorBoundary fallback={<div>Failed to load user information</div>}>
        <UserProfileSectionSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserProfileSectionSuspense = ({ userId }: UserProfileSectionProps) => {
  const [user] = trpc.users.getUser.useSuspenseQuery({ id: userId });

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "U";

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={user.image || "/images/placeholder"}
            alt={user.name}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-6 border-t pt-4 md:grid-cols-2">
        <div className="space-y-1">
          <p className="text-sm font-medium">Member since</p>
          <p className="text-sm text-muted-foreground">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Email verification</p>
          <div className="flex items-center">
            <div
              className={`mr-2 h-2 w-2 rounded-full ${user.emailVerified ? "bg-green-500" : "bg-amber-500"}`}
            ></div>
            <p className="text-sm text-muted-foreground">
              {user.emailVerified ? "Verified" : "Not verified"}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Two-factor authentication</p>
          <p className="text-sm text-muted-foreground">
            {user.twoFactorEnabled ? "Enabled" : "Disabled"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Last updated</p>
          <p className="text-sm text-muted-foreground">
            {new Date(user.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const UserProfileSkeleton = () => (
  <div className="space-y-8">
    <div className="flex flex-col items-center gap-6 md:flex-row">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>

    {/* User Stats Skeleton */}
    <div className="grid gap-6 border-t pt-4 md:grid-cols-2">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  </div>
);
