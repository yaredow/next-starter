"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/trpc/client";
import { type UpdateUserInput, updateUserSchema } from "../../schemas";

type UpdatePersonalInformationProps = {
  userId: string;
};

export const UpdatePersonalInformationSection = ({
  userId,
}: UpdatePersonalInformationProps) => (
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

const UpdatePersonalInformationSectionSuspense = ({
  userId,
}: {
  userId: string;
}) => {
  const utils = trpc.useUtils();
  const { data: user } = trpc.users.getUser.useSuspenseQuery({ id: userId });
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
          utils.users.getUser.invalidate({ id: userId });
          toast("Profile updated", {
            description: "Profile updated successfully",
          });
        },
        onError: (ctx) => {
          toast("Error", {
            description: ctx.error.message,
          });
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button disabled={isLoading || !isDirty} type="submit">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

// Skeleton loader that maintains the same structure as the actual content
const UpdatePersonalInformationSkeleton = () => (
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

// Error state component for better error handling
const UpdatePersonalInformationError = () => (
  <CardContent>
    <div className="rounded-md bg-destructive/10 p-4">
      <div className="flex items-center">
        <div className="ml-3">
          <h3 className="font-medium text-destructive text-sm">
            Failed to load your information
          </h3>
          <div className="mt-2 text-destructive/80 text-sm">
            <p>Something went wrong. Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    </div>
  </CardContent>
);
