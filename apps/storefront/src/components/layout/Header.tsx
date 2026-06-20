"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@v8n/ui";
import { Input } from "@v8n/ui";
import { LanguageSwitcher } from "@v8n/ui";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { CartSheet } from "../cart/CartSheet";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { getProducts } from "@v8n/api";
import { Product } from "@v8n/types";
import Image from "next/image";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { itemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname?.startsWith(href);
    return isActive
      ? "text-blue-600 font-semibold transition-colors"
      : "text-gray-600 hover:text-blue-600 transition-colors";
  };

  useEffect(() => {
    setMounted(true);
    getProducts().then(setAllProducts).catch(console.error);
  }, []);

  // Simple debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        const results = allProducts.filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results.slice(0, 5));
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, allProducts]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-3 md:px-6 h-14 md:h-16 flex items-center justify-between">
          {/* Mobile: Hamburger */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" aria-label="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="rounded-md bg-blue-600 px-3 py-2 text-sm md:text-base font-bold uppercase tracking-tight text-white">V8N Store</Link>
          </div>

          {/* PC: Navigation & Search */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8 gap-8">
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className={navLinkClass("/", true)}>Home</Link>
              <Link href="/products" className={navLinkClass("/products")}>Shop</Link>
              <Link href="/products?category=Clothing" className={navLinkClass("/products")}>Categories</Link>
              <Link href="/products" className={navLinkClass("/deals")}>Deals</Link>
            </nav>
            <div className="relative max-w-md w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 bg-gray-50 focus:bg-white transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Search Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg overflow-hidden flex flex-col z-50">
                  {searchResults.map(p => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b last:border-0"
                      onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                    >
                      <div className="relative w-10 h-10 bg-gray-100 rounded overflow-hidden shrink-0">
                        <Image src={p.image} alt={p.name} fill unoptimized className="object-cover" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{p.name}</p>
                        <p className="text-xs text-gray-500">${p.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitcher />
            <Link href="/login" className="hidden md:flex">
              <Button variant="ghost" size="icon" aria-label="User Account">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/cart" className="hidden rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 md:block">
              Cart
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && itemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount()}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white absolute w-full left-0 p-4 flex flex-col gap-4 shadow-lg z-40">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="flex flex-col rounded-lg border bg-white">
                {searchResults.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="p-3 text-sm border-b last:border-0"
                    onClick={() => { setSearchQuery(""); setSearchResults([]); setIsMobileMenuOpen(false); }}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
            <nav className="flex flex-col gap-4 text-base font-medium">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <Link href="/products?category=Clothing" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
              <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            </nav>
          </div>
        )}
      </header>

      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
