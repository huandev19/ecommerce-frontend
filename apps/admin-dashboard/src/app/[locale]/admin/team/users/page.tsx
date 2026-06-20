import { setRequestLocale } from 'next-intl/server';
import { UsersListClient } from '@/components/admin/UsersListClient';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    return {
        title: 'Admin Users | V8N Admin',
        description: 'Manage admin accounts, assign roles, and monitor access.',
    };
}

export default function AdminUsersPage({ params }: { params: Promise<{ locale: string }> }) {
    return <UsersListClient />;
}
