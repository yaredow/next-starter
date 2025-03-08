import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { StripeSuccess } from "@/modules/subscription/ui/components/stripe-success";
import { trpc } from "@/trpc/server";
import { auth } from "@/lib/auth";

export default async function SuccessPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  void trpc.users.getUser.prefetch({ id: session.user.id });

  return <StripeSuccess userId={session.user.id} />;
}
