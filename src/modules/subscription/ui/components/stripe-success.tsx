"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StripeSuccessProps {
  userId: string;
}

export const StripeSuccess = ({ userId }: StripeSuccessProps) => {
  return (
    <Suspense fallback={<p>Loading subscription details...</p>}>
      <ErrorBoundary
        fallback={
          <p className="text-center text-red-500">
            Failed to load subscription details. Please try again later.
          </p>
        }
      >
        <StripeSuccessSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const StripeSuccessSuspense = ({ userId }: StripeSuccessProps) => {
  const [user] = trpc.users.getUser.useSuspenseQuery({ id: userId });

  const nextBillingDate = user?.stripeCurrentPeriodEnd
    ? new Date(user.stripeCurrentPeriodEnd).toLocaleDateString()
    : "N/A";

  const plan = user?.stripePriceId ? "Premium" : "Free";

  return (
    <div className="justify-cente flex min-h-screen items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-center text-2xl font-bold text-green-600">
            <CheckCircle className="mr-2" />
            Subscription Activated
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center text-gray-600">
            Welcome to our service! Your subscription has been successfully
            activated.
          </p>
          <div
            className="mb-4 border-l-4 border-green-500 bg-green-100 p-4 text-green-700"
            role="alert"
          >
            <p className="font-bold">Subscription Details</p>
            <p>Plan: {plan}</p>
            <p>Billing Cycle: Monthly</p>
            <p>Next billing date: {nextBillingDate}</p>
          </div>
          <p className="text-center text-gray-600">
            You now have full access to all our premium features. Let&apos;s get
            started!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild>
            <Link href="/">Go to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/getting-started">
              Quick Start Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
