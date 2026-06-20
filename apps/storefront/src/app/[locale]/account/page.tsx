import { setRequestLocale } from 'next-intl/server';
import AccountDashboardClient from "@/components/account/AccountDashboardClient";

export default async function AccountDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <AccountDashboardClient />;
}