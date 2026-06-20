import { setRequestLocale } from 'next-intl/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { QueryProvider } from '@/providers/QueryProvider';
import { Search } from 'lucide-react';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <QueryProvider>
      <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
        <AdminSidebar />
        <div className="md:pl-[280px]">
          <header className="hidden h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-8 md:flex">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="search"
                placeholder="Search admin..."
                className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] pl-10 pr-4 text-sm outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
            <div className="rounded-full bg-[#EEF2FF] px-4 py-2 text-sm font-semibold text-[#1E40AF]">Admin</div>
          </header>
          <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </QueryProvider>
  );
}
