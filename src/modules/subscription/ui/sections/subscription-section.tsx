import { BillingHistory } from "../components/billing-history";
import { ChangePlan } from "../components/change-plan";
import { PaymentMethodsCard } from "../components/payment-methods-card";
import { UserCurrentPlan } from "../components/user-current-plan";

export const SubscriptionSection = () => {
  return (
    <div className="space-y-6">
      <UserCurrentPlan />
      <ChangePlan />
      <PaymentMethodsCard />
      <BillingHistory />
    </div>
  );
};
