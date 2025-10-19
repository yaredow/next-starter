import "server-only";

import {
	dehydrate,
	HydrationBoundary,
	type QueryFunction,
	type QueryKey,
} from "@tanstack/react-query";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { cache } from "react";
import superjson from "superjson";
import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";
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

// Server-side helpers (SSG/SSR) – typed
export const getServerSideHelpers = cache(async () =>
	createServerSideHelpers({
		router: appRouter,
		ctx: await createTRPCContext(),
		transformer: superjson,
	}),
);

// Create a server-side caller for TRPC - typed return
type TRPCCaller = ReturnType<typeof appRouter.createCaller>;
const createCaller = cache(async (): Promise<TRPCCaller> => {
	const context = await createTRPCContext();
	return appRouter.createCaller(context);
});

// Export as an async function to ensure it's called within request context
export const trpc: () => Promise<TRPCCaller> = async () => {
	return await createCaller();
};

// Prefetch function for server components
export async function prefetch<TData, TKey extends QueryKey>(
	queryKey: TKey,
	queryFn: QueryFunction<TData, TKey>,
): Promise<void> {
	const queryClient = getQueryClient();
	return queryClient.prefetchQuery({
		queryKey,
		queryFn,
	});
}
