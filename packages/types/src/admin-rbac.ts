// Admin RBAC Types
export type AdminUserStatus = 'active' | 'inactive' | 'locked';

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    status: AdminUserStatus;
    roleIds: string[];
    roleNames: string[];
    lastLoginAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AdminUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: AdminUserStatus | 'all';
}

export interface AdminUsersResponse {
    users: AdminUser[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface AdminRole {
    id: string;
    name: string;
    description: string;
    isSystem: boolean;
    permissionCount: number;
    createdAt: string;
}

export interface AdminRolesResponse {
    roles: AdminRole[];
}

export interface AdminPermission {
    id: string;
    group: string;
    action: string;
    description: string;
}

export interface AdminPermissionsResponse {
    permissions: AdminPermission[];
}

export interface CreateAdminUserPayload {
    email: string;
    name: string;
    password: string;
    roleIds: string[];
    isActive: boolean;
}

export interface UpdateAdminUserPayload {
    id: string;
    email?: string;
    name?: string;
    password?: string;
    roleIds?: string[];
    isActive?: boolean;
}

export interface CreateAdminRolePayload {
    name: string;
    description: string;
    permissionIds: string[];
}

export interface UpdateAdminRolePayload {
    id: string;
    name?: string;
    description?: string;
    permissionIds?: string[];
}

export type LoginHistoryStatus = 'success' | 'failed' | 'locked';

export interface LoginHistoryRecord {
    id: string;
    timestamp: string;
    adminEmail: string;
    ipAddress: string;
    status: LoginHistoryStatus;
    userAgent: string;
}

export interface LoginHistoryParams {
    page?: number;
    limit?: number;
    from?: string;
    to?: string;
    status?: LoginHistoryStatus | 'all';
}

export interface LoginHistoryResponse {
    records: LoginHistoryRecord[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
