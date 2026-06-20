import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@v8n/ui", "@v8n/i18n"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@v8n/i18n/messages": path.resolve(__dirname, "../../packages/i18n/messages"),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
