'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || '');

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
        <span className="text-gray-400">No Image</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-zoom-in shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={mainImage} 
          alt="Product" 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 shrink-0 snap-start rounded-md overflow-hidden border-2 transition-colors ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
