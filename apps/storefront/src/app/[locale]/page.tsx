import { setRequestLocale } from 'next-intl/server';
import React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { ProductGrid } from "@/components/home/ProductGrid";
import { getFeaturedCategories, getFeaturedProducts, getNewArrivals } from "@v8n/api";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }){
  const { locale } = await params;
  setRequestLocale(locale);
  // TODO: Replace with real data fetching
  const categories = await getFeaturedCategories();
  const featuredProducts = await getFeaturedProducts();
  const newArrivals = await getNewArrivals();

  return (
    <div className="flex flex-col gap-2 pb-8 md:gap-6">
      <HeroBanner />
      <FeaturedCategories categories={categories} />
      <ProductGrid title="Featured Products" products={featuredProducts} />
      <ProductGrid title="New Arrivals" products={newArrivals} />
    </div>
  );
}
