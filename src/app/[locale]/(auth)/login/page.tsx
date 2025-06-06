import { redirect } from "next/navigation";
import Link from "next/link";

import { UserAuthForm } from "@/modules/auth/ui/components/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { getSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Login",
};

export default async function loginpage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
