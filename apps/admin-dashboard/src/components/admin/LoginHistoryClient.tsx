'use client';

import { useLoginHistory } from '@v8n/api/src/admin/queries';
import { AlertTriangle, Download, Loader2, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { LoginHistoryTable } from './LoginHistoryTable';
import { LoginHistoryCard } from './LoginHistoryCard';

export function LoginHistoryClient() {
    const [from, setFrom] = useState('2026-06-01');
    const [to, setTo] = useState('2026-06-19');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [page, setPage] = useState(1);

    const params = {
        page,
        limit: 10,
        from: from || undefined,
        to: to || undefined,
        status: statusFilter as 'success' | 'failed' | 'locked' | 'all',
    };

    const { data, isLoading, isError, error, refetch } = useLoginHistory(params);
    const records = data?.records ?? [];
    const totalPages = data?.totalPages ?? 1;

    // Show alert banner if any record is locked
    const hasLocked = records.some((r) => r.status === 'locked');

    return (
        <div className="space-y-6">
            {/* Breadcrumb (desktop) */}
            <div className="hidden text-sm text-[#6B7280] md:block">
                <span>Team</span>
                <span className="mx-2">/</span>
                <span className="font-medium text-[#111827]">Login History</span>
            </div>

            {/* Header */}
            <h1 className="text-xl font-bold text-[#111827] md:hidden">Login History</h1>

            {/* Alert Banner */}
            {hasLocked && (
                <div className="flex items-center gap-2 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-2.5 text-sm text-[#991B1B]">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    Account locked: 15 min cooldown
                </div>
            )}

            {/* Report card */}
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <h2 className="text-base font-bold text-[#111827]">Login History Report</h2>
                <p className="mt-0.5 text-xs text-[#6B7280]">
                    Track admin authentication attempts and detect suspicious activity.
                </p>

                {/* Filters */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => { setFrom(e.target.value); setPage(1); }}
                        className="h-10 rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-3 text-sm text-[#374151] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                        title="From date"
                    />
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => { setTo(e.target.value); setPage(1); }}
                        className="h-10 rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-3 text-sm text-[#374151] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                        title="To date"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        className="h-10 rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-3 text-sm text-[#374151] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                    >
                        <option value="all">All Status</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                        <option value="locked">Locked</option>
                    </select>
                    <div className="ml-auto flex items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB]"
                        >
                            <Download className="h-3.5 w-3.5" />
                            CSV
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB]"
                        >
                            <Download className="h-3.5 w-3.5" />
                            PDF
                        </button>
                    </div>
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
                        {(error as Error)?.message || 'Failed to load login history'}
                    </p>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#991B1B] border border-[#FECACA] hover:bg-[#FEF2F2]"
                    >
                        Retry
                    </button>
                </div>
            ) : records.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#D1D5DB] bg-white py-16">
                    <ShieldAlert className="mb-3 h-10 w-10 text-[#D1D5DB]" />
                    <p className="text-sm font-medium text-[#6B7280]">No login records found</p>
                    <p className="mt-1 text-xs text-[#9CA3AF]">Try adjusting your date range or filters</p>
                </div>
            ) : (
                <>
                    <LoginHistoryTable records={records} />
                    <div className="space-y-3 md:hidden">
                        {records.map((record) => (
                            <LoginHistoryCard key={record.id} record={record} />
                        ))}
                    </div>

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
