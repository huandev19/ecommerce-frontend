"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { AdminProduct } from "@v8n/types";
import { productFormSchema, ProductFormValues } from "@v8n/api/src/admin/zod-schemas";
import { useCreateAdminProduct, useUpdateAdminProduct } from "@v8n/api/src/admin/queries";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
  Select,
  Switch,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@v8n/ui";

interface ProductFormProps {
  product?: AdminProduct;
  isEditMode?: boolean;
}

export default function ProductForm({ product, isEditMode = false }: ProductFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);

  const createMutation = useCreateAdminProduct();
  const updateMutation = useUpdateAdminProduct();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      description: "", // Added to payload/schema but missing in AdminProduct
      price: product?.price || 0,
      comparePrice: product?.comparePrice || null,
      sku: product?.sku || "",
      stock: product?.stock || 0,
      category: product?.category || "electronics",
      tags: [],
      status: product?.status || "draft",
      image: product?.image || "",
    },
  });

  // Simple mock for image upload logic
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      form.setValue("image", url, { shouldValidate: true });
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("image", "", { shouldValidate: true });
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const sanitizedPayload = {
        ...values,
        comparePrice: typeof values.comparePrice === "number" ? values.comparePrice : undefined,
        sku: values.sku === "" ? undefined : values.sku,
      };

      if (isEditMode && product) {
        await updateMutation.mutateAsync({ id: product.id, payload: { ...sanitizedPayload, id: product.id } });
      } else {
        await createMutation.mutateAsync(sanitizedPayload);
      }
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/admin/products" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditMode ? "Edit Product" : "New Product"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
              Discard
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </div>

        {/* Global Error message if mutation fails */}
        {(createMutation.isError || updateMutation.isError) && (
          <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
            {createMutation.error?.message || updateMutation.error?.message || "Failed to save product."}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <p className="text-sm text-slate-500">Basic details about the product.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: { field: ControllerRenderProps<ProductFormValues, "name"> }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Wireless Noise-Cancelling Headphones" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }: { field: ControllerRenderProps<ProductFormValues, "description"> }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the product..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }: { field: ControllerRenderProps<ProductFormValues, "price"> }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comparePrice"
                    render={({ field }: { field: ControllerRenderProps<ProductFormValues, "comparePrice"> }) => (
                      <FormItem>
                        <FormLabel>Compare at price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormDescription>Original price to show discount</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }: { field: ControllerRenderProps<ProductFormValues, "sku"> }) => (
                      <FormItem>
                        <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. PROD-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }: { field: ControllerRenderProps<ProductFormValues, "stock"> }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative rounded-lg border border-gray-200 overflow-hidden group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-auto aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button type="button" variant="destructive" size="sm" onClick={removeImage}>
                          <X className="w-4 h-4 mr-2" /> Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <ImageIcon className="w-10 h-10 text-gray-400 mb-4" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Click to upload image</p>
                      <p className="text-xs text-gray-500 mb-4">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleImageChange}
                        />
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" /> Browse File
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="hidden">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }: { field: ControllerRenderProps<ProductFormValues, "image"> }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="hidden" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.formState.errors.image && (
                    <p className="text-[0.8rem] font-medium text-red-500">{form.formState.errors.image.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }: { field: ControllerRenderProps<ProductFormValues, "status"> }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Status</FormLabel>
                        <FormDescription>
                          {field.value === 'active' ? 'Product will be visible to customers.' : 'Product is hidden from customers.'}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === 'active'}
                          onCheckedChange={(checked) => field.onChange(checked ? 'active' : 'draft')}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }: { field: ControllerRenderProps<ProductFormValues, "category"> }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <option value="electronics">Electronics</option>
                          <option value="clothing">Clothing</option>
                          <option value="home">Home & Garden</option>
                          <option value="sports">Sports & Outdoors</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
