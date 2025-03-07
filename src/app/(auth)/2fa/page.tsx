import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TwoFactorForm } from "@/modules/auth/ui/components/two-factor-form";
import { getSession } from "@/lib/session";

const TwoFactorPage = async () => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6">
      <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
        <Link
          href="/"
          className="flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex w-full max-w-lg flex-col items-center justify-center">
        <div className="mb-12">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="h-8 w-auto"
          />
        </div>

        <div className="w-full">
          <TwoFactorForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <span className="mr-1">Having trouble?</span>
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
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
