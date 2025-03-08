import { XCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const StripeCancel = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-center text-2xl font-bold text-red-600">
            <XCircle className="mr-2" />
            Subscription Not Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center text-gray-600">
            Your subscription process was not completed. No charges have been
            made to your account.
          </p>
          <div
            className="mb-4 border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700"
            role="alert"
          >
            <p className="font-bold">Need Help?</p>
            <p>
              If you encountered any issues or have questions about our service,
              we&apos;re here to assist you.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex w-full justify-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/pricing">Review Plans</Link>
            </Button>
            <Button asChild>
              <Link href="/subscribe">Try Again</Link>
            </Button>
          </div>
          <Button asChild variant="link" className="text-gray-600">
            <Link href="/contact">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
