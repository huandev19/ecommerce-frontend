"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@v8n/ui";
import { Link } from "@/i18n/routing";

export function HeroBanner() {
  const t = useTranslations("storefront.home");

  return (
    <section className="w-full px-3 py-4 md:container md:px-6 md:py-6">
      <div className="relative flex h-[140px] w-full items-center overflow-hidden rounded-xl bg-blue-800 px-4 shadow-sm md:h-[300px] md:rounded-2xl md:px-12">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-blue-500/40 to-transparent md:block" />
        <div className="relative z-10 max-w-xl text-white">
          <p className="mb-2 hidden text-sm font-semibold uppercase tracking-[0.25em] text-blue-200 md:block">{t("hero_subtitle")}</p>
          <h1 className="text-2xl font-bold md:text-6xl">{t("hero_title")}</h1>
          <p className="mt-2 text-sm text-blue-100 md:mb-8 md:text-xl">{t("hero_description")}</p>
          <Link href="/products">
            <Button size="lg" className="mt-4 rounded-full bg-white text-blue-800 hover:bg-blue-50 md:mt-0">{t("shop_now")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
