import { setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { WorkflowsList } from '@/components/admin/WorkflowsList';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: "Workflows | Admin Panel",
    description: "Manage automated workflows for your store.",
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function WorkflowsPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <WorkflowsList />
    </div>
  );
}
