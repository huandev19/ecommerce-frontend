import { AdminProduct, AdminProductsParams, AdminProductsResponse, CreateProductPayload, UpdateProductPayload } from '@v8n/types';
import { mockProducts } from '../home/queries';
import {
  zAdminErrorPayload,
  zAdminProductDeleteResponse,
  zAdminProductStatus,
  zAdminProductsParams,
  zAdminProductsResponse,
  zAdminProduct,
} from './zod-schemas';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
const canUseBackend = process.env.NEXT_PUBLIC_USE_ADMIN_API === 'true';

const getAdminToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
};

const createHeaders = (): HeadersInit => {
  const token = getAdminToken();

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const getErrorMessage = (status: number, fallbackMessage?: string): string => {
  switch (status) {
    case 400:
      return fallbackMessage || 'Invalid product data. Please check your input.';
    case 401:
      return 'Admin authentication required. Please log in.';
    case 403:
      return "You don't have permission to manage products.";
    case 404:
      return 'Product not found.';
    case 409:
      return fallbackMessage || 'Product with this SKU already exists.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Something went wrong. Please try again.';
    default:
      return fallbackMessage || 'Failed to load admin products.';
  }
};

const parseErrorPayload = async (response: Response): Promise<string | undefined> => {
  const payload = await response.json().catch(() => null);
  const parsedPayload = zAdminErrorPayload.safeParse(payload);

  return parsedPayload.success ? parsedPayload.data.message : undefined;
};

const handleResponseError = async (response: Response): Promise<never> => {
  const fallbackMessage = await parseErrorPayload(response);

  if (response.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_token');
  }

  throw new Error(getErrorMessage(response.status, fallbackMessage));
};

const toAdminProducts = (): AdminProduct[] => {
  const now = new Date('2026-06-16T00:00:00.000Z');

  return mockProducts.map((product, index) => {
    const stock = product.variants?.reduce((sum, variant) => sum + variant.stock, 0) ?? (product.inStock ? 12 : 0);
    const status = zAdminProductStatus.parse(index % 4 === 0 ? 'draft' : 'active');
    const date = new Date(now);
    date.setDate(now.getDate() - index);

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      comparePrice: product.comparePrice,
      stock,
      sku: `SKU-${product.id.toUpperCase()}`,
      status,
      image: product.image,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    };
  });
};

const sortProducts = (products: AdminProduct[], sortBy: NonNullable<AdminProductsParams['sortBy']>, order: NonNullable<AdminProductsParams['order']>) => {
  const direction = order === 'asc' ? 1 : -1;

  return [...products].sort((a, b) => {
    const first = a[sortBy];
    const second = b[sortBy];

    if (typeof first === 'number' && typeof second === 'number') {
      return (first - second) * direction;
    }

    return String(first).localeCompare(String(second)) * direction;
  });
};

const fetchMockAdminProducts = async (params: AdminProductsParams): Promise<AdminProductsResponse> => {
  const parsedParams = zAdminProductsParams.parse(params);
  const page = parsedParams.page ?? 1;
  const limit = parsedParams.limit ?? 8;
  const search = parsedParams.search?.toLowerCase();
  const status = parsedParams.status ?? 'all';
  const category = parsedParams.category?.toLowerCase();
  const sortBy = parsedParams.sortBy ?? 'createdAt';
  const order = parsedParams.order ?? 'desc';

  const filteredProducts = toAdminProducts().filter((product) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search) || product.sku?.toLowerCase().includes(search)
      : true;
    const matchesStatus = status === 'all' ? true : product.status === status;
    const matchesCategory = category ? product.category.toLowerCase() === category : true;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedProducts = sortProducts(filteredProducts, sortBy, order);
  const total = sortedProducts.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

  return zAdminProductsResponse.parse({
    products: sortedProducts.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages,
  });
};

export const fetchAdminProducts = async (params: AdminProductsParams = {}): Promise<AdminProductsResponse> => {
  const parsedParams = zAdminProductsParams.parse(params);

  if (!canUseBackend) {
    return fetchMockAdminProducts(parsedParams);
  }

  try {
    const searchParams = new URLSearchParams();
    Object.entries(parsedParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.set(key, String(value));
      }
    });

    const response = await fetch(`${baseUrl}/admin/products?${searchParams.toString()}`, {
      method: 'GET',
      headers: createHeaders(),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    const data = await response.json();
    return zAdminProductsResponse.parse(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Connection error. Please check your internet and try again.');
    }
    throw error;
  }
};

export const deleteAdminProduct = async (id: string): Promise<{ success: boolean; id: string }> => {
  const productId = zAdminProductsResponse.shape.products.element.shape.id.parse(id);

  if (!canUseBackend) {
    return zAdminProductDeleteResponse.parse({ success: true, id: productId });
  }

  try {
    const response = await fetch(`${baseUrl}/admin/products/${productId}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return zAdminProductDeleteResponse.parse({ success: true, id: productId });
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Connection error. Please check your internet and try again.');
    }
    throw error;
  }
};

export const fetchAdminProductById = async (id: string): Promise<AdminProduct> => {
  if (!canUseBackend) {
    const products = toAdminProducts();
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found.');
    return zAdminProduct.parse(product);
  }

  try {
    const response = await fetch(`${baseUrl}/admin/products/${id}`, {
      method: 'GET',
      headers: createHeaders(),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    const data = await response.json();
    return zAdminProduct.parse(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Connection error. Please check your internet and try again.');
    }
    throw error;
  }
};

export const createAdminProduct = async (payload: CreateProductPayload): Promise<AdminProduct> => {
  if (!canUseBackend) {
    const newProduct = {
      ...payload,
      id: Math.random().toString(36).substring(2, 9),
      slug: payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return zAdminProduct.parse(newProduct);
  }

  try {
    const response = await fetch(`${baseUrl}/admin/products`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    const data = await response.json();
    return zAdminProduct.parse(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Connection error. Please check your internet and try again.');
    }
    throw error;
  }
};

export const updateAdminProduct = async (id: string, payload: UpdateProductPayload): Promise<AdminProduct> => {
  if (!canUseBackend) {
    const products = toAdminProducts();
    const existing = products.find(p => p.id === id);
    if (!existing) throw new Error('Product not found.');
    
    const updated = {
      ...existing,
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    return zAdminProduct.parse(updated);
  }

  try {
    const response = await fetch(`${baseUrl}/admin/products/${id}`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    const data = await response.json();
    return zAdminProduct.parse(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Connection error. Please check your internet and try again.');
    }
    throw error;
  }
};

export const adminCatalogApi = {
  fetchAdminProducts,
  deleteAdminProduct,
  fetchAdminProductById,
  createAdminProduct,
  updateAdminProduct,
};
