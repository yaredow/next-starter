"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
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
import { tryCatch } from "@/lib/try-catch";
import { cn } from "@/lib/utils";
import {
  type SignInData,
  type SignUpData,
  signInSchema,
  signUpSchema,
  type userAuthData,
} from "../../schema";
import { PasswordInput } from "./password-input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string;
}

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isSignup, _setIsSignup] = useState<boolean>(type === "register");
  const router = useRouter();

  const form = useForm<userAuthData>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    resolver: zodResolver(isSignup ? signUpSchema : signInSchema),
  });

  const onSubmit = async (values: userAuthData) => {
    if (isSignup) {
      await authClient.signUp.email(values as SignUpData, {
        onRequest: () => setIsLoading(true),
        onResponse: () => setIsLoading(false),
        onError: (ctx) => {
          toast("Sign up failed", {
            description: ctx.error.message,
          });
        },
        onSuccess: () => {
          toast("Account created", {
            description: "Account created successfully",
          });
          router.push("/");
        },
      });
    } else {
      await authClient.signIn.email(values as SignInData, {
        onRequest: () => setIsLoading(true),
        onResponse: () => setIsLoading(false),
        onError: (ctx) => {
          toast("Authentication failed", {
            description: ctx.error.message,
          });
        },
        onSuccess: async (ctx) => {
          if (ctx.data.twoFactorRedirect) {
            await handleSendOTP();
          } else {
            router.push("/");
          }
        },
      });
    }
  };

  const handleSendOTP = async () => {
    const { data, error } = await tryCatch(authClient.twoFactor.sendOtp());

    if (error) {
      throw new Error(error.message);
    }

    if (data) {
      router.push("/2fa");
    }
  };

  const handleSocialLogin = async () => {
    setIsGoogleLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      fetchOptions: {
        onSuccess: () => {
          setIsGoogleLoading(false);
        },
        onError: (_error) => {
          setIsGoogleLoading(false);
        },
      },
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {isSignup && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoCapitalize="none"
                      autoComplete="name"
                      autoCorrect="off"
                      className={cn(isLoading && "opacity-50")}
                      disabled={isLoading || isGoogleLoading}
                      placeholder="Your Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className={cn(isLoading && "opacity-50")}
                      disabled={isLoading || isGoogleLoading}
                      placeholder="name@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              className={cn(buttonVariants())}
              disabled={isLoading}
              type="submit"
            >
              {isLoading && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              {type === "register"
                ? "Sign Up with Email"
                : "Sign In with Email"}
            </button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        className={cn(buttonVariants({ variant: "outline" }))}
        disabled={isGoogleLoading || isLoading}
        onClick={() => {
          handleSocialLogin();
        }}
        type="button"
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 size-4" />
        )}
        Google
      </button>
    </div>
  );
}
