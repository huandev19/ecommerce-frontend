"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Package, Calendar, ShoppingCart, CheckCircle, Truck, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@v8n/ui';
import { Button } from '@v8n/ui';
import { Order, OrderStatus } from '@v8n/types';
import { useOrders } from '@v8n/api';

// Status badge configuration
const statusConfig = {
    pending: {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#B45309]',
        border: 'border-[#F59E0B]',
        icon: AlertTriangle,
    },
    processing: {
        bg: 'bg-[#DBEAFE]',
        text: 'text-[#1E40AF]',
        border: 'border-[#3B82F6]',
        icon: AlertTriangle,
    },
    shipped: {
        bg: 'bg-[#DBEAFE]',
        text: 'text-[#1E40AF]',
        border: 'border-[#3B82F6]',
        icon: Truck,
    },
    delivered: {
        bg: 'bg-[#D1FAE5]',
        text: 'text-[#065F46]',
        border: 'border-[#10B981]',
        icon: CheckCircle,
    },
    cancelled: {
        bg: 'bg-[#FEE2E2]',
        text: 'text-[#991B1B]',
        border: 'border-[#EF4444]',
        icon: XCircle,
    },
};

interface OrdersListProps {
    initialPage?: number;
}

export default function OrdersList({ initialPage = 1 }: OrdersListProps) {
    const [page, setPage] = useState(initialPage);

    const { data, isLoading, error } = useOrders({ page });

    // Handle pagination changes
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Get current page data
    const orders = data?.orders || [];
    const totalPages = data?.totalPages || 1;

    // Loading skeleton for desktop table
    const DesktopSkeleton = () => (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#E5E7EB]">
                            <th className="text-left py-3 px-4 w-[120px]">Order #</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Items</th>
                            <th className="text-left py-3 px-4">Total</th>
                            <th className="text-right py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, i) => (
                            <tr key={i} className="border-b border-[#F9FAFB] hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Loading skeleton for mobile cards
    const MobileSkeleton = () => (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-[#E5E7EB]">
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-[#3B82F6] mb-2">
                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                                </div>
                                <div className="flex justify-between text-sm text-[#6B7280]">
                                    <div>
                                        <Calendar className="inline h-4 w-4 mr-1" />
                                        <div className="h-4 bg-gray-200 rounded w-24 inline"></div>
                                    </div>
                                    <div>
                                        <ShoppingCart className="inline h-4 w-4 mr-1" />
                                        <div className="h-4 bg-gray-200 rounded w-16 inline"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    // Status badge component
    const StatusBadge = ({ status }: { status: OrderStatus }) => {
        const config = statusConfig[status];
        if (!config) return null;

        const Icon = config.icon;

        return (
            <span className={`${config.bg} ${config.text} ${config.border} inline-flex items-center px-3 py-1 text-xs font-medium rounded-md`}>
                <Icon className="mr-1 h-3 w-3 inline" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // Empty state
    const EmptyState = () => (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-12 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-[#111827]">No orders yet</h3>
            <p className="mb-6 text-sm text-gray-500">
                You haven&apos;t placed any orders yet.
            </p>
            <Link
                href="/products"
                className="rounded-lg bg-[#3B82F6] px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
            >
                Start Shopping
            </Link>
        </div>
    );

    // Error state
    const ErrorState = () => (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 text-center">
            <AlertTriangle className="mx-auto mb-4 h-8 w-8 text-red-500" />
            <h3 className="mb-2 text-lg font-medium text-[#111827]">Error loading orders</h3>
            <p className="mb-4 text-sm text-gray-500">
                {error?.message || 'Failed to load your orders. Please try again.'}
            </p>
            <Button
                onClick={() => window.location.reload()}
                variant="default"
            >
                Retry
            </Button>
        </div>
    );

    // Desktop view
    const DesktopView = () => (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#E5E7EB]">
                            <th className="text-left py-3 px-4 w-[120px]">Order #</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Items</th>
                            <th className="text-left py-3 px-4">Total</th>
                            <th className="text-right py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: Order) => (
                            <tr key={order.id} className="border-b border-[#F9FAFB] hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    <Link
                                        href={`/account/orders/${order.id}`}
                                        className="text-[#3B82F6] font-medium hover:underline"
                                    >
                                        {order.orderNumber}
                                    </Link>
                                </td>
                                <td className="py-3 px-4">{order.date}</td>
                                <td className="py-3 px-4">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="py-3 px-4">{order.itemsCount}</td>
                                <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                                <td className="py-3 px-4 text-right">
                                    <Link
                                        href={`/account/orders/${order.id}`}
                                        className="text-[#3B82F6] text-sm font-medium hover:underline"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-end space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Previous
                    </Button>

                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                        const pageNum = i + 1;
                        return (
                            <Button
                                key={pageNum}
                                variant={pageNum === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        );
                    })}

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );

    // Mobile view
    const MobileView = () => (
        <div className="space-y-4">
            {orders.map((order: Order) => (
                <Card key={order.id} className="border-[#E5E7EB]">
                    <CardContent className="p-4">
                        <Link
                            href={`/account/orders/${order.id}`}
                            className="block"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-[#3B82F6] mb-2">
                                        {order.orderNumber}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <StatusBadge status={order.status} />
                                    </div>
                                    <div className="flex justify-between text-sm text-[#6B7280]">
                                        <div>
                                            <Calendar className="inline h-4 w-4 mr-1" />
                                            {order.date}
                                        </div>
                                        <div>
                                            <ShoppingCart className="inline h-4 w-4 mr-1" />
                                            {order.itemsCount} items
                                        </div>
                                    </div>
                                    <div className="mt-3 text-lg font-bold">
                                        ${order.total.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    // Render based on screen size
    return (
        <div className="w-full">
            {/* Desktop view */}
            <div className="hidden md:block">
                {isLoading ? <DesktopSkeleton /> : error ? <ErrorState /> : orders.length === 0 ? <EmptyState /> : <DesktopView />}
            </div>

            {/* Mobile view */}
            <div className="md:hidden">
                {isLoading ? <MobileSkeleton /> : error ? <ErrorState /> : orders.length === 0 ? <EmptyState /> : <MobileView />}
            </div>
        </div>
    );
}