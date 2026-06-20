import { setRequestLocale } from 'next-intl/server';
import { LoginHistoryClient } from '@/components/admin/LoginHistoryClient';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    return {
        title: 'Login History | V8N Admin',
        description: 'Track admin authentication attempts and detect suspicious activity.',
    };
}

export default function LoginHistoryPage({ params }: { params: Promise<{ locale: string }> }) {
    return <LoginHistoryClient />;
}
