import { setRequestLocale } from 'next-intl/server';
import React from "react";
import Link from "next/link";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata = {
  title: "Cart | V8N Store",
  description: "Review your shopping cart before checkout.",
};

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 pb-24 pt-6 md:px-6 md:pb-12 md:pt-8">
      <nav className="mb-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Cart</span>
      </nav>
      <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Shopping Cart</h1>
          <p className="mt-2 text-gray-500">Review products, adjust quantities, and continue to secure checkout.</p>
        </div>
        <Link href="/products" className="text-sm font-medium text-blue-600 hover:underline">Continue Shopping</Link>
      </div>
      <CartPageContent />
    </div>
  );
}
