import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";

export const db = drizzle(process.env.DATABASE_URL!);
