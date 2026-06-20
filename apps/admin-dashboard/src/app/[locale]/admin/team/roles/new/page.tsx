import { setRequestLocale } from 'next-intl/server';
import { RoleForm } from '@/components/admin/RoleForm';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    return {
        title: 'Add Role | V8N Admin',
        description: 'Create a new admin role with custom permissions.',
    };
}

export default function NewRolePage() {
    return <RoleForm />;
}
