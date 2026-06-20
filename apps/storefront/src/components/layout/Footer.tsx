import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {

  const ft = useTranslations("storefront.footer");
  const tRoot = useTranslations("storefront");
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white py-8 md:py-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="mb-4 inline-flex rounded-md bg-blue-600 px-3 py-2 text-lg font-bold uppercase text-white">{tRoot("site_name")}</h3>
          <p className="text-sm leading-6 text-gray-500">{ft("about_description")}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-semibold text-base mb-2">{tRoot("shop_title")}</h4>
          <Link href="/products" className="text-gray-500 hover:text-blue-600 transition-colors">{tRoot("all_products")}</Link>
          <Link href="/products?category=Clothing" className="text-gray-500 hover:text-blue-600 transition-colors">{tRoot("categories")}</Link>
          <Link href="/products" className="text-gray-500 hover:text-blue-600 transition-colors">{tRoot("new_arrivals")}</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-semibold text-base mb-2">{tRoot("support_title")}</h4>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">{tRoot("contact_us")}</a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">{tRoot("faqs")}</a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">{tRoot("shipping_info")}</a>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-semibold text-base mb-2">{tRoot("legal_title")}</h4>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">{tRoot("privacy_policy")}</a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">{tRoot("terms_of_service")}</a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border text-center text-sm text-gray-500">
        {tRoot("copyright")}
      </div>
    </footer>
  );
}
