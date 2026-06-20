import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import EditProductClient from './EditProductClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: 'Edit Product | V8N Admin',
    description: 'Edit existing product',
  };
}

export default async function EditProductPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const resolvedParams = await params;

  return <EditProductClient id={resolvedParams.id} />;
}
