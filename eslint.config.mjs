import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "__tests__/**",
  ]),

  {
    files: [
      "next.config.js",
      "tailwind.config.js",
      "postcss.config.js",
      "*.config.js",
      "*.config.cjs",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "import/no-commonjs": "off",
    },
  },
]);

export default eslintConfig;
