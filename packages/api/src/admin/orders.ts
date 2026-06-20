import { zAdminOrdersParams, zAdminOrdersResponse, zAdminErrorPayload, zAdminOrder, zAdminOrderDetail, zAdminOrderStatusUpdate } from './zod-schemas';
import type { AdminOrdersResponse, AdminOrder, AdminOrderDetail } from '@v8n/types';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

const getAdminToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
};

const createHeaders = (): HeadersInit => {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponseError = async (response: Response): Promise<never> => {
  if (response.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_token');
  }
  throw new Error(`API Error: ${response.status}`);
};

// Mock data
const mockOrders: AdminOrder[] = [
  {
    id: 'ord_1',
    orderNumber: '#ORD-001',
    customerName: 'Nguyen Van A',
    customerEmail: 'nguyenvana@example.com',
    date: '2026-06-16T10:00:00Z',
    itemsCount: 2,
    total: 1500000,
    status: 'pending',
  },
  {
    id: 'ord_2',
    orderNumber: '#ORD-002',
    customerName: 'Tran Thi B',
    customerEmail: 'tranthib@example.com',
    date: '2026-06-15T14:30:00Z',
    itemsCount: 1,
    total: 500000,
    status: 'processing',
  },
  {
    id: 'ord_3',
    orderNumber: '#ORD-003',
    customerName: 'Le Van C',
    customerEmail: 'levanc@example.com',
    date: '2026-06-14T09:15:00Z',
    itemsCount: 4,
    total: 3200000,
    status: 'shipped',
  },
  {
    id: 'ord_4',
    orderNumber: '#ORD-004',
    customerName: 'Pham Thi D',
    customerEmail: 'phamthid@example.com',
    date: '2026-06-13T16:45:00Z',
    itemsCount: 3,
    total: 2100000,
    status: 'delivered',
  },
  {
    id: 'ord_5',
    orderNumber: '#ORD-005',
    customerName: 'Hoang Van E',
    customerEmail: 'hoangvane@example.com',
    date: '2026-06-12T11:20:00Z',
    itemsCount: 1,
    total: 750000,
    status: 'cancelled',
  },
];

export async function fetchAdminOrders(
  params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  } = {}
): Promise<AdminOrdersResponse> {
  const parsedParams = zAdminOrdersParams.parse(params);
  
  if (process.env.NEXT_PUBLIC_USE_ADMIN_API !== 'true') {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 600));

    let filtered = [...mockOrders];

    if (parsedParams.status && parsedParams.status !== 'all') {
      filtered = filtered.filter((o) => o.status === parsedParams.status);
    }

    if (parsedParams.search) {
      const q = parsedParams.search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q)
      );
    }

    const page = parsedParams.page || 1;
    const limit = parsedParams.limit || 10;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return zAdminOrdersResponse.parse({
      orders: paginated,
      total,
      page,
      limit,
      totalPages,
    });
  }

  // Actual API call
  const queryParams = new URLSearchParams();
  if (parsedParams.page) queryParams.set('page', parsedParams.page.toString());
  if (parsedParams.limit) queryParams.set('limit', parsedParams.limit.toString());
  if (parsedParams.search) queryParams.set('search', parsedParams.search);
  if (parsedParams.status) queryParams.set('status', parsedParams.status);

  const response = await fetch(`${baseUrl}/admin/orders?${queryParams.toString()}`, {
    method: 'GET',
    headers: createHeaders(),
  });

  if (!response.ok) {
    await handleResponseError(response);
  }

  const data = await response.json();
  return zAdminOrdersResponse.parse(data);
}

export async function fetchAdminOrderById(id: string): Promise<AdminOrderDetail> {
  if (process.env.NEXT_PUBLIC_USE_ADMIN_API !== 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    
    // Add detail fields for mockup
    const detailOrder: AdminOrderDetail = {
      ...order,
      customerPhone: '+1 234 567 8900',
      subtotal: order.total * 0.8,
      shipping: order.total * 0.1,
      tax: order.total * 0.1,
      shippingAddress: {
        firstName: order.customerName.split(' ')[0] || '',
        lastName: order.customerName.split(' ').slice(1).join(' ') || '',
        address: '123 Fake Street',
        city: 'Ho Chi Minh City',
        state: 'HCM',
        zipCode: '70000',
        country: 'Vietnam',
      },
      timeline: [
        { date: order.date, status: 'pending', description: 'Order placed', active: order.status === 'pending' },
        { date: order.date, status: 'processing', description: 'Order is being processed', active: order.status === 'processing' },
      ].filter(t => order.status !== 'pending' || t.status === 'pending'),
      notes: [
        {
          id: 'note_1',
          author: 'System',
          content: 'Order created',
          createdAt: order.date,
          isInternal: true,
        }
      ],
      items: [
        {
          productId: 'prod_1',
          name: 'Classic White T-Shirt',
          quantity: order.itemsCount,
          price: order.total / order.itemsCount,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
          sku: 'TS-WHT-01',
          variantName: 'Size: M, Color: White',
        }
      ]
    };
    
    return zAdminOrderDetail.parse(detailOrder);
  }

  const response = await fetch(`${baseUrl}/admin/orders/${id}`, {
    method: 'GET',
    headers: createHeaders(),
  });

  if (!response.ok) {
    await handleResponseError(response);
  }

  const data = await response.json();
  return zAdminOrderDetail.parse(data);
}

export async function updateOrderStatus(id: string, status: string): Promise<{ success: boolean; status: string }> {
  if (process.env.NEXT_PUBLIC_USE_ADMIN_API !== 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Validate status
    zAdminOrderStatusUpdate.parse({ status });
    
    const orderIndex = mockOrders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    // Update mock data locally for this session
    mockOrders[orderIndex].status = status as any;
    
    return { success: true, status };
  }

  const payload = zAdminOrderStatusUpdate.parse({ status });

  const response = await fetch(`${baseUrl}/admin/orders/${id}/status`, {
    method: 'PUT',
    headers: createHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await handleResponseError(response);
  }

  const data = await response.json();
  return data;
}
