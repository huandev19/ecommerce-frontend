import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import Link from 'next/link';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export const metadata = {
  title: 'Checkout | V8N Store',
};

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto min-h-screen px-4 py-6 md:px-6 md:py-10">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-blue-600">Cart</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Checkout</span>
        </nav>
        <h1 className="mb-6 text-3xl font-bold md:mb-8 md:text-4xl">Secure Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
