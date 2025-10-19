import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

let db: NodePgDatabase;

if (databaseUrl) {
  db = drizzle(databaseUrl);
} else {
  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  // In non-production environments, provide a stub that throws on first use.
  // This allows the app to boot for mocked/dev tests without a live DB.
  db = new Proxy(
    {},
    {
      get() {
        throw new Error(
          "DATABASE_URL is not set. DB operations are disabled in development/test."
        );
      },
    }
  ) as unknown as NodePgDatabase;
}

export { db };
