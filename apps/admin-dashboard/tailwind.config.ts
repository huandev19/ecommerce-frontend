import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "../../ecommerce/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3B82F6",
                success: "#10B981",
                warning: "#F59E0B",
                danger: "#EF4444",
                background: "#F9FAFB",
                surface: "#FFFFFF",
                border: "#E5E7EB",
                admin: {
                    sidebar: "#1F2937",
                    sidebarActive: "#374151",
                    sidebarHover: "#334155",
                    sidebarText: "#F9FAFB",
                    sidebarTextSecondary: "#9CA3AF",
                }
            },
        },
    },
    plugins: [],
};
export default config;
