import { setRequestLocale } from 'next-intl/server';
import { UserForm } from '@/components/admin/UserForm';
import { useAdminUser } from '@v8n/api/src/admin/queries';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    return {
        title: 'Edit Admin User | V8N Admin',
        description: 'Edit admin user details and permissions.',
    };
}

import { EditUserClient } from './EditUserClient';

export default function EditUserPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    return <EditUserClient />;
}
