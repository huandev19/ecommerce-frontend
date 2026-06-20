'use client';
import { useTranslations } from 'next-intl';

import React from 'react';
import { StarRating } from '@/components/common/StarRating';

interface ProductSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onSelectCategory: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  onClearFilters: () => void;
}

export function ProductSidebar({
  categories,
  selectedCategories,
  onSelectCategory,
  priceRange,
  onPriceChange,
  minRating,
  onMinRatingChange,
  onClearFilters
}: ProductSidebarProps) {
  const t = useTranslations("storefront");

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      onSelectCategory(selectedCategories.filter(c => c !== cat));
    } else {
      onSelectCategory([...selectedCategories, cat]);
    }
  };

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6 rounded-xl border bg-white p-5 shadow-sm md:sticky md:top-24">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">{t("product.filter")}</h3>
          <button
            onClick={onClearFilters}
            className="text-xs text-gray-500 hover:text-primary transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">{t("categories")}</h4>
        <div className="flex flex-col gap-2">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="flex flex-col gap-4">
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>$0</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">Rating</h4>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map(rating => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => onMinRatingChange(rating)}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <StarRating rating={rating} size="sm" />
              <span className="text-xs text-gray-500">& above</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => onMinRatingChange(0)}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-sm">All ratings</span>
          </label>
        </div>
      </div>

    </aside>
  );
}
