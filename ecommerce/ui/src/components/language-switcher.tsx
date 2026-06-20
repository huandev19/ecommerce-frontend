"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

const LOCALE_LABELS: Record<string, string> = {
    vi: "Tiếng Việt",
    en: "English",
    zh: "中文",
    ko: "한국어",
    ja: "日本語",
};

const LOCALE_FLAGS: Record<string, string> = {
    vi: "🇻🇳",
    en: "🇬🇧",
    zh: "🇨🇳",
    ko: "🇰🇷",
    ja: "🇯🇵",
};

const SUPPORTED_LOCALES = ["vi", "en", "zh", "ko", "ja"];

export function LanguageSwitcher({ className }: { className?: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);

    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = SUPPORTED_LOCALES.includes(segments[0]) ? segments[0] : "vi";

    const handleSwitch = (locale: string) => {
        const newSegments = [...segments];
        if (SUPPORTED_LOCALES.includes(segments[0])) {
            newSegments[0] = locale;
        } else {
            newSegments.unshift(locale);
        }
        const newPathname = "/" + newSegments.join("/");
        router.replace(newPathname);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className || ""}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Switch language"
            >
                <Globe className="h-4 w-4" />
                <span className="hidden md:inline">{LOCALE_FLAGS[currentLocale]}</span>
                <span className="hidden md:inline text-xs">{LOCALE_LABELS[currentLocale]}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-50"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border bg-white shadow-lg">
                        <div className="py-1">
                            {Object.entries(LOCALE_LABELS).map(([locale, label]) => (
                                <button
                                    key={locale}
                                    onClick={() => handleSwitch(locale)}
                                    className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${currentLocale === locale
                                            ? "bg-blue-50 font-semibold text-blue-600"
                                            : "text-gray-700"
                                        }`}
                                >
                                    <span>{LOCALE_FLAGS[locale]}</span>
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
