# DESIGN PATTERNS & CONVENTIONS RULES — FrontEnd Monorepo (v8n-ecomm)

Tài liệu này định nghĩa tất cả Design Pattern và Naming Convention bắt buộc áp dụng trong toàn bộ Monorepo. **AI Agent và Developer phải tuân thủ tuyệt đối** các quy tắc dưới đây, không được phép phá vỡ cấu trúc đã thiết lập.

---

## 1. KIẾN TRÚC MONOREPO

### 1.1 Monorepo Workspace 🔴 BẮT BUỘC
- **Công cụ:** Turborepo + pnpm workspaces
- **Cấu trúc:** `apps/*` | `ecommerce/*` | `packages/*`
- **File cấu hình:** `pnpm-workspace.yaml`, `turbo.json`

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "ecommerce/*"
  - "packages/*"
```

### 1.2 Workspace Protocol 🔴 BẮT BUỘC
- Dùng `"workspace:*"` cho tất cả internal dependencies trong `package.json`
- Package scope: `@v8n/{package-name}`

```json
{
  "dependencies": {
    "@v8n/types": "workspace:*",
    "@v8n/api": "workspace:*",
    "@v8n/ui": "workspace:*"
  }
}
```

### 1.3 Dependency Flow 🔴 BẮT BUỘC
```
types (abstraction)
  ↓
api + hooks + utils + config (logic)
  ↓
ecommerce/ui (presentation)
  ↓
apps/storefront + apps/admin-dashboard (composition)
```
- **KHÔNG** được import ngược từ apps → packages (trừ test)
- **KHÔNG** được tạo circular dependency giữa các packages

---

## 2. TYPES & VALIDATION

### 2.1 Barrel Export 🔴 BẮT BUỘC
- Mỗi package PHẢI có `src/index.ts` re-export tất cả public API
- **Nguồn:** `packages/types/src/index.ts`, `packages/api/src/index.ts`, `packages/hooks/src/index.ts`, `ecommerce/ui/src/index.ts`

```typescript
// packages/types/src/index.ts
export type { Product, ProductImage, ProductVariant } from "./product";
export type { User, LoginRequest, LoginResponse } from "./auth";
export type { ApiResponse, ApiSuccess, ApiError, PaginatedResponse } from "./api";
```

### 2.2 Interface First 🔴 BẮT BUỘC
- Mọi entity PHẢI có interface/type định nghĩa trong `packages/types/src/` TRƯỚC KHI implement
- Tên interface: **PascalCase**, KHÔNG dùng prefix `I`
- Props của component: `{ComponentName}Props`

```typescript
// packages/types/src/product.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: ProductImage[];
  variants: ProductVariant[];
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
```

### 2.3 Discriminated Union
- Dùng tagged union cho API response để type-safe error handling
- **Nguồn:** `packages/types/src/api.ts`

```typescript
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
```

### 2.4 Zod Schema Validation 🔴 BẮT BUỘC
- Mọi form validation PHẢI dùng `zod` schema
- Dùng `z.infer<typeof schema>` để tạo TypeScript type từ schema
- Schema đặt trong file `zod-schemas.ts` theo domain
- **Nguồn:** `packages/api/src/account/zod-schemas.ts`, `packages/api/src/admin/zod-schemas.ts`

```typescript
// packages/api/src/admin/zod-schemas.ts
import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  price: z.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
  description: z.string().optional(),
  categoryId: z.string().uuid("Danh mục không hợp lệ"),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
```

### 2.5 react-hook-form + zod 🔴 BẮT BUỘC
- **TUYỆT ĐỐI KHÔNG** dùng nhiều `useState` cho form fields
- Mọi form PHẢI dùng `react-hook-form` + `zod` resolver

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormData } from "@v8n/api/admin/zod-schemas";

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductFormData>({
  resolver: zodResolver(productFormSchema),
});
```

---

## 3. API LAYER

### 3.1 Axios Singleton + Interceptors 🔴 BẮT BUỘC
- Một instance Axios duy nhất được tạo từ `createApiClient()`
- Cấu hình `baseURL` từ `NEXT_PUBLIC_API_BASE_URL`
- Interceptors xử lý: token attachment, 401 refresh, error mapping
- **Nguồn:** `packages/api/src/client.ts`

```typescript
// packages/api/src/client.ts
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) clearAuthToken();
    return Promise.reject(error);
  }
);
```

### 3.2 API Service / Repository Layer 🔴 BẮT BUỘC
- Mỗi domain có async functions thuần thực hiện HTTP request
- Gom nhóm vào aggregator object: `{domain}Api`
- **Nguồn:** `packages/api/src/auth/auth.api.ts`, `packages/api/src/admin/catalog.ts`

```typescript
// packages/api/src/auth/auth.api.ts
export const authApi = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const { data } = await apiClient.post("/auth/login", credentials);
    return loginResponseSchema.parse(data);
  },
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const { data } = await apiClient.post("/auth/refresh");
    return data;
  },
};
```

### 3.3 TanStack Query Custom Hooks 🔴 BẮT BUỘC
- **KHÔNG** dùng `fetch`/`axios` trực tiếp trong component
- Mọi data fetching PHẢI qua custom hook `useQuery` / `useMutation`
- **Nguồn:** `packages/api/src/home/queries.ts`, `packages/api/src/admin/queries.ts`

```typescript
// packages/api/src/home/queries.ts
import { useQuery } from "@tanstack/react-query";

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => catalogApi.getFeaturedProducts(),
    staleTime: 5 * 60 * 1000,
  });
}
```

### 3.4 Query Key Factory
- Hàm factory tạo query key mảng có cấu trúc, tái sử dụng
- **Nguồn:** `packages/api/src/admin/queries.ts`

```typescript
export const adminQueries = {
  products: {
    all: ["admin", "products"] as const,
    list: (params?: ProductListParams) => [...adminQueries.products.all, "list", params] as const,
    detail: (id: string) => [...adminQueries.products.all, "detail", id] as const,
  },
  orders: {
    all: ["admin", "orders"] as const,
    list: (params?: OrderListParams) => [...adminQueries.orders.all, "list", params] as const,
  },
};
```

### 3.5 Optimistic Updates
- Dùng `onMutate` + `queryClient.setQueryData` cho mutation để UI phản hồi tức thì

```typescript
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (product: ProductFormData) => catalogApi.updateProduct(product),
    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({ queryKey: adminQueries.products.all });
      const previous = queryClient.getQueryData(adminQueries.products.list());
      queryClient.setQueryData(adminQueries.products.list(), (old) => /* optimistic update */);
      return { previous };
    },
    onError: (_err, _product, context) => {
      queryClient.setQueryData(adminQueries.products.list(), context?.previous);
    },
  });
}
```

### 3.6 Mock Data Centralization 🔴 BẮT BUỘC
- Tất cả mock data PHẢI tập trung trong `packages/api/src/{domain}/queries.ts`
- Một entity chỉ có MỘT mảng dữ liệu gốc duy nhất
- **KHÔNG** tạo file `mockData.ts` rời rạc trong `apps/`
- **Nguồn:** `packages/api/src/home/queries.ts`

```typescript
// packages/api/src/home/queries.ts
// ✅ ĐÚNG: Single source of truth
const ALL_PRODUCTS: Product[] = [...];

export function getAllProducts(): Product[] {
  return ALL_PRODUCTS;
}

export function getFeaturedProducts(): Product[] {
  return ALL_PRODUCTS.filter(p => p.featured); // derive từ cùng một nguồn
}
```

---

## 4. STATE MANAGEMENT

### 4.1 Zustand Store 🔴 BẮT BUỘC
- State + actions trong cùng `create()` call
- Phân tách interface riêng: `{Name}State` + `{Name}Actions`
- File name: `use{Name}Store.ts`
- **Nguồn:** `apps/storefront/src/store/useAuthStore.ts`, `apps/storefront/src/store/useCartStore.ts`

```typescript
// apps/storefront/src/store/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: async (credentials) => { /* ... */ },
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  setUser: (user) => set({ user, isAuthenticated: true }),
}));
```

### 4.2 Event Bus / Observer 🔴 BẮT BUỘC
- Cross-component communication qua Event Bus
- PHẢI implement Lock mechanism để chống spam-click
- **Nguồn:** `packages/hooks/src/useEventBus.ts`

```typescript
// packages/hooks/src/useEventBus.ts
type EventHandler = (payload: unknown) => void;

class EventBus {
  private handlers = new Map<string, Set<EventHandler>>();
  private locks = new Map<string, boolean>();
  
  on(event: string, handler: EventHandler) { /* ... */ }
  off(event: string, handler: EventHandler) { /* ... */ }
  
  emit(event: string, payload: unknown) {
    if (this.locks.get(event)) return; // Lock mechanism
    this.locks.set(event, true);
    this.handlers.get(event)?.forEach(h => h(payload));
    // Release lock after async handler completes
  }
}

export const eventBus = new EventBus();
```

---

## 5. UI COMPONENTS

### 5.1 shadcn-ui Centralized 🔴 BẮT BUỘC
- Tất cả shared UI components PHẢI đặt trong `ecommerce/ui/src/components/ui/`
- **KHÔNG** cài `shadcn-ui` components trực tiếp vào `apps/`
- Export qua `ecommerce/ui/src/index.ts`
- **Nguồn:** `ecommerce/ui/src/index.ts`

```typescript
// ecommerce/ui/src/index.ts
export { Button, type ButtonProps } from "./components/ui/button";
export { Input } from "./components/ui/input";
export { Card, CardHeader, CardContent, CardFooter } from "./components/ui/card";
export { Table, TableHeader, TableBody, TableRow, TableCell } from "./components/ui/table";
export { Dialog, DialogTrigger, DialogContent } from "./components/ui/dialog";
```

### 5.2 cn() + cva 🟡 KHUYẾN NGHỊ
- Dùng `cn()` (clsx + tailwind-merge) để merge class names
- Dùng `cva` (class-variance-authority) cho components có variants
- **Nguồn:** `ecommerce/ui/src/lib/utils.ts`

```typescript
// ecommerce/ui/src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva("rounded-md font-medium", {
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      danger: "bg-red-600 text-white hover:bg-red-700",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});
```

### 5.3 "use client" Boundary 🔴 BẮT BUỘC
- Mặc định tất cả components là **Server Components**
- Chỉ thêm `"use client"` khi cần: hooks, event handlers, state, effects, browser APIs
- **Nguồn:** `apps/storefront/src/components/home/ProductGrid.tsx` (Client), `apps/storefront/src/app/[locale]/page.tsx` (Server)

```typescript
// ✅ Server Component (mặc định, KHÔNG có "use client")
export default async function HomePage() {
  const products = await getFeaturedProducts();
  return <ProductGrid products={products} />;
}

// ✅ Client Component (có "use client")
"use client";
export function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState("all");
  return (/* ... */);
}
```

### 5.4 Container / Presenter Pattern 🟡 KHUYẾN NGHỊ
- Server Component (Container): fetch data, xử lý logic
- Client Component (Presenter): nhận props, render UI thuần

### 5.5 HOC / Guard Pattern 🔴 BẮT BUỘC
- Dùng `AuthGuard` component để bọc protected routes
- **Nguồn:** `apps/storefront/src/components/account/AuthGuard.tsx`

---

## 6. ROUTING & LAYOUT

### 6.1 Nested Layout Pattern 🔴 BẮT BUỘC
- App Router Layout wrapping `{children}`
- Layout cha: Header + Footer
- Layout con: AuthGuard + Sidebar
- **Nguồn:** `apps/storefront/src/app/[locale]/layout.tsx`

```typescript
// apps/storefront/src/app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### 6.2 Middleware Chain 🔴 BẮT BUỘC
- `next-intl` middleware cho i18n routing + locale detection
- Matcher pattern: `/((?!api|_next|_vercel|.*\\..*).*)`
- **Nguồn:** `apps/storefront/src/middleware.ts`, `apps/admin-dashboard/src/middleware.ts`

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

### 6.3 Dynamic Params Unwrapping 🔴 BẮT BUỘC (Next.js 15)
- `params` và `searchParams` là Promise trong Next.js 15
- PHẢI `await params` trong Server Components
- KHÔNG dùng `React.use(params)` trong Client Components

```typescript
// ✅ ĐÚNG: Server Component
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  return <ProductDetail product={product} />;
}
```

---

## 7. CROSS-CUTTING CONCERNS

### 7.1 Global Error Handling 🔴 BẮT BUỘC
- React Error Boundary (`GlobalErrorFallback` trong `ecommerce/ui`)
- API Interceptors map HTTP errors → toast notifications tự động
- HTTP Status mapping:
  - `400` → "Dữ liệu không hợp lệ"
  - `401` → "Vui lòng đăng nhập lại"
  - `403` → "Bạn không có quyền truy cập"
  - `404` → "Không tìm thấy tài nguyên"
  - `429` → "Quá nhiều yêu cầu, vui lòng thử lại sau"
  - `500` → "Lỗi máy chủ, vui lòng thử lại sau"

### 7.2 Centralized i18n 🔴 BẮT BUỘC
- `packages/i18n` chứa tất cả messages JSON theo locale (`en.json`, `vi.json`, `ja.json`, `ko.json`, `zh.json`)
- Dùng `next-intl` cho cả storefront và admin-dashboard
- File schema: `packages/i18n/src/schema.ts`

---

## 8. NAMING CONVENTIONS

### 8.1 Tên File 🔴 BẮT BUỘC

| Loại file | Convention | Ví dụ |
|-----------|-----------|-------|
| React Component | **PascalCase**, trùng tên component export | `Header.tsx`, `ProductCard.tsx`, `UserForm.tsx` |
| Next.js route files | **lowercase** cố định | `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` |
| Package entry point | `index.ts` | `packages/api/src/index.ts` |
| API service file | `{domain}.api.ts` hoặc `{domain}.ts` | `auth.api.ts`, `orders.ts`, `catalog.ts` |
| Query hooks file | `queries.ts` | `home/queries.ts`, `admin/queries.ts` |
| Zod schema file | `zod-schemas.ts` | `account/zod-schemas.ts`, `admin/zod-schemas.ts` |
| Store file | `use{Name}Store.ts` | `useAuthStore.ts`, `useCartStore.ts` |
| CSS file | **lowercase** | `globals.css` |
| Config file | **lowercase** | `middleware.ts`, `next.config.ts`, `tailwind.config.ts` |
| Type definition file | **kebab-case** hoặc tên entity | `admin-order.ts`, `admin-rbac.ts`, `product.ts` |

### 8.2 Tên Thư Mục 🔴 BẮT BUỘC

| Loại thư mục | Convention | Ví dụ |
|--------------|-----------|-------|
| App/Package name | **kebab-case** | `admin-dashboard`, `v8n-ecomm` |
| Component group (single word) | **lowercase** | `home/`, `cart/`, `checkout/`, `admin/`, `layout/`, `common/`, `auth/`, `products/` |
| Component group (multi-word) | **kebab-case** | (không dùng, tách thành thư mục con) |
| Domain module | **lowercase** | `auth/`, `account/`, `profile/` |
| Next.js dynamic segment | `[param]` hoặc `[...param]` | `[locale]/`, `[id]/`, `[...slug]/` |
| Next.js route group | `(groupName)` lowercase | `(marketing)/`, `(auth)/` |
| Standard dirs | **lowercase** | `src/`, `components/`, `app/`, `public/`, `store/`, `lib/`, `hooks/`, `providers/` |
| Workspace dirs | **lowercase** | `apps/`, `packages/`, `ecommerce/` |

### 8.3 Tên Interface / Type 🔴 BẮT BUỘC

| Quy tắc | Ví dụ |
|---------|-------|
| **PascalCase**, KHÔNG prefix `I` | `Product`, `User`, `LoginRequest`, `ApiResponse<T>`, `PaginatedResponse<T>` |
| Props của component | `{ComponentName}Props` | `HeaderProps`, `ProductCardProps`, `CartSheetProps` |
| State interface (Zustand) | `{Name}State` | `AuthState`, `CartState` |
| Actions interface (Zustand) | `{Name}Actions` | `AuthActions`, `CartActions` |
| Request DTO | `{Entity}{Action}Request` | `LoginRequest`, `CreateProductRequest` |
| Response DTO | `{Entity}{Action}Response` | `LoginResponse`, `ProductListResponse` |
| Form data type | `{Entity}FormData` (từ `z.infer`) | `ProductFormData`, `LoginFormData` |

### 8.4 Tên Biến 🔴 BẮT BUỘC

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Biến local, parameters | **camelCase** | `selectedCategory`, `isLoading`, `errorMessage`, `productId` |
| Boolean | `is` / `has` / `should` / `can` prefix | `isOpen`, `hasError`, `shouldShow`, `canEdit` |
| Array | Danh từ số nhiều | `products`, `categories`, `orderItems` |
| Object/Map | Danh từ mô tả | `productMap`, `userCache` |
| Constants | **UPPER_SNAKE_CASE** | `API_BASE_URL`, `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE` |
| Enum values | **UPPER_SNAKE_CASE** | `OrderStatus.PENDING`, `Role.ADMIN` |
| Refs | suffix `Ref` | `inputRef`, `formRef` |

### 8.5 Tên Hàm 🔴 BẮT BUỘC

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Hàm thông thường | **camelCase** | `formatPrice()`, `calculateTotal()` |
| Event handler | `handle{Noun}{Event}` | `handleSubmit()`, `handleQuantityChange()`, `handleClick()` |
| Getter (trả về data) | `get{Entity}` hoặc `fetch{Entity}` | `getProducts()`, `fetchUser()` |
| Setter (cập nhật) | `set{Noun}` | `setLoading()`, `setSelectedCategory()` |
| Predicate (trả về boolean) | `is{Adj}` / `has{Noun}` / `can{Verb}` | `isValid()`, `hasPermission()`, `canDelete()` |
| Async function (API call) | `{verb}{Entity}` async | `loginUser()`, `createProduct()`, `updateOrder()` |

### 8.6 Tên Hook 🔴 BẮT BUỘC

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| TanStack Query (data fetching) | `use{Entity}` hoặc `use{Entity}{Filter}` | `useProducts()`, `useFeaturedProducts()` |
| TanStack Query mutation | `use{Action}{Entity}` | `useCreateProduct()`, `useUpdateOrder()`, `useDeleteUser()` |
| General hook | `use{CamelCase}` | `useEventBus()`, `useAuth()` |
| Zustand store hook | `use{Name}Store` | `useAuthStore`, `useCartStore` |

### 8.7 Tên API Service 🔴 BẮT BUỘC

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Aggregator object | `{domain}Api` (camelCase) | `authApi`, `accountApi`, `catalogApi` |
| Individual function | async `{verb}{Entity}()` | `loginUser()`, `getProducts()`, `updateOrder()` |
| Admin module prefix | `admin{Action}{Entity}` | `adminGetProducts()`, `adminUpdateOrder()` |

### 8.8 Tên Zod Schema 🔴 BẮT BUỘC

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Request validation | `{Entity}{Action}Schema` | `loginRequestSchema`, `productFormSchema` |
| Response validation | `{Entity}Schema` hoặc `{Entity}ResponseSchema` | `productSchema`, `userResponseSchema` |
| Nested object | `{Property}Schema` | `profileSchema`, `paginationSchema` |
| Enum | `{Name}Schema` | `orderStatusSchema`, `userRoleSchema` |

### 8.9 Route Path 🔴 BẮT BUỘC

| Môi trường | Convention | Ví dụ |
|------------|-----------|-------|
| Path segment (storefront) | **kebab-case** | `/my-orders/`, `/product-listing/`, `/order-detail/` |
| Path segment (admin) | **kebab-case** | `/admin/products/`, `/admin/rbac-users/`, `/admin/login-history/` |
| Dynamic param | `[camelCase]` | `[locale]`, `[productId]`, `[orderId]` |
| Catch-all route | `[...camelCase]` | `[...slug]` |
| Route group | `(lowercase)` | `(marketing)`, `(auth)` |

### 8.10 Export Convention 🔴 BẮT BUỘC

| Loại | Convention |
|------|-----------|
| Components trong packages | **Named export** |
| Components trong apps | **Named export** (ưu tiên) |
| Next.js page/layout | **Default export** (bắt buộc bởi Next.js) |
| Hooks, utils, services | **Named export** |
| Barrel re-export | `export { X } from "./module"` |

```typescript
// ✅ ĐÚNG: Named export cho components
export function ProductCard({ product }: ProductCardProps) { /* ... */ }

// ✅ ĐÚNG: Default export cho page/layout
export default function HomePage() { /* ... */ }

// ❌ SAI: Default export cho component thường
export default function ProductCard() { /* ... */ }
```

### 8.11 Import Alias

| Scope | Alias | Trỏ đến |
|-------|-------|---------|
| `apps/storefront` | `@/*` | `apps/storefront/src/*` |
| `apps/admin-dashboard` | `@/*` | `apps/admin-dashboard/src/*` |
| `ecommerce/ui` | `@ui/*` | `ecommerce/ui/src/*` |
| `packages/*` | (không dùng alias, import tương đối) | - |

---

## 9. QUY TẮC BẮT BUỘC CHO AI AGENT

| # | Quy tắc | Mức độ |
|---|---------|--------|
| 1 | KHÔNG phá vỡ dependency flow: `types → api/hooks → ui → apps` | 🔴 BẮT BUỘC |
| 2 | KHÔNG tạo mock data rời rạc trong `apps/` — tập trung trong `packages/api/src/{domain}/queries.ts` | 🔴 BẮT BUỘC |
| 3 | KHÔNG dùng `useState` cho form fields — bắt buộc `react-hook-form` + `zod` | 🔴 BẮT BUỘC |
| 4 | KHÔNG dùng `fetch`/`axios` trực tiếp trong component — phải qua hooks từ `@v8n/api` | 🔴 BẮT BUỘC |
| 5 | PHẢI tạo Barrel Export (`index.ts`) cho mọi package mới | 🔴 BẮT BUỘC |
| 6 | PHẢI đặt UI shared components vào `ecommerce/ui`, KHÔNG cài shadcn-ui vào `apps/` | 🔴 BẮT BUỘC |
| 7 | PHẢI dùng **PascalCase** cho component file, **camelCase** cho biến/hàm | 🔴 BẮT BUỘC |
| 8 | PHẢI dùng **named export** cho components/hooks/utils (trừ page/layout dùng default) | 🔴 BẮT BUỘC |
| 9 | PHẢI dùng **kebab-case** cho route path segments | 🔴 BẮT BUỘC |
| 10 | PHẢI dùng `workspace:*` protocol cho internal dependencies | 🔴 BẮT BUỘC |
| 11 | PHẢI `await params` trong Server Components (Next.js 15) | 🔴 BẮT BUỘC |
| 12 | PHẢI xử lý tất cả HTTP error codes (400, 401, 403, 404, 429, 500) trong API interceptors | 🔴 BẮT BUỘC |

---

*Cập nhật lần cuối: 2026-07-01*
*Dựa trên phân tích source code thực tế từ `apps/storefront`, `apps/admin-dashboard`, `ecommerce/ui`, `packages/api`, `packages/types`, `packages/hooks`*