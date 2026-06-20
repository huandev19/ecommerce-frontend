import { setRequestLocale } from 'next-intl/server';

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

export default function EditUserPage() {
    return <EditUserClient />;
}
