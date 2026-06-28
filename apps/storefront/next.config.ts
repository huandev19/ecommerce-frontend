import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(path.join(projectDir, "../../"));

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  output: "standalone",
  transpilePackages: ["@v8n/ui", "@v8n/i18n", "@v8n/api", "@v8n/types"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@v8n/i18n/messages": path.resolve(__dirname, "../../packages/i18n/messages"),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
