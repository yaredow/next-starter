import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { verifyPassword } from "@/lib/utils";
import { account, user } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
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
      }),
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

      console.log("Password from account", userAccount.password);

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
