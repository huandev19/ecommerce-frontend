import { setRequestLocale } from 'next-intl/server';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { ProductGridWithFilters } from '@/components/products/ProductGridWithFilters';
import { getProducts, getCategories } from '@v8n/api';

export const metadata = {
  title: 'Products | V8N Store',
  description: 'Browse our complete collection of products.',
};

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="border-b py-6 md:py-8">
        <nav className="mb-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Shop</span>
        </nav>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">All Products</h1>
            <p className="text-gray-500 mt-2">Discover premium items tailored just for you.</p>
          </div>
        </div>
      </div>
      <Suspense fallback={<div className="py-12 text-sm text-gray-500">Loading products...</div>}>
        <ProductGridWithFilters initialProducts={products} initialCategories={categories} />
      </Suspense>
    </div>
  );
}
