import { redirect } from "next/navigation";
import Link from "next/link";

import UserButton from "@/modules/auth/ui/components/user-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";

export const Header = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

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
