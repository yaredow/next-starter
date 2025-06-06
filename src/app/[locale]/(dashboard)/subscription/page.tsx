import { redirect } from "next/navigation";

import { SubscriptionView } from "@/modules/subscription/ui/views/subscription-view";
import { getSession } from "@/lib/session";

const SubscriptionPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <SubscriptionView />;
};

export default SubscriptionPage;
