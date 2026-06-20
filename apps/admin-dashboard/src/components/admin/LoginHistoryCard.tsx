'use client';

import type { LoginHistoryRecord } from '@v8n/types';

interface LoginHistoryCardProps {
    record: LoginHistoryRecord;
}

const statusDot = (status: LoginHistoryRecord['status']) => {
    switch (status) {
        case 'success':
            return { color: '#10B981', label: 'Success' };
        case 'failed':
            return { color: '#EF4444', label: 'Failed' };
        case 'locked':
            return { color: '#F59E0B', label: 'Locked' };
        default:
            return { color: '#6B7280', label: status };
    }
};

export function LoginHistoryCard({ record }: LoginHistoryCardProps) {
    const dot = statusDot(record.status);

    return (
        <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <span className="text-xs text-[#6B7280]">
                    {new Date(record.timestamp).toLocaleString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })}
                </span>
                <span
                    className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ backgroundColor: `${dot.color}15`, color: dot.color }}
                >
                    <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: dot.color }}
                    />
                    {dot.label}
                </span>
            </div>
            <p className="mt-1 text-sm font-bold text-[#111827]">{record.adminEmail}</p>
            <div className="mt-2 space-y-0.5">
                <p className="text-xs text-[#6B7280]">IP: {record.ipAddress}</p>
                <p className="text-xs text-[#6B7280]">{record.userAgent}</p>
            </div>
        </div>
    );
}
