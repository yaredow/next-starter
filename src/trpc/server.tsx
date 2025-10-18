import "server-only";

import { cache } from "react";
import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createServerSideHelpers } from "@trpc/react-query/server";
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export const getQueryClient = cache(makeQueryClient);

// Create a server-side caller for TRPC
const createCaller = cache(() => {
  return appRouter.createCaller(createTRPCContext());
});

export const trpc = createCaller();

// Prefetch function for server components
export async function prefetch(queryKey: any, queryFn: () => Promise<any>) {
  const queryClient = getQueryClient();
  return queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });
}
