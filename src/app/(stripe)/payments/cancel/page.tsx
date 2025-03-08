import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { StripeCancel } from "@/modules/subscription/ui/components/stripe-cancel";
import { auth } from "@/lib/auth";

export default async function CancelPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return <StripeCancel />;
}
