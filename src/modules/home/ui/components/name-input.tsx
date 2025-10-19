"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NameInput = () => {
	const [name, setName] = useState("");

	return (
		<div className="mx-auto flex max-w-xl gap-4">
			<Input
				type="text"
				placeholder="Type your name ..."
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="h-12 border-gray-800 placeholder:text-gray-500 focus:ring-gray-700"
			/>
			<Button className="h-12 px-8 hover:bg-gray-700">Submit</Button>
		</div>
	);
};
