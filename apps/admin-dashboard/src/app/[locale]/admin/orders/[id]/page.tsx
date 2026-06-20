import { setRequestLocale } from 'next-intl/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminOrderDetail } from '@/components/admin/AdminOrderDetail';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: 'Order Detail | Admin Panel',
    description: 'View and manage order details',
  };
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          <AdminOrderDetail orderId={resolvedParams.id} />
        </div>
      </main>
    </div>
  );
}
