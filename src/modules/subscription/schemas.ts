import { z } from "zod";

export const subscriptionDataSchema = z.object({
  subscriptionId: z.string().nullable(),
  status: z.string().nullable(),
  priceId: z.string().nullable(),
  currentPeriodEnd: z.number().nullable(),
  currentPeriodStart: z.number().nullable(),
  cancelAtPeriodEnd: z.boolean().nullable(),
  paymentMethodBrand: z.string().nullable(),
  paymentMethodLast4: z.string().nullable(),
});
