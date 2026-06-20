'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight, Loader2, Search, Download } from 'lucide-react';
import { useAdminOrders } from '@v8n/api';
import type { zAdminOrderStatus } from '@v8n/api';
import { Button, Card, CardContent, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@v8n/ui';
import type { z } from 'zod';

const PAGE_SIZE = 10;

type OrderStatus = z.infer<typeof zAdminOrderStatus>;

const statusTabs: Array<{ label: string; value: OrderStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

export function OrdersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<OrderStatus | 'all'>('all');

  const { data, isLoading, isError, error, refetch, isFetching } = useAdminOrders({
    page,
    limit: PAGE_SIZE,
    search,
    status,
  });

  const orders = data?.orders ?? [];

  const summaryText = useMemo(() => {
    if (!data || data.total === 0) {
      return 'No orders found';
    }

    const start = (data.page - 1) * data.limit + 1;
    const end = Math.min(start + orders.length - 1, data.total);
    return `Showing ${start}-${end} of ${data.total} orders`;
  }, [data, orders.length]);

  const statusBadgeColor = (orderStatus: OrderStatus) => {
    switch (orderStatus) {
      case 'pending':
        return 'bg-[#FEF3C7] text-[#B45309] border-none';
      case 'processing':
      case 'shipped':
        return 'bg-[#DBEAFE] text-[#1E40AF] border-none';
      case 'delivered':
        return 'bg-[#D1FAE5] text-[#065F46] border-none';
      case 'cancelled':
        return 'bg-[#FEE2E2] text-[#991B1B] border-none';
      default:
        return 'bg-gray-100 text-gray-800 border-none';
    }
  };

  const handleExport = () => {
    alert('Export functionality will be implemented in the future.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] md:text-3xl">Orders</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Manage customer orders, track shipments, and process refunds.</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="inline-flex h-11 items-center justify-center rounded-lg border-[#E5E7EB] px-5 text-sm font-semibold text-[#374151] transition hover:bg-[#F9FAFB]">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card className="border-[#E5E7EB] bg-white shadow-none">
        <CardContent className="space-y-4 p-0 md:p-0">

          <div className="border-b border-[#E5E7EB]">
            <div className="flex overflow-x-auto px-4 md:px-6">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setPage(1);
                    setStatus(tab.value);
                  }}
                  className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${status === tab.value
                      ? 'border-[#3B82F6] text-[#3B82F6]'
                      : 'border-transparent text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#374151]'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-6 space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                <Input
                  value={search}
                  onChange={(event) => {
                    setPage(1);
                    setSearch(event.target.value);
                  }}
                  placeholder="Search by order number or customer name"
                  className="border-[#E5E7EB] bg-white pl-10 w-full"
                />
              </div>
              <div className="text-sm text-[#6B7280] hidden md:block">{isFetching ? 'Refreshing…' : summaryText}</div>
            </div>

            {isError ? (
              <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-6 text-sm text-[#991B1B]">
                <p className="font-semibold">Unable to load orders.</p>
                <p className="mt-1">{error.message}</p>
                <Button className="mt-4" onClick={() => void refetch()}>
                  Retry
                </Button>
              </div>
            ) : null}

            {isLoading ? (
              <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-dashed border-[#E5E7EB] bg-[#F9FAFB]">
                <Loader2 className="h-6 w-6 animate-spin text-[#3B82F6]" />
              </div>
            ) : null}

            {!isLoading && !isError ? (
              <>
                <div className="hidden overflow-hidden rounded-xl border border-[#E5E7EB] md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-white bg-[#F9FAFB]">
                        <TableHead>Order #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <span className="font-semibold text-[#3B82F6]">{order.orderNumber}</span>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-[#111827]">{order.customerName}</div>
                            <div className="text-xs text-[#6B7280]">{order.customerEmail}</div>
                          </TableCell>
                          <TableCell>
                            <span className="text-[#374151]">{new Date(order.date).toLocaleDateString()}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-[#374151]">{order.itemsCount} items</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-[#111827]">
                              ${order.total.toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeColor(order.status)} border ${order.status === 'pending' ? 'border-[#F59E0B]' : order.status === 'processing' || order.status === 'shipped' ? 'border-[#3B82F6]' : order.status === 'delivered' ? 'border-[#10B981]' : 'border-[#EF4444]'}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/admin/orders/${order.id}`} className="inline-flex h-8 items-center justify-center rounded text-sm font-medium text-[#3B82F6] hover:underline">
                              View
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-3 md:hidden">
                  {orders.map((order) => (
                    <Link key={order.id} href={`/admin/orders/${order.id}`} className="block">
                      <Card className="border-[#E5E7EB] bg-white shadow-none hover:bg-[#F9FAFB] transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <h2 className="text-base font-semibold text-[#3B82F6]">{order.orderNumber}</h2>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeColor(order.status)} border ${order.status === 'pending' ? 'border-[#F59E0B]' : order.status === 'processing' || order.status === 'shipped' ? 'border-[#3B82F6]' : order.status === 'delivered' ? 'border-[#10B981]' : 'border-[#EF4444]'}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>

                          <div className="mt-3">
                            <p className="font-medium text-[#111827]">{order.customerName}</p>
                            <p className="text-sm text-[#6B7280]">{order.customerEmail}</p>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-xs text-[#6B7280]">Date</p>
                              <p className="mt-1 font-medium text-[#374151]">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#6B7280]">Items</p>
                              <p className="mt-1 font-medium text-[#374151]">{order.itemsCount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#6B7280]">Total</p>
                              <p className="mt-1 font-semibold text-[#111827]">${order.total.toLocaleString()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {orders.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-6 py-12 text-center">
                    <h2 className="text-lg font-semibold text-[#111827]">No orders match this filter</h2>
                    <p className="mt-2 text-sm text-[#6B7280]">Try another keyword or switch status to view more results.</p>
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 border-t border-[#E5E7EB] pt-4 md:flex-row md:items-center md:justify-between">
                  <div className="text-sm text-[#6B7280] md:hidden">{isFetching ? 'Refreshing…' : summaryText}</div>
                  <div className="flex items-center justify-between gap-3 md:w-full md:justify-end">
                    <Button variant="outline" onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))} disabled={page === 1}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm font-medium text-[#111827]">
                      Page {data?.page ?? 1} of {Math.max(data?.totalPages ?? 1, 1)}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage((currentPage) => (data && currentPage < data.totalPages ? currentPage + 1 : currentPage))}
                      disabled={!data || page >= data.totalPages}
                    >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
