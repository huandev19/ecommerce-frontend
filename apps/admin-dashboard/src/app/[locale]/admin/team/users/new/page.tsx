import { setRequestLocale } from 'next-intl/server';
import { UserForm } from '@/components/admin/UserForm';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    return {
        title: 'Add Admin User | V8N Admin',
        description: 'Create a new admin user account.',
    };
}

export default function NewUserPage({ params }: { params: Promise<{ locale: string }> }) {
    return <UserForm />;
}
