import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { SubscriptionView } from "@/modules/subscription/ui/views/subscription-view";

const SubscriptionPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <SubscriptionView />;
};

export default SubscriptionPage;
