'use client';

import Image from 'next/image';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import {
  Card, CardHeader, CardTitle, CardContent,
  Button, Badge,
  Select,
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
  Textarea
} from '@v8n/ui';
import { useAdminOrder, useUpdateOrderStatus } from '@v8n/api';
import { ArrowLeft, Printer, CheckCircle2, Clock, Package, Truck, Info, Mail, Phone, MapPin } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-500',
  processing: 'bg-blue-100 text-blue-800 border-blue-500',
  shipped: 'bg-blue-100 text-blue-800 border-blue-500',
  delivered: 'bg-emerald-100 text-emerald-800 border-emerald-500',
  cancelled: 'bg-red-100 text-red-800 border-red-500',
};

const statusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
});

const noteSchema = z.object({
  content: z.string().min(1, 'Note cannot be empty').max(1000, 'Note too long'),
  isInternal: z.boolean().default(true),
});

export function AdminOrderDetail({ orderId }: { orderId: string }) {
  const router = useRouter();

  const { data: order, isLoading, error } = useAdminOrder(orderId);
  const updateStatusMutation = useUpdateOrderStatus();

  const noteForm = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: { content: '', isInternal: true }
  });

  const statusForm = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
    defaultValues: { status: 'pending' }
  });

  // Update status form when order data is loaded
  React.useEffect(() => {
    if (order?.status) {
      statusForm.reset({ status: order.status as z.infer<typeof statusSchema>['status'] });
    }
  }, [order, statusForm]);

  const onUpdateStatus = async (data: z.infer<typeof statusSchema>) => {
    try {
      await updateStatusMutation.mutateAsync({ id: orderId, status: data.status });
      // In a real app we might show a toast success here
    } catch {
      // Show toast error
    }
  };

  const onAddNote = async () => {
    // In a real app we would call an API to add a note
    noteForm.reset({ content: '', isInternal: true });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading order details...</div>;
  }

  if (error || !order) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">Error loading order or order not found.</div>
        <Button onClick={() => router.push('/admin/orders')} variant="outline">
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push('/admin/orders')} className="hidden sm:inline-flex">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{order.orderNumber}</h1>
              <Badge variant="outline" className={statusColors[order.status] || ''}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {new Date(order.date).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()} className="bg-white">
            <Printer className="w-4 h-4 mr-2" />
            Print Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded bg-slate-100 overflow-hidden shrink-0">
                              <Image src={item.image} alt={item.name} width={48} height={48} unoptimized className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              {item.variantName && <div className="text-xs text-slate-500">{item.variantName}</div>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile List */}
              <div className="sm:hidden space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="w-16 h-16 rounded bg-slate-100 overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} width={64} height={64} unoptimized className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium line-clamp-1">{item.name}</div>
                      {item.variantName && <div className="text-xs text-slate-500">{item.variantName}</div>}
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm text-slate-600">Qty: {item.quantity}</div>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-slate-500" />
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="font-medium">{order.customerName}</div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4 shrink-0" />
                  {order.customerEmail}
                </div>
                {order.customerPhone && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4 shrink-0" />
                    {order.customerPhone}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-slate-500" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1 text-slate-700">
                  <div className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
                  <div>{order.shippingAddress.address}</div>
                  <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                  <div>{order.shippingAddress.country}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${event.active ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                        {event.status === 'delivered' ? <CheckCircle2 className="w-4 h-4" /> :
                          event.status === 'shipped' ? <Truck className="w-4 h-4" /> :
                            event.status === 'processing' ? <Package className="w-4 h-4" /> :
                              <Clock className="w-4 h-4" />}
                      </div>
                      {idx !== order.timeline.length - 1 && (
                        <div className="w-px h-full bg-slate-200 my-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="font-medium text-slate-900">{event.description}</div>
                      <div className="text-sm text-slate-500 mt-1">{new Date(event.date).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal ({order.itemsCount} items)</span>
                <span className="font-medium text-slate-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-medium text-slate-900">${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Tax</span>
                <span className="font-medium text-slate-900">${order.tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Update Status */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={statusForm.handleSubmit(onUpdateStatus)} className="space-y-4">
                <Controller
                  control={statusForm.control}
                  name="status"
                  render={({ field }) => (
                    <Select onChange={field.onChange} value={field.value}>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={updateStatusMutation.isPending || statusForm.watch('status') === order.status}
                >
                  {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {order.notes.length === 0 ? (
                  <div className="text-sm text-slate-500 text-center py-4">No notes yet.</div>
                ) : (
                  order.notes.map((note) => (
                    <div key={note.id} className="bg-slate-50 p-3 rounded-lg text-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{note.author}</span>
                        <span className="text-xs text-slate-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-700 whitespace-pre-wrap">{note.content}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={noteForm.handleSubmit(onAddNote)} className="space-y-3 pt-4 border-t">
                <Controller
                  control={noteForm.control}
                  name="content"
                  render={({ field }) => (
                    <Textarea
                      placeholder="Add a note..."
                      className="resize-none h-20"
                      {...field}
                    />
                  )}
                />
                <Button type="submit" variant="outline" className="w-full">
                  Add Note
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
