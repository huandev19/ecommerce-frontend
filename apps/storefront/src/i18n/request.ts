import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Static import để webpack bundle được messages (tránh lỗi "not exported from package")
import enMessages from "@v8n/i18n/messages/en.json";
import viMessages from "@v8n/i18n/messages/vi.json";

const messageMap = {
    en: enMessages,
    vi: viMessages,
} as const;

type MessageMap = typeof messageMap;

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as "vi" | "en" | "zh" | "ko" | "ja")) {
        locale = routing.defaultLocale;
    }

    const rawMessages = messageMap[locale as keyof MessageMap] ?? messageMap.en;

    const messages = {
        common: rawMessages.common,
        admin: rawMessages.admin,
        storefront: rawMessages.storefront,
    };

    return {
        locale,
        messages,
        timeZone: "Asia/Ho_Chi_Minh",
    };
});