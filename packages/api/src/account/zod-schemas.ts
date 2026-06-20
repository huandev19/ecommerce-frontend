import { z } from 'zod';

export const zOrderStatus = z.enum([
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
]);

export const zPaymentStatus = z.enum(['pending', 'paid', 'failed', 'refunded']);

export const zOrderItem = z.object({
    productId: z.string(),
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    image: z.string(),
    sku: z.string().optional(),
    variantName: z.string().optional(),
});

export const zOrderAddress = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
});

export const zOrderTimelineEvent = z.object({
    id: z.string(),
    status: zOrderStatus,
    title: z.string(),
    description: z.string(),
    date: z.string(),
    completed: z.boolean(),
    trackingNumber: z.string().optional(),
    carrier: z.string().optional(),
});

export const zOrderPayment = z.object({
    method: z.string(),
    status: zPaymentStatus,
    transactionId: z.string().optional(),
});

export const zOrderShipping = z.object({
    method: z.string(),
    status: zOrderStatus,
    trackingNumber: z.string().optional(),
    carrier: z.string().optional(),
    estimatedDelivery: z.string().optional(),
});

export const zOrder = z.object({
    id: z.string(),
    orderNumber: z.string(),
    date: z.string(),
    status: zOrderStatus,
    total: z.number(),
    itemsCount: z.number(),
    items: z.array(zOrderItem),
});

export const zOrderDetail = zOrder.extend({
    paymentMethod: z.string(),
    subtotal: z.number(),
    shipping: z.number(),
    tax: z.number(),
    discount: z.number().optional(),
    shippingAddress: zOrderAddress,
    billingAddress: zOrderAddress.optional(),
    timeline: z.array(zOrderTimelineEvent),
    payment: zOrderPayment,
    shipment: zOrderShipping,
    notes: z.string().optional(),
});

export const zOrdersResponseSchema = z.object({
    orders: z.array(zOrder),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
});
