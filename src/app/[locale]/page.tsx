import { Github } from "lucide-react";
import type React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4">
      <div className="container mx-auto max-w-3xl space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {t("mainHeading")}
        </h1>
        <p className="text-muted-foreground text-lg">{t("subHeading")}</p>
        <div className="flex justify-center gap-4">
          <Link href="https://next-start.yaredyilma.dev">
            <Button size="lg" className="rounded-full">
              {t("getStartedButton")}
            </Button>
          </Link>
          <Link href="https://github.com/yaredow/nextjs-starter-template">
            <Button size="lg" variant="outline" className="rounded-full">
              <Github className="mr-2 h-5 w-5" />
              {t("githubButton")}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
