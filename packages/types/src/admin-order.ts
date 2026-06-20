import { OrderItem } from './order';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  itemsCount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface AdminOrdersResponse {
  orders: AdminOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AdminTimeline {
  date: string;
  status: string;
  description: string;
  active: boolean;
}

export interface AdminOrderNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  isInternal: boolean;
}

export interface AdminOrderDetail extends AdminOrder {
  customerPhone: string;
  subtotal: number;
  shipping: number;
  tax: number;
  shippingAddress: Address;
  timeline: AdminTimeline[];
  notes: AdminOrderNote[];
  items: OrderItem[];
}
