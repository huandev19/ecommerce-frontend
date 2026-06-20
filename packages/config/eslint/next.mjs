import path from "node:path";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";

export const createNextEslintConfig = (projectDir) => {
  const compat = new FlatCompat({
    baseDirectory: projectDir,
    recommendedConfig: js.configs.recommended,
  });

  return defineConfig([
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    globalIgnores([
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ]),
  ]);
};
