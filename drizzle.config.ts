import { defineConfig } from "drizzle-kit";
import "./envConfig.ts";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  tablesFilter: ["next_todos_*"],
});
