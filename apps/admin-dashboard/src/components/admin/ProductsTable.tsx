'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowDown, ArrowDownUp, ArrowUp, ChevronLeft, ChevronRight, Loader2, Pencil, Search, Trash2 } from 'lucide-react';
import { useAdminProducts, useDeleteAdminProduct } from '@v8n/api';
import type { AdminProductSortBy, AdminProductStatus } from '@v8n/types';
import { Badge, Button, Card, CardContent, Checkbox, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@v8n/ui';

const PAGE_SIZE = 6;

const sortableColumns: Array<{ key: AdminProductSortBy; label: string }> = [
  { key: 'name', label: 'NAME' },
  { key: 'category', label: 'CATEGORY' },
  { key: 'price', label: 'PRICE' },
  { key: 'stock', label: 'STOCK' },
  { key: 'status', label: 'STATUS' },
];

const statusOptions: Array<{ label: string; value: AdminProductStatus | 'all' }> = [
  { label: 'All status', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
];

export function ProductsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<AdminProductStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<AdminProductSortBy>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch, isFetching } = useAdminProducts({
    page,
    limit: PAGE_SIZE,
    search,
    status,
    sortBy,
    order,
  });
  const deleteProductMutation = useDeleteAdminProduct();

  const products = data?.products ?? [];
  const allSelected = products.length > 0 && products.every((product) => selectedIds.includes(product.id));

  const summaryText = useMemo(() => {
    if (!data || data.total === 0) {
      return 'No products found';
    }

    const start = (data.page - 1) * data.limit + 1;
    const end = Math.min(start + products.length - 1, data.total);
    return `Showing ${start}-${end} of ${data.total} products`;
  }, [data, products.length]);

  const toggleSort = (column: AdminProductSortBy) => {
    setPage(1);
    setSortBy((currentSortBy) => {
      if (currentSortBy === column) {
        setOrder((currentOrder) => (currentOrder === 'asc' ? 'desc' : 'asc'));
        return currentSortBy;
      }

      setOrder('asc');
      return column;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? products.map((product) => product.id) : []);
  };

  const toggleSelectItem = (id: string, checked: boolean) => {
    setSelectedIds((current) => (checked ? [...current, id] : current.filter((item) => item !== id)));
  };

  const handleDelete = async (id: string) => {
    setErrorMessage(null);

    try {
      await deleteProductMutation.mutateAsync(id);
      setSelectedIds((current) => current.filter((item) => item !== id));
      void refetch();
    } catch (mutationError) {
      setErrorMessage(mutationError instanceof Error ? mutationError.message : 'Unable to delete product.');
    }
  };

  const statusBadgeVariant = (productStatus: AdminProductStatus) => (productStatus === 'active' ? 'success' : 'muted');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] md:text-3xl">Products</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Manage pricing, stock, and publication status.</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex h-11 items-center justify-center rounded-lg bg-[#3B82F6] px-5 text-sm font-semibold text-white transition hover:bg-[#2563EB]">
          + Add Product
        </Link>
      </div>

      <Card className="border-[#E5E7EB] bg-white shadow-none">
        <CardContent className="space-y-4 p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                <Input
                  value={search}
                  onChange={(event) => {
                    setPage(1);
                    setSearch(event.target.value);
                  }}
                  placeholder="Search by product name or SKU"
                  className="border-[#E5E7EB] bg-white pl-10"
                />
              </div>
              <select
                value={status}
                onChange={(event) => {
                  setPage(1);
                  setStatus(event.target.value as AdminProductStatus | 'all');
                }}
                className="h-10 rounded-md border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-[#6B7280]">{isFetching ? 'Refreshing…' : summaryText}</div>
          </div>

          {errorMessage ? <div className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">{errorMessage}</div> : null}

          {isError ? (
            <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-6 text-sm text-[#991B1B]">
              <p className="font-semibold">Unable to load products.</p>
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
                    <TableRow className="hover:bg-white">
                      <TableHead className="w-12">
                        <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} aria-label="Select all products" />
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">IMAGE</TableHead>
                      {sortableColumns.map((column) => (
                        <TableHead key={column.key} className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                          <button type="button" className="inline-flex items-center gap-2 hover:text-[#111827] transition-colors" onClick={() => toggleSort(column.key)}>
                            {column.label}
                            {sortBy === column.key ? (
                              order === 'asc' ? <ArrowUp className="h-3.5 w-3.5 text-[#111827]" /> : <ArrowDown className="h-3.5 w-3.5 text-[#111827]" />
                            ) : (
                              <ArrowDownUp className="h-3.5 w-3.5 opacity-40" />
                            )}
                          </button>
                        </TableHead>
                      ))}
                      <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-[#6B7280]">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(product.id)}
                            onCheckedChange={(checked) => toggleSelectItem(product.id, checked)}
                            aria-label={`Select ${product.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Image src={product.image} alt={product.name} width={48} height={48} unoptimized className="h-12 w-12 rounded-lg border border-[#E5E7EB] object-cover" />
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-[#111827]">{product.name}</div>
                          <div className="text-xs text-[#6B7280]">{product.sku}</div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={statusBadgeVariant(product.status)}>{product.status === 'active' ? 'Active' : 'Draft'}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/products/${product.id}/edit`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#374151] transition hover:bg-[#F9FAFB]">
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => void handleDelete(product.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#FECACA] text-[#DC2626] transition hover:bg-[#FEF2F2]"
                              aria-label={`Delete ${product.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-3 md:hidden">
                {products.map((product) => (
                  <Card key={product.id} className="border-[#E5E7EB] bg-white shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedIds.includes(product.id)}
                          onCheckedChange={(checked) => toggleSelectItem(product.id, checked)}
                          aria-label={`Select ${product.name}`}
                        />
                        <Image src={product.image} alt={product.name} width={64} height={64} unoptimized className="h-16 w-16 rounded-lg border border-[#E5E7EB] object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h2 className="text-base font-semibold text-[#111827]">{product.name}</h2>
                              <p className="text-xs text-[#6B7280]">{product.sku}</p>
                            </div>
                            <Badge variant={statusBadgeVariant(product.status)}>{product.status === 'active' ? 'Active' : 'Draft'}</Badge>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Category</p>
                              <p className="mt-1 font-medium text-[#111827]">{product.category}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Price</p>
                              <p className="mt-1 font-medium text-[#111827]">${product.price.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Stock</p>
                              <p className="mt-1 font-medium text-[#111827]">{product.stock}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Updated</p>
                              <p className="mt-1 font-medium text-[#111827]">{new Date(product.updatedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Link href={`/admin/products/${product.id}/edit`} className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#111827]">
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => void handleDelete(product.id)}
                              className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#FECACA] px-4 py-2 text-sm font-medium text-[#DC2626]"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {products.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-6 py-12 text-center">
                  <h2 className="text-lg font-semibold text-[#111827]">No products match this filter</h2>
                  <p className="mt-2 text-sm text-[#6B7280]">Try another keyword or switch status to view more results.</p>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-[#E5E7EB] pt-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-[#6B7280]">{selectedIds.length} selected</div>
                <div className="flex items-center justify-between gap-3 md:justify-end">
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
        </CardContent>
      </Card>
    </div>
  );
}
