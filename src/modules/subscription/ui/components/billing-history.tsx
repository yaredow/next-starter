import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { billingHistory } from "../../constants";

export const BillingHistory = () => (
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
                <tr className="border-b last:border-0" key={item.id}>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2">
                    <Badge
                      className="border-green-200 bg-green-50 text-green-700"
                      variant="outline"
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
