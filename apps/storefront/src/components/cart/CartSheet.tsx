'use client';
import { useTranslations } from 'next-intl';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@v8n/ui';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export function CartSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations('storefront.cart');
  const { items, removeItem, updateQuantity, cartTotal, itemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-over panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {t('title')} ({itemCount()})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>{t('empty')}</p>
              <Button onClick={onClose} variant="default">{t('continue_shopping')}</Button>
            </div>
          ) : (
            items.map((item) => {
              const variant = item.variantId ? item.product.variants?.find(v => v.id === item.variantId) : null;
              const price = variant?.price ?? item.product.price;
              
              return (
                <div key={`${item.product.id}-${item.variantId}`} className="flex gap-4 p-2 border rounded-lg">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0">
                    <Image 
                      src={item.product.image} 
                      alt={item.product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm line-clamp-2">{item.product.name}</h3>
                      <button 
                        onClick={() => removeItem(item.product.id, item.variantId)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {variant && (
                      <p className="text-xs text-gray-500 mt-1">
                        {variant.color} / {variant.size}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <button 
                          className="p-1 hover:bg-gray-100 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                          onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button 
                          className="p-1 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.product.id, item.variantId, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-semibold text-sm">${(price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50 flex flex-col gap-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>{t('subtotal')}</span>
              <span>${cartTotal().toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <Link href="/cart" onClick={onClose} className="text-center text-sm font-medium text-blue-600 hover:underline">
              View full cart
            </Link>
            <Link href="/checkout" onClick={onClose} className="w-full">
              <Button className="w-full text-lg h-12">{t('checkout')}</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
