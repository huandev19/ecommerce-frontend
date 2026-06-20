import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import { notFound } from 'next/navigation';
import { ProductClient } from '@/components/products/ProductClient';
import { getProductBySlug, getProducts } from '@v8n/api';
import { Metadata } from 'next';

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const products = await getProducts();
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return <ProductClient product={product} relatedProducts={relatedProducts} />;
}
