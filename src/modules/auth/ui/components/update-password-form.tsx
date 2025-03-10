"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdatePasswordInput, updatePasswordSchema } from "../../schema";

export function UpdatePasswordForm() {
  const router = useRouter();
  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Change Password",
    message:
      "Are you sure you want to change your password? You will be logged out",
    variant: "destructive",
  });

  async function onSubmit(data: UpdatePasswordInput) {
    const ok = await confirm();

    if (ok) {
      await authClient.changePassword(
        {
          ...data,
          revokeOtherSessions: true,
        },
        {
          onSuccess() {
            toast("Password updated", {
              description: "Password updated successfully",
            });
            router.push("/profile");
          },
          onError(ctx) {
            toast("Error", {
              description: ctx.error.message,
            });
          },
        },
      );
    }
  }

  return (
    <>
      <ConfirmationDialog />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Password</Button>
        </form>
      </Form>
    </>
  );
}
