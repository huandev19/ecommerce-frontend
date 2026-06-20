import { useQuery } from '@tanstack/react-query';
import { OrderDetail, OrdersResponse } from '@v8n/types';
import { fetchOrderById, fetchOrders, orderApi } from './orders';

export const useOrders = (params: { page?: number; limit?: number } = {}) => {
    return useQuery<OrdersResponse, Error>({
        queryKey: ['orders', params.page ?? 1, params.limit ?? 10],
        queryFn: () => fetchOrders(params),
        refetchOnWindowFocus: true,
        retry: 3,
        staleTime: 5 * 60 * 1000,
    });
};

export const useOrder = (id?: string) => {
    const normalizedId = id?.trim();

    return useQuery<OrderDetail, Error>({
        queryKey: ['order', normalizedId],
        queryFn: () => fetchOrderById(normalizedId as string),
        enabled: Boolean(normalizedId),
        refetchOnWindowFocus: true,
        retry: 2,
        staleTime: 5 * 60 * 1000,
    });
};

export { orderApi };
