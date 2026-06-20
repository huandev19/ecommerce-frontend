export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export const ORDER_STATUSES: OrderStatus[] = [
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
];

export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: OrderStatus;
    total: number;
    itemsCount: number;
    items: OrderItem[];
}

export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    sku?: string;
    variantName?: string;
}

export interface OrderAddress {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
    email?: string;
}

export interface OrderTimelineEvent {
    id: string;
    status: OrderStatus;
    title: string;
    description: string;
    date: string;
    completed: boolean;
    trackingNumber?: string;
    carrier?: string;
}

export interface OrderTotals {
    subtotal: number;
    shipping: number;
    tax: number;
    discount?: number;
    total: number;
}

export interface OrderPayment {
    method: string;
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    transactionId?: string;
}

export interface OrderShipping {
    method: string;
    status: OrderStatus;
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: string;
}

export interface OrderDetail extends Order {
    paymentMethod: string;
    subtotal: number;
    shipping: number;
    tax: number;
    discount?: number;
    shippingAddress: OrderAddress;
    billingAddress?: OrderAddress;
    timeline: OrderTimelineEvent[];
    payment: OrderPayment;
    shipment: OrderShipping;
    notes?: string;
}

export interface OrdersResponse {
    orders: Order[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
