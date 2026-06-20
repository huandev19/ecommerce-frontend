import { setRequestLocale } from 'next-intl/server';
import { ProductsTable } from '@/components/admin/ProductsTable';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: 'Products | V8N Admin',
    description: 'Manage V8N store products from the admin dashboard.',
  };
}

export default function AdminProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="space-y-6">
      <div className="hidden text-sm text-[#6B7280] md:block">
        <span>Products</span>
        <span className="mx-2">/</span>
        <span className="font-medium text-[#111827]">All Products</span>
      </div>
      <ProductsTable />
    </div>
  );
}
