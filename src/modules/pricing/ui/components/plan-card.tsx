import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

interface PlanCardProps {
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink?: string;
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
}: PlanCardProps) {
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
        <Button
          asChild
          className={popular ? "" : "bg-muted-foreground"}
          size="lg"
        >
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
