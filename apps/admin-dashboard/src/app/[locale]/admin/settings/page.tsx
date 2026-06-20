import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { SettingsForm } from '@/components/admin/SettingsForm';
import { ChevronRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: 'Settings | V8N Admin',
    description: 'Manage store configuration, payment, shipping, and notifications',
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdminSettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 hidden md:flex">
        <span>Settings</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-900">General</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
      </div>

      <div className="mt-4">
        <SettingsForm />
      </div>
    </div>
  );
}
