import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { OrdersTable } from '@/components/admin/OrdersTable';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: 'Orders | Admin Dashboard',
    description: 'Manage customer orders and shipments.',
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdminOrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
        <Link href="/admin/orders" className="hover:text-[#111827]">
          Orders
        </Link>
        <span>/</span>
        <span className="text-[#111827]">All Orders</span>
      </nav>

      <OrdersTable />
    </div>
  );
}
