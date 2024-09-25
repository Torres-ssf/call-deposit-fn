import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const mode = process.env.NODE_ENV || "test";

export default defineConfig({
  esbuild: { target: "es2022" },
  test: {
    coverage: {
      enabled: false
    },
    globals: true,
    env: loadEnv(mode, process.cwd(), ""),
  },
});
