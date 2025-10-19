"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/client";

type UserProfileSectionProps = {
  userId: string;
};

export const UserProfileSection = ({ userId }: UserProfileSectionProps) => (
  <Suspense fallback={<UserProfileSkeleton />}>
    <ErrorBoundary fallback={<div>Failed to load user information</div>}>
      <UserProfileSectionSuspense userId={userId} />
    </ErrorBoundary>
  </Suspense>
);

const UserProfileSectionSuspense = ({ userId }: UserProfileSectionProps) => {
  const trpc = useTRPC();
  const { data: user } = useSuspenseQuery(
    trpc.users.getUser.queryOptions({ id: userId })
  );

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
            alt={user.name}
            src={user.image || "/images/placeholder"}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="font-bold text-2xl">{user.name}</h3>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-6 border-t pt-4 md:grid-cols-2">
        <div className="space-y-1">
          <p className="font-medium text-sm">Member since</p>
          <p className="text-muted-foreground text-sm">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-sm">Email verification</p>
          <div className="flex items-center">
            <div
              className={`mr-2 h-2 w-2 rounded-full ${user.emailVerified ? "bg-green-500" : "bg-amber-500"}`}
            />
            <p className="text-muted-foreground text-sm">
              {user.emailVerified ? "Verified" : "Not verified"}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-sm">Two-factor authentication</p>
          <p className="text-muted-foreground text-sm">
            {user.twoFactorEnabled ? "Enabled" : "Disabled"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-sm">Last updated</p>
          <p className="text-muted-foreground text-sm">
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
