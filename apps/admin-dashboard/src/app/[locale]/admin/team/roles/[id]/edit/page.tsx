import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { EditRoleClient } from './EditRoleClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    return {
        title: 'Edit Role | V8N Admin',
        description: 'Edit admin role details and permissions.',
    };
}

export default function EditRolePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    return <EditRoleClient />;
}
