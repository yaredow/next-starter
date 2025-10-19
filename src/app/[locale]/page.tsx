import { Github } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="container mx-auto max-w-3xl space-y-8 text-center">
        <h1 className="font-bold text-4xl tracking-tight">
          {t("mainHeading")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("subHeading")}</p>
        <div className="flex justify-center gap-4">
          <Link href="https://next-start.yaredyilma.dev">
            <Button className="rounded-full" size="lg">
              {t("getStartedButton")}
            </Button>
          </Link>
          <Link href="https://github.com/yaredow/nextjs-starter-template">
            <Button className="rounded-full" size="lg" variant="outline">
              <Github className="mr-2 h-5 w-5" />
              {t("githubButton")}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
