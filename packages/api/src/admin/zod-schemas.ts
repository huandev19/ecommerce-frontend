import { z } from 'zod';

export const zAdminProductStatus = z.enum(['active', 'draft']);
export const zAdminProductSortBy = z.enum(['name', 'category', 'price', 'stock', 'status', 'createdAt']);
export const zAdminProductSortOrder = z.enum(['asc', 'desc']);

export const zAdminProductsParams = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  search: z.string().trim().optional(),
  status: z.union([zAdminProductStatus, z.literal('all')]).optional(),
  category: z.string().trim().optional(),
  sortBy: zAdminProductSortBy.optional(),
  order: zAdminProductSortOrder.optional(),
});

export const zAdminProduct = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  price: z.number().nonnegative(),
  comparePrice: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative(),
  sku: z.string().optional(),
  status: zAdminProductStatus,
  image: z.string().url(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

export const zAdminProductsResponse = z.object({
  products: z.array(zAdminProduct),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export const zAdminProductDeleteResponse = z.object({
  success: z.boolean(),
  id: z.string().min(1),
});

export const zAdminErrorPayload = z.object({
  message: z.string().optional(),
});

export const productFormSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters').max(200, 'Product name must not exceed 200 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000, 'Description must not exceed 5000 characters'),
  price: z.coerce.number({ required_error: 'Price is required' }).positive('Price must be greater than 0'),
  comparePrice: z.coerce.number().positive('Compare price must be greater than 0').optional().nullable().or(z.literal('')),
  sku: z.string().max(50, 'SKU must not exceed 50 characters').optional().or(z.literal('')),
  stock: z.coerce.number({ required_error: 'Stock is required' }).int('Stock must be a whole number').min(0, 'Stock must be 0 or greater'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
  status: zAdminProductStatus,
  image: z.string().url('Invalid image URL').min(1, 'Image is required'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const zAdminOrderStatus = z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']);

export const zAdminOrdersParams = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().trim().optional(),
  status: z.union([zAdminOrderStatus, z.literal('all')]).optional(),
});

export const zAdminOrder = z.object({
  id: z.string().min(1),
  orderNumber: z.string().min(1),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  date: z.string().min(1),
  itemsCount: z.number().int().nonnegative(),
  total: z.number().nonnegative(),
  status: zAdminOrderStatus,
});

export const zAdminOrdersResponse = z.object({
  orders: z.array(zAdminOrder),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export const zAddress = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
});

export const zAdminTimeline = z.object({
  date: z.string().min(1),
  status: z.string().min(1),
  description: z.string().min(1),
  active: z.boolean(),
});

export const zAdminOrderNote = z.object({
  id: z.string().min(1),
  author: z.string().min(1),
  content: z.string().min(1),
  createdAt: z.string().min(1),
  isInternal: z.boolean(),
});

export const zAdminOrderItem = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
  image: z.string().url(),
  sku: z.string().optional(),
  variantName: z.string().optional(),
});

export const zAdminOrderDetail = zAdminOrder.extend({
  customerPhone: z.string().min(1),
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  shippingAddress: zAddress,
  timeline: z.array(zAdminTimeline),
  notes: z.array(zAdminOrderNote),
  items: z.array(zAdminOrderItem),
});

export const zAdminOrderStatusUpdate = z.object({
  status: zAdminOrderStatus,
});

export const settingsSchema = z.object({
  general: z.object({
    storeName: z.string().min(1, 'Store name is required').max(100),
    storeUrl: z.string().url('Must be a valid URL'),
    contactEmail: z.string().email('Must be a valid email'),
    logo: z.union([z.instanceof(File), z.string()]).optional(),
  }),
  store: z.object({
    currency: z.string().min(1, 'Currency is required'),
    taxEnabled: z.boolean(),
    taxRate: z.number().min(0).max(100).default(0),
  }),
  payment: z.object({
    stripeEnabled: z.boolean(),
    paypalEnabled: z.boolean(),
    codEnabled: z.boolean(),
  }),
  shipping: z.object({
    flatRateEnabled: z.boolean(),
    freeShippingEnabled: z.boolean(),
    rates: z.array(z.object({
      method: z.string().min(1),
      cost: z.number().min(0),
      minOrderAmount: z.number().min(0).optional(),
    })),
  }),
  notifications: z.object({
    emailEnabled: z.boolean(),
    smsEnabled: z.boolean(),
    templates: z.array(z.object({
      type: z.string().min(1),
      subject: z.string().min(1),
      body: z.string().min(1),
    })),
  }),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

// ============================================================
// Admin RBAC Zod Schemas
// ============================================================

export const zAdminUserStatus = z.enum(['active', 'inactive', 'locked']);

export const adminUsersParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  search: z.string().trim().optional(),
  status: z.union([zAdminUserStatus, z.literal('all')]).optional(),
});

export const adminUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password must not exceed 100 characters'),
  roleIds: z.array(z.string().min(1)).min(1, 'At least one role is required'),
  isActive: z.boolean(),
});

export const adminUserUpdateSchema = z.object({
  id: z.string().min(1),
  email: z.string().email('Invalid email address').optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100).optional().or(z.literal('')),
  roleIds: z.array(z.string().min(1)).min(1, 'At least one role is required').optional(),
  isActive: z.boolean().optional(),
});

export const adminRoleSchema = z.object({
  name: z.string().min(2, 'Role name must be at least 2 characters').max(100, 'Role name must not exceed 100 characters'),
  description: z.string().min(1, 'Description is required').max(500),
  permissionIds: z.array(z.string().min(1)).min(1, 'At least one permission is required'),
});

export const adminRoleUpdateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  permissionIds: z.array(z.string().min(1)).min(1).optional(),
});

export const zLoginHistoryStatus = z.enum(['success', 'failed', 'locked']);

export const loginHistoryParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  status: z.union([zLoginHistoryStatus, z.literal('all')]).optional(),
});

export type AdminUserFormValues = z.infer<typeof adminUserSchema>;
export type AdminUserUpdateFormValues = z.infer<typeof adminUserUpdateSchema>;
export type AdminRoleFormValues = z.infer<typeof adminRoleSchema>;
