import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
