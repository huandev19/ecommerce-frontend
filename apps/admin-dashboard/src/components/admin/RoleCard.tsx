'use client';

import type { AdminRole } from '@v8n/types';

interface RoleCardProps {
    role: AdminRole;
}

export function RoleCard({ role }: RoleCardProps) {
    return (
        <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <h3 className="text-sm font-bold text-[#111827]">{role.name}</h3>
                {role.isSystem && (
                    <span className="inline-flex shrink-0 rounded-md bg-[#FEF3C7] px-1.5 py-0.5 text-[10px] font-semibold text-[#B45309] border border-[#F59E0B]">
                        System
                    </span>
                )}
            </div>
            <p className="mt-1 text-xs text-[#6B7280]">{role.description}</p>
            <p className="mt-2 text-[11px] font-bold text-[#3B82F6]">
                {role.permissionCount} permissions
            </p>
        </div>
    );
}
