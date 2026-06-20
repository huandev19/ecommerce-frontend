'use client';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import { ProductVariant } from '@v8n/types';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onVariantChange: (variantId: string) => void;
}

export function ProductVariantSelector({ variants, selectedVariantId, onVariantChange }: ProductVariantSelectorProps) {
  const t = useTranslations("storefront.product");
  // Extract unique colors and sizes
  const colors = useMemo(() => Array.from(new Set(variants.map(v => v.color).filter(Boolean))), [variants]);
  const sizes = useMemo(() => Array.from(new Set(variants.map(v => v.size).filter(Boolean))), [variants]);

  const selectedVariant = variants.find(v => v.id === selectedVariantId);
  const selectedColor = selectedVariant?.color;
  const selectedSize = selectedVariant?.size;

  const handleColorChange = (color: string) => {
    // Find a variant with the new color and same size (if possible), else just the new color
    const newVariant = variants.find(v => v.color === color && v.size === selectedSize) || variants.find(v => v.color === color);
    if (newVariant) onVariantChange(newVariant.id);
  };

  const handleSizeChange = (size: string) => {
    // Find a variant with the new size and same color (if possible), else just the new size
    const newVariant = variants.find(v => v.size === size && v.color === selectedColor) || variants.find(v => v.size === size);
    if (newVariant) onVariantChange(newVariant.id);
  };

  return (
    <div className="flex flex-col gap-6">
      {colors.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center justify-between">
            {t('color')}: <span className="text-gray-500 font-normal">{selectedColor}</span>
          </h4>
          <div className="flex gap-3">
            {colors.map(color => {
              const isAvailable = variants.some(v => v.color === color && v.stock > 0);
              return (
                <button
                  key={color}
                  onClick={() => handleColorChange(color as string)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                    selectedColor === color 
                      ? 'border-primary ring-1 ring-primary bg-primary/5 font-medium' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!isAvailable ? 'opacity-50 cursor-not-allowed line-through' : ''}`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center justify-between">
            {t('size')}: <span className="text-gray-500 font-normal">{selectedSize}</span>
          </h4>
          <div className="flex gap-3 flex-wrap">
            {sizes.map(size => {
              // Check if this size is available for the currently selected color
              const specificVariant = variants.find(v => v.size === size && (!selectedColor || v.color === selectedColor));
              const isAvailable = specificVariant && specificVariant.stock > 0;
              
              return (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size as string)}
                  disabled={!isAvailable}
                  className={`w-12 h-12 flex items-center justify-center border rounded-md text-sm transition-colors ${
                    selectedSize === size 
                      ? 'border-primary ring-1 ring-primary bg-primary/5 font-medium' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!isAvailable ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400' : ''}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
