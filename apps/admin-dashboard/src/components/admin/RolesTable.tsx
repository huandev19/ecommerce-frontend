'use client';

import { Link } from '@/i18n/routing';
import type { AdminRole } from '@v8n/types';
import { Pencil, Lock } from 'lucide-react';

interface RolesTableProps {
    roles: AdminRole[];
}

export function RolesTable({ roles }: RolesTableProps) {
    return (
        <div className="hidden overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Role Name
                            </th>
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Description
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Permissions
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                        {roles.map((role) => (
                            <tr key={role.id} className="bg-white hover:bg-[#F9FAFB] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-[#111827]">{role.name}</span>
                                        {role.isSystem && (
                                            <span className="inline-flex rounded-md bg-[#FEF3C7] px-1.5 py-0.5 text-[10px] font-semibold text-[#B45309] border border-[#F59E0B]">
                                                System
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#6B7280]">{role.description}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-sm font-bold text-[#3B82F6]">{role.permissionCount}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-1">
                                        <Link
                                            href={`/admin/team/roles/${role.id}/edit`}
                                            className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#3B82F6] transition-colors"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                        {!role.isSystem && (
                                            <button
                                                type="button"
                                                className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#EF4444] transition-colors"
                                            >
                                                <Lock className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
