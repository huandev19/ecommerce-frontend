"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Product } from "@v8n/types";
import { Card, CardContent, Button } from "@v8n/ui";
import { useCartStore } from "@/store/useCartStore";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { StarRating } from "@/components/common/StarRating";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const t = useTranslations("storefront.product");
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const displayImage = isHovered && product.images && product.images.length > 1
    ? product.images[1]
    : product.image;

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <Card
        className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border-gray-100 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Quick Add Overlay on Hover */}
          <div className="absolute bottom-0 left-0 w-full translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0 md:p-4">
            <Button
              className="w-full bg-white text-black hover:bg-gray-100 shadow-md"
              size="sm"
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? <><Check className="w-4 h-4 mr-2" /> {t("added")}</> : t("quick_add")}
            </Button>
          </div>
        </div>
        <CardContent className="flex flex-1 flex-col gap-1 p-3 md:p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
          <h3 className="font-medium text-sm md:text-base line-clamp-2">{product.name}</h3>
          {product.rating && <StarRating rating={product.rating} size="sm" />}
          <div className="mt-auto flex items-center gap-2 pt-2">
            {product.comparePrice ? (
              <>
                <span className="text-lg font-bold text-red-600">${product.price}</span>
                <span className="text-sm text-gray-400 line-through">${product.comparePrice}</span>
              </>
            ) : (
              <span className="text-lg font-bold">${product.price}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
