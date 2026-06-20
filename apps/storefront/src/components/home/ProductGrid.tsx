"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Product } from "@v8n/types";
import { ProductCard } from "./ProductCard";
import { Link } from "@/i18n/routing";

interface Props {
  title: string;
  products: Product[];
}

export function ProductGrid({ title, products }: Props) {
  const t = useTranslations("common");

  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link href="/products" className="text-sm text-blue-600 hover:underline font-medium">{t("view_all")}</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
