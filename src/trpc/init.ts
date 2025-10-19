import { initTRPC, TRPCError } from "@trpc/server";
import { eq, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";
import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { ratelimit } from "@/lib/ratelimit";

export const createTRPCContext = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	const user = session?.user;

	return { userId: user?.id };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
	/**
	 * @see https://trpc.io/docs/server/data-transformers
	 */
	transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(
	async function isAuthed(opts) {
		const { ctx } = opts;

		if (!ctx.userId) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		const [loggedInUser] = await db
			.select()
			.from(user)
			.where(eq(user.id, ctx.userId))
			.limit(1);

		if (!loggedInUser) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		const { success } = await ratelimit.limit(loggedInUser.id);

		if (!success) {
			throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
		}

		return opts.next({
			ctx: {
				...ctx,
				user: loggedInUser,
			},
		});
	},
);
