/**
 * Schema định nghĩa cấu trúc messages tập trung cho toàn bộ monorepo.
 */

export interface CommonMessages {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    confirm: string;
    back: string;
    no_results: string;
    validation: Record<string, string>;
    error: Record<string, string>;
    language: Record<string, string>;
    [key: string]: unknown;
}

export interface AdminMessages {
    site_name: string;
    admin_panel: string;
    dashboard: Record<string, string>;
    products: Record<string, string>;
    orders: Record<string, string>;
    workflows: Record<string, string>;
    settings: Record<string, string>;
    seo: Record<string, string>;
    [key: string]: unknown;
}

export interface StorefrontMessages {
    site_name: string;
    home: Record<string, string>;
    product: Record<string, string>;
    cart: Record<string, string>;
    checkout: Record<string, string>;
    auth: Record<string, string>;
    account: Record<string, string>;
    footer: Record<string, string>;
    seo: Record<string, string>;
    [key: string]: unknown;
}

export interface LocaleMessages {
    common: CommonMessages;
    admin: AdminMessages;
    storefront: StorefrontMessages;
}