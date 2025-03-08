import { z } from "zod";

import * as init from "@/trpc/init";
import { stripeClient } from "@/lib/stripe";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const stripeRouter = init.createTRPCRouter({
  subscribe: init.protectedProcedure
    .input(
      z.object({
        priceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, id } = ctx.user;
      const { priceId } = input;

      const userData = await db.select().from(user).where(eq(user.id, id));
      let stripeCustomerId = userData[0].stripeCustomerId;

      if (!stripeCustomerId) {
        try {
          const customer = await stripeClient.customers.create({
            email,
            metadata: {
              userId: id,
            },
          });

          stripeCustomerId = customer.id;

          await db
            .update(user)
            .set({ stripeCustomerId })
            .where(eq(user.id, id));
        } catch (error) {
          console.error(error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      }

      const { url } = await stripeClient.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        billing_address_collection: "required",
        customer_update: {
          name: "auto",
          address: "auto",
        },
        success_url: `${process.env.NEXT_PUBLIC_URL}/payments/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/payments/cancel`,
      });

      return url;
    }),
});
