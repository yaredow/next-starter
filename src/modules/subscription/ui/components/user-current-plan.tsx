"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { plans } from "../../constants";

export const UserCurrentPlan = () => {
	const [currentPlan, setCurrentPlan] = useState("pro");

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Subscription</CardTitle>
				<CardDescription>Manage your subscription plan.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<div>
							<p className="font-medium">Current Plan</p>
							<p className="text-sm text-muted-foreground">
								{plans.find((p) => p.id === currentPlan)?.description}
							</p>
						</div>
						<Badge variant="outline" className="text-primary">
							{plans.find((p) => p.id === currentPlan)?.name}
						</Badge>
					</div>
					<div className="flex items-center justify-between">
						<p className="text-sm">Billing Cycle</p>
						<p className="text-sm font-medium">Monthly</p>
					</div>
					<div className="flex items-center justify-between">
						<p className="text-sm">Next Billing Date</p>
						<p className="text-sm font-medium">April 1, 2023</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
