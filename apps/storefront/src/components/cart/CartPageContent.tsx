"use client";
import { useTranslations } from "next-intl";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@v8n/ui";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function CartPageContent() {
  const t = useTranslations("storefront.cart");
  const { items, removeItem, updateQuantity, cartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border bg-white px-6 py-16 text-center shadow-sm">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
        <h2 className="mt-6 text-2xl font-bold">{t("empty_title")}</h2>
        <p className="mx-auto mt-2 max-w-md text-gray-500">{t("empty_description")}</p>
        <Link href="/products" className="mt-8 inline-flex">
          <Button>{t("continue_shopping")}</Button>
        </Link>
      </div>
    );
  }

  const subtotal = cartTotal();
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {items.map((item) => {
          const variant = item.variantId ? item.product.variants?.find((v) => v.id === item.variantId) : null;
          const price = variant?.price ?? item.product.price;

          return (
            <div key={`${item.product.id}-${item.variantId}`} className="rounded-2xl border bg-white p-4 shadow-sm md:p-5">
              <div className="flex gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 md:h-32 md:w-32">
                  <Image src={item.product.image} alt={item.product.name} fill unoptimized className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex gap-3">
                    <div className="min-w-0 flex-1">
                      <Link href={`/products/${item.product.slug}`} className="font-semibold hover:text-blue-600 md:text-lg">
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                      {variant && <p className="mt-1 text-xs text-gray-500">{variant.color} / {variant.size}</p>}
                    </div>
                    <button onClick={() => removeItem(item.product.id, item.variantId)} className="h-9 w-9 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="mx-auto h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-lg border bg-white">
                      <button className="p-2 disabled:opacity-50" disabled={item.quantity <= 1} onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button className="p-2" onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-bold md:text-lg">${(price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="h-fit rounded-2xl border bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-xl font-bold">{t("order_summary")}</h2>
        <div className="mt-5 space-y-3 border-b pb-5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{t("subtotal")}</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t("shipping")}</span>
            <span className="font-medium text-green-600">{t("free")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t("tax")}</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between text-lg font-bold">
          <span>{t("total")}</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link href="/checkout" className="mt-6 hidden md:block">
          <Button className="h-12 w-full text-base">{t("proceed_checkout")}</Button>
        </Link>
        <Link href="/products" className="mt-4 hidden text-center text-sm font-medium text-blue-600 hover:underline md:block">
          {t("continue_shopping")}
        </Link>
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white p-3 shadow-[0_-8px_20px_rgba(15,23,42,0.08)] md:hidden">
          <Link href="/checkout">
            <Button className="h-12 w-full text-base">{t("checkout_with_total", { total: `$${total.toFixed(2)}` })}</Button>
          </Link>
        </div>
      </aside>
    </div>
  );
}
