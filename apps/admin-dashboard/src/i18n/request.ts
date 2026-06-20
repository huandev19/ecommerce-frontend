import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as "vi" | "en" | "zh" | "ko" | "ja")) {
        locale = routing.defaultLocale;
    }

    const fullMessages = (await import(`@v8n/i18n/messages/${locale}.json`)) as typeof import("@v8n/i18n/messages/vi.json");

    return {
        locale,
        messages: {
            common: fullMessages.common,
            admin: fullMessages.admin,
        },
        timeZone: "Asia/Ho_Chi_Minh",
    };
});
