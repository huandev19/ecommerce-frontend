"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Category } from "@v8n/types";
import { Link } from "@/i18n/routing";

interface Props {
  categories: Category[];
}

export function FeaturedCategories({ categories }: Props) {
  const t = useTranslations("storefront.home");

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">{t("featured_categories")}</p>
            <h2 className="text-2xl font-bold">{t("shop_by_category")}</h2>
          </div>
        </div>
        <div className="flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-6 md:overflow-visible md:pb-0">
          {categories.map((cat) => (
            <Link href={`/products?category=${cat.name}`} key={cat.id} className="snap-start shrink-0 w-32 md:w-auto flex flex-col items-center gap-3 cursor-pointer group">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all group-hover:ring-2 group-hover:ring-blue-600">
                {cat.icon ? (
                  <span className="text-3xl">{cat.icon}</span>
                ) : (
                  <span className="text-2xl font-bold text-blue-600">{cat.name.slice(0, 1)}</span>
                )}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-center">{cat.name}</span>
                {cat.itemCount !== undefined && (
                  <span className="text-xs text-gray-500">{t("items_count", { count: cat.itemCount })}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
