import { OrderDetail, OrdersResponse } from '@v8n/types';
import { zOrderDetail, zOrdersResponseSchema } from './zod-schemas';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

interface FetchOrdersParams {
    page?: number;
    limit?: number;
}

const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
};

const createHeaders = (): HeadersInit => {
    const token = getAuthToken();

    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

const getErrorMessage = (status: number, fallbackMessage?: string): string => {
    switch (status) {
        case 400:
            return 'Invalid request. Please check your input.';
        case 401:
            return 'Please log in to view your orders.';
        case 403:
            return "You don't have permission to view this order.";
        case 404:
            return 'Order not found.';
        case 409:
            return 'This order is currently unavailable. Please refresh and try again.';
        case 429:
            return 'Too many requests. Please try again later.';
        case 500:
            return 'Something went wrong. Please try again.';
        default:
            return fallbackMessage || 'Failed to fetch order data.';
    }
};

const parseErrorPayload = async (response: Response): Promise<string | undefined> => {
    const payload = await response.json().catch(() => null);

    const parsedPayload = payload
        ? zOrdersResponseSchema.partial().safeParse(payload)
        : null;

    if (parsedPayload?.success) {
        return undefined;
    }

    if (payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string') {
        return payload.message;
    }

    return undefined;
};

const handleResponseError = async (response: Response): Promise<never> => {
    const fallbackMessage = await parseErrorPayload(response);

    if (response.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_token');
    }

    throw new Error(getErrorMessage(response.status, fallbackMessage));
};

export const fetchOrders = async ({
    page = 1,
    limit = 10,
}: FetchOrdersParams): Promise<OrdersResponse> => {
    try {
        const response = await fetch(`${baseUrl}/account/orders?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: createHeaders(),
        });

        if (!response.ok) {
            await handleResponseError(response);
        }

        const data = await response.json();
        return zOrdersResponseSchema.parse(data);
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error('Connection error. Please check your internet and try again.');
        }
        throw error;
    }
};

export const fetchOrderById = async (id: string): Promise<OrderDetail> => {
    try {
        const response = await fetch(`${baseUrl}/account/orders/${id}`, {
            method: 'GET',
            headers: createHeaders(),
        });

        if (!response.ok) {
            await handleResponseError(response);
        }

        const data = await response.json();
        return zOrderDetail.parse(data);
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error('Connection error. Please check your internet and try again.');
        }
        throw error;
    }
};

export const orderApi = {
    fetchOrders,
    fetchOrderById,
};
