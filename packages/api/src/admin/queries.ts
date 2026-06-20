import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminProduct, AdminProductsParams, AdminProductsResponse, CreateProductPayload, UpdateProductPayload, AdminOrdersResponse, AdminOrder, AdminOrderDetail, AdminUsersParams, AdminUsersResponse, CreateAdminUserPayload, UpdateAdminUserPayload, AdminUser, AdminRolesResponse, CreateAdminRolePayload, UpdateAdminRolePayload, LoginHistoryParams, LoginHistoryResponse } from '@v8n/types';
import { deleteAdminProduct, fetchAdminProducts, createAdminProduct, updateAdminProduct, fetchAdminProductById } from './catalog';
import { fetchAdminOrders, fetchAdminOrderById, updateOrderStatus } from './orders';
import { fetchAdminWorkflows, createWorkflow, updateWorkflow, deleteWorkflow, toggleWorkflowStatus } from './workflows';
import { fetchAdminSettings, updateAdminSettings } from './settings';
import { fetchAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser, fetchAdminUserById, fetchAdminRoles, createAdminRole, updateAdminRole, deleteAdminRole, fetchAdminPermissions, fetchLoginHistory } from './rbac';
import { WorkflowFormData, AdminSettings, SettingsFormData } from '@v8n/types';
export const adminProductsQueryKey = (params: AdminProductsParams = {}) => [
  'admin-products',
  params.page ?? 1,
  params.limit ?? 8,
  params.search ?? '',
  params.status ?? 'all',
  params.category ?? '',
  params.sortBy ?? 'createdAt',
  params.order ?? 'desc',
];

export const useAdminProducts = (params: AdminProductsParams = {}) => {
  return useQuery<AdminProductsResponse, Error>({
    queryKey: adminProductsQueryKey(params),
    queryFn: () => fetchAdminProducts(params),
    refetchOnWindowFocus: true,
    retry: 2,
    staleTime: 2 * 60 * 1000,
  });
};

export const useDeleteAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
};

export const useAdminProduct = (id: string) => {
  return useQuery<AdminProduct, Error>({
    queryKey: ['admin-product', id],
    queryFn: () => fetchAdminProductById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
};

export const useUpdateAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProductPayload }) => updateAdminProduct(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['admin-product', id] });
    },
  });
};

export const adminOrdersQueryKey = (params: { page?: number; limit?: number; search?: string; status?: string } = {}) => [
  'admin-orders',
  params.page ?? 1,
  params.limit ?? 10,
  params.search ?? '',
  params.status ?? 'all',
];

export const useAdminOrders = (params: { page?: number; limit?: number; search?: string; status?: string } = {}) => {
  return useQuery<AdminOrdersResponse, Error>({
    queryKey: adminOrdersQueryKey(params),
    queryFn: () => fetchAdminOrders(params),
    refetchOnWindowFocus: true,
    retry: 2,
    staleTime: 2 * 60 * 1000,
  });
};

export const useAdminOrder = (id: string) => {
  return useQuery<AdminOrderDetail, Error>({
    queryKey: ['admin-order', id],
    queryFn: () => fetchAdminOrderById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateOrderStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-order', id] });
    },
  });
};

export const adminWorkflowsQueryKey = () => ['admin-workflows'];

export const useAdminWorkflows = () => {
  return useQuery({
    queryKey: adminWorkflowsQueryKey(),
    queryFn: () => fetchAdminWorkflows(),
    refetchOnWindowFocus: true,
    retry: 2,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WorkflowFormData) => createWorkflow(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workflows'] });
    },
  });
};

export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: WorkflowFormData }) => updateWorkflow(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workflows'] });
    },
  });
};

export const useDeleteWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workflows'] });
    },
  });
};

export const useToggleWorkflowStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWorkflowStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workflows'] });
    },
  });
};

export const adminSettingsQueryKey = () => ['admin-settings'];

export const useAdminSettings = () => {
  return useQuery<AdminSettings, Error>({
    queryKey: adminSettingsQueryKey(),
    queryFn: () => fetchAdminSettings(),
    refetchOnWindowFocus: true,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SettingsFormData) => updateAdminSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
  });
};

// ============================================================
// Admin RBAC Users Queries
// ============================================================

export const adminUsersQueryKey = (params: AdminUsersParams = {}) => [
  'admin-users',
  params.page ?? 1,
  params.limit ?? 10,
  params.search ?? '',
  params.status ?? 'all',
];

export const useAdminUsers = (params: AdminUsersParams = {}) => {
  return useQuery<AdminUsersResponse, Error>({
    queryKey: adminUsersQueryKey(params),
    queryFn: () => fetchAdminUsers(params),
    refetchOnWindowFocus: true,
    retry: 2,
    staleTime: 2 * 60 * 1000,
  });
};

export const useAdminUser = (id: string) => {
  return useQuery<AdminUser, Error>({
    queryKey: ['admin-user', id],
    queryFn: () => fetchAdminUserById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAdminUserPayload) => createAdminUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateAdminUserPayload) => updateAdminUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdminUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

// ============================================================
// Admin RBAC Roles Queries
// ============================================================

export const adminRolesQueryKey = () => ['admin-roles'];

export const useAdminRoles = () => {
  return useQuery<AdminRolesResponse, Error>({
    queryKey: adminRolesQueryKey(),
    queryFn: () => fetchAdminRoles(),
    refetchOnWindowFocus: true,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAdminPermissions = () => {
  return useQuery<{ permissions: import('@v8n/types').AdminPermission[] }, Error>({
    queryKey: ['admin-permissions'],
    queryFn: () => fetchAdminPermissions(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateAdminRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAdminRolePayload) => createAdminRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
    },
  });
};

export const useUpdateAdminRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateAdminRolePayload) => updateAdminRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
    },
  });
};

export const useDeleteAdminRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdminRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
    },
  });
};

// ============================================================
// Login History Queries
// ============================================================

export const loginHistoryQueryKey = (params: LoginHistoryParams = {}) => [
  'login-history',
  params.page ?? 1,
  params.limit ?? 10,
  params.from ?? '',
  params.to ?? '',
  params.status ?? 'all',
];

export const useLoginHistory = (params: LoginHistoryParams = {}) => {
  return useQuery<LoginHistoryResponse, Error>({
    queryKey: loginHistoryQueryKey(params),
    queryFn: () => fetchLoginHistory(params),
    refetchOnWindowFocus: true,
    retry: 2,
    staleTime: 60 * 1000,
  });
};
