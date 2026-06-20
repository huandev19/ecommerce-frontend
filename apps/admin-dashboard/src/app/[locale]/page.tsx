import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/routing";

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    redirect({ href: "/admin", locale });
}
