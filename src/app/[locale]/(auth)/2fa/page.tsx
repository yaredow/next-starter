import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { TwoFactorToggle } from "@/modules/auth/ui/components/two-factor-toggle";
import { HydrateClient } from "@/trpc/server";

const TwoFactorPage = async () => {
  const sessionData = await getSession();

  if (!sessionData) {
    redirect("/");
  }

  if (sessionData.user.twoFactorEnabled) {
    redirect("/");
  }

  // Prefetching is handled in the child component, no need to prefetch here

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Link
          className="flex items-center text-muted-foreground text-sm transition-colors hover:text-primary"
          href="/"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex w-full max-w-lg flex-col items-center justify-center">
        <div className="mb-12">
          <Image
            alt="Logo"
            className="h-8 w-auto"
            height={40}
            src="/images/logo.svg"
            width={40}
          />
        </div>

        <div className="w-full">
          <HydrateClient>
            <TwoFactorToggle userId={sessionData.user.id} />
          </HydrateClient>
          <p className="mt-6 text-center text-muted-foreground text-sm">
            <span className="mr-1">Having trouble?</span>
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="#"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorPage;
