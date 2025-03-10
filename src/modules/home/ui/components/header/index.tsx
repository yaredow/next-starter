import Link from "next/link";

import UserButton from "@/modules/auth/ui/components/user-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";

export const Header = async () => {
  const session = await getSession();

  return (
    <header className="border-b px-12 py-4" data-testid="side-header">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="text-xl font-semibold">
            Next-starter
          </Link>
        </div>

        <div className="flex items-center gap-x-6">
          <nav className="hidden items-center space-x-4 md:flex">
            <Link
              href="/pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
          </nav>

          {session ? (
            <UserButton user={session.user} />
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
