// Định nghĩa kiểu dữ liệu khung bao bọc (Wrapper) của mọi API response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
  errors?: Record<string, string>;
}

// Định nghĩa DTO phản ánh chuẩn xác dữ liệu backend trả về cho một Product
export interface ApiProductDto {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  slug: string;
  thumbnailUrl: string;
  status: string;
  category: string;
  originCountry?: string;
  discountable?: boolean;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  hsCode?: string;
  material?: string;
  createdAt?: string;
  updatedAt?: string;
}


// Định nghĩa DTO phản ánh chuẩn xác dữ liệu backend trả về cho một Category
export interface ApiCategoryDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentCategoryId: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
