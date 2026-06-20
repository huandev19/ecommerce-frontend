'use client';

import { Link } from '@/i18n/routing';
import { useAdminUsers, useDeleteAdminUser } from '@v8n/api';
import { Loader2, Plus, Search, Users } from 'lucide-react';
import { useState } from 'react';
import { UsersTable } from './UsersTable';
import { UserCard } from './UserCard';

export function UsersListClient() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [page, setPage] = useState(1);

    const params = {
        page,
        limit: 10,
        search: search || undefined,
        status: statusFilter as 'active' | 'inactive' | 'locked' | 'all',
    };

    const { data, isLoading, isError, error, refetch } = useAdminUsers(params);
    const deleteMutation = useDeleteAdminUser();

    const users = data?.users ?? [];
    const totalPages = data?.totalPages ?? 1;
    const total = data?.total ?? 0;

    return (
        <div className="space-y-6">
            {/* Breadcrumb (desktop only) */}
            <div className="hidden text-sm text-[#6B7280] md:block">
                <span>Team</span>
                <span className="mx-2">/</span>
                <span className="font-medium text-[#111827]">Admin Users</span>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold text-[#111827] md:hidden">Admin Users</h1>
                    <p className="mt-0.5 hidden text-sm text-[#6B7280] md:block">
                        Manage admin accounts, assign roles, and monitor access.
                    </p>
                </div>
                <Link
                    href="/admin/team/users/new"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#2563EB] md:self-start"
                >
                    <Plus className="h-4 w-4" />
                    Add User
                </Link>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                        type="search"
                        placeholder="Search by email or name..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="h-10 w-full rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] pl-10 pr-4 text-sm text-[#111827] outline-none transition-colors focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        className="h-10 rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-4 text-sm text-[#374151] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                    >
                        <option value="all">Status: All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="locked">Locked</option>
                    </select>
                    <span className="text-xs text-[#6B7280] whitespace-nowrap">
                        {total} users
                    </span>
                </div>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-[#3B82F6]" />
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-[#FECACA] bg-[#FEF2F2] py-16">
                    <p className="text-sm font-medium text-[#991B1B]">
                        {(error as Error)?.message || 'Failed to load users'}
                    </p>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#991B1B] border border-[#FECACA] hover:bg-[#FEF2F2]"
                    >
                        Retry
                    </button>
                </div>
            ) : users.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#D1D5DB] bg-white py-16">
                    <Users className="mb-3 h-10 w-10 text-[#D1D5DB]" />
                    <p className="text-sm font-medium text-[#6B7280]">No users found</p>
                    <p className="mt-1 text-xs text-[#9CA3AF]">
                        {search || statusFilter !== 'all' ? 'Try adjusting your filters' : 'Click "Add User" to create one'}
                    </p>
                </div>
            ) : (
                <>
                    {/* Desktop: Table */}
                    <UsersTable
                        users={users}
                        onDelete={(id: string) => deleteMutation.mutate(id)}
                        isDeleting={deleteMutation.isPending}
                    />

                    {/* Mobile: Card list */}
                    <div className="space-y-3 md:hidden">
                        {users.map((user) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onDelete={(id: string) => deleteMutation.mutate(id)}
                                isDeleting={deleteMutation.isPending}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between pt-2">
                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-[#6B7280]">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
