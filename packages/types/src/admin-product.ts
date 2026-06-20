export type AdminProductStatus = 'active' | 'draft';
export type AdminProductSortBy = 'name' | 'category' | 'price' | 'stock' | 'status' | 'createdAt';
export type AdminProductSortOrder = 'asc' | 'desc';

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  comparePrice?: number;
  stock: number;
  sku?: string;
  status: AdminProductStatus;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: AdminProductStatus | 'all';
  category?: string;
  sortBy?: AdminProductSortBy;
  order?: AdminProductSortOrder;
}

export interface AdminProductsResponse {
  products: AdminProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  stock: number;
  category: string;
  tags?: string[];
  status: AdminProductStatus;
  image: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: string;
}
