import { userRouter } from "@/modules/users/server/procedures";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  users: userRouter,
});

export type AppRouter = typeof appRouter;
