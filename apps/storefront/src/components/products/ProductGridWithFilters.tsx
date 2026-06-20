'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { ProductCard } from '../home/ProductCard';
import { ProductSidebar } from './ProductSidebar';
import { Product } from '@v8n/types';
import { SlidersHorizontal, X } from 'lucide-react';

interface Props {
  initialProducts: Product[];
  initialCategories: { name: string }[];
}

export function ProductGridWithFilters({ initialProducts, initialCategories }: Props) {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  // States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setMounted(true);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  // Derived state (Filtering & Sorting)
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by Category
    if (selectedCategories.length > 0) {
      const lower = selectedCategories.map(c => c.toLowerCase());
      result = result.filter(p => lower.includes(p.category.toLowerCase()));
    }

    // Filter by Price
    result = result.filter(p => p.price <= priceRange[1]);

    // Filter by Rating
    if (minRating > 0) {
      result = result.filter(p => (p.rating ?? 0) >= minRating);
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } // newest could just be default order for mock data

    return result;
  }, [selectedCategories, priceRange, minRating, sortBy, initialProducts]);

  const categories = initialCategories.map(c => c.name);

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 300]);
    setMinRating(0);
    router.push('/products');
  };

  const handleCategorySelect = (cats: string[]) => {
    setSelectedCategories(cats);
    if (cats.length > 0) {
      router.push(`/products?category=${encodeURIComponent(cats[0])}`);
    } else {
      router.push('/products');
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6 py-6 md:flex-row md:gap-8 md:py-8">
      <div className="hidden md:block">
        <ProductSidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          minRating={minRating}
          onMinRatingChange={setMinRating}
          onClearFilters={handleClearFilters}
        />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3 rounded-xl border bg-white p-3 shadow-sm">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
          <p className="text-sm text-gray-500">
            Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} products
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-gray-300 rounded-md text-sm py-2 pl-3 pr-8 bg-white border outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p>No products found matching your criteria.</p>
            <button onClick={handleClearFilters} className="mt-4 text-primary hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="px-6 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button aria-label="Close filters" className="absolute inset-0 bg-black/40" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filter & Sort</h2>
              <button onClick={() => setIsFilterOpen(false)} className="rounded-full p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProductSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onSelectCategory={(cats) => { handleCategorySelect(cats); setIsFilterOpen(false); }}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              minRating={minRating}
              onMinRatingChange={setMinRating}
              onClearFilters={() => { handleClearFilters(); setIsFilterOpen(false); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
