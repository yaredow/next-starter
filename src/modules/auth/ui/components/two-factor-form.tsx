"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Icons } from "@/components/shared/icons";
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
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { tryCatch } from "@/lib/try-catch";
import { TwoFactorFormSchema, type TwoFactorFormValues } from "../../schema";

type TwoFactorFormProps = {
  userId: string | undefined;
};

export function TwoFactorForm({ userId: _userId }: TwoFactorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(TwoFactorFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: TwoFactorFormValues) => {
    setIsLoading(true);

    const { data, error } = await authClient.twoFactor.verifyOtp({
      code: values.code,
      trustDevice: true,
    });

    if (data) {
      router.push("/");
    }

    if (error) {
      toast("Verification failed", {
        description: "Please check your code and try again.",
      });
      setIsLoading(false);
      return;
    }
  };

  const handleResendCode = async () => {
    const { data, error } = await tryCatch(authClient.twoFactor.sendOtp());

    if (error) {
      toast("Failed to resend code", {
        description: "Please try again later.",
      });
    }

    if (data) {
      toast("Code sent", {
        description: "A new verification code has been sent to your email.",
      });
    }
  };

  return (
    <Card className="w-full max-w-lg p-0 shadow-none">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-xl">Verification Required</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP
                        className="gap-2"
                        disabled={isLoading}
                        maxLength={6}
                        onChange={field.onChange}
                        value={field.value}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center text-sm">
              <Button
                className="h-auto p-0 text-muted-foreground hover:text-primary"
                disabled={isLoading}
                onClick={handleResendCode}
                size="sm"
                type="button"
                variant="link"
              >
                Didn&apos;t receive a code?
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 border-t bg-muted/50 p-4">
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={() => router.push("/login")}
          type="button"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          className="w-full"
          disabled={isLoading || !form.formState.isValid}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
