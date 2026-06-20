"use client";

import ProductForm from "@/components/admin/ProductForm";
import { useAdminProduct } from "@v8n/api/src/admin/queries";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@v8n/ui";

export default function EditProductClient({ id }: { id: string }) {
  const { data: product, isLoading, isError } = useAdminProduct(id);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[60vh] gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Product not found</h2>
        <p className="text-gray-500">The product you are trying to edit does not exist or an error occurred.</p>
        <Link href="/admin/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <ProductForm isEditMode={true} product={product} />
    </div>
  );
}
