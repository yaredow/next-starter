import bcrypt from "bcryptjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

export async function verifyPassword(data: {
	password: string;
	hash: string;
}): Promise<boolean> {
	const { password, hash } = data;
	return await bcrypt.compare(password, hash);
}

export function convertToSubCurrency(amount: number): number {
	return Math.round(amount * 100);
}

export function capitalizeFullName(fullName: string): string {
	return fullName
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
}
