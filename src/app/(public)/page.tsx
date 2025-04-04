import { Github } from "lucide-react";
import type React from "react";
import Link from "next/link";

import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Client } from "./client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export default function Home() {
  prefetch(trpc.users.greeting.queryOptions({ text: "World" }));

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Sorry something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
