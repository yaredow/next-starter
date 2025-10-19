import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const DEFAULT_PORT = 3000;

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${process.env.PORT || DEFAULT_PORT}`,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
