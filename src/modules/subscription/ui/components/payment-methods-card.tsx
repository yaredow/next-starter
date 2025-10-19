"use client";

import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const PaymentMethodsCard = () => {
	const handleUpdatePaymentMethod = () => {
		// In a real app, you would open a payment modal or redirect to a payment page
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Payment Method</CardTitle>
				<CardDescription>Manage your payment method.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center space-x-4">
					<div className="rounded-md border p-2">
						<CreditCard className="h-6 w-6" />
					</div>
					<div>
						<p className="font-medium">•••• •••• •••• 4242</p>
						<p className="text-sm text-muted-foreground">Expires 12/2024</p>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button variant="outline" onClick={handleUpdatePaymentMethod}>
					Update Payment Method
				</Button>
			</CardFooter>
		</Card>
	);
};
