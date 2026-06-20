'use client';

import { Link } from '@/i18n/routing';
import type { AdminUser } from '@v8n/types';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface UsersTableProps {
    users: AdminUser[];
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

const statusBadge = (status: AdminUser['status']) => {
    switch (status) {
        case 'active':
            return { color: '#10B981', label: 'Active' };
        case 'inactive':
            return { color: '#6B7280', label: 'Inactive' };
        case 'locked':
            return { color: '#F59E0B', label: 'Locked' };
        default:
            return { color: '#6B7280', label: status };
    }
};

export function UsersTable({ users, onDelete, isDeleting }: UsersTableProps) {
    const [confirmId, setConfirmId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        if (confirmId === id) {
            onDelete(id);
            setConfirmId(null);
        } else {
            setConfirmId(id);
        }
    };

    return (
        <div className="hidden overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Email
                            </th>
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Name
                            </th>
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Status
                            </th>
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Roles
                            </th>
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Last Login
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                        {users.map((user) => {
                            const badge = statusBadge(user.status);
                            return (
                                <tr key={user.id} className="bg-white hover:bg-[#F9FAFB] transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#111827]">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 text-[#111827]">{user.name}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                            style={{ backgroundColor: `${badge.color}15`, color: badge.color }}
                                        >
                                            <span
                                                className="inline-block h-1.5 w-1.5 rounded-full"
                                                style={{ backgroundColor: badge.color }}
                                            />
                                            {badge.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {user.roleNames.map((role) => (
                                                <span
                                                    key={role}
                                                    className="inline-flex rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-medium text-[#3B82F6]"
                                                >
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#9CA3AF]">
                                        {user.lastLoginAt
                                            ? new Date(user.lastLoginAt).toLocaleString('vi-VN', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })
                                            : 'Never'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/admin/team/users/${user.id}/edit`}
                                                className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#3B82F6] transition-colors"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(user.id)}
                                                disabled={isDeleting}
                                                className={`rounded-lg p-2 transition-colors ${confirmId === user.id
                                                        ? 'bg-[#FEE2E2] text-[#EF4444] hover:bg-[#FECACA]'
                                                        : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#EF4444]'
                                                    }`}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
