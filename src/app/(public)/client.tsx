"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const Client = () => {
  const trpc = useTRPC();
  const gretting = useSuspenseQuery(
    trpc.users.greeting.queryOptions({ text: "World" }),
  );

  if (!gretting.data) return <div>Loading...</div>;

  return <div>{gretting.data.greeting}</div>;
};
