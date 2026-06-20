'use client';

import type { LoginHistoryRecord } from '@v8n/types';

interface LoginHistoryTableProps {
    records: LoginHistoryRecord[];
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

export function LoginHistoryTable({ records }: LoginHistoryTableProps) {
    return (
        <div className="hidden overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Timestamp
                            </th>
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Admin Email
                            </th>
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                IP Address
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                Status
                            </th>
                            <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                User Agent
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                        {records.map((record) => {
                            const dot = statusDot(record.status);
                            return (
                                <tr key={record.id} className="bg-white hover:bg-[#F9FAFB] transition-colors">
                                    <td className="px-6 py-4 text-[#111827]">
                                        {new Date(record.timestamp).toLocaleString('vi-VN', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-[#111827]">{record.adminEmail}</td>
                                    <td className="px-6 py-4 text-[#6B7280]">{record.ipAddress}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                            style={{ backgroundColor: `${dot.color}15`, color: dot.color }}
                                        >
                                            <span
                                                className="inline-block h-1.5 w-1.5 rounded-full"
                                                style={{ backgroundColor: dot.color }}
                                            />
                                            {dot.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#6B7280]">{record.userAgent}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
