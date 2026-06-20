import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import ProductForm from '@/components/admin/ProductForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: 'New Product | V8N Admin',
    description: 'Create a new product',
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NewProductPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <ProductForm isEditMode={false} />
    </div>
  );
}
