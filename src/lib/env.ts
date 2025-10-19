/**
 * Validates and retrieves required environment variables
 * Specific keys are allowed to be empty in non-production environments
 */
export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (
    (key === "GOOGLE_CLIENT_ID" ||
      key === "GOOGLE_CLIENT_SECRET" ||
      key === "STRIPE_WEBHOOK_SECRET" ||
      key === "NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID" ||
      key === "NEXT_PUBLIC_STRIPE_PRO_PRICE_ID" ||
      key === "NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID") &&
    process.env.NODE_ENV !== "production"
  ) {
    return value || ""; // Return empty string if not set in test or development
  }
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
