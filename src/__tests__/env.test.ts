import { getRequiredEnv } from "../lib/env";

describe("getRequiredEnv", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment variables before each test
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment after all tests
    process.env = originalEnv;
  });

  describe("when NODE_ENV is not production", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
    });

    describe("for specific keys (GOOGLE_CLIENT_ID, etc.)", () => {
      const specificKeys = [
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "STRIPE_WEBHOOK_SECRET",
        "NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID",
        "NEXT_PUBLIC_STRIPE_PRO_PRICE_ID",
        "NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID",
      ];

      test.each(specificKeys)(
        "returns empty string when %s is undefined",
        (key) => {
          process.env[key] = undefined;
          expect(getRequiredEnv(key)).toBe("");
        }
      );

      test.each(specificKeys)("returns the value when %s is set", (key) => {
        process.env[key] = `test-${key.toLowerCase()}`;
        expect(getRequiredEnv(key)).toBe(`test-${key.toLowerCase()}`);
      });

      test.each(specificKeys)(
        "returns empty string when %s is empty string",
        (key) => {
          process.env[key] = "";
          expect(getRequiredEnv(key)).toBe("");
        }
      );
    });

    describe("for non-specific keys", () => {
      const nonSpecificKeys = [
        "DATABASE_URL",
        "NEXTAUTH_SECRET",
        "CUSTOM_API_KEY",
        "RANDOM_ENV_VAR",
      ];

      test.each(nonSpecificKeys)("throws error when %s is undefined", (key) => {
        process.env[key] = undefined;
        expect(() => getRequiredEnv(key)).toThrow(
          `Missing required environment variable: ${key}`
        );
      });

      test.each(nonSpecificKeys)(
        "throws error when %s is empty string",
        (key) => {
          process.env[key] = "";
          expect(() => getRequiredEnv(key)).toThrow(
            `Missing required environment variable: ${key}`
          );
        }
      );

      test.each(nonSpecificKeys)("returns the value when %s is set", (key) => {
        process.env[key] = `test-${key.toLowerCase()}`;
        expect(getRequiredEnv(key)).toBe(`test-${key.toLowerCase()}`);
      });
    });
  });

  describe("when NODE_ENV is production", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "production";
    });

    describe("for specific keys (GOOGLE_CLIENT_ID, etc.)", () => {
      const specificKeys = [
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "STRIPE_WEBHOOK_SECRET",
        "NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID",
        "NEXT_PUBLIC_STRIPE_PRO_PRICE_ID",
        "NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID",
      ];

      test.each(specificKeys)("throws error when %s is undefined", (key) => {
        process.env[key] = undefined;
        expect(() => getRequiredEnv(key)).toThrow(
          `Missing required environment variable: ${key}`
        );
      });

      test.each(specificKeys)("throws error when %s is empty string", (key) => {
        process.env[key] = "";
        expect(() => getRequiredEnv(key)).toThrow(
          `Missing required environment variable: ${key}`
        );
      });

      test.each(specificKeys)("returns the value when %s is set", (key) => {
        process.env[key] = `prod-${key.toLowerCase()}`;
        expect(getRequiredEnv(key)).toBe(`prod-${key.toLowerCase()}`);
      });
    });

    describe("for non-specific keys", () => {
      const nonSpecificKeys = [
        "DATABASE_URL",
        "NEXTAUTH_SECRET",
        "CUSTOM_API_KEY",
        "RANDOM_ENV_VAR",
      ];

      test.each(nonSpecificKeys)("throws error when %s is undefined", (key) => {
        process.env[key] = undefined;
        expect(() => getRequiredEnv(key)).toThrow(
          `Missing required environment variable: ${key}`
        );
      });

      test.each(nonSpecificKeys)(
        "throws error when %s is empty string",
        (key) => {
          process.env[key] = "";
          expect(() => getRequiredEnv(key)).toThrow(
            `Missing required environment variable: ${key}`
          );
        }
      );

      test.each(nonSpecificKeys)("returns the value when %s is set", (key) => {
        process.env[key] = `prod-${key.toLowerCase()}`;
        expect(getRequiredEnv(key)).toBe(`prod-${key.toLowerCase()}`);
      });
    });
  });

  describe("when NODE_ENV is test", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "test";
    });

    describe("for specific keys (GOOGLE_CLIENT_ID, etc.)", () => {
      const specificKeys = [
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "STRIPE_WEBHOOK_SECRET",
        "NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID",
        "NEXT_PUBLIC_STRIPE_PRO_PRICE_ID",
        "NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID",
      ];

      test.each(specificKeys)(
        "returns empty string when %s is undefined",
        (key) => {
          process.env[key] = undefined;
          expect(getRequiredEnv(key)).toBe("");
        }
      );

      test.each(specificKeys)("returns the value when %s is set", (key) => {
        process.env[key] = `test-${key.toLowerCase()}`;
        expect(getRequiredEnv(key)).toBe(`test-${key.toLowerCase()}`);
      });
    });
  });

  describe("edge cases", () => {
    test("handles falsy values correctly", () => {
      process.env.NODE_ENV = "development";

      // Test with false, 0, null (as strings since env vars are strings)
      process.env.GOOGLE_CLIENT_ID = "0";
      expect(getRequiredEnv("GOOGLE_CLIENT_ID")).toBe("0");

      process.env.GOOGLE_CLIENT_ID = "false";
      expect(getRequiredEnv("GOOGLE_CLIENT_ID")).toBe("false");
    });

    test("handles whitespace-only values", () => {
      process.env.NODE_ENV = "development";

      process.env.GOOGLE_CLIENT_ID = "   ";
      expect(getRequiredEnv("GOOGLE_CLIENT_ID")).toBe("   ");

      // Whitespace-only values are truthy, so they don't throw for non-specific keys
      process.env.DATABASE_URL = "   ";
      expect(getRequiredEnv("DATABASE_URL")).toBe("   ");
    });

    test("handles case sensitivity", () => {
      process.env.NODE_ENV = "development";

      // Test case sensitivity - should not match
      process.env.google_client_id = undefined;
      expect(() => getRequiredEnv("google_client_id")).toThrow(
        "Missing required environment variable: google_client_id"
      );
    });

    test("handles NODE_ENV edge cases", () => {
      // Test when NODE_ENV is undefined
      process.env.NODE_ENV = undefined;
      process.env.GOOGLE_CLIENT_ID = undefined;
      expect(getRequiredEnv("GOOGLE_CLIENT_ID")).toBe("");

      // Test when NODE_ENV is empty string
      process.env.NODE_ENV = "";
      process.env.GOOGLE_CLIENT_ID = undefined;
      expect(getRequiredEnv("GOOGLE_CLIENT_ID")).toBe("");

      // Test when NODE_ENV is some other value
      process.env.NODE_ENV = "staging";
      process.env.GOOGLE_CLIENT_ID = undefined;
      expect(getRequiredEnv("GOOGLE_CLIENT_ID")).toBe("");
    });
  });
});
