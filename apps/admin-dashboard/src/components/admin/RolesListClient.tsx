'use client';

import { Link } from '@/i18n/routing';
import { useAdminRoles } from '@v8n/api/src/admin/queries';
import { Loader2, Plus, Shield } from 'lucide-react';
import { useState } from 'react';
import { RolesTable } from './RolesTable';
import { RoleCard } from './RoleCard';

export function RolesListClient() {
    const [tab, setTab] = useState<'roles' | 'permissions'>('roles');
    const { data, isLoading, isError, error, refetch } = useAdminRoles();
    const roles = data?.roles ?? [];

    return (
        <div className="space-y-6">
            {/* Breadcrumb (desktop) */}
            <div className="hidden text-sm text-[#6B7280] md:block">
                <span>Settings</span>
                <span className="mx-2">/</span>
                <span className="font-medium text-[#111827]">Roles & Permissions</span>
            </div>

            {/* Header */}
            <h1 className="text-xl font-bold text-[#111827] md:hidden">Roles & Permissions</h1>

            {/* Tabs */}
            <div className="flex items-center border-b border-[#E5E7EB]">
                <div className="flex gap-0">
                    <button
                        type="button"
                        onClick={() => setTab('roles')}
                        className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${tab === 'roles'
                            ? 'text-[#3B82F6] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3B82F6]'
                            : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                    >
                        Roles List
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('permissions')}
                        className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${tab === 'permissions'
                            ? 'text-[#3B82F6] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3B82F6]'
                            : 'text-[#6B7280] hover:text-[#111827]'
                            }`}
                    >
                        Permission Matrix
                    </button>
                </div>
                <div className="ml-auto">
                    <Link
                        href="/admin/team/roles/new"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#3B82F6] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#2563EB]"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Add Role
                    </Link>
                </div>
            </div>

            {/* Content */}
            {tab === 'roles' ? (
                isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-[#3B82F6]" />
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-[#FECACA] bg-[#FEF2F2] py-16">
                        <p className="text-sm font-medium text-[#991B1B]">
                            {(error as Error)?.message || 'Failed to load roles'}
                        </p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#991B1B] border border-[#FECACA] hover:bg-[#FEF2F2]"
                        >
                            Retry
                        </button>
                    </div>
                ) : roles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#D1D5DB] bg-white py-16">
                        <Shield className="mb-3 h-10 w-10 text-[#D1D5DB]" />
                        <p className="text-sm font-medium text-[#6B7280]">No roles defined</p>
                        <p className="mt-1 text-xs text-[#9CA3AF]">Click "Add Role" to create one</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
                            <h2 className="text-base font-bold text-[#111827]">Roles</h2>
                            <p className="mt-0.5 text-xs text-[#6B7280]">
                                Define roles and their associated permissions.
                            </p>
                        </div>
                        {/* Desktop table */}
                        <RolesTable roles={roles} />
                        {/* Mobile cards */}
                        <div className="space-y-3 md:hidden">
                            {roles.map((role) => (
                                <RoleCard key={role.id} role={role} />
                            ))}
                        </div>
                    </div>
                )
            ) : (
                <div className="flex flex-col items-center justify-center py-20">
                    <Shield className="mb-3 h-10 w-10 text-[#D1D5DB]" />
                    <p className="text-sm font-medium text-[#6B7280]">Permission Matrix</p>
                    <p className="mt-1 text-xs text-[#9CA3AF]">Coming soon</p>
                </div>
            )}
        </div>
    );
}
