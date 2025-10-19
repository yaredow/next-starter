import Link from "next/link";
import { LangSwitcher } from "@/components/lang-switcher";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getSession } from "@/lib/session";
import UserButton from "@/modules/auth/ui/components/user-button";

export const Header = async () => {
  const session = await getSession();

  return (
    <header className="border-b px-12 py-4" data-testid="side-header">
      <div className="flex items-center justify-between">
        <div>
          <Link className="font-semibold text-xl" href="/">
            Next-starter
          </Link>
        </div>

        <div className="flex items-center gap-x-6">
          <LangSwitcher />
          <nav className="hidden items-center space-x-4 md:flex">
            <Link
              className="font-medium text-sm transition-colors hover:text-primary"
              href="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="font-medium text-sm transition-colors hover:text-primary"
              href="/about"
            >
              About
            </Link>
          </nav>

          {session ? (
            <UserButton user={session.user} />
          ) : (
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
