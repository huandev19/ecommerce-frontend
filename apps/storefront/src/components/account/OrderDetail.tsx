"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    Clock,
    CreditCard,
    MapPin,
    Package,
    Truck,
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@v8n/ui';
import { OrderDetail as OrderDetailType, OrderStatus } from '@v8n/types';
import { useOrder } from '@v8n/api';

interface OrderDetailProps {
    orderId: string;
}

const statusConfig: Record<OrderStatus, { bg: string; text: string; border: string; icon: typeof Clock }> = {
    pending: {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#B45309]',
        border: 'border-[#F59E0B]',
        icon: Clock,
    },
    processing: {
        bg: 'bg-[#DBEAFE]',
        text: 'text-[#1E40AF]',
        border: 'border-[#3B82F6]',
        icon: Package,
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
        icon: AlertCircle,
    },
};

const paymentStatusLabel: Record<OrderDetailType['payment']['status'], string> = {
    pending: 'Pending',
    paid: 'Paid',
    failed: 'Failed',
    refunded: 'Refunded',
};

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const formatStatusLabel = (status: string) => status.charAt(0).toUpperCase() + status.slice(1);

const StatusBadge = ({ status }: { status: OrderStatus }) => {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs font-medium ${config.bg} ${config.text} ${config.border}`}>
            <Icon className="h-3.5 w-3.5" />
            {formatStatusLabel(status)}
        </span>
    );
};

const OrderDetailSkeleton = () => (
    <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <div className="space-y-6">
                {[0, 1, 2].map((item) => (
                    <div key={item} className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                        <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
                        <div className="space-y-3">
                            {[0, 1, 2].map((row) => (
                                <div key={row} className="h-16 animate-pulse rounded bg-gray-100" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="space-y-6">
                {[0, 1].map((item) => (
                    <div key={item} className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200" />
                        <div className="space-y-3">
                            {[0, 1, 2, 3].map((row) => (
                                <div key={row} className="h-5 animate-pulse rounded bg-gray-100" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const NotFoundState = () => (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center">
        <AlertCircle className="mx-auto mb-4 h-10 w-10 text-[#EF4444]" />
        <h2 className="mb-2 text-xl font-semibold text-[#111827]">Order not found</h2>
        <p className="mb-6 text-sm text-[#6B7280]">We couldn&apos;t find the order you are looking for.</p>
        <Link href="/account/orders" className="inline-flex items-center rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
            Back to Orders
        </Link>
    </div>
);

const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center">
        <AlertCircle className="mx-auto mb-4 h-10 w-10 text-[#EF4444]" />
        <h2 className="mb-2 text-xl font-semibold text-[#111827]">Unable to load order</h2>
        <p className="mb-6 text-sm text-[#6B7280]">{message}</p>
        <div className="flex items-center justify-center gap-3">
            <Button onClick={onRetry}>Retry</Button>
            <Link href="/account/orders" className="inline-flex items-center rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#111827] transition-colors hover:bg-gray-50">
                Back to Orders
            </Link>
        </div>
    </div>
);

const OrderSummary = ({ order }: { order: OrderDetailType }) => (
    <Card className="border-[#E5E7EB] shadow-none">
        <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#111827]">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-[#111827]">
            <div className="flex items-center justify-between text-[#6B7280]">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-[#6B7280]">
                <span>Shipping</span>
                <span>{formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex items-center justify-between text-[#6B7280]">
                <span>Tax</span>
                <span>{formatCurrency(order.tax)}</span>
            </div>
            {typeof order.discount === 'number' && order.discount > 0 && (
                <div className="flex items-center justify-between text-[#6B7280]">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount)}</span>
                </div>
            )}
            <div className="border-t border-[#E5E7EB] pt-4">
                <div className="flex items-center justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                </div>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-sm">
                <div className="mb-2 flex items-center gap-2 text-[#111827]">
                    <CreditCard className="h-4 w-4 text-[#3B82F6]" />
                    <span className="font-medium">{order.payment.method}</span>
                </div>
                <p className="text-[#6B7280]">Payment status: {paymentStatusLabel[order.payment.status]}</p>
                {order.payment.transactionId && (
                    <p className="mt-1 text-xs text-[#6B7280]">Transaction ID: {order.payment.transactionId}</p>
                )}
            </div>
            <div className="flex flex-col gap-3 pt-2">
                <Button className="w-full">Print Invoice</Button>
                <Button variant="outline" className="w-full">Track Package</Button>
            </div>
        </CardContent>
    </Card>
);

const OrderInfoCard = ({ order }: { order: OrderDetailType }) => (
    <Card className="border-[#E5E7EB] shadow-none">
        <CardContent className="space-y-4 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-sm text-[#6B7280]">Order Number</p>
                    <h1 className="text-2xl font-semibold text-[#111827]">{order.orderNumber}</h1>
                    <p className="mt-1 text-sm text-[#6B7280]">Placed on {order.date}</p>
                </div>
                <StatusBadge status={order.status} />
            </div>
            <div className="grid gap-4 border-t border-[#E5E7EB] pt-4 sm:grid-cols-3">
                <div>
                    <p className="text-xs uppercase tracking-wide text-[#6B7280]">Payment</p>
                    <p className="mt-1 text-sm font-medium text-[#111827]">{order.paymentMethod}</p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wide text-[#6B7280]">Shipping</p>
                    <p className="mt-1 text-sm font-medium text-[#111827]">{order.shipment.method}</p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wide text-[#6B7280]">Tracking</p>
                    <p className="mt-1 text-sm font-medium text-[#111827]">{order.shipment.trackingNumber || 'Available soon'}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

const OrderItemsCard = ({ order }: { order: OrderDetailType }) => (
    <Card className="border-[#E5E7EB] shadow-none">
        <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#111827]">Items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <div className="hidden md:block">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-y border-[#E5E7EB] bg-[#F9FAFB] text-left text-[#6B7280]">
                            <th className="px-6 py-3 font-medium">Product</th>
                            <th className="px-6 py-3 font-medium">Qty</th>
                            <th className="px-6 py-3 font-medium">Price</th>
                            <th className="px-6 py-3 font-medium text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => (
                            <tr key={`${item.productId}-${index}`} className="border-b border-[#E5E7EB] last:border-b-0">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-[#F3F4F6]">
                                            <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#111827]">{item.name}</p>
                                            {item.variantName && <p className="text-xs text-[#6B7280]">{item.variantName}</p>}
                                            {item.sku && <p className="text-xs text-[#6B7280]">SKU: {item.sku}</p>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#111827]">{item.quantity}</td>
                                <td className="px-6 py-4 text-[#111827]">{formatCurrency(item.price)}</td>
                                <td className="px-6 py-4 text-right font-medium text-[#111827]">{formatCurrency(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="space-y-4 p-6 md:hidden">
                {order.items.map((item, index) => (
                    <div key={`${item.productId}-${index}`} className="flex gap-4 rounded-xl border border-[#E5E7EB] p-4">
                        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-[#F3F4F6]">
                            <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-[#111827]">{item.name}</p>
                            {item.variantName && <p className="mt-1 text-xs text-[#6B7280]">{item.variantName}</p>}
                            <div className="mt-3 flex items-center justify-between text-sm text-[#6B7280]">
                                <span>Qty {item.quantity}</span>
                                <span>{formatCurrency(item.price)}</span>
                            </div>
                            <p className="mt-2 text-sm font-semibold text-[#111827]">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const AddressCard = ({ order }: { order: OrderDetailType }) => (
    <Card className="border-[#E5E7EB] shadow-none">
        <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-[#111827]">
                <MapPin className="h-5 w-5 text-[#3B82F6]" />
                Shipping Address
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-[#111827]">
            <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
            {order.shippingAddress.phone && <p className="text-[#6B7280]">{order.shippingAddress.phone}</p>}
            {order.shippingAddress.email && <p className="text-[#6B7280]">{order.shippingAddress.email}</p>}
        </CardContent>
    </Card>
);

const TimelineCard = ({ order }: { order: OrderDetailType }) => (
    <Card className="border-[#E5E7EB] shadow-none">
        <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-[#111827]">
                <Truck className="h-5 w-5 text-[#3B82F6]" />
                Tracking Timeline
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-5">
                {order.timeline.map((event, index) => {
                    const isLast = index === order.timeline.length - 1;
                    return (
                        <div key={event.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <span className={`flex h-9 w-9 items-center justify-center rounded-full border ${event.completed ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6]' : 'border-[#D1D5DB] bg-white text-[#9CA3AF]'}`}>
                                    {event.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                </span>
                                {!isLast && <span className="mt-2 h-full w-px bg-[#E5E7EB]" />}
                            </div>
                            <div className="pb-5">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                                    <p className="font-medium text-[#111827]">{event.title}</p>
                                    <span className="text-xs text-[#6B7280]">{event.date}</span>
                                </div>
                                <p className="mt-1 text-sm text-[#6B7280]">{event.description}</p>
                                {event.trackingNumber && (
                                    <p className="mt-2 text-xs text-[#6B7280]">Tracking: {event.trackingNumber}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </CardContent>
    </Card>
);

const OrderContent = ({ order }: { order: OrderDetailType }) => {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="hidden items-center gap-2 text-sm text-[#6B7280] md:flex">
                <Link href="/" className="hover:text-[#111827]">Home</Link>
                <span>/</span>
                <Link href="/account" className="hover:text-[#111827]">My Account</Link>
                <span>/</span>
                <Link href="/account/orders" className="hover:text-[#111827]">My Orders</Link>
                <span>/</span>
                <span className="text-[#111827]">{order.orderNumber}</span>
            </div>

            <div className="flex items-center justify-between md:hidden">
                <button
                    type="button"
                    onClick={() => router.push('/account/orders')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#111827]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Order Detail
                </button>
            </div>

            <OrderInfoCard order={order} />

            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:items-start">
                <div className="space-y-6">
                    <OrderItemsCard order={order} />
                    <AddressCard order={order} />
                    <TimelineCard order={order} />
                </div>
                <div className="space-y-6">
                    <OrderSummary order={order} />
                </div>
            </div>
        </div>
    );
};

export default function OrderDetail({ orderId }: OrderDetailProps) {
    const { data, error, isLoading, refetch } = useOrder(orderId);

    if (isLoading) {
        return <OrderDetailSkeleton />;
    }

    if (error) {
        if (error.message === 'Order not found.') {
            return <NotFoundState />;
        }

        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    if (!data) {
        return <NotFoundState />;
    }

    return <OrderContent order={data} />;
}
