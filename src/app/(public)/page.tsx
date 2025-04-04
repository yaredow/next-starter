import { Github } from "lucide-react";
import type React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4">
      <div className="container mx-auto max-w-3xl space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Next.js Starter Template
        </h1>
        <p className="text-muted-foreground text-lg">
          A minimal template to kickstart your Next.js projects.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="https://next-start.yaredyilma.dev">
            <Button size="lg" className="rounded-full">
              Get Started
            </Button>
          </Link>
          <Link href="https://github.com/yaredow/nextjs-starter-template">
            <Button size="lg" variant="outline" className="rounded-full">
              <Github className="mr-2 h-5 w-5" />
              Github
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
