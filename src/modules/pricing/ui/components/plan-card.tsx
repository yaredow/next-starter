"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { tryCatch } from "@/lib/try-catch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PlanCardProps {
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink?: string;
  planId: string;
}

export function PlanCard({
  name,
  description,
  price,
  interval,
  features,
  popular = false,
  ctaText,
  ctaLink = "/register",
  planId,
}: PlanCardProps) {
  const router = useRouter();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  const handleSubscribe = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (!session) {
      router.push("/login");
      return;
    }

    const { error } = await tryCatch(
      authClient.subscription.upgrade({
        plan: planId,
        successUrl: "/dashboard",
        cancelUrl: "/pricing",
      }),
    );

    if (error) {
      console.error(error);
      setIsloading(false);
    }
  };

  return (
    <Card className={popular ? "relative border-primary shadow-md" : ""}>
      {popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardHeader className={popular ? "pt-6" : ""}>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{interval}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {session ? (
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className={popular ? "" : "bg-muted-foreground"}
            size="lg"
          >
            {isLoading ? "Processing..." : ctaText}
          </Button>
        ) : (
          <Button asChild className={popular ? "" : "bg-muted-foreground"}>
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
