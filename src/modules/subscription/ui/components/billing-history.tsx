import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { billingHistory } from "../../constants";
import { Badge } from "@/components/ui/badge";

export const BillingHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>View your recent billing history.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Amount</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.amount}</td>
                    <td className="px-4 py-2">
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-700"
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
