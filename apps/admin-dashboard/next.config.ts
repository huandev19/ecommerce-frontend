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
  transpilePackages: ["@v8n/ui", "@v8n/api", "@v8n/types"],
};

export default withNextIntl(nextConfig);
