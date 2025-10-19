import { eq } from "drizzle-orm";
import { db } from "@/db";
import { user as userSchema } from "@/db/schema";

export const getUser = async (userId: string) => {
	const [user] = await db
		.select()
		.from(userSchema)
		.where(eq(userSchema.id, userId));

	if (!user) {
		return null;
	}

	return user;
};
