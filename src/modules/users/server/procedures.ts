import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { account, user } from "@/db/schema";
import { verifyPassword } from "@/lib/utils";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

export const userRouter = createTRPCRouter({
  greeting: baseProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({
      greeting: `Hello ${input.text}`,
    })),
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx }) => {
      const { userId: id } = ctx;

      if (!id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const [userData] = await db.select().from(user).where(eq(user.id, id));

      return userData;
    }),
  verifyUserPassword: protectedProcedure
    .input(
      z.object({
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { password } = input;

      if (!userId) {
        return new TRPCError({ code: "UNAUTHORIZED" });
      }

      const [userAccount] = await db
        .select()
        .from(account)
        .where(eq(account.userId, userId));

      if (!userAccount.password) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Password is not set",
        });
      }

      const isPasswordCorrect = await verifyPassword({
        password,
        hash: userAccount.password,
      });

      if (!isPasswordCorrect) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect password",
        });
      }

      return { succcess: true };
    }),
});
