'use client';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import { Product } from '@v8n/types';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductVariantSelector } from '@/components/products/ProductVariantSelector';
import { ProductTabs } from '@/components/products/ProductTabs';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@v8n/ui';
import { Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ProductCard } from '@/components/home/ProductCard';

interface ProductClientProps {
  product: Product;
  relatedProducts?: Product[];
}

export function ProductClient({ product, relatedProducts = [] }: ProductClientProps) {
  const t = useTranslations("storefront.product");
  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  // Set initial selected variant
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  const { addItem } = useCartStore();

  if (!mounted) return null;

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId);
  const price = selectedVariant?.price ?? product.price;
  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : !product.inStock;

  const handleAddToCart = () => {
    addItem(product, selectedVariantId ?? undefined, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 pb-24 pt-6 md:px-6 md:pb-12 md:pt-8">
      <nav className="mb-5 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">{t('breadcrumb_home')}</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600">{t('breadcrumb_shop')}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
        
        {/* Left Column: Gallery */}
        <div className="w-full">
          <ProductGallery images={product.images || [product.image]} />
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col gap-6 rounded-xl bg-white p-5 shadow-sm md:p-0 md:shadow-none md:bg-transparent">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-4">${price.toFixed(2)}</p>
          </div>

          <div className="prose text-gray-600 max-w-none">
            <p>{product.description}</p>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="border-y py-6 my-2">
              <ProductVariantSelector 
                variants={product.variants}
                selectedVariantId={selectedVariantId}
                onVariantChange={setSelectedVariantId}
              />
            </div>
          )}

          {/* Add to Cart Area */}
          <div className="mt-2 hidden flex-col gap-4 md:flex">
            <div className="flex gap-4">
              <div className="flex items-center border rounded-md h-12 px-2 bg-white">
                <button 
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 text-gray-500 rounded"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(q => q - 1)}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  className="p-2 hover:bg-gray-100 text-gray-500 rounded"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button 
                size="lg" 
                className="flex-1 h-12 text-base font-semibold"
                disabled={isOutOfStock || added}
                onClick={handleAddToCart}
              >
                {added ? (
                  <><Check className="w-5 h-5 mr-2" /> Added to Cart</>
                ) : isOutOfStock ? (
                  "Out of Stock"
                ) : (
                  <><ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart</>
                )}
              </Button>
            </div>
            
            {isOutOfStock ? (
              <p className="text-sm text-red-500">This variant is currently out of stock.</p>
            ) : (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> In stock and ready to ship
              </p>
            )}
          </div>

        </div>
      </div>

      <ProductTabs description={product.description} />

      {relatedProducts.length > 0 && (
        <section className="mt-10 md:mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="text-sm font-medium text-blue-600 hover:underline">
              View category
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white p-3 shadow-[0_-8px_20px_rgba(15,23,42,0.08)] md:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="flex items-center rounded-md border bg-white px-1">
            <button className="p-2 disabled:opacity-50" disabled={quantity <= 1} onClick={() => setQuantity(q => q - 1)}>
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button className="p-2" onClick={() => setQuantity(q => q + 1)}>
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button className="h-12 flex-1" disabled={isOutOfStock || added} onClick={handleAddToCart}>
            {added ? "Added" : isOutOfStock ? "Out of Stock" : `Add - $${(price * quantity).toFixed(2)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
