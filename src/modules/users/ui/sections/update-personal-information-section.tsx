"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { UpdateUserInput, updateUserSchema } from "../../schemas";
import { useTRPC } from "@/trpc/client";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

interface UpdatePersonalInformationProps {
  userId: string;
}

export const UpdatePersonalInformationSection = ({
  userId,
}: UpdatePersonalInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details.</CardDescription>
      </CardHeader>
      <Suspense fallback={<UpdatePersonalInformationSkeleton />}>
        <ErrorBoundary fallback={<UpdatePersonalInformationError />}>
          <UpdatePersonalInformationSectionSuspense userId={userId} />
        </ErrorBoundary>
      </Suspense>
    </Card>
  );
};

const UpdatePersonalInformationSectionSuspense = ({
  userId,
}: {
  userId: string;
}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(
    trpc.users.getUser.queryOptions({ id: userId }),
  );
  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const { isDirty, isLoading } = form.formState;

  const onSubmit = async (values: UpdateUserInput) => {
    if (!isDirty) {
      toast("No changes", {
        description: "No changes were made to your profile",
      });
      return;
    }

    await authClient.updateUser(
      {
        ...values,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: trpc.users.getUser.queryOptions({ id: userId }).queryKey,
          });
          toast("Profile updated", {
            description: "Profile updated successfully",
          });
        },
        onError: (ctx) => {
          toast("Error", {
            description: ctx.error.message,
          });
        },
      },
    );
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !isDirty}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
};

// Skeleton loader that maintains the same structure as the actual content
const UpdatePersonalInformationSkeleton = () => {
  return (
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
};

// Error state component for better error handling
const UpdatePersonalInformationError = () => {
  return (
    <CardContent>
      <div className="bg-destructive/10 rounded-md p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <h3 className="text-destructive text-sm font-medium">
              Failed to load your information
            </h3>
            <div className="text-destructive/80 mt-2 text-sm">
              <p>Something went wrong. Please try refreshing the page.</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
};
