import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserButton from "@/modules/auth/ui/components/user-button";

export const Header = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="border-b px-12 py-4" data-testid="side-header">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Next-starter</h1>
        <div className="flex items-center gap-x-4">
          {!session && <ThemeToggle />}
          {session ? (
            <UserButton user={session.user} />
          ) : (
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
