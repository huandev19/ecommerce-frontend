'use client';

import type { AdminUser } from '@v8n/types';

interface UserCardProps {
    user: AdminUser;
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

export function UserCard({ user, onDelete, isDeleting }: UserCardProps) {
    const badge = statusBadge(user.status);

    return (
        <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-[#111827]">{user.name}</h3>
                    <p className="mt-0.5 text-xs text-[#6B7280]">{user.email}</p>
                </div>
                <span
                    className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ backgroundColor: `${badge.color}15`, color: badge.color }}
                >
                    <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: badge.color }}
                    />
                    {badge.label}
                </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1">
                {user.roleNames.map((role) => (
                    <span
                        key={role}
                        className="inline-flex rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-medium text-[#3B82F6]"
                    >
                        {role}
                    </span>
                ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-[#F3F4F6] pt-3">
                <span className="text-[11px] text-[#9CA3AF]">
                    {user.lastLoginAt
                        ? `Last: ${new Date(user.lastLoginAt).toLocaleString('vi-VN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}`
                        : 'Never logged in'}
                </span>
                <div className="flex items-center gap-1">
                    <a
                        href={`/admin/team/users/${user.id}/edit`}
                        className="rounded-lg p-1.5 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#3B82F6] transition-colors"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </a>
                    <button
                        type="button"
                        onClick={() => onDelete(user.id)}
                        disabled={isDeleting}
                        className="rounded-lg p-1.5 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#EF4444] transition-colors"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
