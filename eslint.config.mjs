import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react/jsx-no-leaked-render": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "node_modules/**"]),
]);

export default config;