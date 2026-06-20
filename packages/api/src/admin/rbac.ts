import type {
    AdminUser,
    AdminUsersParams,
    AdminUsersResponse,
    AdminRole,
    AdminRolesResponse,
    AdminPermission,
    AdminPermissionsResponse,
    CreateAdminUserPayload,
    UpdateAdminUserPayload,
    CreateAdminRolePayload,
    UpdateAdminRolePayload,
    LoginHistoryRecord,
    LoginHistoryParams,
    LoginHistoryResponse,
} from '@v8n/types';
import {
    adminUserSchema,
    adminRoleSchema,
    adminUsersParamsSchema,
    loginHistoryParamsSchema,
} from './zod-schemas';

// ============================================================
// Centralized Mock Data
// ============================================================

const ALL_MOCK_USERS: AdminUser[] = [
    {
        id: 'user-1',
        email: 'admin@v8nstore.com',
        name: 'John Nguyen',
        status: 'active',
        roleIds: ['role-1'],
        roleNames: ['Super Admin'],
        lastLoginAt: '2026-06-19T08:15:00Z',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-06-19T08:15:00Z',
    },
    {
        id: 'user-2',
        email: 'catalog@v8nstore.com',
        name: 'Alice Tran',
        status: 'active',
        roleIds: ['role-2'],
        roleNames: ['Catalog Manager'],
        lastLoginAt: '2026-06-18T16:42:00Z',
        createdAt: '2026-02-15T00:00:00Z',
        updatedAt: '2026-06-18T16:42:00Z',
    },
    {
        id: 'user-3',
        email: 'order@v8nstore.com',
        name: 'Bob Le',
        status: 'active',
        roleIds: ['role-3'],
        roleNames: ['Order Manager'],
        lastLoginAt: '2026-06-17T09:30:00Z',
        createdAt: '2026-03-10T00:00:00Z',
        updatedAt: '2026-06-17T09:30:00Z',
    },
    {
        id: 'user-4',
        email: 'viewer@v8nstore.com',
        name: 'Carol Pham',
        status: 'locked',
        roleIds: ['role-4'],
        roleNames: ['Viewer'],
        lastLoginAt: null,
        createdAt: '2026-04-01T00:00:00Z',
        updatedAt: '2026-06-19T07:55:00Z',
    },
    {
        id: 'user-5',
        email: 'marketing@v8nstore.com',
        name: 'David Hoang',
        status: 'inactive',
        roleIds: ['role-5'],
        roleNames: ['Marketing Manager'],
        lastLoginAt: '2026-05-20T11:00:00Z',
        createdAt: '2026-05-01T00:00:00Z',
        updatedAt: '2026-05-20T11:00:00Z',
    },
    {
        id: 'user-6',
        email: 'support1@v8nstore.com',
        name: 'Eve Nguyen',
        status: 'active',
        roleIds: ['role-6'],
        roleNames: ['Support Agent'],
        lastLoginAt: '2026-06-19T07:00:00Z',
        createdAt: '2026-04-15T00:00:00Z',
        updatedAt: '2026-06-19T07:00:00Z',
    },
    {
        id: 'user-7',
        email: 'support2@v8nstore.com',
        name: 'Frank Tran',
        status: 'active',
        roleIds: ['role-6'],
        roleNames: ['Support Agent'],
        lastLoginAt: '2026-06-18T14:20:00Z',
        createdAt: '2026-04-20T00:00:00Z',
        updatedAt: '2026-06-18T14:20:00Z',
    },
    {
        id: 'user-8',
        email: 'warehouse@v8nstore.com',
        name: 'Grace Le',
        status: 'active',
        roleIds: ['role-7'],
        roleNames: ['Warehouse Staff'],
        lastLoginAt: '2026-06-19T06:45:00Z',
        createdAt: '2026-05-10T00:00:00Z',
        updatedAt: '2026-06-19T06:45:00Z',
    },
    {
        id: 'user-9',
        email: 'finance@v8nstore.com',
        name: 'Henry Vu',
        status: 'active',
        roleIds: ['role-8'],
        roleNames: ['Finance Manager'],
        lastLoginAt: '2026-06-19T08:00:00Z',
        createdAt: '2026-03-01T00:00:00Z',
        updatedAt: '2026-06-19T08:00:00Z',
    },
    {
        id: 'user-10',
        email: 'content@v8nstore.com',
        name: 'Ivy Dang',
        status: 'inactive',
        roleIds: ['role-9'],
        roleNames: ['Content Editor'],
        lastLoginAt: '2026-05-15T10:00:00Z',
        createdAt: '2026-05-05T00:00:00Z',
        updatedAt: '2026-05-15T10:00:00Z',
    },
    {
        id: 'user-11',
        email: 'seo@v8nstore.com',
        name: 'Jack Bui',
        status: 'active',
        roleIds: ['role-9'],
        roleNames: ['Content Editor'],
        lastLoginAt: '2026-06-18T09:10:00Z',
        createdAt: '2026-06-01T00:00:00Z',
        updatedAt: '2026-06-18T09:10:00Z',
    },
    {
        id: 'user-12',
        email: 'reports@v8nstore.com',
        name: 'Kate Mai',
        status: 'active',
        roleIds: ['role-4'],
        roleNames: ['Viewer'],
        lastLoginAt: '2026-06-19T05:30:00Z',
        createdAt: '2026-06-10T00:00:00Z',
        updatedAt: '2026-06-19T05:30:00Z',
    },
];

// ---- Roles mock data (single source) ----
const ALL_MOCK_ROLES: AdminRole[] = [
    { id: 'role-1', name: 'Super Admin', description: 'Full access to all resources', isSystem: true, permissionCount: 25, createdAt: '2026-01-01T00:00:00Z' },
    { id: 'role-2', name: 'Catalog Manager', description: 'Manage products and categories', isSystem: true, permissionCount: 8, createdAt: '2026-01-01T00:00:00Z' },
    { id: 'role-3', name: 'Order Manager', description: 'Manage orders, returns, refunds', isSystem: false, permissionCount: 12, createdAt: '2026-02-01T00:00:00Z' },
    { id: 'role-4', name: 'Viewer', description: 'Read-only access to reports', isSystem: true, permissionCount: 3, createdAt: '2026-01-01T00:00:00Z' },
    { id: 'role-5', name: 'Marketing Manager', description: 'Manage campaigns and promotions', isSystem: false, permissionCount: 6, createdAt: '2026-03-01T00:00:00Z' },
    { id: 'role-6', name: 'Support Agent', description: 'Handle customer inquiries', isSystem: false, permissionCount: 5, createdAt: '2026-04-01T00:00:00Z' },
    { id: 'role-7', name: 'Warehouse Staff', description: 'Manage inventory and shipments', isSystem: false, permissionCount: 7, createdAt: '2026-05-01T00:00:00Z' },
    { id: 'role-8', name: 'Finance Manager', description: 'Manage payments and invoices', isSystem: false, permissionCount: 9, createdAt: '2026-03-15T00:00:00Z' },
    { id: 'role-9', name: 'Content Editor', description: 'Edit store content and pages', isSystem: false, permissionCount: 4, createdAt: '2026-05-01T00:00:00Z' },
];

// ---- Permissions mock data (single source) ----
const ALL_MOCK_PERMISSIONS: AdminPermission[] = [
    { id: 'perm-1', group: 'Products', action: 'products.view', description: 'View products' },
    { id: 'perm-2', group: 'Products', action: 'products.create', description: 'Create products' },
    { id: 'perm-3', group: 'Products', action: 'products.edit', description: 'Edit products' },
    { id: 'perm-4', group: 'Products', action: 'products.delete', description: 'Delete products' },
    { id: 'perm-5', group: 'Orders', action: 'orders.view', description: 'View orders' },
    { id: 'perm-6', group: 'Orders', action: 'orders.edit', description: 'Edit orders' },
    { id: 'perm-7', group: 'Orders', action: 'orders.delete', description: 'Delete orders' },
    { id: 'perm-8', group: 'Users', action: 'users.view', description: 'View users' },
    { id: 'perm-9', group: 'Users', action: 'users.create', description: 'Create users' },
    { id: 'perm-10', group: 'Users', action: 'users.edit', description: 'Edit users' },
    { id: 'perm-11', group: 'Users', action: 'users.delete', description: 'Delete users' },
    { id: 'perm-12', group: 'Roles', action: 'roles.view', description: 'View roles' },
    { id: 'perm-13', group: 'Roles', action: 'roles.create', description: 'Create roles' },
    { id: 'perm-14', group: 'Roles', action: 'roles.edit', description: 'Edit roles' },
    { id: 'perm-15', group: 'Roles', action: 'roles.delete', description: 'Delete roles' },
    { id: 'perm-16', group: 'Settings', action: 'settings.view', description: 'View settings' },
    { id: 'perm-17', group: 'Settings', action: 'settings.edit', description: 'Edit settings' },
    { id: 'perm-18', group: 'Reports', action: 'reports.view', description: 'View reports' },
    { id: 'perm-19', group: 'Reports', action: 'reports.export', description: 'Export reports' },
    { id: 'perm-20', group: 'Workflows', action: 'workflows.view', description: 'View workflows' },
    { id: 'perm-21', group: 'Workflows', action: 'workflows.edit', description: 'Edit workflows' },
    { id: 'perm-22', group: 'Marketing', action: 'marketing.view', description: 'View campaigns' },
    { id: 'perm-23', group: 'Marketing', action: 'marketing.edit', description: 'Edit campaigns' },
    { id: 'perm-24', group: 'Finance', action: 'finance.view', description: 'View financial data' },
    { id: 'perm-25', group: 'Finance', action: 'finance.edit', description: 'Edit financial data' },
];

// ---- Login History mock data (single source) ----
const ALL_MOCK_LOGIN_HISTORY: LoginHistoryRecord[] = [
    { id: 'log-1', timestamp: '2026-06-19T08:15:22Z', adminEmail: 'admin@v8nstore.com', ipAddress: '192.168.1.100', status: 'success', userAgent: 'Chrome / macOS' },
    { id: 'log-2', timestamp: '2026-06-19T07:58:05Z', adminEmail: 'catalog@v8nstore.com', ipAddress: '10.0.0.55', status: 'failed', userAgent: 'Firefox / Windows' },
    { id: 'log-3', timestamp: '2026-06-19T07:55:12Z', adminEmail: 'viewer@v8nstore.com', ipAddress: '10.0.0.55', status: 'locked', userAgent: 'Chrome / macOS' },
    { id: 'log-4', timestamp: '2026-06-18T16:42:30Z', adminEmail: 'admin@v8nstore.com', ipAddress: '172.16.0.20', status: 'success', userAgent: 'Safari / iOS' },
    { id: 'log-5', timestamp: '2026-06-18T14:20:10Z', adminEmail: 'support2@v8nstore.com', ipAddress: '192.168.1.105', status: 'success', userAgent: 'Chrome / Windows' },
    { id: 'log-6', timestamp: '2026-06-18T11:05:33Z', adminEmail: 'order@v8nstore.com', ipAddress: '172.16.0.30', status: 'success', userAgent: 'Edge / Windows' },
    { id: 'log-7', timestamp: '2026-06-18T09:10:45Z', adminEmail: 'seo@v8nstore.com', ipAddress: '192.168.1.110', status: 'failed', userAgent: 'Chrome / macOS' },
    { id: 'log-8', timestamp: '2026-06-17T16:30:00Z', adminEmail: 'catalog@v8nstore.com', ipAddress: '10.0.0.55', status: 'failed', userAgent: 'Firefox / Windows' },
    { id: 'log-9', timestamp: '2026-06-17T09:30:00Z', adminEmail: 'order@v8nstore.com', ipAddress: '172.16.0.30', status: 'success', userAgent: 'Edge / Windows' },
    { id: 'log-10', timestamp: '2026-06-16T15:22:18Z', adminEmail: 'unknown@v8nstore.com', ipAddress: '203.0.113.45', status: 'failed', userAgent: 'Chrome / Linux' },
    { id: 'log-11', timestamp: '2026-06-16T14:10:05Z', adminEmail: 'warehouse@v8nstore.com', ipAddress: '192.168.1.120', status: 'success', userAgent: 'Chrome / macOS' },
    { id: 'log-12', timestamp: '2026-06-15T08:00:00Z', adminEmail: 'viewer@v8nstore.com', ipAddress: '10.0.0.55', status: 'failed', userAgent: 'Firefox / Windows' },
];

// ============================================================
// Admin Users API
// ============================================================

export const fetchAdminUsers = async (params: AdminUsersParams = {}): Promise<AdminUsersResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const validated = adminUsersParamsSchema.parse(params);
                const page = validated.page ?? 1;
                const limit = validated.limit ?? 10;

                let filtered = [...ALL_MOCK_USERS];

                if (validated.search) {
                    const s = validated.search.toLowerCase();
                    filtered = filtered.filter(
                        (u) => u.email.toLowerCase().includes(s) || u.name.toLowerCase().includes(s),
                    );
                }

                if (validated.status && validated.status !== 'all') {
                    filtered = filtered.filter((u) => u.status === validated.status);
                }

                const total = filtered.length;
                const totalPages = Math.ceil(total / limit);
                const start = (page - 1) * limit;
                const users = filtered.slice(start, start + limit);

                resolve({ users, total, page, limit, totalPages });
            } catch (error) {
                reject(error);
            }
        }, 400);
    });
};

export const fetchAdminUserById = async (id: string): Promise<AdminUser> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = ALL_MOCK_USERS.find((u) => u.id === id);
            if (!user) {
                reject(new Error('User not found'));
                return;
            }
            resolve(JSON.parse(JSON.stringify(user)));
        }, 300);
    });
};

export const createAdminUser = async (payload: CreateAdminUserPayload): Promise<AdminUser> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const validated = adminUserSchema.parse(payload);
                const existing = ALL_MOCK_USERS.find((u) => u.email === validated.email);
                if (existing) {
                    reject(new Error('Email already exists'));
                    return;
                }

                const roleNames = validated.roleIds
                    .map((rid) => ALL_MOCK_ROLES.find((r) => r.id === rid)?.name ?? '')
                    .filter(Boolean);

                const newUser: AdminUser = {
                    id: `user-${Date.now()}`,
                    email: validated.email,
                    name: validated.name,
                    status: validated.isActive ? 'active' : 'inactive',
                    roleIds: validated.roleIds,
                    roleNames,
                    lastLoginAt: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                ALL_MOCK_USERS.push(newUser);
                resolve(JSON.parse(JSON.stringify(newUser)));
            } catch (error) {
                reject(error);
            }
        }, 500);
    });
};

export const updateAdminUser = async (payload: UpdateAdminUserPayload): Promise<AdminUser> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idx = ALL_MOCK_USERS.findIndex((u) => u.id === payload.id);
            if (idx === -1) {
                reject(new Error('User not found'));
                return;
            }

            const existing = ALL_MOCK_USERS[idx];
            if (payload.email && payload.email !== existing.email) {
                const dup = ALL_MOCK_USERS.find((u) => u.email === payload.email && u.id !== payload.id);
                if (dup) {
                    reject(new Error('Email already exists'));
                    return;
                }
            }

            const roleNames =
                payload.roleIds
                    ?.map((rid) => ALL_MOCK_ROLES.find((r) => r.id === rid)?.name ?? '')
                    .filter(Boolean) ?? existing.roleNames;

            const updated: AdminUser = {
                ...existing,
                email: payload.email ?? existing.email,
                name: payload.name ?? existing.name,
                roleIds: payload.roleIds ?? existing.roleIds,
                roleNames,
                status: payload.isActive !== undefined ? (payload.isActive ? 'active' : 'inactive') : existing.status,
                updatedAt: new Date().toISOString(),
            };

            ALL_MOCK_USERS[idx] = updated;
            resolve(JSON.parse(JSON.stringify(updated)));
        }, 500);
    });
};

export const deleteAdminUser = async (id: string): Promise<{ success: boolean; id: string }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idx = ALL_MOCK_USERS.findIndex((u) => u.id === id);
            if (idx === -1) {
                reject(new Error('User not found'));
                return;
            }
            ALL_MOCK_USERS.splice(idx, 1);
            resolve({ success: true, id });
        }, 400);
    });
};

// ============================================================
// Admin Roles API
// ============================================================

export const fetchAdminRoles = async (): Promise<AdminRolesResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ roles: JSON.parse(JSON.stringify(ALL_MOCK_ROLES)) });
        }, 300);
    });
};

export const fetchAdminPermissions = async (): Promise<AdminPermissionsResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ permissions: JSON.parse(JSON.stringify(ALL_MOCK_PERMISSIONS)) });
        }, 300);
    });
};

export const createAdminRole = async (payload: CreateAdminRolePayload): Promise<AdminRole> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const validated = adminRoleSchema.parse(payload);
                const newRole: AdminRole = {
                    id: `role-${Date.now()}`,
                    name: validated.name,
                    description: validated.description,
                    isSystem: false,
                    permissionCount: validated.permissionIds.length,
                    createdAt: new Date().toISOString(),
                };
                ALL_MOCK_ROLES.push(newRole);
                resolve(JSON.parse(JSON.stringify(newRole)));
            } catch (error) {
                reject(error);
            }
        }, 400);
    });
};

export const updateAdminRole = async (payload: UpdateAdminRolePayload): Promise<AdminRole> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idx = ALL_MOCK_ROLES.findIndex((r) => r.id === payload.id);
            if (idx === -1) {
                reject(new Error('Role not found'));
                return;
            }

            const existing = ALL_MOCK_ROLES[idx];
            const updated: AdminRole = {
                ...existing,
                name: payload.name ?? existing.name,
                description: payload.description ?? existing.description,
                permissionCount: payload.permissionIds ? payload.permissionIds.length : existing.permissionCount,
            };

            ALL_MOCK_ROLES[idx] = updated;
            resolve(JSON.parse(JSON.stringify(updated)));
        }, 400);
    });
};

export const deleteAdminRole = async (id: string): Promise<{ success: boolean; id: string }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const role = ALL_MOCK_ROLES.find((r) => r.id === id);
            if (!role) {
                reject(new Error('Role not found'));
                return;
            }
            if (role.isSystem) {
                reject(new Error('Cannot delete system roles'));
                return;
            }
            const idx = ALL_MOCK_ROLES.findIndex((r) => r.id === id);
            ALL_MOCK_ROLES.splice(idx, 1);
            resolve({ success: true, id });
        }, 400);
    });
};

// ============================================================
// Login History API
// ============================================================

export const fetchLoginHistory = async (params: LoginHistoryParams = {}): Promise<LoginHistoryResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const validated = loginHistoryParamsSchema.parse(params);
                const page = validated.page ?? 1;
                const limit = validated.limit ?? 10;

                let filtered = [...ALL_MOCK_LOGIN_HISTORY];

                if (validated.from) {
                    const fromDate = new Date(validated.from);
                    filtered = filtered.filter((r) => new Date(r.timestamp) >= fromDate);
                }

                if (validated.to) {
                    const toDate = new Date(validated.to);
                    toDate.setHours(23, 59, 59, 999);
                    filtered = filtered.filter((r) => new Date(r.timestamp) <= toDate);
                }

                if (validated.status && validated.status !== 'all') {
                    filtered = filtered.filter((r) => r.status === validated.status);
                }

                const total = filtered.length;
                const totalPages = Math.ceil(total / limit);
                const start = (page - 1) * limit;
                const records = filtered.slice(start, start + limit);

                resolve({ records, total, page, limit, totalPages });
            } catch (error) {
                reject(error);
            }
        }, 400);
    });
};
