import { setRequestLocale } from 'next-intl/server';
import { RolesListClient } from '@/components/admin/RolesListClient';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    return {
        title: 'Roles & Permissions | V8N Admin',
        description: 'Define roles and their associated permissions.',
    };
}

export default function RolesPage() {
    return <RolesListClient />;
}
