import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    locales: ["vi", "en", "zh", "ko", "ja"],
    defaultLocale: "vi",
    localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname, permanentRedirect } =
    createNavigation(routing);
