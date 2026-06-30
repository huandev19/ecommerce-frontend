This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where content has been compressed (code blocks are separated by ⋮---- delimiter).

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Content has been compressed - code blocks are separated by ⋮---- delimiter
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
apps/
  admin-dashboard/
    src/
      app/
        [locale]/
          admin/
            orders/
              [id]/
                page.tsx
              page.tsx
            products/
              [id]/
                edit/
                  EditProductClient.tsx
                  page.tsx
              new/
                page.tsx
              page.tsx
            settings/
              page.tsx
            team/
              login-history/
                page.tsx
              roles/
                [id]/
                  edit/
                    EditRoleClient.tsx
                    page.tsx
                new/
                  page.tsx
                page.tsx
              users/
                [id]/
                  edit/
                    EditUserClient.tsx
                    page.tsx
                new/
                  page.tsx
                page.tsx
            workflows/
              page.tsx
            layout.tsx
            page.tsx
          layout.tsx
          page.tsx
        globals.css
      components/
        admin/
          AdminOrderDetail.tsx
          AdminSidebar.tsx
          LoginHistoryCard.tsx
          LoginHistoryClient.tsx
          LoginHistoryTable.tsx
          OrdersTable.tsx
          ProductForm.tsx
          ProductsTable.tsx
          RoleCard.tsx
          RoleForm.tsx
          RolesListClient.tsx
          RolesTable.tsx
          SettingsForm.tsx
          UserCard.tsx
          UserForm.tsx
          UsersListClient.tsx
          UsersTable.tsx
          WorkflowForm.tsx
          WorkflowsList.tsx
      i18n/
        request.ts
        routing.ts
      providers/
        QueryProvider.tsx
      middleware.ts
    AGENTS.md
    CLAUDE.md
    eslint.config.mjs
    next.config.ts
    package.json
    postcss.config.mjs
    README.md
    tailwind.config.ts
    tsconfig.json
  storefront/
    src/
      app/
        [locale]/
          account/
            orders/
              [id]/
                page.tsx
              page.tsx
            profile/
              page.tsx
            layout.tsx
            page.tsx
          cart/
            page.tsx
          checkout/
            page.tsx
          login/
            page.tsx
          products/
            [slug]/
              page.tsx
            page.tsx
          register/
            page.tsx
          layout.tsx
          page.tsx
        globals.css
      components/
        account/
          AccountDashboardClient.tsx
          AccountSidebar.tsx
          AuthGuard.tsx
          DashboardContent.tsx
          OrderDetail.tsx
          OrdersList.tsx
          ProfileClient.tsx
          ProfileForm.tsx
        auth/
          LoginForm.tsx
          RegisterForm.tsx
          RegisterPageContent.tsx
        cart/
          CartPageContent.tsx
          CartSheet.tsx
        checkout/
          CheckoutForm.tsx
        common/
          StarRating.tsx
        home/
          FeaturedCategories.tsx
          HeroBanner.tsx
          ProductCard.tsx
          ProductGrid.tsx
        layout/
          Footer.tsx
          Header.tsx
        products/
          ProductClient.tsx
          ProductGallery.tsx
          ProductGridWithFilters.tsx
          ProductSidebar.tsx
          ProductTabs.tsx
          ProductVariantSelector.tsx
      i18n/
        request.ts
        routing.ts
      store/
        useAuthStore.ts
        useCartStore.ts
      middleware.ts
    eslint.config.mjs
    next.config.ts
    package.json
    postcss.config.mjs
    tailwind.config.ts
    tsconfig.json
ecommerce/
  ui/
    src/
      components/
        common/
          GlobalErrorFallback.tsx
        ui/
          badge.tsx
          button.tsx
          card.tsx
          checkbox.tsx
          dialog.tsx
          form.tsx
          input.tsx
          label.tsx
          select.tsx
          switch.tsx
          table.tsx
          textarea.tsx
          toaster.tsx
          use-toast.ts
        language-switcher.tsx
      lib/
        utils.ts
      index.ts
    package.json
    tsconfig.json
packages/
  api/
    src/
      account/
        orders.ts
        queries.ts
        zod-schemas.ts
      admin/
        catalog.ts
        index.ts
        orders.ts
        queries.ts
        rbac.ts
        settings.ts
        workflows.ts
        zod-schemas.ts
      auth/
        auth.api.ts
        auth.hooks.ts
        index.ts
      home/
        queries.ts
      profile/
        index.ts
        queries.ts
      client.ts
      index.ts
    package.json
    tsconfig.json
  config/
    eslint/
      next.mjs
    package.json
    tsconfig.base.json
  hooks/
    src/
      index.ts
      useEventBus.ts
    package.json
    tsconfig.json
  i18n/
    messages/
      en.json
      ja.json
      ko.json
      vi.json
      zh.json
    src/
      schema.ts
    package.json
    tsconfig.json
  types/
    src/
      admin-order.ts
      admin-product.ts
      admin-rbac.ts
      admin-setting.ts
      admin-workflow.ts
      api.ts
      auth.ts
      index.ts
      order.ts
      product.ts
      profile.ts
    package.json
    tsconfig.json
.cursorrules
.gitignore
.repomixignore
package.json
pnpm-workspace.yaml
README.md
start-fe.sh
turbo.json
```

# Files

## File: .repomixignore
````
# 1. Các file khóa (Lockfiles) - RẤT QUAN TRỌNG
# Những file này cực kỳ dài, tiêu tốn hàng chục ngàn token nhưng AI không cần đọc để hiểu logic code.
package-lock.json
yarn.lock
pnpm-lock.yaml
bun.lockb
Cargo.lock
Gemfile.lock
poetry.lock

# 2. Các file Media & Assets tĩnh (UI/UX)
# AI (text model) không hiểu được nội dung file nhị phân hoặc vector qua mã nguồn.
*.svg
*.png
*.jpg
*.jpeg
*.ico
*.gif
*.webp
*.mp3
*.mp4
*.ttf
*.woff
*.woff2

# 3. Dữ liệu tĩnh, Mock data & Logs
# Thường chứa dữ liệu thô lặp đi lặp lại.
*.csv
*.tsv
*.sql
*.log
mock-data/
__fixtures__/
locales/        # Có thể bỏ nếu file dịch đa ngôn ngữ (i18n) quá dài

# 4. Cấu hình IDE / Môi trường cá nhân
.vscode/
.idea/
.DS_Store
*.swp

# 5. Các file tài liệu không chứa logic lập trình
CHANGELOG.md
LICENSE
CODE_OF_CONDUCT.md
CONTRIBUTING.md

# 6. Thư mục build/output (Đề phòng file .gitignore thiếu)
dist/
build/
out/
coverage/
.next/
.nuxt/
````

## File: apps/admin-dashboard/src/app/[locale]/admin/orders/[id]/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminOrderDetail } from '@/components/admin/AdminOrderDetail';
import { Metadata } from 'next';
⋮----
export async function generateMetadata(
⋮----
export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
})
````

## File: apps/admin-dashboard/src/app/[locale]/admin/orders/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { OrdersTable } from '@/components/admin/OrdersTable';
import Link from 'next/link';
⋮----
export async function generateMetadata(
⋮----
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdminOrdersPage(
````

## File: apps/admin-dashboard/src/app/[locale]/admin/products/[id]/edit/EditProductClient.tsx
````typescript
import ProductForm from "@/components/admin/ProductForm";
import { useAdminProduct } from "@v8n/api/src/admin/queries";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@v8n/ui";
⋮----
export default function EditProductClient(
````

## File: apps/admin-dashboard/src/app/[locale]/admin/products/[id]/edit/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import EditProductClient from './EditProductClient';
⋮----
export async function generateMetadata(
⋮----
export default async function EditProductPage(
````

## File: apps/admin-dashboard/src/app/[locale]/admin/products/new/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import ProductForm from '@/components/admin/ProductForm';
⋮----
export async function generateMetadata(
⋮----
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NewProductPage(
````

## File: apps/admin-dashboard/src/app/[locale]/admin/settings/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { SettingsForm } from '@/components/admin/SettingsForm';
import { ChevronRight } from 'lucide-react';
⋮----
export async function generateMetadata(
⋮----
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdminSettingsPage(
````

## File: apps/admin-dashboard/src/app/[locale]/admin/team/roles/[id]/edit/EditRoleClient.tsx
````typescript
import { useParams } from 'next/navigation';
import { useAdminRoles } from '@v8n/api/src/admin/queries';
import { RoleForm } from '@/components/admin/RoleForm';
import { Loader2 } from 'lucide-react';
⋮----
export function EditRoleClient()
````

## File: apps/admin-dashboard/src/app/[locale]/admin/team/users/[id]/edit/EditUserClient.tsx
````typescript
import { useParams } from 'next/navigation';
import { useAdminUser } from '@v8n/api/src/admin/queries';
import { UserForm } from '@/components/admin/UserForm';
import { Loader2 } from 'lucide-react';
⋮----
export function EditUserClient()
````

## File: apps/admin-dashboard/src/app/[locale]/admin/workflows/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { WorkflowsList } from '@/components/admin/WorkflowsList';
⋮----
export async function generateMetadata(
⋮----
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function WorkflowsPage(
````

## File: apps/admin-dashboard/src/app/[locale]/admin/layout.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { QueryProvider } from '@/providers/QueryProvider';
import { Search } from 'lucide-react';
⋮----
export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
})
````

## File: apps/admin-dashboard/src/app/[locale]/admin/page.tsx
````typescript
import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
⋮----
export default function AdminIndexPage()
````

## File: apps/admin-dashboard/src/app/[locale]/layout.tsx
````typescript
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
⋮----
export function generateStaticParams()
⋮----
export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
})
````

## File: apps/admin-dashboard/src/app/[locale]/page.tsx
````typescript
import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/routing";
⋮----
export default async function LocalePage(
````

## File: apps/admin-dashboard/src/app/globals.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;
````

## File: apps/admin-dashboard/src/components/admin/AdminOrderDetail.tsx
````typescript
import Image from 'next/image';
⋮----
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
⋮----
export function AdminOrderDetail(
⋮----
// Update status form when order data is loaded
⋮----
const onUpdateStatus = async (data: z.infer<typeof statusSchema>) =>
⋮----
// In a real app we might show a toast success here
⋮----
// Show toast error
⋮----
const onAddNote = async () =>
⋮----
// In a real app we would call an API to add a note
⋮----
{/* Header */}
⋮----
{/* Left Column */}
⋮----
{/* Order Items */}
⋮----
{/* Desktop Table */}
⋮----
{/* Mobile List */}
⋮----
{/* Customer Info */}
⋮----
{/* Shipping Address */}
⋮----
{/* Timeline */}
⋮----
{/* Right Column */}
⋮----
{/* Order Summary */}
⋮----
{/* Update Status */}
⋮----
{/* Order Notes */}
````

## File: apps/admin-dashboard/src/components/admin/AdminSidebar.tsx
````typescript
import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import { BarChart3, Box, ChevronDown, ChevronRight, History, Lock, Menu, Package, Settings, ShoppingCart, Users, X } from 'lucide-react';
import { useState } from 'react';
⋮----
export function AdminSidebar()
⋮----
onClick=
⋮----
{/* Team expandable */}
⋮----
{/* Other Settings items */}
````

## File: apps/admin-dashboard/src/components/admin/LoginHistoryCard.tsx
````typescript
import type { LoginHistoryRecord } from '@v8n/types';
⋮----
interface LoginHistoryCardProps {
    record: LoginHistoryRecord;
}
⋮----
const statusDot = (status: LoginHistoryRecord['status']) =>
⋮----
export function LoginHistoryCard(
````

## File: apps/admin-dashboard/src/components/admin/LoginHistoryClient.tsx
````typescript
import { useLoginHistory } from '@v8n/api/src/admin/queries';
import { AlertTriangle, Download, Loader2, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { LoginHistoryTable } from './LoginHistoryTable';
import { LoginHistoryCard } from './LoginHistoryCard';
⋮----
// Show alert banner if any record is locked
⋮----
{/* Breadcrumb (desktop) */}
⋮----
{/* Header */}
⋮----
{/* Alert Banner */}
⋮----
{/* Filters */}
⋮----
onChange=
⋮----
{/* Content */}
````

## File: apps/admin-dashboard/src/components/admin/LoginHistoryTable.tsx
````typescript
import type { LoginHistoryRecord } from '@v8n/types';
⋮----
interface LoginHistoryTableProps {
    records: LoginHistoryRecord[];
}
⋮----
const statusDot = (status: LoginHistoryRecord['status']) =>
⋮----
export function LoginHistoryTable(
````

## File: apps/admin-dashboard/src/components/admin/OrdersTable.tsx
````typescript
import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight, Loader2, Search, Download } from 'lucide-react';
import { useAdminOrders } from '@v8n/api';
import type { zAdminOrderStatus } from '@v8n/api';
import { Button, Card, CardContent, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@v8n/ui';
import type { z } from 'zod';
⋮----
type OrderStatus = z.infer<typeof zAdminOrderStatus>;
⋮----
const statusBadgeColor = (orderStatus: OrderStatus) =>
⋮----
const handleExport = () =>
⋮----
setPage(1);
setStatus(tab.value);
````

## File: apps/admin-dashboard/src/components/admin/ProductForm.tsx
````typescript
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
⋮----
interface ProductFormProps {
  product?: AdminProduct;
  isEditMode?: boolean;
}
⋮----
description: "", // Added to payload/schema but missing in AdminProduct
⋮----
// Simple mock for image upload logic
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
⋮----
const removeImage = () =>
⋮----
const onSubmit = async (values: ProductFormValues) =>
⋮----
<form onSubmit=
⋮----
{/* Global Error message if mutation fails */}
⋮----
{/* eslint-disable-next-line @next/next/no-img-element */}
````

## File: apps/admin-dashboard/src/components/admin/ProductsTable.tsx
````typescript
import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowDown, ArrowDownUp, ArrowUp, ChevronLeft, ChevronRight, Loader2, Pencil, Search, Trash2 } from 'lucide-react';
import { useAdminProducts, useDeleteAdminProduct } from '@v8n/api';
import type { AdminProductSortBy, AdminProductStatus } from '@v8n/types';
import { Badge, Button, Card, CardContent, Checkbox, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@v8n/ui';
⋮----
const toggleSort = (column: AdminProductSortBy) =>
⋮----
const toggleSelectAll = (checked: boolean) =>
⋮----
const toggleSelectItem = (id: string, checked: boolean) =>
⋮----
const handleDelete = async (id: string) =>
⋮----
const statusBadgeVariant = (productStatus: AdminProductStatus)
⋮----
<Badge variant=
````

## File: apps/admin-dashboard/src/components/admin/RoleCard.tsx
````typescript
import type { AdminRole } from '@v8n/types';
⋮----
interface RoleCardProps {
    role: AdminRole;
}
````

## File: apps/admin-dashboard/src/components/admin/RolesTable.tsx
````typescript
import { Link } from '@/i18n/routing';
import type { AdminRole } from '@v8n/types';
import { Pencil, Lock } from 'lucide-react';
⋮----
interface RolesTableProps {
    roles: AdminRole[];
}
````

## File: apps/admin-dashboard/src/components/admin/SettingsForm.tsx
````typescript
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminSettings, useUpdateSettings, settingsSchema } from '@v8n/api';
import type { SettingsFormValues } from '@v8n/api';
import { Button } from '@v8n/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@v8n/ui';
import { Input } from '@v8n/ui';
import { Label } from '@v8n/ui';
import { Switch } from '@v8n/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@v8n/ui';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
⋮----
type TabId = typeof TABS[number]['id'];
⋮----
const onSubmit = (data: SettingsFormValues) =>
⋮----
alert('Settings saved successfully!'); // Use proper toast in real app
⋮----
<form onSubmit=
{/* Mobile: Accordion / Tabs style, Desktop: Sidebar Tabs */}
⋮----
{/* General Tab */}
⋮----
// eslint-disable-next-line @next/next/no-img-element
⋮----
{/* Store Tab */}
⋮----
{/* Basic native select wrapper if no ui/select */}
⋮----
{/* Payment Tab */}
⋮----
{/* Shipping Tab */}
⋮----
{/* Notifications Tab */}
⋮----
{/* Standard textarea for simplicity since ui/textarea may or may not exist */}
⋮----
{/* Sticky Save Button container for mobile, inline for desktop */}
````

## File: apps/admin-dashboard/src/components/admin/UserCard.tsx
````typescript
import type { AdminUser } from '@v8n/types';
⋮----
interface UserCardProps {
    user: AdminUser;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}
⋮----
const statusBadge = (status: AdminUser['status']) =>
⋮----
export function UserCard(
````

## File: apps/admin-dashboard/src/components/admin/UsersListClient.tsx
````typescript
import { Link } from '@/i18n/routing';
import { useAdminUsers, useDeleteAdminUser } from '@v8n/api';
import { Loader2, Plus, Search, Users } from 'lucide-react';
import { useState } from 'react';
import { UsersTable } from './UsersTable';
import { UserCard } from './UserCard';
⋮----
{/* Breadcrumb (desktop only) */}
⋮----
{/* Header */}
⋮----
{/* Toolbar */}
⋮----
onChange=
⋮----
{/* Content */}
⋮----
{/* Desktop: Table */}
⋮----
{/* Mobile: Card list */}
⋮----
{/* Pagination */}
````

## File: apps/admin-dashboard/src/components/admin/UsersTable.tsx
````typescript
import { Link } from '@/i18n/routing';
import type { AdminUser } from '@v8n/types';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
⋮----
interface UsersTableProps {
    users: AdminUser[];
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}
⋮----
const statusBadge = (status: AdminUser['status']) =>
⋮----
const handleDelete = (id: string) =>
````

## File: apps/admin-dashboard/src/components/admin/WorkflowForm.tsx
````typescript
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
⋮----
import { Plus, Trash2 } from "lucide-react";
import { Workflow, WorkflowFormData } from "@v8n/types";
import { useCreateWorkflow, useUpdateWorkflow } from "@v8n/api";
⋮----
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@ui/components/ui/dialog";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Textarea } from "@ui/components/ui/textarea";
import { Switch } from "@ui/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Select } from "@ui/components/ui/select";
import { Card, CardContent } from "@ui/components/ui/card";
⋮----
interface WorkflowFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow?: Workflow | null;
}
⋮----
const onSubmit = async (data: z.infer<typeof workflowSchema>) =>
⋮----
// Here you would show a toast error
⋮----
<form onSubmit=
⋮----
onCheckedChange=
⋮----
onClick=
````

## File: apps/admin-dashboard/src/components/admin/WorkflowsList.tsx
````typescript
import { useState } from "react";
import { Plus, Search, Edit, Power, Trash2, Zap } from "lucide-react";
import { useAdminWorkflows, useDeleteWorkflow, useToggleWorkflowStatus } from "@v8n/api";
import { Workflow } from "@v8n/types";
⋮----
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Badge } from "@ui/components/ui/badge";
import { Card, CardContent } from "@ui/components/ui/card";
import { WorkflowForm } from "./WorkflowForm";
⋮----
const handleCreate = () =>
⋮----
const handleEdit = (workflow: Workflow) =>
⋮----
const handleDelete = async (id: string) =>
⋮----
const handleToggle = async (id: string) =>
````

## File: apps/admin-dashboard/src/i18n/request.ts
````typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
````

## File: apps/admin-dashboard/src/i18n/routing.ts
````typescript
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
````

## File: apps/admin-dashboard/src/providers/QueryProvider.tsx
````typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
⋮----
interface QueryProviderProps {
  children: ReactNode;
}
⋮----
export function QueryProvider(
````

## File: apps/admin-dashboard/src/middleware.ts
````typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
````

## File: apps/admin-dashboard/AGENTS.md
````markdown
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
````

## File: apps/admin-dashboard/CLAUDE.md
````markdown
@AGENTS.md
````

## File: apps/admin-dashboard/eslint.config.mjs
````javascript

````

## File: apps/admin-dashboard/package.json
````json
{
  "name": "admin-dashboard",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@formatjs/intl-localematcher": "^0.8.10",
    "@hookform/resolvers": "^3.3.4",
    "@tanstack/react-query": "^5.101.0",
    "@v8n/api": "workspace:*",
    "@v8n/types": "workspace:*",
    "@v8n/ui": "workspace:*",
    "lucide-react": "^0.300.0",
    "next": "15.0.0",
    "next-intl": "^4.13.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.4",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@v8n/config": "workspace:*",
    "autoprefixer": "^10.4.16",
    "eslint": "^9.39.0",
    "eslint-config-next": "15.0.0",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5"
  }
}
````

## File: apps/admin-dashboard/postcss.config.mjs
````javascript
/** @type {import('postcss-load-config').Config} */
````

## File: apps/admin-dashboard/README.md
````markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
````

## File: apps/admin-dashboard/tailwind.config.ts
````typescript
import type { Config } from "tailwindcss";
````

## File: apps/admin-dashboard/tsconfig.json
````json
{
  "extends": "../../packages/config/tsconfig.base.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "@ui/*": [
        "../../ecommerce/ui/src/*"
      ],
      "@v8n/i18n/*": [
        "../../packages/i18n/*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
````

## File: apps/storefront/src/app/[locale]/account/orders/[id]/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import OrderDetail from '@/components/account/OrderDetail';
⋮----
interface OrderDetailPageProps {
    params: Promise<{ locale: string; id: string }>;
}
⋮----
export default async function OrderDetailPage(
````

## File: apps/storefront/src/app/[locale]/account/orders/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import OrdersList from "@/components/account/OrdersList";
⋮----
export default async function OrdersPage(
⋮----
{/* Account sidebar will be rendered by layout */}
````

## File: apps/storefront/src/app/[locale]/account/profile/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import ProfileClient from "@/components/account/ProfileClient";
⋮----
export default async function ProfilePage(
````

## File: apps/storefront/src/app/[locale]/account/layout.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import AccountSidebar from "@/components/account/AccountSidebar";
import AuthGuard from "@/components/account/AuthGuard";
⋮----
export default async function AccountLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
})
⋮----
{/* PC: Sidebar + Content */}
⋮----
{/* Sidebar - hidden on mobile */}
⋮----
{/* Content area */}
````

## File: apps/storefront/src/app/[locale]/account/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import AccountDashboardClient from "@/components/account/AccountDashboardClient";
⋮----
export default async function AccountDashboardPage(
````

## File: apps/storefront/src/app/[locale]/cart/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import React from "react";
import Link from "next/link";
import { CartPageContent } from "@/components/cart/CartPageContent";
⋮----
export default async function CartPage(
````

## File: apps/storefront/src/app/[locale]/checkout/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import Link from 'next/link';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
⋮----
export default async function CheckoutPage(
````

## File: apps/storefront/src/app/[locale]/login/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@v8n/ui";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
⋮----
export default async function LoginPage(
⋮----
{/* Breadcrumb */}
⋮----
{/* Login Card */}
````

## File: apps/storefront/src/app/[locale]/products/[slug]/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import { notFound } from 'next/navigation';
import { ProductClient } from '@/components/products/ProductClient';
import { getProductBySlug, getProducts } from '@v8n/api';
import { Metadata } from 'next';
⋮----
type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>
};
⋮----
export async function generateMetadata(
⋮----
export default async function ProductDetailPage(
````

## File: apps/storefront/src/app/[locale]/products/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { ProductGridWithFilters } from '@/components/products/ProductGridWithFilters';
import { getProducts, getCategories } from '@v8n/api';
⋮----
export default async function ProductsPage(
````

## File: apps/storefront/src/app/[locale]/register/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { RegisterPageContent } from "@/components/auth/RegisterPageContent";
⋮----
export default async function RegisterPage(
````

## File: apps/storefront/src/app/[locale]/layout.tsx
````typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
⋮----
export function generateStaticParams()
⋮----
default: 'V8N Headless E-commerce', // if child page not set title -> use default title
⋮----
export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
})
````

## File: apps/storefront/src/app/[locale]/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { ProductGrid } from "@/components/home/ProductGrid";
import { getFeaturedCategories, getFeaturedProducts, getNewArrivals } from "@v8n/api";
⋮----
export default async function HomePage(
⋮----
// TODO: Replace with real data fetching
````

## File: apps/storefront/src/app/globals.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;
⋮----
@layer base {
⋮----
body {
⋮----
img {
⋮----
@apply max-w-full;
````

## File: apps/storefront/src/components/account/AccountDashboardClient.tsx
````typescript
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@/i18n/routing";
import DashboardContent from "@/components/account/DashboardContent";
import { profileApi } from "@v8n/api";
⋮----
export default function AccountDashboardClient()
⋮----
onEdit=
````

## File: apps/storefront/src/components/account/AccountSidebar.tsx
````typescript
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@ui/lib/utils";
import {
    LayoutDashboard,
    Package,
    MapPin,
    User,
    Settings,
    LogOut,
} from "lucide-react";
⋮----
import { useAuthStore } from "@/store/useAuthStore";
⋮----
interface AccountSidebarProps {
    onLogout?: () => void;
}
⋮----
const handleLogout = () =>
⋮----
className=
⋮----
{/* Logout */}
````

## File: apps/storefront/src/components/account/AuthGuard.tsx
````typescript
import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/store/useAuthStore";
⋮----
export default function AuthGuard(
````

## File: apps/storefront/src/components/account/DashboardContent.tsx
````typescript
import { User, Mail, Phone, Calendar } from "lucide-react";
import type { UserProfile } from "@v8n/types";
⋮----
interface DashboardContentProps {
    user: UserProfile | null;
    isLoading: boolean;
    onEdit: () => void;
}
⋮----
export default function DashboardContent({
    user,
    isLoading,
    onEdit,
}: DashboardContentProps)
⋮----
{/* Avatar */}
⋮----
{/* Fields */}
````

## File: apps/storefront/src/components/account/OrderDetail.tsx
````typescript
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    Clock,
    CreditCard,
    MapPin,
    Package,
    Truck,
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@v8n/ui';
import { OrderDetail as OrderDetailType, OrderStatus } from '@v8n/types';
import { useOrder } from '@v8n/api';
⋮----
interface OrderDetailProps {
    orderId: string;
}
⋮----
const formatCurrency = (value: number) => `$$
⋮----
const formatStatusLabel = (status: string)
⋮----
const StatusBadge = (
⋮----
return <ErrorState message=
````

## File: apps/storefront/src/components/account/OrdersList.tsx
````typescript
import { useState } from 'react';
import Link from 'next/link';
import { Package, Calendar, ShoppingCart, CheckCircle, Truck, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@v8n/ui';
import { Button } from '@v8n/ui';
import { Order, OrderStatus } from '@v8n/types';
import { useOrders } from '@v8n/api';
⋮----
// Status badge configuration
⋮----
interface OrdersListProps {
    initialPage?: number;
}
⋮----
// Handle pagination changes
const handlePageChange = (newPage: number) =>
⋮----
// Get current page data
⋮----
// Loading skeleton for desktop table
⋮----
// Loading skeleton for mobile cards
⋮----
// Status badge component
const StatusBadge = (
⋮----
// Empty state
⋮----
// Error state
⋮----
// Desktop view
⋮----
{/* Pagination */}
⋮----
onClick=
⋮----
// Mobile view
⋮----
// Render based on screen size
⋮----
{/* Desktop view */}
⋮----
{/* Mobile view */}
````

## File: apps/storefront/src/components/account/ProfileClient.tsx
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/i18n/routing";
import ProfileForm from "@/components/account/ProfileForm";
import { profileApi } from "@v8n/api";
⋮----
export default function ProfileClient()
⋮----
onSave=
onChangePassword=
onCancel=
````

## File: apps/storefront/src/components/account/ProfileForm.tsx
````typescript
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@v8n/ui";
import { Camera, Eye, EyeOff } from "lucide-react";
import type { UserProfile } from "@v8n/types";
⋮----
type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;
⋮----
interface ProfileFormProps {
    user: UserProfile | null;
    isLoading: boolean;
    onSave: (data: ProfileFormValues) => Promise<void>;
    onChangePassword: (data: PasswordFormValues) => Promise<void>;
    onCancel: () => void;
}
⋮----
const onSubmitProfile = async (data: ProfileFormValues) =>
⋮----
const onSubmitPassword = async (data: PasswordFormValues) =>
⋮----
{/* Profile Form */}
⋮----
{/* Avatar Upload */}
⋮----
<form onSubmit=
⋮----
{/* Password Change Section */}
````

## File: apps/storefront/src/components/auth/LoginForm.tsx
````typescript
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
⋮----
import { Button } from "@v8n/ui";
import { Input } from "@v8n/ui";
import { Checkbox } from "@v8n/ui";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
⋮----
// Google SVG icon component
function GoogleLogo(
⋮----
// Define the login schema
⋮----
type LoginFormValues = z.infer<typeof loginSchema>;
⋮----
// Clear error when auth store has error
⋮----
const onSubmit = async (data: LoginFormValues) =>
⋮----
<form onSubmit=
{/* Error Message */}
⋮----
{/* Email Field */}
⋮----
{/* Password Field */}
⋮----
{/* Remember Me & Forgot Password - Responsive */}
⋮----
{/* Remember me: hidden on mobile, visible on desktop */}
⋮----
{/* Forgot password: always visible */}
⋮----
{/* Sign In Button */}
⋮----
{/* Divider */}
⋮----
{/* Desktop: longer divider text, Mobile: shorter */}
⋮----
{/* Social Login - Google Only */}
⋮----
{/* Register Link */}
````

## File: apps/storefront/src/components/auth/RegisterForm.tsx
````typescript
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
⋮----
import { Button } from "@v8n/ui";
import { Input } from "@v8n/ui";
import { Checkbox } from "@v8n/ui";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { RegisterFormValues, RegisterRequest } from "@v8n/types";
import { useRegister } from "@v8n/api";
⋮----
// Define the register schema
⋮----
// Handle mutation errors
⋮----
const onSubmit = async (data: RegisterFormValues) =>
⋮----
// Transform UI form values to API request payload
// Split fullName by last space: "Nguyen Van A" → firstName="Nguyen Van", lastName="A"
// Edge case: single word → firstName=word, lastName=""
⋮----
// Redirect to login page with success message
⋮----
<form onSubmit=
{/* Error Message */}
⋮----
{/* Full Name Field */}
⋮----
{/* Email Field */}
⋮----
{/* Phone Field (Optional) */}
⋮----
{/* Password Field */}
⋮----
{/* Confirm Password Field */}
⋮----
{/* Terms & Conditions Checkbox */}
⋮----
{/* Create Account Button */}
⋮----
{/* Already have an account? Sign In link */}
````

## File: apps/storefront/src/components/auth/RegisterPageContent.tsx
````typescript
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@v8n/ui";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
⋮----
export function RegisterPageContent()
⋮----
{/* Breadcrumb */}
⋮----
{/* Register Card */}
````

## File: apps/storefront/src/components/cart/CartPageContent.tsx
````typescript
import { useTranslations } from "next-intl";
⋮----
import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@v8n/ui";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
⋮----
<button onClick=
````

## File: apps/storefront/src/components/cart/CartSheet.tsx
````typescript
import { useTranslations } from 'next-intl';
⋮----
import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@v8n/ui';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
⋮----
{/* Overlay */}
⋮----
{/* Slide-over panel */}
⋮----
onClick=
````

## File: apps/storefront/src/components/checkout/CheckoutForm.tsx
````typescript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
⋮----
import { Input, Button } from '@v8n/ui';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
⋮----
type CheckoutFormValues = z.infer<typeof checkoutSchema>;
⋮----
const onSubmit = async () =>
⋮----
// Simulate API call
⋮----
const handleNextStep = async () =>
⋮----
{/* Left Column: Form */}
⋮----
<form onSubmit=
⋮----
{/* Step 1: Address */}
⋮----
onChange=
⋮----
{/* Step 3: Payment */}
⋮----
{/* Step 4: Submit */}
⋮----
{/* Right Column: Order Summary */}
⋮----
<Button onClick=
````

## File: apps/storefront/src/components/common/StarRating.tsx
````typescript
import React from "react";
import { Star } from "lucide-react";
⋮----
interface Props {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}
````

## File: apps/storefront/src/components/home/FeaturedCategories.tsx
````typescript
import React from "react";
import { useTranslations } from "next-intl";
import { Category } from "@v8n/types";
import { Link } from "@/i18n/routing";
⋮----
interface Props {
  categories: Category[];
}
````

## File: apps/storefront/src/components/home/HeroBanner.tsx
````typescript
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@v8n/ui";
import { Link } from "@/i18n/routing";
````

## File: apps/storefront/src/components/home/ProductCard.tsx
````typescript
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Product } from "@v8n/types";
import { Card, CardContent, Button } from "@v8n/ui";
import { useCartStore } from "@/store/useCartStore";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { StarRating } from "@/components/common/StarRating";
⋮----
interface Props {
  product: Product;
}
⋮----
export function ProductCard(
⋮----
const handleAddToCart = (e: React.MouseEvent) =>
⋮----
onMouseEnter=
onMouseLeave=
⋮----
{/* eslint-disable-next-line @next/next/no-img-element */}
⋮----
{/* Quick Add Overlay on Hover */}
````

## File: apps/storefront/src/components/home/ProductGrid.tsx
````typescript
import React from "react";
import { useTranslations } from "next-intl";
import { Product } from "@v8n/types";
import { ProductCard } from "./ProductCard";
import { Link } from "@/i18n/routing";
⋮----
interface Props {
  title: string;
  products: Product[];
}
````

## File: apps/storefront/src/components/layout/Header.tsx
````typescript
import React, { useState, useEffect } from "react";
import { Button } from "@v8n/ui";
import { Input } from "@v8n/ui";
import { LanguageSwitcher } from "@v8n/ui";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { CartSheet } from "../cart/CartSheet";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { getProducts } from "@v8n/api";
import { Product } from "@v8n/types";
import Image from "next/image";
⋮----
const navLinkClass = (href: string, exact = false) =>
⋮----
// Simple debounce for search
⋮----
{/* Mobile: Hamburger */}
⋮----
<Button variant="ghost" size="icon" aria-label="Menu" onClick=
⋮----
{/* Logo */}
⋮----
{/* PC: Navigation & Search */}
⋮----
onChange=
⋮----
{/* Search Dropdown */}
⋮----
onClick=
⋮----
{/* Right Actions */}
⋮----
{/* Mobile Menu Dropdown */}
````

## File: apps/storefront/src/components/products/ProductClient.tsx
````typescript
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import { Product } from '@v8n/types';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductVariantSelector } from '@/components/products/ProductVariantSelector';
import { ProductTabs } from '@/components/products/ProductTabs';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@v8n/ui';
import { Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ProductCard } from '@/components/home/ProductCard';
⋮----
interface ProductClientProps {
  product: Product;
  relatedProducts?: Product[];
}
⋮----
// Set initial selected variant
⋮----
const handleAddToCart = () =>
⋮----
{/* Left Column: Gallery */}
⋮----
{/* Right Column: Product Info */}
⋮----
{/* Variants */}
⋮----
{/* Add to Cart Area */}
⋮----
onClick=
⋮----
<button className="p-2 disabled:opacity-50" disabled=
````

## File: apps/storefront/src/components/products/ProductGallery.tsx
````typescript
import React, { useState } from 'react';
⋮----
interface ProductGalleryProps {
  images: string[];
}
⋮----
{/* Main Image */}
⋮----
{/* eslint-disable-next-line @next/next/no-img-element */}
⋮----
{/* Thumbnails */}
⋮----
{/* eslint-disable-next-line @next/next/no-img-element */}
````

## File: apps/storefront/src/components/products/ProductGridWithFilters.tsx
````typescript
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { ProductCard } from '../home/ProductCard';
import { ProductSidebar } from './ProductSidebar';
import { Product } from '@v8n/types';
import { SlidersHorizontal, X } from 'lucide-react';
⋮----
interface Props {
  initialProducts: Product[];
  initialCategories: { name: string }[];
}
⋮----
// States
⋮----
// Pagination
⋮----
// Derived state (Filtering & Sorting)
⋮----
// Filter by Category
⋮----
// Filter by Price
⋮----
// Filter by Rating
⋮----
// Sorting
⋮----
} // newest could just be default order for mock data
⋮----
const handleClearFilters = () =>
⋮----
const handleCategorySelect = (cats: string[]) =>
⋮----
onChange=
⋮----
onClick=
⋮----
onClearFilters=
````

## File: apps/storefront/src/components/products/ProductSidebar.tsx
````typescript
import { useTranslations } from 'next-intl';
⋮----
import React from 'react';
import { StarRating } from '@/components/common/StarRating';
⋮----
interface ProductSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onSelectCategory: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  onClearFilters: () => void;
}
⋮----
const toggleCategory = (cat: string) =>
⋮----
onChange=
````

## File: apps/storefront/src/components/products/ProductTabs.tsx
````typescript
import React, { useState } from 'react';
⋮----
interface ProductTabsProps {
  description: string;
}
⋮----
export function ProductTabs(
⋮----
onClick=
````

## File: apps/storefront/src/components/products/ProductVariantSelector.tsx
````typescript
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import { ProductVariant } from '@v8n/types';
⋮----
interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onVariantChange: (variantId: string) => void;
}
⋮----
// Extract unique colors and sizes
⋮----
const handleColorChange = (color: string) =>
⋮----
// Find a variant with the new color and same size (if possible), else just the new color
⋮----
const handleSizeChange = (size: string) =>
⋮----
// Find a variant with the new size and same color (if possible), else just the new size
⋮----
// Check if this size is available for the currently selected color
````

## File: apps/storefront/src/i18n/request.ts
````typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
⋮----
// Static import để webpack bundle được messages (tránh lỗi "not exported from package")
import enMessages from "@v8n/i18n/messages/en.json";
import viMessages from "@v8n/i18n/messages/vi.json";
⋮----
type MessageMap = typeof messageMap;
````

## File: apps/storefront/src/i18n/routing.ts
````typescript
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
````

## File: apps/storefront/src/store/useAuthStore.ts
````typescript
import { create } from 'zustand';
import { User, AuthResponse } from '@v8n/types';
import { authApi } from '@v8n/api';
⋮----
// Token storage keys
⋮----
interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
⋮----
interface AuthActions {
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
    clearError: () => void;
}
⋮----
/**
 * Store tokens based on rememberMe preference.
 * accessToken: localStorage (rememberMe=true) or sessionStorage (rememberMe=false)
 * refreshToken: always localStorage for persistence
 * expiresAt: same storage as accessToken
 */
function storeTokens(response: AuthResponse, rememberMe: boolean): void
⋮----
// expiresIn is in seconds, store as timestamp for expiry check
⋮----
/**
 * Clear tokens from both localStorage and sessionStorage
 * to handle rememberMe toggle scenarios.
 */
function clearTokens(): void
⋮----
/**
 * Get accessToken from whichever storage it exists in.
 */
function getAccessToken(): string | null
⋮----
// Save tokens and user
⋮----
// Clear all tokens
⋮----
// Check if user is authenticated by looking for stored token
⋮----
// In a real app, we'd validate the token or call an endpoint
// For now, we'll assume it's valid
````

## File: apps/storefront/src/store/useCartStore.ts
````typescript
import { create } from 'zustand';
import { Product } from '@v8n/types';
⋮----
export interface CartItem {
  product: Product;
  variantId?: string;
  quantity: number;
}
⋮----
interface CartState {
  items: CartItem[];
  addItem: (product: Product, variantId?: string, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  itemCount: () => number;
}
````

## File: apps/storefront/src/middleware.ts
````typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
````

## File: apps/storefront/eslint.config.mjs
````javascript

````

## File: apps/storefront/postcss.config.mjs
````javascript
/** @type {import('postcss-load-config').Config} */
````

## File: apps/storefront/tailwind.config.ts
````typescript
import type { Config } from "tailwindcss";
````

## File: apps/storefront/tsconfig.json
````json
{
  "extends": "../../packages/config/tsconfig.base.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@ui/*": ["../../ecommerce/ui/src/*"],
      "@v8n/i18n/*": ["../../packages/i18n/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
````

## File: ecommerce/ui/src/components/common/GlobalErrorFallback.tsx
````typescript
import { useEffect } from "react";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";
⋮----
export function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
resetErrorBoundary: ()
````

## File: ecommerce/ui/src/components/ui/badge.tsx
````typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';
⋮----
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
⋮----
export function Badge(
⋮----
return <div className=
````

## File: ecommerce/ui/src/components/ui/button.tsx
````typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@ui/lib/utils"
⋮----
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
````

## File: ecommerce/ui/src/components/ui/card.tsx
````typescript
import { cn } from "@ui/lib/utils"
````

## File: ecommerce/ui/src/components/ui/checkbox.tsx
````typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@ui/lib/utils"
⋮----
function CheckMark()
⋮----
export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "checked">,
    VariantProps<typeof checkboxVariants> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}
⋮----
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
⋮----
<label className=
````

## File: ecommerce/ui/src/components/ui/dialog.tsx
````typescript
import { X } from "lucide-react"
⋮----
import { cn } from "../../lib/utils"
⋮----
className=
````

## File: ecommerce/ui/src/components/ui/form.tsx
````typescript
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form"
import { cn } from "@ui/lib/utils"
import { Label } from "./label"
⋮----
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}
⋮----
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) =>
⋮----
const useFormField = () =>
⋮----
type FormItemContextValue = {
  id: string
}
⋮----
className=
````

## File: ecommerce/ui/src/components/ui/input.tsx
````typescript
import { cn } from "@ui/lib/utils"
⋮----
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
````

## File: ecommerce/ui/src/components/ui/label.tsx
````typescript
import { cn } from "@ui/lib/utils"
⋮----
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
````

## File: ecommerce/ui/src/components/ui/select.tsx
````typescript
import { cn } from "@ui/lib/utils"
⋮----
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
⋮----
className=
````

## File: ecommerce/ui/src/components/ui/switch.tsx
````typescript
import { cn } from "@ui/lib/utils"
⋮----
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
⋮----
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
⋮----
<label className=
````

## File: ecommerce/ui/src/components/ui/table.tsx
````typescript
import { cn } from '@ui/lib/utils';
````

## File: ecommerce/ui/src/components/ui/textarea.tsx
````typescript
import { cn } from "@ui/lib/utils"
⋮----
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
⋮----
className=
````

## File: ecommerce/ui/src/components/ui/toaster.tsx
````typescript
import { useToast } from "./use-toast";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
````

## File: ecommerce/ui/src/components/ui/use-toast.ts
````typescript
import { useState } from 'react';
import { useEventBus } from '@v8n/hooks';
⋮----
export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
};
⋮----
export function toast(props: ToastProps)
⋮----
export function useToast()
````

## File: ecommerce/ui/src/components/language-switcher.tsx
````typescript
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
⋮----
const handleSwitch = (locale: string) =>
⋮----
onClick=
````

## File: ecommerce/ui/src/lib/utils.ts
````typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
⋮----
export function cn(...inputs: ClassValue[])
````

## File: ecommerce/ui/src/index.ts
````typescript

````

## File: ecommerce/ui/package.json
````json
{
  "name": "@v8n/ui",
  "version": "0.0.0",
  "private": true,
  "main": "src/index.ts",
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.17",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.300.0",
    "react-hook-form": "^7.50.0",
    "tailwind-merge": "^2.0.0",
    "@v8n/hooks": "workspace:*"
  },
  "peerDependencies": {
    "next": "^15.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
````

## File: ecommerce/ui/tsconfig.json
````json
{
  "extends": "../../packages/config/tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@ui/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"]
}
````

## File: packages/api/src/account/orders.ts
````typescript
import { OrderDetail, OrdersResponse } from '@v8n/types';
import { zOrderDetail, zOrdersResponseSchema } from './zod-schemas';
⋮----
interface FetchOrdersParams {
    page?: number;
    limit?: number;
}
⋮----
const getAuthToken = (): string | null =>
⋮----
const createHeaders = (): HeadersInit =>
⋮----
const getErrorMessage = (status: number, fallbackMessage?: string): string =>
⋮----
const parseErrorPayload = async (response: Response): Promise<string | undefined> =>
⋮----
const handleResponseError = async (response: Response): Promise<never> =>
⋮----
export const fetchOrders = async ({
    page = 1,
    limit = 10,
}: FetchOrdersParams): Promise<OrdersResponse> =>
⋮----
export const fetchOrderById = async (id: string): Promise<OrderDetail> =>
````

## File: packages/api/src/account/queries.ts
````typescript
import { useQuery } from '@tanstack/react-query';
import { OrderDetail, OrdersResponse } from '@v8n/types';
import { fetchOrderById, fetchOrders, orderApi } from './orders';
⋮----
export const useOrders = (params:
⋮----
export const useOrder = (id?: string) =>
````

## File: packages/api/src/account/zod-schemas.ts
````typescript
import { z } from 'zod';
````

## File: packages/api/src/admin/catalog.ts
````typescript
import { AdminProduct, AdminProductsParams, AdminProductsResponse, CreateProductPayload, UpdateProductPayload } from '@v8n/types';
import { mockProducts } from '../home/queries';
import {
  zAdminErrorPayload,
  zAdminProductDeleteResponse,
  zAdminProductStatus,
  zAdminProductsParams,
  zAdminProductsResponse,
  zAdminProduct,
} from './zod-schemas';
⋮----
const getAdminToken = (): string | null =>
⋮----
const createHeaders = (): HeadersInit =>
⋮----
const getErrorMessage = (status: number, fallbackMessage?: string): string =>
⋮----
const parseErrorPayload = async (response: Response): Promise<string | undefined> =>
⋮----
const handleResponseError = async (response: Response): Promise<never> =>
⋮----
const toAdminProducts = (): AdminProduct[] =>
⋮----
const sortProducts = (products: AdminProduct[], sortBy: NonNullable<AdminProductsParams['sortBy']>, order: NonNullable<AdminProductsParams['order']>) =>
⋮----
const fetchMockAdminProducts = async (params: AdminProductsParams): Promise<AdminProductsResponse> =>
⋮----
export const fetchAdminProducts = async (params: AdminProductsParams =
⋮----
export const deleteAdminProduct = async (id: string): Promise<
⋮----
export const fetchAdminProductById = async (id: string): Promise<AdminProduct> =>
⋮----
export const createAdminProduct = async (payload: CreateProductPayload): Promise<AdminProduct> =>
⋮----
export const updateAdminProduct = async (id: string, payload: UpdateProductPayload): Promise<AdminProduct> =>
````

## File: packages/api/src/admin/index.ts
````typescript

````

## File: packages/api/src/admin/orders.ts
````typescript
import { zAdminOrdersParams, zAdminOrdersResponse, zAdminErrorPayload, zAdminOrder, zAdminOrderDetail, zAdminOrderStatusUpdate } from './zod-schemas';
import type { AdminOrdersResponse, AdminOrder, AdminOrderDetail } from '@v8n/types';
⋮----
const getAdminToken = (): string | null =>
⋮----
const createHeaders = (): HeadersInit =>
⋮----
const handleResponseError = async (response: Response): Promise<never> =>
⋮----
// Mock data
⋮----
export async function fetchAdminOrders(
  params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  } = {}
): Promise<AdminOrdersResponse>
⋮----
// Mock implementation
⋮----
// Actual API call
⋮----
export async function fetchAdminOrderById(id: string): Promise<AdminOrderDetail>
⋮----
// Add detail fields for mockup
⋮----
export async function updateOrderStatus(id: string, status: string): Promise<
⋮----
// Validate status
⋮----
// Update mock data locally for this session
````

## File: packages/api/src/admin/queries.ts
````typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminProduct, AdminProductsParams, AdminProductsResponse, CreateProductPayload, UpdateProductPayload, AdminOrdersResponse, AdminOrder, AdminOrderDetail, AdminUsersParams, AdminUsersResponse, CreateAdminUserPayload, UpdateAdminUserPayload, AdminUser, AdminRolesResponse, CreateAdminRolePayload, UpdateAdminRolePayload, LoginHistoryParams, LoginHistoryResponse } from '@v8n/types';
import { deleteAdminProduct, fetchAdminProducts, createAdminProduct, updateAdminProduct, fetchAdminProductById } from './catalog';
import { fetchAdminOrders, fetchAdminOrderById, updateOrderStatus } from './orders';
import { fetchAdminWorkflows, createWorkflow, updateWorkflow, deleteWorkflow, toggleWorkflowStatus } from './workflows';
import { fetchAdminSettings, updateAdminSettings } from './settings';
import { fetchAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser, fetchAdminUserById, fetchAdminRoles, createAdminRole, updateAdminRole, deleteAdminRole, fetchAdminPermissions, fetchLoginHistory } from './rbac';
import { WorkflowFormData, AdminSettings, SettingsFormData } from '@v8n/types';
export const adminProductsQueryKey = (params: AdminProductsParams =
⋮----
export const useAdminProducts = (params: AdminProductsParams =
⋮----
export const useDeleteAdminProduct = () =>
⋮----
export const useAdminProduct = (id: string) =>
⋮----
export const useCreateAdminProduct = () =>
⋮----
export const useUpdateAdminProduct = () =>
⋮----
export const adminOrdersQueryKey = (params:
⋮----
export const useAdminOrders = (params:
⋮----
export const useAdminOrder = (id: string) =>
⋮----
export const useUpdateOrderStatus = () =>
⋮----
export const adminWorkflowsQueryKey = ()
⋮----
export const useAdminWorkflows = () =>
⋮----
export const useCreateWorkflow = () =>
⋮----
export const useUpdateWorkflow = () =>
⋮----
export const useDeleteWorkflow = () =>
⋮----
export const useToggleWorkflowStatus = () =>
⋮----
export const adminSettingsQueryKey = ()
⋮----
export const useAdminSettings = () =>
⋮----
export const useUpdateSettings = () =>
⋮----
// ============================================================
// Admin RBAC Users Queries
// ============================================================
⋮----
export const adminUsersQueryKey = (params: AdminUsersParams =
⋮----
export const useAdminUsers = (params: AdminUsersParams =
⋮----
export const useAdminUser = (id: string) =>
⋮----
export const useCreateAdminUser = () =>
⋮----
export const useUpdateAdminUser = () =>
⋮----
export const useDeleteAdminUser = () =>
⋮----
// ============================================================
// Admin RBAC Roles Queries
// ============================================================
⋮----
export const adminRolesQueryKey = ()
⋮----
export const useAdminRoles = () =>
⋮----
export const useAdminPermissions = () =>
⋮----
export const useCreateAdminRole = () =>
⋮----
export const useUpdateAdminRole = () =>
⋮----
export const useDeleteAdminRole = () =>
⋮----
// ============================================================
// Login History Queries
// ============================================================
⋮----
export const loginHistoryQueryKey = (params: LoginHistoryParams =
⋮----
export const useLoginHistory = (params: LoginHistoryParams =
````

## File: packages/api/src/admin/rbac.ts
````typescript
import type {
    AdminUser,
    AdminUsersParams,
    AdminUsersResponse,
    AdminRole,
    AdminRolesResponse,
    AdminPermission,
    AdminPermissionsResponse,
    CreateAdminUserPayload,
    UpdateAdminUserPayload,
    CreateAdminRolePayload,
    UpdateAdminRolePayload,
    LoginHistoryRecord,
    LoginHistoryParams,
    LoginHistoryResponse,
} from '@v8n/types';
import {
    adminUserSchema,
    adminRoleSchema,
    adminUsersParamsSchema,
    loginHistoryParamsSchema,
} from './zod-schemas';
⋮----
// ============================================================
// Centralized Mock Data
// ============================================================
⋮----
// ---- Roles mock data (single source) ----
⋮----
// ---- Permissions mock data (single source) ----
⋮----
// ---- Login History mock data (single source) ----
⋮----
// ============================================================
// Admin Users API
// ============================================================
⋮----
export const fetchAdminUsers = async (params: AdminUsersParams =
⋮----
export const fetchAdminUserById = async (id: string): Promise<AdminUser> =>
⋮----
export const createAdminUser = async (payload: CreateAdminUserPayload): Promise<AdminUser> =>
⋮----
export const updateAdminUser = async (payload: UpdateAdminUserPayload): Promise<AdminUser> =>
⋮----
export const deleteAdminUser = async (id: string): Promise<
⋮----
// ============================================================
// Admin Roles API
// ============================================================
⋮----
export const fetchAdminRoles = async (): Promise<AdminRolesResponse> =>
⋮----
export const fetchAdminPermissions = async (): Promise<AdminPermissionsResponse> =>
⋮----
export const createAdminRole = async (payload: CreateAdminRolePayload): Promise<AdminRole> =>
⋮----
export const updateAdminRole = async (payload: UpdateAdminRolePayload): Promise<AdminRole> =>
⋮----
export const deleteAdminRole = async (id: string): Promise<
⋮----
// ============================================================
// Login History API
// ============================================================
⋮----
export const fetchLoginHistory = async (params: LoginHistoryParams =
````

## File: packages/api/src/admin/settings.ts
````typescript
import { AdminSettings, SettingsFormData } from '@v8n/types';
import { settingsSchema } from './zod-schemas';
⋮----
// Mock data managed locally for admin settings
⋮----
export const fetchAdminSettings = async (): Promise<AdminSettings> =>
⋮----
export const updateAdminSettings = async (data: SettingsFormData): Promise<AdminSettings> =>
⋮----
// Validate with Zod before saving (even in mock)
⋮----
// Update mock data
````

## File: packages/api/src/admin/workflows.ts
````typescript
import { Workflow, WorkflowFormData, WorkflowsResponse } from '@v8n/types';
⋮----
// Mock data managed locally for admin workflows since it does not exist in queries.ts yet.
// According to rule: Mock data MUST ONLY be created and managed centrally.
// Usually it's in home/queries.ts but this is admin-specific, so we manage it here or in a centralized admin mock file.
⋮----
export const fetchAdminWorkflows = async (): Promise<WorkflowsResponse> =>
⋮----
export const createWorkflow = async (data: WorkflowFormData): Promise<Workflow> =>
⋮----
export const updateWorkflow = async (id: string, data: WorkflowFormData): Promise<Workflow> =>
⋮----
export const deleteWorkflow = async (id: string): Promise<void> =>
⋮----
export const toggleWorkflowStatus = async (id: string): Promise<Workflow> =>
````

## File: packages/api/src/admin/zod-schemas.ts
````typescript
import { z } from 'zod';
⋮----
export type ProductFormValues = z.infer<typeof productFormSchema>;
⋮----
export type SettingsFormValues = z.infer<typeof settingsSchema>;
⋮----
// ============================================================
// Admin RBAC Zod Schemas
// ============================================================
⋮----
export type AdminUserFormValues = z.infer<typeof adminUserSchema>;
export type AdminUserUpdateFormValues = z.infer<typeof adminUserUpdateSchema>;
export type AdminRoleFormValues = z.infer<typeof adminRoleSchema>;
````

## File: packages/api/src/auth/auth.api.ts
````typescript
import { LoginRequest, AuthResponse, RegisterRequest, ApiResponse } from "@v8n/types";
⋮----
// TODO: Use axios/fetch to call backend API endpoints when ready.
// Currently using fetch-based implementation with error handling.
````

## File: packages/api/src/auth/auth.hooks.ts
````typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegisterRequest, AuthResponse } from '@v8n/types';
import { authApi } from './auth.api';
⋮----
// Define query keys for auth-related queries
⋮----
/**
 * Custom hook for user registration using TanStack Query
 * 
 * @returns An object containing:
 * - mutate: Function to trigger the registration mutation
 * - mutateAsync: Promise-based version of mutate
 * - isPending: Boolean indicating if mutation is in progress
 * - error: Error object if mutation failed
 * - data: Response data if mutation succeeded
 * - reset: Function to reset mutation state
 */
export function useRegister()
⋮----
// Call the API registration function
⋮----
// Re-throw the error so it's caught by the mutation error handler
⋮----
// Optimistic UI pattern: update local state before server response
⋮----
// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
⋮----
// Snapshot the previous value
⋮----
// Return a context object with the snapshotted value
⋮----
// If the mutation fails, use the context returned from onMutate to roll back
⋮----
// Restore previous data if it existed
⋮----
// Always refetch after error or success to ensure we have the latest data
⋮----
// Invalidate auth-related queries to ensure fresh data
````

## File: packages/api/src/auth/index.ts
````typescript

````

## File: packages/api/src/profile/index.ts
````typescript

````

## File: packages/api/src/profile/queries.ts
````typescript
import type { UserProfile, UpdateProfileRequest, UpdatePasswordRequest } from "@v8n/types";
import { fetchClient } from "../client";
````

## File: packages/api/src/client.ts
````typescript
export interface FetchClientOptions extends RequestInit {
  params?: Record<string, string>;
}
⋮----
export async function fetchClient<T = any>(endpoint: string, options: FetchClientOptions =
⋮----
// Base URL resolution
⋮----
// Read locale from NEXT_LOCALE cookie (set by next-intl)
⋮----
// Automatically map HTTP 400/500 errors to global toast notifications
⋮----
// For 204 No Content or empty responses
````

## File: packages/api/src/index.ts
````typescript

````

## File: packages/api/package.json
````json
{
  "name": "@v8n/api",
  "version": "0.0.0",
  "private": true,
  "main": "src/index.ts",
  "dependencies": {
    "@v8n/types": "workspace:*",
    "zod": "^3.22.4"
  },
  "peerDependencies": {
    "@tanstack/react-query": "^5.101.0",
    "react": "^18.2.0"
  },
  "devDependencies": {
    "@tanstack/react-query": "^5.101.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0"
  }
}
````

## File: packages/api/tsconfig.json
````json
{
  "extends": "../config/tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "types": ["node"]
  },
  "include": ["src/**/*"]
}
````

## File: packages/config/eslint/next.mjs
````javascript
export const createNextEslintConfig = (projectDir) =>
````

## File: packages/config/package.json
````json
{
  "name": "@v8n/config",
  "version": "0.0.0",
  "private": true,
  "exports": {
    "./eslint/next": "./eslint/next.mjs"
  },
  "dependencies": {
    "@eslint/js": "^9.0.0",
    "@eslint/eslintrc": "^3.0.0",
    "eslint": "^9.39.0",
    "eslint-config-next": "15.0.0"
  }
}
````

## File: packages/config/tsconfig.base.json
````json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  }
}
````

## File: packages/hooks/src/index.ts
````typescript

````

## File: packages/hooks/src/useEventBus.ts
````typescript
import { useEffect, useCallback, useRef } from 'react';
⋮----
export type EventCallback<T = any> = (payload: T) => void;
⋮----
export interface UseEventBusOptions {
  /** Lock duration in milliseconds to prevent spam-clicks */
  lockDurationMs?: number;
}
⋮----
/** Lock duration in milliseconds to prevent spam-clicks */
⋮----
/**
 * A global Event Bus hook for cross-component communication.
 * Implements a lock mechanism to prevent spam triggering of critical events.
 */
export function useEventBus<T = any>(
  eventName: string,
  onEvent?: EventCallback<T>,
  options: UseEventBusOptions = { lockDurationMs: 1000 }
)
⋮----
const handleEvent = (e: CustomEvent<T>) =>
````

## File: packages/hooks/package.json
````json
{
  "name": "@v8n/hooks",
  "version": "0.0.0",
  "private": true,
  "main": "src/index.ts",
  "peerDependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
````

## File: packages/hooks/tsconfig.json
````json
{
  "extends": "../config/tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"]
}
````

## File: packages/i18n/messages/en.json
````json
{
    "common": {
        "loading": "Loading...",
        "save": "Save",
        "cancel": "Cancel",
        "delete": "Delete",
        "edit": "Edit",
        "create": "Create",
        "confirm": "Confirm",
        "back": "Back",
        "no_results": "No results found",
        "view_all": "View All",
        "search": "Search...",
        "actions": "Actions",
        "total_items": "Total: {count}",
        "confirm_delete": "Are you sure you want to delete?",
        "operation_success": "Operation successful",
        "operation_failed": "Operation failed",
        "logout": "Logout",
        "validation": {
            "required": "This field is required",
            "min_length": "Must be at least {min} characters",
            "max_length": "Must not exceed {max} characters",
            "email": "Invalid email address",
            "phone": "Invalid phone number",
            "url": "Invalid URL",
            "number": "Must be a number",
            "min": "Minimum value is {min}",
            "max": "Maximum value is {max}",
            "positive_number": "Must be a positive number",
            "integer": "Must be an integer",
            "match": "Values do not match",
            "password_strong": "Password must contain uppercase, lowercase and numbers",
            "accept_terms": "You must accept the terms"
        },
        "error": {
            "something_wrong": "Something went wrong",
            "try_again": "Please try again later",
            "not_found": "Not Found",
            "not_found_description": "The page you are looking for does not exist or has been moved.",
            "go_home": "Go Home",
            "unauthorized": "You need to sign in to access",
            "forbidden": "You don't have permission to access",
            "network_error": "Network connection error",
            "server_error": "Server error",
            "session_expired": "Session expired"
        },
        "language": {
            "vi": "Tiếng Việt",
            "en": "English",
            "zh": "中文",
            "ko": "한국어",
            "ja": "日本語",
            "switch_language": "Switch Language"
        }
    },
    "admin": {
        "site_name": "V8N Admin",
        "admin_panel": "Admin Panel",
        "dashboard": {
            "title": "Dashboard",
            "welcome": "Welcome back",
            "total_revenue": "Total Revenue",
            "total_orders": "Total Orders",
            "total_products": "Total Products",
            "total_customers": "Total Customers",
            "recent_orders": "Recent Orders",
            "recent_products": "Recent Products",
            "revenue_chart": "Revenue Chart",
            "orders_chart": "Orders Chart",
            "this_month": "This month",
            "vs_last_month": "vs last month",
            "view_all": "View All"
        },
        "products": {
            "title": "Product Management",
            "add_product": "Add Product",
            "edit_product": "Edit Product",
            "product_name": "Product Name",
            "product_sku": "SKU",
            "product_price": "Price",
            "product_status": "Status",
            "product_category": "Category",
            "product_inventory": "Inventory",
            "product_description": "Description",
            "product_images": "Images",
            "product_variants": "Variants",
            "product_options": "Options",
            "status_active": "Active",
            "status_draft": "Draft",
            "status_inactive": "Inactive",
            "status_out_of_stock": "Out of Stock",
            "search_products": "Search products...",
            "filter_by_status": "Filter by status",
            "filter_by_category": "Filter by category",
            "all_statuses": "All Statuses",
            "all_categories": "All Categories",
            "no_products": "No products yet",
            "import": "Import",
            "export": "Export",
            "bulk_actions": "Bulk Actions",
            "confirm_delete_product": "Are you sure you want to delete this product?",
            "product_created": "Product created successfully",
            "product_updated": "Product updated successfully",
            "product_deleted": "Product deleted successfully"
        },
        "orders": {
            "title": "Order Management",
            "order_id": "Order ID",
            "customer": "Customer",
            "customer_email": "Customer Email",
            "order_date": "Order Date",
            "order_total": "Total",
            "order_status": "Status",
            "payment_status": "Payment",
            "fulfillment_status": "Fulfillment",
            "status_pending": "Pending",
            "status_confirmed": "Confirmed",
            "status_processing": "Processing",
            "status_shipped": "Shipped",
            "status_delivered": "Delivered",
            "status_cancelled": "Cancelled",
            "status_refunded": "Refunded",
            "payment_paid": "Paid",
            "payment_unpaid": "Unpaid",
            "payment_refunded": "Refunded",
            "search_orders": "Search orders...",
            "filter_by_status": "Filter by status",
            "all_statuses": "All Statuses",
            "no_orders": "No orders yet",
            "order_detail": "Order Detail",
            "order_items": "Order Items",
            "shipping_address": "Shipping Address",
            "payment_method": "Payment Method",
            "shipping_method": "Shipping Method",
            "subtotal": "Subtotal",
            "shipping": "Shipping",
            "tax": "Tax",
            "total": "Total",
            "notes": "Notes",
            "update_status": "Update Status",
            "status_updated": "Status updated successfully",
            "export_orders": "Export Orders"
        },
        "workflows": {
            "title": "Workflow Management",
            "add_workflow": "Add Workflow",
            "edit_workflow": "Edit Workflow",
            "name": "Workflow Name",
            "description": "Description",
            "trigger": "Trigger",
            "status": "Status",
            "steps": "Steps",
            "created_at": "Created At",
            "updated_at": "Updated At",
            "status_active": "Active",
            "status_inactive": "Inactive",
            "status_draft": "Draft",
            "no_workflows": "No workflows yet",
            "confirm_delete_workflow": "Are you sure you want to delete this workflow?",
            "workflow_created": "Workflow created successfully",
            "workflow_updated": "Workflow updated successfully",
            "workflow_deleted": "Workflow deleted successfully",
            "add_step": "Add Step",
            "step_name": "Step Name",
            "step_action": "Action",
            "step_conditions": "Conditions",
            "save_workflow": "Save Workflow"
        },
        "settings": {
            "title": "Settings",
            "general": "General",
            "store": "Store",
            "email": "Email",
            "shipping": "Shipping",
            "payment": "Payment",
            "store_name": "Store Name",
            "store_email": "Store Email",
            "store_phone": "Store Phone",
            "store_address": "Store Address",
            "currency": "Currency",
            "timezone": "Timezone",
            "language": "Default Language",
            "smtp_host": "SMTP Host",
            "smtp_port": "SMTP Port",
            "smtp_user": "SMTP Username",
            "smtp_password": "SMTP Password",
            "sender_name": "Sender Name",
            "sender_email": "Sender Email",
            "free_shipping_threshold": "Free Shipping Threshold",
            "default_shipping_fee": "Default Shipping Fee",
            "payment_gateway": "Payment Gateway",
            "settings_saved": "Settings saved successfully",
            "settings_error": "Error saving settings"
        },
        "seo": {
            "default_title": "V8N Admin Panel",
            "products_title": "Products - V8N Admin"
        }
    },
    "storefront": {
        "site_name": "V8N Store",
        "tagline": "Next-Gen E-Commerce",
        "nav_home": "Home",
        "nav_shop": "Shop",
        "nav_categories": "Categories",
        "nav_deals": "Deals",
        "search_placeholder": "Search products...",
        "cart": "Cart",
        "login": "Login",
        "user_account": "Account",
        "shop_title": "Shop",
        "all_products": "All Products",
        "categories": "Categories",
        "new_arrivals": "New Arrivals",
        "support_title": "Support",
        "contact_us": "Contact Us",
        "faqs": "FAQs",
        "shipping_info": "Shipping Info",
        "legal_title": "Legal",
        "privacy_policy": "Privacy Policy",
        "terms_of_service": "Terms of Service",
        "copyright": "© 2025 V8N Store. All rights reserved.",
        "next": "Next",
        "close": "Close",
        "home": {
            "hero_subtitle": "New Collection",
            "hero_title": "Discover Your Style",
            "hero_description": "Shop the latest products with the best quality",
            "shop_now": "Shop Now",
            "featured_categories": "Featured Categories",
            "shop_by_category": "Shop by Category",
            "items_count": "{count} items"
        },
        "product": {
            "quick_add": "Quick Add",
            "added": "Added",
            "breadcrumb_home": "Home",
            "breadcrumb_shop": "Shop",
            "price": "Price",
            "sale_price": "Sale Price",
            "in_stock": "In Stock",
            "out_of_stock": "Out of Stock",
            "add_to_cart": "Add to Cart",
            "description": "Description",
            "specifications": "Specifications",
            "reviews": "Reviews",
            "related_products": "Related Products",
            "color": "Color",
            "size": "Size",
            "quantity": "Quantity",
            "filter": "Filter",
            "sort_by": "Sort By",
            "sort_newest": "Newest",
            "sort_price_low": "Price: Low to High",
            "sort_price_high": "Price: High to Low",
            "sort_popular": "Most Popular",
            "clear_filters": "Clear Filters",
            "price_range": "Price Range",
            "all_categories": "All Categories"
        },
        "cart": {
            "title": "Shopping Cart",
            "empty": "Your cart is empty",
            "empty_title": "Empty Cart",
            "empty_description": "Looks like you haven't added any items to your cart yet",
            "continue_shopping": "Continue Shopping",
            "subtotal": "Subtotal",
            "shipping_note": "Shipping calculated at checkout",
            "view_full_cart": "View Full Cart",
            "checkout": "Checkout",
            "order_summary": "Order Summary",
            "shipping": "Shipping",
            "free": "Free",
            "tax": "Tax",
            "total": "Total",
            "proceed_checkout": "Proceed to Checkout",
            "checkout_with_total": "Checkout {total}",
            "remove": "Remove",
            "quantity": "Quantity",
            "update_cart": "Update Cart"
        },
        "checkout": {
            "title": "Checkout",
            "order_confirmed": "Order Confirmed!",
            "thank_you": "Thank you for your purchase. You will receive an email confirmation.",
            "continue_shopping": "Continue Shopping",
            "shipping_address": "Shipping Address",
            "shipping_method": "Shipping Method",
            "payment_method": "Payment Method",
            "review_order": "Review Order",
            "standard_shipping": "Standard Shipping",
            "express_shipping": "Express Shipping",
            "cod": "Cash on Delivery",
            "credit_card": "Credit Card",
            "continue_to": "Continue to {step}",
            "place_order": "Place Order",
            "edit": "Edit",
            "first_name": "First Name",
            "last_name": "Last Name",
            "email": "Email",
            "phone": "Phone Number",
            "address": "Address",
            "city": "City",
            "district": "District",
            "ward": "Ward",
            "zip_code": "Zip Code",
            "order_notes": "Order Notes",
            "notes_placeholder": "Notes about your order..."
        },
        "auth": {
            "invalid_email": "Invalid email address",
            "password_min": "Password must be at least 8 characters",
            "email": "Email",
            "password": "Password",
            "remember_me": "Remember me",
            "forgot_password": "Forgot Password?",
            "sign_in": "Sign In",
            "signing_in": "Signing in...",
            "or_divider": "or",
            "google_login": "Sign in with Google",
            "no_account": "Don't have an account?",
            "create_account": "Create Account",
            "has_account": "Already have an account?",
            "login_failed": "Login failed. Please check your information.",
            "full_name_min": "Name must be at least 2 characters",
            "full_name_max": "Name must not exceed 50 characters",
            "password_uppercase": "Password must contain at least 1 uppercase letter",
            "password_lowercase": "Password must contain at least 1 lowercase letter",
            "password_number": "Password must contain at least 1 number",
            "passwords_mismatch": "Passwords do not match",
            "accept_terms": "You must accept the terms",
            "full_name": "Full Name",
            "phone_optional": "Phone Number (optional)",
            "confirm_password": "Confirm Password",
            "agree_terms": "I agree to the",
            "terms_link": "Terms of Service",
            "creating_account": "Creating account...",
            "register_failed": "Registration failed. Please try again.",
            "logout": "Sign Out",
            "welcome_back": "Welcome Back",
            "register_title": "Create New Account",
            "register_description": "Sign up for the best shopping experience"
        },
        "account": {
            "dashboard": "Dashboard",
            "orders": "Orders",
            "profile": "Profile",
            "addresses": "Addresses",
            "wishlist": "Wishlist",
            "settings": "Settings",
            "sign_out": "Sign Out",
            "welcome": "Hello",
            "overview": "Account Overview",
            "recent_orders": "Recent Orders",
            "view_all_orders": "View All Orders",
            "account_details": "Account Details",
            "edit_profile": "Edit Profile",
            "personal_info": "Personal Information",
            "change_password": "Change Password",
            "current_password": "Current Password",
            "new_password": "New Password",
            "confirm_new_password": "Confirm New Password",
            "profile_updated": "Profile updated successfully",
            "password_changed": "Password changed successfully",
            "order_id": "Order ID",
            "order_date": "Order Date",
            "order_status": "Status",
            "order_total": "Total",
            "no_orders": "You have no orders yet",
            "order_detail": "Order Detail",
            "order_items": "Order Items",
            "shipping_info": "Shipping Information",
            "payment_info": "Payment Information",
            "back_to_orders": "Back to Orders",
            "status_pending": "Pending",
            "status_processing": "Processing",
            "status_shipped": "Shipped",
            "status_delivered": "Delivered",
            "status_cancelled": "Cancelled"
        },
        "footer": {
            "about": "About V8N",
            "about_description": "A modern headless e-commerce platform providing flexible and fast shopping experiences.",
            "customer_service": "Customer Service",
            "quick_links": "Quick Links",
            "follow_us": "Follow Us",
            "newsletter": "Newsletter",
            "newsletter_placeholder": "Enter your email",
            "subscribe": "Subscribe",
            "newsletter_description": "Get updates on new products and promotions"
        },
        "seo": {
            "default_title": "V8N Store - Modern E-Commerce",
            "default_description": "Shop online with the best experience at V8N Store. Quality products, fast delivery.",
            "home_title": "V8N Store - Home",
            "products_title": "Products - V8N Store",
            "cart_title": "Cart - V8N Store",
            "checkout_title": "Checkout - V8N Store",
            "login_title": "Login - V8N Store",
            "register_title": "Register - V8N Store",
            "account_title": "Account - V8N Store",
            "orders_title": "Orders - V8N Store"
        }
    }
}
````

## File: packages/i18n/messages/ja.json
````json
{
    "common": {
        "loading": "",
        "save": "",
        "cancel": "",
        "delete": "",
        "edit": "",
        "create": "",
        "confirm": "",
        "back": "",
        "no_results": "",
        "view_all": "",
        "search": "",
        "actions": "",
        "total_items": "",
        "confirm_delete": "",
        "operation_success": "",
        "operation_failed": "",
        "logout": "",
        "validation": {
            "required": "",
            "min_length": "",
            "max_length": "",
            "email": "",
            "phone": "",
            "url": "",
            "number": "",
            "min": "",
            "max": "",
            "positive_number": "",
            "integer": "",
            "match": "",
            "password_strong": "",
            "accept_terms": ""
        },
        "error": {
            "something_wrong": "",
            "try_again": "",
            "not_found": "",
            "not_found_description": "",
            "go_home": "",
            "unauthorized": "",
            "forbidden": "",
            "network_error": "",
            "server_error": "",
            "session_expired": ""
        },
        "language": {
            "vi": "Tiếng Việt",
            "en": "English",
            "zh": "中文",
            "ko": "한국어",
            "ja": "日本語",
            "switch_language": ""
        }
    },
    "admin": {
        "site_name": "",
        "admin_panel": "",
        "dashboard": {
            "title": "",
            "welcome": "",
            "total_revenue": "",
            "total_orders": "",
            "total_products": "",
            "total_customers": "",
            "recent_orders": "",
            "recent_products": "",
            "revenue_chart": "",
            "orders_chart": "",
            "this_month": "",
            "vs_last_month": "",
            "view_all": ""
        },
        "products": {
            "title": "",
            "add_product": "",
            "edit_product": "",
            "product_name": "",
            "product_sku": "",
            "product_price": "",
            "product_status": "",
            "product_category": "",
            "product_inventory": "",
            "product_description": "",
            "product_images": "",
            "product_variants": "",
            "product_options": "",
            "status_active": "",
            "status_draft": "",
            "status_inactive": "",
            "status_out_of_stock": "",
            "search_products": "",
            "filter_by_status": "",
            "filter_by_category": "",
            "all_statuses": "",
            "all_categories": "",
            "no_products": "",
            "import": "",
            "export": "",
            "bulk_actions": "",
            "confirm_delete_product": "",
            "product_created": "",
            "product_updated": "",
            "product_deleted": ""
        },
        "orders": {
            "title": "",
            "order_id": "",
            "customer": "",
            "customer_email": "",
            "order_date": "",
            "order_total": "",
            "order_status": "",
            "payment_status": "",
            "fulfillment_status": "",
            "status_pending": "",
            "status_confirmed": "",
            "status_processing": "",
            "status_shipped": "",
            "status_delivered": "",
            "status_cancelled": "",
            "status_refunded": "",
            "payment_paid": "",
            "payment_unpaid": "",
            "payment_refunded": "",
            "search_orders": "",
            "filter_by_status": "",
            "all_statuses": "",
            "no_orders": "",
            "order_detail": "",
            "order_items": "",
            "shipping_address": "",
            "payment_method": "",
            "shipping_method": "",
            "subtotal": "",
            "shipping": "",
            "tax": "",
            "total": "",
            "notes": "",
            "update_status": "",
            "status_updated": "",
            "export_orders": ""
        },
        "workflows": {
            "title": "",
            "add_workflow": "",
            "edit_workflow": "",
            "name": "",
            "description": "",
            "trigger": "",
            "status": "",
            "steps": "",
            "created_at": "",
            "updated_at": "",
            "status_active": "",
            "status_inactive": "",
            "status_draft": "",
            "no_workflows": "",
            "confirm_delete_workflow": "",
            "workflow_created": "",
            "workflow_updated": "",
            "workflow_deleted": "",
            "add_step": "",
            "step_name": "",
            "step_action": "",
            "step_conditions": "",
            "save_workflow": ""
        },
        "settings": {
            "title": "",
            "general": "",
            "store": "",
            "email": "",
            "shipping": "",
            "payment": "",
            "store_name": "",
            "store_email": "",
            "store_phone": "",
            "store_address": "",
            "currency": "",
            "timezone": "",
            "language": "",
            "smtp_host": "",
            "smtp_port": "",
            "smtp_user": "",
            "smtp_password": "",
            "sender_name": "",
            "sender_email": "",
            "free_shipping_threshold": "",
            "default_shipping_fee": "",
            "payment_gateway": "",
            "settings_saved": "",
            "settings_error": ""
        },
        "seo": {
            "default_title": "",
            "products_title": ""
        }
    },
    "storefront": {
        "site_name": "",
        "tagline": "",
        "nav_home": "",
        "nav_shop": "",
        "nav_categories": "",
        "nav_deals": "",
        "search_placeholder": "",
        "cart": "",
        "login": "",
        "user_account": "",
        "shop_title": "",
        "all_products": "",
        "categories": "",
        "new_arrivals": "",
        "support_title": "",
        "contact_us": "",
        "faqs": "",
        "shipping_info": "",
        "legal_title": "",
        "privacy_policy": "",
        "terms_of_service": "",
        "copyright": "",
        "next": "",
        "close": "",
        "home": {
            "hero_subtitle": "",
            "hero_title": "",
            "hero_description": "",
            "shop_now": "",
            "featured_categories": "",
            "shop_by_category": "",
            "items_count": ""
        },
        "product": {
            "quick_add": "",
            "added": "",
            "breadcrumb_home": "",
            "breadcrumb_shop": "",
            "price": "",
            "sale_price": "",
            "in_stock": "",
            "out_of_stock": "",
            "add_to_cart": "",
            "description": "",
            "specifications": "",
            "reviews": "",
            "related_products": "",
            "color": "",
            "size": "",
            "quantity": "",
            "filter": "",
            "sort_by": "",
            "sort_newest": "",
            "sort_price_low": "",
            "sort_price_high": "",
            "sort_popular": "",
            "clear_filters": "",
            "price_range": "",
            "all_categories": ""
        },
        "cart": {
            "title": "",
            "empty": "",
            "empty_title": "",
            "empty_description": "",
            "continue_shopping": "",
            "subtotal": "",
            "shipping_note": "",
            "view_full_cart": "",
            "checkout": "",
            "order_summary": "",
            "shipping": "",
            "free": "",
            "tax": "",
            "total": "",
            "proceed_checkout": "",
            "checkout_with_total": "",
            "remove": "",
            "quantity": "",
            "update_cart": ""
        },
        "checkout": {
            "title": "",
            "order_confirmed": "",
            "thank_you": "",
            "continue_shopping": "",
            "shipping_address": "",
            "shipping_method": "",
            "payment_method": "",
            "review_order": "",
            "standard_shipping": "",
            "express_shipping": "",
            "cod": "",
            "credit_card": "",
            "continue_to": "",
            "place_order": "",
            "edit": "",
            "first_name": "",
            "last_name": "",
            "email": "",
            "phone": "",
            "address": "",
            "city": "",
            "district": "",
            "ward": "",
            "zip_code": "",
            "order_notes": "",
            "notes_placeholder": ""
        },
        "auth": {
            "invalid_email": "",
            "password_min": "",
            "email": "",
            "password": "",
            "remember_me": "",
            "forgot_password": "",
            "sign_in": "",
            "signing_in": "",
            "or_divider": "",
            "google_login": "",
            "no_account": "",
            "create_account": "",
            "has_account": "",
            "login_failed": "",
            "full_name_min": "",
            "full_name_max": "",
            "password_uppercase": "",
            "password_lowercase": "",
            "password_number": "",
            "passwords_mismatch": "",
            "accept_terms": "",
            "full_name": "",
            "phone_optional": "",
            "confirm_password": "",
            "agree_terms": "",
            "terms_link": "",
            "creating_account": "",
            "register_failed": "",
            "logout": "",
            "welcome_back": "",
            "register_title": "",
            "register_description": ""
        },
        "account": {
            "dashboard": "",
            "orders": "",
            "profile": "",
            "addresses": "",
            "wishlist": "",
            "settings": "",
            "sign_out": "",
            "welcome": "",
            "overview": "",
            "recent_orders": "",
            "view_all_orders": "",
            "account_details": "",
            "edit_profile": "",
            "personal_info": "",
            "change_password": "",
            "current_password": "",
            "new_password": "",
            "confirm_new_password": "",
            "profile_updated": "",
            "password_changed": "",
            "order_id": "",
            "order_date": "",
            "order_status": "",
            "order_total": "",
            "no_orders": "",
            "order_detail": "",
            "order_items": "",
            "shipping_info": "",
            "payment_info": "",
            "back_to_orders": "",
            "status_pending": "",
            "status_processing": "",
            "status_shipped": "",
            "status_delivered": "",
            "status_cancelled": ""
        },
        "footer": {
            "about": "",
            "about_description": "",
            "customer_service": "",
            "quick_links": "",
            "follow_us": "",
            "newsletter": "",
            "newsletter_placeholder": "",
            "subscribe": "",
            "newsletter_description": ""
        },
        "seo": {
            "default_title": "",
            "default_description": "",
            "home_title": "",
            "products_title": "",
            "cart_title": "",
            "checkout_title": "",
            "login_title": "",
            "register_title": "",
            "account_title": "",
            "orders_title": ""
        }
    }
}
````

## File: packages/i18n/messages/ko.json
````json
{
    "common": {
        "loading": "",
        "save": "",
        "cancel": "",
        "delete": "",
        "edit": "",
        "create": "",
        "confirm": "",
        "back": "",
        "no_results": "",
        "view_all": "",
        "search": "",
        "actions": "",
        "total_items": "",
        "confirm_delete": "",
        "operation_success": "",
        "operation_failed": "",
        "logout": "",
        "validation": {
            "required": "",
            "min_length": "",
            "max_length": "",
            "email": "",
            "phone": "",
            "url": "",
            "number": "",
            "min": "",
            "max": "",
            "positive_number": "",
            "integer": "",
            "match": "",
            "password_strong": "",
            "accept_terms": ""
        },
        "error": {
            "something_wrong": "",
            "try_again": "",
            "not_found": "",
            "not_found_description": "",
            "go_home": "",
            "unauthorized": "",
            "forbidden": "",
            "network_error": "",
            "server_error": "",
            "session_expired": ""
        },
        "language": {
            "vi": "Tiếng Việt",
            "en": "English",
            "zh": "中文",
            "ko": "한국어",
            "ja": "日本語",
            "switch_language": ""
        }
    },
    "admin": {
        "site_name": "",
        "admin_panel": "",
        "dashboard": {
            "title": "",
            "welcome": "",
            "total_revenue": "",
            "total_orders": "",
            "total_products": "",
            "total_customers": "",
            "recent_orders": "",
            "recent_products": "",
            "revenue_chart": "",
            "orders_chart": "",
            "this_month": "",
            "vs_last_month": "",
            "view_all": ""
        },
        "products": {
            "title": "",
            "add_product": "",
            "edit_product": "",
            "product_name": "",
            "product_sku": "",
            "product_price": "",
            "product_status": "",
            "product_category": "",
            "product_inventory": "",
            "product_description": "",
            "product_images": "",
            "product_variants": "",
            "product_options": "",
            "status_active": "",
            "status_draft": "",
            "status_inactive": "",
            "status_out_of_stock": "",
            "search_products": "",
            "filter_by_status": "",
            "filter_by_category": "",
            "all_statuses": "",
            "all_categories": "",
            "no_products": "",
            "import": "",
            "export": "",
            "bulk_actions": "",
            "confirm_delete_product": "",
            "product_created": "",
            "product_updated": "",
            "product_deleted": ""
        },
        "orders": {
            "title": "",
            "order_id": "",
            "customer": "",
            "customer_email": "",
            "order_date": "",
            "order_total": "",
            "order_status": "",
            "payment_status": "",
            "fulfillment_status": "",
            "status_pending": "",
            "status_confirmed": "",
            "status_processing": "",
            "status_shipped": "",
            "status_delivered": "",
            "status_cancelled": "",
            "status_refunded": "",
            "payment_paid": "",
            "payment_unpaid": "",
            "payment_refunded": "",
            "search_orders": "",
            "filter_by_status": "",
            "all_statuses": "",
            "no_orders": "",
            "order_detail": "",
            "order_items": "",
            "shipping_address": "",
            "payment_method": "",
            "shipping_method": "",
            "subtotal": "",
            "shipping": "",
            "tax": "",
            "total": "",
            "notes": "",
            "update_status": "",
            "status_updated": "",
            "export_orders": ""
        },
        "workflows": {
            "title": "",
            "add_workflow": "",
            "edit_workflow": "",
            "name": "",
            "description": "",
            "trigger": "",
            "status": "",
            "steps": "",
            "created_at": "",
            "updated_at": "",
            "status_active": "",
            "status_inactive": "",
            "status_draft": "",
            "no_workflows": "",
            "confirm_delete_workflow": "",
            "workflow_created": "",
            "workflow_updated": "",
            "workflow_deleted": "",
            "add_step": "",
            "step_name": "",
            "step_action": "",
            "step_conditions": "",
            "save_workflow": ""
        },
        "settings": {
            "title": "",
            "general": "",
            "store": "",
            "email": "",
            "shipping": "",
            "payment": "",
            "store_name": "",
            "store_email": "",
            "store_phone": "",
            "store_address": "",
            "currency": "",
            "timezone": "",
            "language": "",
            "smtp_host": "",
            "smtp_port": "",
            "smtp_user": "",
            "smtp_password": "",
            "sender_name": "",
            "sender_email": "",
            "free_shipping_threshold": "",
            "default_shipping_fee": "",
            "payment_gateway": "",
            "settings_saved": "",
            "settings_error": ""
        },
        "seo": {
            "default_title": "",
            "products_title": ""
        }
    },
    "storefront": {
        "site_name": "",
        "tagline": "",
        "nav_home": "",
        "nav_shop": "",
        "nav_categories": "",
        "nav_deals": "",
        "search_placeholder": "",
        "cart": "",
        "login": "",
        "user_account": "",
        "shop_title": "",
        "all_products": "",
        "categories": "",
        "new_arrivals": "",
        "support_title": "",
        "contact_us": "",
        "faqs": "",
        "shipping_info": "",
        "legal_title": "",
        "privacy_policy": "",
        "terms_of_service": "",
        "copyright": "",
        "next": "",
        "close": "",
        "home": {
            "hero_subtitle": "",
            "hero_title": "",
            "hero_description": "",
            "shop_now": "",
            "featured_categories": "",
            "shop_by_category": "",
            "items_count": ""
        },
        "product": {
            "quick_add": "",
            "added": "",
            "breadcrumb_home": "",
            "breadcrumb_shop": "",
            "price": "",
            "sale_price": "",
            "in_stock": "",
            "out_of_stock": "",
            "add_to_cart": "",
            "description": "",
            "specifications": "",
            "reviews": "",
            "related_products": "",
            "color": "",
            "size": "",
            "quantity": "",
            "filter": "",
            "sort_by": "",
            "sort_newest": "",
            "sort_price_low": "",
            "sort_price_high": "",
            "sort_popular": "",
            "clear_filters": "",
            "price_range": "",
            "all_categories": ""
        },
        "cart": {
            "title": "",
            "empty": "",
            "empty_title": "",
            "empty_description": "",
            "continue_shopping": "",
            "subtotal": "",
            "shipping_note": "",
            "view_full_cart": "",
            "checkout": "",
            "order_summary": "",
            "shipping": "",
            "free": "",
            "tax": "",
            "total": "",
            "proceed_checkout": "",
            "checkout_with_total": "",
            "remove": "",
            "quantity": "",
            "update_cart": ""
        },
        "checkout": {
            "title": "",
            "order_confirmed": "",
            "thank_you": "",
            "continue_shopping": "",
            "shipping_address": "",
            "shipping_method": "",
            "payment_method": "",
            "review_order": "",
            "standard_shipping": "",
            "express_shipping": "",
            "cod": "",
            "credit_card": "",
            "continue_to": "",
            "place_order": "",
            "edit": "",
            "first_name": "",
            "last_name": "",
            "email": "",
            "phone": "",
            "address": "",
            "city": "",
            "district": "",
            "ward": "",
            "zip_code": "",
            "order_notes": "",
            "notes_placeholder": ""
        },
        "auth": {
            "invalid_email": "",
            "password_min": "",
            "email": "",
            "password": "",
            "remember_me": "",
            "forgot_password": "",
            "sign_in": "",
            "signing_in": "",
            "or_divider": "",
            "google_login": "",
            "no_account": "",
            "create_account": "",
            "has_account": "",
            "login_failed": "",
            "full_name_min": "",
            "full_name_max": "",
            "password_uppercase": "",
            "password_lowercase": "",
            "password_number": "",
            "passwords_mismatch": "",
            "accept_terms": "",
            "full_name": "",
            "phone_optional": "",
            "confirm_password": "",
            "agree_terms": "",
            "terms_link": "",
            "creating_account": "",
            "register_failed": "",
            "logout": "",
            "welcome_back": "",
            "register_title": "",
            "register_description": ""
        },
        "account": {
            "dashboard": "",
            "orders": "",
            "profile": "",
            "addresses": "",
            "wishlist": "",
            "settings": "",
            "sign_out": "",
            "welcome": "",
            "overview": "",
            "recent_orders": "",
            "view_all_orders": "",
            "account_details": "",
            "edit_profile": "",
            "personal_info": "",
            "change_password": "",
            "current_password": "",
            "new_password": "",
            "confirm_new_password": "",
            "profile_updated": "",
            "password_changed": "",
            "order_id": "",
            "order_date": "",
            "order_status": "",
            "order_total": "",
            "no_orders": "",
            "order_detail": "",
            "order_items": "",
            "shipping_info": "",
            "payment_info": "",
            "back_to_orders": "",
            "status_pending": "",
            "status_processing": "",
            "status_shipped": "",
            "status_delivered": "",
            "status_cancelled": ""
        },
        "footer": {
            "about": "",
            "about_description": "",
            "customer_service": "",
            "quick_links": "",
            "follow_us": "",
            "newsletter": "",
            "newsletter_placeholder": "",
            "subscribe": "",
            "newsletter_description": ""
        },
        "seo": {
            "default_title": "",
            "default_description": "",
            "home_title": "",
            "products_title": "",
            "cart_title": "",
            "checkout_title": "",
            "login_title": "",
            "register_title": "",
            "account_title": "",
            "orders_title": ""
        }
    }
}
````

## File: packages/i18n/messages/vi.json
````json
{
    "common": {
        "loading": "Đang tải...",
        "save": "Lưu",
        "cancel": "Hủy",
        "delete": "Xóa",
        "edit": "Sửa",
        "create": "Tạo mới",
        "confirm": "Xác nhận",
        "back": "Quay lại",
        "no_results": "Không tìm thấy kết quả",
        "view_all": "Xem tất cả",
        "search": "Tìm kiếm...",
        "actions": "Thao tác",
        "total_items": "Tổng cộng: {count}",
        "confirm_delete": "Bạn có chắc chắn muốn xóa?",
        "operation_success": "Thao tác thành công",
        "operation_failed": "Thao tác thất bại",
        "logout": "Đăng xuất",
        "validation": {
            "required": "Trường này là bắt buộc",
            "min_length": "Phải có ít nhất {min} ký tự",
            "max_length": "Không được vượt quá {max} ký tự",
            "email": "Email không hợp lệ",
            "phone": "Số điện thoại không hợp lệ",
            "url": "URL không hợp lệ",
            "number": "Phải là số",
            "min": "Giá trị tối thiểu là {min}",
            "max": "Giá trị tối đa là {max}",
            "positive_number": "Phải là số dương",
            "integer": "Phải là số nguyên",
            "match": "Giá trị không khớp",
            "password_strong": "Mật khẩu phải chứa chữ hoa, chữ thường và số",
            "accept_terms": "Bạn phải đồng ý với điều khoản"
        },
        "error": {
            "something_wrong": "Đã xảy ra lỗi",
            "try_again": "Vui lòng thử lại sau",
            "not_found": "Không tìm thấy",
            "not_found_description": "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.",
            "go_home": "Về trang chủ",
            "unauthorized": "Bạn cần đăng nhập để truy cập",
            "forbidden": "Bạn không có quyền truy cập",
            "network_error": "Lỗi kết nối mạng",
            "server_error": "Lỗi máy chủ. Vui lòng thử lại sau.",
            "session_expired": "Phiên đăng nhập đã hết hạn"
        },
        "language": {
            "vi": "Tiếng Việt",
            "en": "English",
            "zh": "中文",
            "ko": "한국어",
            "ja": "日本語",
            "switch_language": "Đổi ngôn ngữ"
        }
    },
    "admin": {
        "site_name": "V8N Admin",
        "admin_panel": "Bảng quản trị",
        "dashboard": {
            "title": "Tổng quan",
            "welcome": "Chào mừng trở lại",
            "total_revenue": "Tổng doanh thu",
            "total_orders": "Tổng đơn hàng",
            "total_products": "Tổng sản phẩm",
            "total_customers": "Tổng khách hàng",
            "recent_orders": "Đơn hàng gần đây",
            "recent_products": "Sản phẩm gần đây",
            "revenue_chart": "Biểu đồ doanh thu",
            "orders_chart": "Biểu đồ đơn hàng",
            "this_month": "Tháng này",
            "vs_last_month": "so với tháng trước",
            "view_all": "Xem tất cả"
        },
        "products": {
            "title": "Quản lý sản phẩm",
            "add_product": "Thêm sản phẩm",
            "edit_product": "Sửa sản phẩm",
            "product_name": "Tên sản phẩm",
            "product_sku": "Mã SKU",
            "product_price": "Giá",
            "product_status": "Trạng thái",
            "product_category": "Danh mục",
            "product_inventory": "Tồn kho",
            "product_description": "Mô tả",
            "product_images": "Hình ảnh",
            "product_variants": "Biến thể",
            "product_options": "Tùy chọn",
            "status_active": "Hoạt động",
            "status_draft": "Bản nháp",
            "status_inactive": "Ngưng hoạt động",
            "status_out_of_stock": "Hết hàng",
            "search_products": "Tìm kiếm sản phẩm...",
            "filter_by_status": "Lọc theo trạng thái",
            "filter_by_category": "Lọc theo danh mục",
            "all_statuses": "Tất cả trạng thái",
            "all_categories": "Tất cả danh mục",
            "no_products": "Chưa có sản phẩm nào",
            "import": "Nhập",
            "export": "Xuất",
            "bulk_actions": "Thao tác hàng loạt",
            "confirm_delete_product": "Bạn có chắc muốn xóa sản phẩm này?",
            "product_created": "Thêm sản phẩm thành công",
            "product_updated": "Cập nhật sản phẩm thành công",
            "product_deleted": "Xóa sản phẩm thành công"
        },
        "orders": {
            "title": "Quản lý đơn hàng",
            "order_id": "Mã đơn hàng",
            "customer": "Khách hàng",
            "customer_email": "Email khách hàng",
            "order_date": "Ngày đặt",
            "order_total": "Tổng tiền",
            "order_status": "Trạng thái",
            "payment_status": "Thanh toán",
            "fulfillment_status": "Vận chuyển",
            "status_pending": "Chờ xử lý",
            "status_confirmed": "Đã xác nhận",
            "status_processing": "Đang xử lý",
            "status_shipped": "Đã giao hàng",
            "status_delivered": "Đã nhận",
            "status_cancelled": "Đã hủy",
            "status_refunded": "Đã hoàn tiền",
            "payment_paid": "Đã thanh toán",
            "payment_unpaid": "Chưa thanh toán",
            "payment_refunded": "Đã hoàn tiền",
            "search_orders": "Tìm kiếm đơn hàng...",
            "filter_by_status": "Lọc theo trạng thái",
            "all_statuses": "Tất cả trạng thái",
            "no_orders": "Chưa có đơn hàng nào",
            "order_detail": "Chi tiết đơn hàng",
            "order_items": "Sản phẩm",
            "shipping_address": "Địa chỉ giao hàng",
            "payment_method": "Phương thức thanh toán",
            "shipping_method": "Phương thức vận chuyển",
            "subtotal": "Tạm tính",
            "shipping": "Vận chuyển",
            "tax": "Thuế",
            "total": "Tổng cộng",
            "notes": "Ghi chú",
            "update_status": "Cập nhật trạng thái",
            "status_updated": "Cập nhật trạng thái thành công",
            "export_orders": "Xuất đơn hàng"
        },
        "workflows": {
            "title": "Quản lý quy trình",
            "add_workflow": "Thêm quy trình",
            "edit_workflow": "Sửa quy trình",
            "name": "Tên quy trình",
            "description": "Mô tả",
            "trigger": "Kích hoạt",
            "status": "Trạng thái",
            "steps": "Bước",
            "created_at": "Ngày tạo",
            "updated_at": "Ngày cập nhật",
            "status_active": "Hoạt động",
            "status_inactive": "Ngưng hoạt động",
            "status_draft": "Bản nháp",
            "no_workflows": "Chưa có quy trình nào",
            "confirm_delete_workflow": "Bạn có chắc muốn xóa quy trình này?",
            "workflow_created": "Tạo quy trình thành công",
            "workflow_updated": "Cập nhật quy trình thành công",
            "workflow_deleted": "Xóa quy trình thành công",
            "add_step": "Thêm bước",
            "step_name": "Tên bước",
            "step_action": "Hành động",
            "step_conditions": "Điều kiện",
            "save_workflow": "Lưu quy trình"
        },
        "settings": {
            "title": "Cài đặt",
            "general": "Chung",
            "store": "Cửa hàng",
            "email": "Email",
            "shipping": "Vận chuyển",
            "payment": "Thanh toán",
            "store_name": "Tên cửa hàng",
            "store_email": "Email cửa hàng",
            "store_phone": "Số điện thoại",
            "store_address": "Địa chỉ",
            "currency": "Tiền tệ",
            "timezone": "Múi giờ",
            "language": "Ngôn ngữ mặc định",
            "smtp_host": "SMTP Host",
            "smtp_port": "SMTP Port",
            "smtp_user": "SMTP Username",
            "smtp_password": "SMTP Password",
            "sender_name": "Tên người gửi",
            "sender_email": "Email người gửi",
            "free_shipping_threshold": "Miễn phí vận chuyển cho đơn trên",
            "default_shipping_fee": "Phí vận chuyển mặc định",
            "payment_gateway": "Cổng thanh toán",
            "settings_saved": "Lưu cài đặt thành công",
            "settings_error": "Lỗi lưu cài đặt"
        },
        "seo": {
            "default_title": "V8N Admin Panel",
            "products_title": "Sản phẩm - V8N Admin"
        }
    },
    "storefront": {
        "site_name": "V8N Store",
        "tagline": "Thương mại điện tử thế hệ mới",
        "nav_home": "Trang chủ",
        "nav_shop": "Cửa hàng",
        "nav_categories": "Danh mục",
        "nav_deals": "Khuyến mãi",
        "search_placeholder": "Tìm kiếm sản phẩm...",
        "cart": "Giỏ hàng",
        "login": "Đăng nhập",
        "user_account": "Tài khoản",
        "shop_title": "Cửa hàng",
        "all_products": "Tất cả sản phẩm",
        "categories": "Danh mục",
        "new_arrivals": "Hàng mới về",
        "support_title": "Hỗ trợ",
        "contact_us": "Liên hệ",
        "faqs": "Câu hỏi thường gặp",
        "shipping_info": "Thông tin vận chuyển",
        "legal_title": "Pháp lý",
        "privacy_policy": "Chính sách bảo mật",
        "terms_of_service": "Điều khoản dịch vụ",
        "copyright": "© 2025 V8N Store. Tất cả quyền được bảo lưu.",
        "next": "Tiếp tục",
        "close": "Đóng",
        "home": {
            "hero_subtitle": "Bộ sưu tập mới",
            "hero_title": "Khám phá phong cách của bạn",
            "hero_description": "Mua sắm những sản phẩm mới nhất với chất lượng tốt nhất",
            "shop_now": "Mua ngay",
            "featured_categories": "Danh mục nổi bật",
            "shop_by_category": "Mua theo danh mục",
            "items_count": "{count} sản phẩm"
        },
        "product": {
            "quick_add": "Thêm nhanh",
            "added": "Đã thêm",
            "breadcrumb_home": "Trang chủ",
            "breadcrumb_shop": "Cửa hàng",
            "price": "Giá",
            "sale_price": "Giá khuyến mãi",
            "in_stock": "Còn hàng",
            "out_of_stock": "Hết hàng",
            "add_to_cart": "Thêm vào giỏ",
            "description": "Mô tả",
            "specifications": "Thông số",
            "reviews": "Đánh giá",
            "related_products": "Sản phẩm liên quan",
            "color": "Màu sắc",
            "size": "Kích thước",
            "quantity": "Số lượng",
            "filter": "Lọc",
            "sort_by": "Sắp xếp",
            "sort_newest": "Mới nhất",
            "sort_price_low": "Giá thấp đến cao",
            "sort_price_high": "Giá cao đến thấp",
            "sort_popular": "Phổ biến nhất",
            "clear_filters": "Xóa bộ lọc",
            "price_range": "Khoảng giá",
            "all_categories": "Tất cả danh mục"
        },
        "cart": {
            "title": "Giỏ hàng",
            "empty": "Giỏ hàng của bạn đang trống",
            "empty_title": "Giỏ hàng trống",
            "empty_description": "Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng",
            "continue_shopping": "Tiếp tục mua sắm",
            "subtotal": "Tạm tính",
            "shipping_note": "Phí vận chuyển được tính khi thanh toán",
            "view_full_cart": "Xem giỏ hàng",
            "checkout": "Thanh toán",
            "order_summary": "Tóm tắt đơn hàng",
            "shipping": "Vận chuyển",
            "free": "Miễn phí",
            "tax": "Thuế",
            "total": "Tổng cộng",
            "proceed_checkout": "Tiến hành thanh toán",
            "checkout_with_total": "Thanh toán {total}",
            "remove": "Xóa",
            "quantity": "Số lượng",
            "update_cart": "Cập nhật giỏ hàng"
        },
        "checkout": {
            "title": "Thanh toán",
            "order_confirmed": "Đơn hàng đã được xác nhận!",
            "thank_you": "Cảm ơn bạn đã mua hàng. Bạn sẽ nhận được email xác nhận đơn hàng.",
            "continue_shopping": "Tiếp tục mua sắm",
            "shipping_address": "Địa chỉ giao hàng",
            "shipping_method": "Phương thức vận chuyển",
            "payment_method": "Phương thức thanh toán",
            "review_order": "Xem lại đơn hàng",
            "standard_shipping": "Giao hàng tiêu chuẩn",
            "express_shipping": "Giao hàng nhanh",
            "cod": "Thanh toán khi nhận hàng",
            "credit_card": "Thẻ tín dụng",
            "continue_to": "Tiếp tục đến {step}",
            "place_order": "Đặt hàng",
            "edit": "Sửa",
            "first_name": "Tên",
            "last_name": "Họ",
            "email": "Email",
            "phone": "Số điện thoại",
            "address": "Địa chỉ",
            "city": "Thành phố",
            "district": "Quận/Huyện",
            "ward": "Phường/Xã",
            "zip_code": "Mã bưu điện",
            "order_notes": "Ghi chú đơn hàng",
            "notes_placeholder": "Ghi chú về đơn hàng của bạn..."
        },
        "auth": {
            "invalid_email": "Email không hợp lệ",
            "password_min": "Mật khẩu phải có ít nhất 8 ký tự",
            "email": "Email",
            "password": "Mật khẩu",
            "remember_me": "Ghi nhớ đăng nhập",
            "forgot_password": "Quên mật khẩu?",
            "sign_in": "Đăng nhập",
            "signing_in": "Đang đăng nhập...",
            "or_divider": "hoặc",
            "google_login": "Đăng nhập với Google",
            "no_account": "Chưa có tài khoản?",
            "create_account": "Tạo tài khoản",
            "has_account": "Đã có tài khoản?",
            "login_failed": "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
            "full_name_min": "Họ tên phải có ít nhất 2 ký tự",
            "full_name_max": "Họ tên không được vượt quá 50 ký tự",
            "password_uppercase": "Mật khẩu phải chứa ít nhất 1 chữ hoa",
            "password_lowercase": "Mật khẩu phải chứa ít nhất 1 chữ thường",
            "password_number": "Mật khẩu phải chứa ít nhất 1 số",
            "passwords_mismatch": "Mật khẩu xác nhận không khớp",
            "accept_terms": "Bạn phải đồng ý với điều khoản",
            "full_name": "Họ và tên",
            "phone_optional": "Số điện thoại (tùy chọn)",
            "confirm_password": "Xác nhận mật khẩu",
            "agree_terms": "Tôi đồng ý với",
            "terms_link": "Điều khoản dịch vụ",
            "creating_account": "Đang tạo tài khoản...",
            "register_failed": "Đăng ký thất bại. Vui lòng thử lại.",
            "logout": "Đăng xuất",
            "welcome_back": "Chào mừng trở lại",
            "register_title": "Tạo tài khoản mới",
            "register_description": "Đăng ký để trải nghiệm mua sắm tốt nhất"
        },
        "account": {
            "dashboard": "Tổng quan",
            "orders": "Đơn hàng",
            "profile": "Hồ sơ",
            "addresses": "Địa chỉ",
            "wishlist": "Yêu thích",
            "settings": "Cài đặt",
            "sign_out": "Đăng xuất",
            "welcome": "Xin chào",
            "overview": "Tổng quan tài khoản",
            "recent_orders": "Đơn hàng gần đây",
            "view_all_orders": "Xem tất cả đơn hàng",
            "account_details": "Thông tin tài khoản",
            "edit_profile": "Chỉnh sửa hồ sơ",
            "personal_info": "Thông tin cá nhân",
            "change_password": "Đổi mật khẩu",
            "current_password": "Mật khẩu hiện tại",
            "new_password": "Mật khẩu mới",
            "confirm_new_password": "Xác nhận mật khẩu mới",
            "profile_updated": "Hồ sơ đã được cập nhật",
            "password_changed": "Mật khẩu đã được thay đổi",
            "order_id": "Mã đơn hàng",
            "order_date": "Ngày đặt",
            "order_status": "Trạng thái",
            "order_total": "Tổng tiền",
            "no_orders": "Bạn chưa có đơn hàng nào",
            "order_detail": "Chi tiết đơn hàng",
            "order_items": "Sản phẩm",
            "shipping_info": "Thông tin giao hàng",
            "payment_info": "Thông tin thanh toán",
            "back_to_orders": "Quay lại đơn hàng",
            "status_pending": "Chờ xử lý",
            "status_processing": "Đang xử lý",
            "status_shipped": "Đã giao",
            "status_delivered": "Đã nhận",
            "status_cancelled": "Đã hủy"
        },
        "footer": {
            "about": "Về V8N",
            "about_description": "Nền tảng thương mại điện tử headless hiện đại, cung cấp trải nghiệm mua sắm linh hoạt và nhanh chóng.",
            "customer_service": "Dịch vụ khách hàng",
            "quick_links": "Liên kết nhanh",
            "follow_us": "Theo dõi chúng tôi",
            "newsletter": "Đăng ký nhận tin",
            "newsletter_placeholder": "Nhập email của bạn",
            "subscribe": "Đăng ký",
            "newsletter_description": "Nhận thông tin về sản phẩm mới và khuyến mãi"
        },
        "seo": {
            "default_title": "V8N Store - Thương mại điện tử hiện đại",
            "default_description": "Mua sắm trực tuyến với trải nghiệm tốt nhất tại V8N Store. Sản phẩm chất lượng, giao hàng nhanh chóng.",
            "home_title": "V8N Store - Trang chủ",
            "products_title": "Sản phẩm - V8N Store",
            "cart_title": "Giỏ hàng - V8N Store",
            "checkout_title": "Thanh toán - V8N Store",
            "login_title": "Đăng nhập - V8N Store",
            "register_title": "Đăng ký - V8N Store",
            "account_title": "Tài khoản - V8N Store",
            "orders_title": "Đơn hàng - V8N Store"
        }
    }
}
````

## File: packages/i18n/messages/zh.json
````json
{
    "common": {
        "loading": "",
        "save": "",
        "cancel": "",
        "delete": "",
        "edit": "",
        "create": "",
        "confirm": "",
        "back": "",
        "no_results": "",
        "view_all": "",
        "search": "",
        "actions": "",
        "total_items": "",
        "confirm_delete": "",
        "operation_success": "",
        "operation_failed": "",
        "logout": "",
        "validation": {
            "required": "",
            "min_length": "",
            "max_length": "",
            "email": "",
            "phone": "",
            "url": "",
            "number": "",
            "min": "",
            "max": "",
            "positive_number": "",
            "integer": "",
            "match": "",
            "password_strong": "",
            "accept_terms": ""
        },
        "error": {
            "something_wrong": "",
            "try_again": "",
            "not_found": "",
            "not_found_description": "",
            "go_home": "",
            "unauthorized": "",
            "forbidden": "",
            "network_error": "",
            "server_error": "",
            "session_expired": ""
        },
        "language": {
            "vi": "Tiếng Việt",
            "en": "English",
            "zh": "中文",
            "ko": "한국어",
            "ja": "日本語",
            "switch_language": ""
        }
    },
    "admin": {
        "site_name": "",
        "admin_panel": "",
        "dashboard": {
            "title": "",
            "welcome": "",
            "total_revenue": "",
            "total_orders": "",
            "total_products": "",
            "total_customers": "",
            "recent_orders": "",
            "recent_products": "",
            "revenue_chart": "",
            "orders_chart": "",
            "this_month": "",
            "vs_last_month": "",
            "view_all": ""
        },
        "products": {
            "title": "",
            "add_product": "",
            "edit_product": "",
            "product_name": "",
            "product_sku": "",
            "product_price": "",
            "product_status": "",
            "product_category": "",
            "product_inventory": "",
            "product_description": "",
            "product_images": "",
            "product_variants": "",
            "product_options": "",
            "status_active": "",
            "status_draft": "",
            "status_inactive": "",
            "status_out_of_stock": "",
            "search_products": "",
            "filter_by_status": "",
            "filter_by_category": "",
            "all_statuses": "",
            "all_categories": "",
            "no_products": "",
            "import": "",
            "export": "",
            "bulk_actions": "",
            "confirm_delete_product": "",
            "product_created": "",
            "product_updated": "",
            "product_deleted": ""
        },
        "orders": {
            "title": "",
            "order_id": "",
            "customer": "",
            "customer_email": "",
            "order_date": "",
            "order_total": "",
            "order_status": "",
            "payment_status": "",
            "fulfillment_status": "",
            "status_pending": "",
            "status_confirmed": "",
            "status_processing": "",
            "status_shipped": "",
            "status_delivered": "",
            "status_cancelled": "",
            "status_refunded": "",
            "payment_paid": "",
            "payment_unpaid": "",
            "payment_refunded": "",
            "search_orders": "",
            "filter_by_status": "",
            "all_statuses": "",
            "no_orders": "",
            "order_detail": "",
            "order_items": "",
            "shipping_address": "",
            "payment_method": "",
            "shipping_method": "",
            "subtotal": "",
            "shipping": "",
            "tax": "",
            "total": "",
            "notes": "",
            "update_status": "",
            "status_updated": "",
            "export_orders": ""
        },
        "workflows": {
            "title": "",
            "add_workflow": "",
            "edit_workflow": "",
            "name": "",
            "description": "",
            "trigger": "",
            "status": "",
            "steps": "",
            "created_at": "",
            "updated_at": "",
            "status_active": "",
            "status_inactive": "",
            "status_draft": "",
            "no_workflows": "",
            "confirm_delete_workflow": "",
            "workflow_created": "",
            "workflow_updated": "",
            "workflow_deleted": "",
            "add_step": "",
            "step_name": "",
            "step_action": "",
            "step_conditions": "",
            "save_workflow": ""
        },
        "settings": {
            "title": "",
            "general": "",
            "store": "",
            "email": "",
            "shipping": "",
            "payment": "",
            "store_name": "",
            "store_email": "",
            "store_phone": "",
            "store_address": "",
            "currency": "",
            "timezone": "",
            "language": "",
            "smtp_host": "",
            "smtp_port": "",
            "smtp_user": "",
            "smtp_password": "",
            "sender_name": "",
            "sender_email": "",
            "free_shipping_threshold": "",
            "default_shipping_fee": "",
            "payment_gateway": "",
            "settings_saved": "",
            "settings_error": ""
        },
        "seo": {
            "default_title": "",
            "products_title": ""
        }
    },
    "storefront": {
        "site_name": "",
        "tagline": "",
        "nav_home": "",
        "nav_shop": "",
        "nav_categories": "",
        "nav_deals": "",
        "search_placeholder": "",
        "cart": "",
        "login": "",
        "user_account": "",
        "shop_title": "",
        "all_products": "",
        "categories": "",
        "new_arrivals": "",
        "support_title": "",
        "contact_us": "",
        "faqs": "",
        "shipping_info": "",
        "legal_title": "",
        "privacy_policy": "",
        "terms_of_service": "",
        "copyright": "",
        "next": "",
        "close": "",
        "home": {
            "hero_subtitle": "",
            "hero_title": "",
            "hero_description": "",
            "shop_now": "",
            "featured_categories": "",
            "shop_by_category": "",
            "items_count": ""
        },
        "product": {
            "quick_add": "",
            "added": "",
            "breadcrumb_home": "",
            "breadcrumb_shop": "",
            "price": "",
            "sale_price": "",
            "in_stock": "",
            "out_of_stock": "",
            "add_to_cart": "",
            "description": "",
            "specifications": "",
            "reviews": "",
            "related_products": "",
            "color": "",
            "size": "",
            "quantity": "",
            "filter": "",
            "sort_by": "",
            "sort_newest": "",
            "sort_price_low": "",
            "sort_price_high": "",
            "sort_popular": "",
            "clear_filters": "",
            "price_range": "",
            "all_categories": ""
        },
        "cart": {
            "title": "",
            "empty": "",
            "empty_title": "",
            "empty_description": "",
            "continue_shopping": "",
            "subtotal": "",
            "shipping_note": "",
            "view_full_cart": "",
            "checkout": "",
            "order_summary": "",
            "shipping": "",
            "free": "",
            "tax": "",
            "total": "",
            "proceed_checkout": "",
            "checkout_with_total": "",
            "remove": "",
            "quantity": "",
            "update_cart": ""
        },
        "checkout": {
            "title": "",
            "order_confirmed": "",
            "thank_you": "",
            "continue_shopping": "",
            "shipping_address": "",
            "shipping_method": "",
            "payment_method": "",
            "review_order": "",
            "standard_shipping": "",
            "express_shipping": "",
            "cod": "",
            "credit_card": "",
            "continue_to": "",
            "place_order": "",
            "edit": "",
            "first_name": "",
            "last_name": "",
            "email": "",
            "phone": "",
            "address": "",
            "city": "",
            "district": "",
            "ward": "",
            "zip_code": "",
            "order_notes": "",
            "notes_placeholder": ""
        },
        "auth": {
            "invalid_email": "",
            "password_min": "",
            "email": "",
            "password": "",
            "remember_me": "",
            "forgot_password": "",
            "sign_in": "",
            "signing_in": "",
            "or_divider": "",
            "google_login": "",
            "no_account": "",
            "create_account": "",
            "has_account": "",
            "login_failed": "",
            "full_name_min": "",
            "full_name_max": "",
            "password_uppercase": "",
            "password_lowercase": "",
            "password_number": "",
            "passwords_mismatch": "",
            "accept_terms": "",
            "full_name": "",
            "phone_optional": "",
            "confirm_password": "",
            "agree_terms": "",
            "terms_link": "",
            "creating_account": "",
            "register_failed": "",
            "logout": "",
            "welcome_back": "",
            "register_title": "",
            "register_description": ""
        },
        "account": {
            "dashboard": "",
            "orders": "",
            "profile": "",
            "addresses": "",
            "wishlist": "",
            "settings": "",
            "sign_out": "",
            "welcome": "",
            "overview": "",
            "recent_orders": "",
            "view_all_orders": "",
            "account_details": "",
            "edit_profile": "",
            "personal_info": "",
            "change_password": "",
            "current_password": "",
            "new_password": "",
            "confirm_new_password": "",
            "profile_updated": "",
            "password_changed": "",
            "order_id": "",
            "order_date": "",
            "order_status": "",
            "order_total": "",
            "no_orders": "",
            "order_detail": "",
            "order_items": "",
            "shipping_info": "",
            "payment_info": "",
            "back_to_orders": "",
            "status_pending": "",
            "status_processing": "",
            "status_shipped": "",
            "status_delivered": "",
            "status_cancelled": ""
        },
        "footer": {
            "about": "",
            "about_description": "",
            "customer_service": "",
            "quick_links": "",
            "follow_us": "",
            "newsletter": "",
            "newsletter_placeholder": "",
            "subscribe": "",
            "newsletter_description": ""
        },
        "seo": {
            "default_title": "",
            "default_description": "",
            "home_title": "",
            "products_title": "",
            "cart_title": "",
            "checkout_title": "",
            "login_title": "",
            "register_title": "",
            "account_title": "",
            "orders_title": ""
        }
    }
}
````

## File: packages/i18n/src/schema.ts
````typescript
/**
 * Schema định nghĩa cấu trúc messages tập trung cho toàn bộ monorepo.
 */
⋮----
export interface CommonMessages {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    confirm: string;
    back: string;
    no_results: string;
    validation: Record<string, string>;
    error: Record<string, string>;
    language: Record<string, string>;
    [key: string]: unknown;
}
⋮----
export interface AdminMessages {
    site_name: string;
    admin_panel: string;
    dashboard: Record<string, string>;
    products: Record<string, string>;
    orders: Record<string, string>;
    workflows: Record<string, string>;
    settings: Record<string, string>;
    seo: Record<string, string>;
    [key: string]: unknown;
}
⋮----
export interface StorefrontMessages {
    site_name: string;
    home: Record<string, string>;
    product: Record<string, string>;
    cart: Record<string, string>;
    checkout: Record<string, string>;
    auth: Record<string, string>;
    account: Record<string, string>;
    footer: Record<string, string>;
    seo: Record<string, string>;
    [key: string]: unknown;
}
⋮----
export interface LocaleMessages {
    common: CommonMessages;
    admin: AdminMessages;
    storefront: StorefrontMessages;
}
````

## File: packages/i18n/package.json
````json
{
    "name": "@v8n/i18n",
    "version": "0.0.0",
    "private": true,
    "main": "src/index.ts",
    "devDependencies": {
        "@types/node": "^20.0.0"
    }
}
````

## File: packages/i18n/tsconfig.json
````json
{
    "compilerOptions": {
        "target": "ES2017",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "resolveJsonModule": true,
        "declaration": true
    },
    "include": [
        "src/**/*",
        "messages/**/*"
    ]
}
````

## File: packages/types/src/admin-order.ts
````typescript
import { OrderItem } from './order';
⋮----
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
⋮----
export interface AdminOrdersResponse {
  orders: AdminOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
⋮----
export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
⋮----
export interface AdminTimeline {
  date: string;
  status: string;
  description: string;
  active: boolean;
}
⋮----
export interface AdminOrderNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  isInternal: boolean;
}
⋮----
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
````

## File: packages/types/src/admin-product.ts
````typescript
export type AdminProductStatus = 'active' | 'draft';
export type AdminProductSortBy = 'name' | 'category' | 'price' | 'stock' | 'status' | 'createdAt';
export type AdminProductSortOrder = 'asc' | 'desc';
⋮----
export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  comparePrice?: number;
  stock: number;
  sku?: string;
  status: AdminProductStatus;
  image: string;
  createdAt: string;
  updatedAt: string;
}
⋮----
export interface AdminProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: AdminProductStatus | 'all';
  category?: string;
  sortBy?: AdminProductSortBy;
  order?: AdminProductSortOrder;
}
⋮----
export interface AdminProductsResponse {
  products: AdminProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
⋮----
export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  stock: number;
  category: string;
  tags?: string[];
  status: AdminProductStatus;
  image: string;
}
⋮----
export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: string;
}
````

## File: packages/types/src/admin-rbac.ts
````typescript
// Admin RBAC Types
export type AdminUserStatus = 'active' | 'inactive' | 'locked';
⋮----
export interface AdminUser {
    id: string;
    email: string;
    name: string;
    status: AdminUserStatus;
    roleIds: string[];
    roleNames: string[];
    lastLoginAt: string | null;
    createdAt: string;
    updatedAt: string;
}
⋮----
export interface AdminUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: AdminUserStatus | 'all';
}
⋮----
export interface AdminUsersResponse {
    users: AdminUser[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
⋮----
export interface AdminRole {
    id: string;
    name: string;
    description: string;
    isSystem: boolean;
    permissionCount: number;
    createdAt: string;
}
⋮----
export interface AdminRolesResponse {
    roles: AdminRole[];
}
⋮----
export interface AdminPermission {
    id: string;
    group: string;
    action: string;
    description: string;
}
⋮----
export interface AdminPermissionsResponse {
    permissions: AdminPermission[];
}
⋮----
export interface CreateAdminUserPayload {
    email: string;
    name: string;
    password: string;
    roleIds: string[];
    isActive: boolean;
}
⋮----
export interface UpdateAdminUserPayload {
    id: string;
    email?: string;
    name?: string;
    password?: string;
    roleIds?: string[];
    isActive?: boolean;
}
⋮----
export interface CreateAdminRolePayload {
    name: string;
    description: string;
    permissionIds: string[];
}
⋮----
export interface UpdateAdminRolePayload {
    id: string;
    name?: string;
    description?: string;
    permissionIds?: string[];
}
⋮----
export type LoginHistoryStatus = 'success' | 'failed' | 'locked';
⋮----
export interface LoginHistoryRecord {
    id: string;
    timestamp: string;
    adminEmail: string;
    ipAddress: string;
    status: LoginHistoryStatus;
    userAgent: string;
}
⋮----
export interface LoginHistoryParams {
    page?: number;
    limit?: number;
    from?: string;
    to?: string;
    status?: LoginHistoryStatus | 'all';
}
⋮----
export interface LoginHistoryResponse {
    records: LoginHistoryRecord[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
````

## File: packages/types/src/admin-setting.ts
````typescript
export interface AdminSettings {
  general: {
    storeName: string;
    storeUrl: string;
    contactEmail: string;
    logo?: string;
  };
  store: {
    currency: string;
    taxEnabled: boolean;
    taxRate: number;
  };
  payment: {
    stripeEnabled: boolean;
    paypalEnabled: boolean;
    codEnabled: boolean;
  };
  shipping: {
    flatRateEnabled: boolean;
    freeShippingEnabled: boolean;
    rates: ShippingRate[];
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    templates: NotificationTemplate[];
  };
}
⋮----
export interface ShippingRate {
  method: string;
  cost: number;
  minOrderAmount?: number;
}
⋮----
export interface NotificationTemplate {
  type: string;
  subject: string;
  body: string;
}
⋮----
export interface SettingsFormData {
  general: {
    storeName: string;
    storeUrl: string;
    contactEmail: string;
    logo?: File | string; // File for upload, string for existing URL
  };
  store: {
    currency: string;
    taxEnabled: boolean;
    taxRate: number;
  };
  payment: {
    stripeEnabled: boolean;
    paypalEnabled: boolean;
    codEnabled: boolean;
  };
  shipping: {
    flatRateEnabled: boolean;
    freeShippingEnabled: boolean;
    rates: ShippingRate[];
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    templates: NotificationTemplate[];
  };
}
⋮----
logo?: File | string; // File for upload, string for existing URL
````

## File: packages/types/src/admin-workflow.ts
````typescript
export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  triggerType: 'order_status_change' | 'low_stock_alert' | 'new_user_welcome' | 'custom';
  lastRun?: string;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  createdAt: string;
  updatedAt: string;
}
⋮----
export interface WorkflowCondition {
  field: string;
  operator: string;
  value: string;
}
⋮----
export interface WorkflowAction {
  type: string;
  config: Record<string, string>;
}
⋮----
export interface WorkflowFormData {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  triggerType: Workflow['triggerType'];
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
}
⋮----
export interface WorkflowsResponse {
  workflows: Workflow[];
  total: number;
}
````

## File: packages/types/src/api.ts
````typescript
// Định nghĩa kiểu dữ liệu khung bao bọc (Wrapper) của mọi API response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
  errors?: Record<string, string>;
}
⋮----
// Định nghĩa DTO phản ánh chuẩn xác dữ liệu backend trả về cho một Product
export interface ApiProductDto {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  slug: string;
  thumbnailUrl: string;
  status: string;
  categoryId: string;
  originCountry?: string;
  discountable?: boolean;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  hsCode?: string;
  material?: string;
  createdAt?: string;
  updatedAt?: string;
}
````

## File: packages/types/src/order.ts
````typescript
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
⋮----
export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: OrderStatus;
    total: number;
    itemsCount: number;
    items: OrderItem[];
}
⋮----
export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    sku?: string;
    variantName?: string;
}
⋮----
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
⋮----
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
⋮----
export interface OrderTotals {
    subtotal: number;
    shipping: number;
    tax: number;
    discount?: number;
    total: number;
}
⋮----
export interface OrderPayment {
    method: string;
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    transactionId?: string;
}
⋮----
export interface OrderShipping {
    method: string;
    status: OrderStatus;
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: string;
}
⋮----
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
⋮----
export interface OrdersResponse {
    orders: Order[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
````

## File: packages/types/src/product.ts
````typescript
export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  price: number;
  stock: number;
}
⋮----
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  image: string;
  images: string[];
  category: string;
  variants?: ProductVariant[];
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}
⋮----
export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount?: number;
  icon?: string;
}
````

## File: packages/types/src/profile.ts
````typescript
export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    avatarUrl?: string;
}
⋮----
export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
}
⋮----
export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
````

## File: packages/types/package.json
````json
{
  "name": "@v8n/types",
  "version": "0.0.0",
  "private": true,
  "main": "src/index.ts",
  "dependencies": {
    "zod": "^3.22.4"
  }
}
````

## File: packages/types/tsconfig.json
````json
{
  "extends": "../config/tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src/**/*"]
}
````

## File: .cursorrules
````
# Frontend Monorepo Rules (v8n-ecomm)

You are an expert AI assistant for a Frontend Monorepo (Next.js, Turborepo, pnpm).
Follow these instructions and conventions strictly when assisting with this project.

## 🏗️ 1. Project Architecture & Structure
This project uses Turborepo to manage multiple Next.js applications and shared packages.
The workspace root is typically `v8n-ecomm/` inside the FrontEnd directory.

### Apps:
- `apps/storefront`: Next.js (App Router) for the customer-facing storefront.
- `apps/admin-dashboard`: Next.js (App Router) for the internal admin dashboard.

### Shared Packages:
- `ecommerce/ui`: Shared UI components (shadcn-ui base components + composite components).
- `packages/api`: Shared API client (Axios/Fetch), API endpoints, and data fetching hooks (TanStack Query).
- `packages/hooks`: Shared custom React hooks NOT tied to UI (e.g., `useEventBus`, `useAuth`, `useToast`).
- `packages/utils`: Shared utility functions (formatters, debounce, string helpers, Zod validation schemas).
- `packages/config`: Shared configuration files (ESLint, Tailwind, TypeScript, Prettier).
- `packages/types`: Shared TypeScript definitions and DTOs.

---

## 🛠️ 2. Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** shadcn-ui (centralized in `ecommerce/ui`)
- **State/Data Fetching:** TanStack Query
- **Package Manager:** pnpm
- **Monorepo Tool:** Turborepo

---

## 📜 3. Coding Standards & Conventions

### General Rules
- ALWAYS use `pnpm` for package management. Never use `npm` or `yarn`.
- ALL UI components must be created in `ecommerce/ui` if they are shared or if they are standard `shadcn-ui` components. Do NOT install `shadcn-ui` components directly into `apps/*`.
- Run all workspace commands from the root directory using `pnpm --filter <package-name> <command>` unless specified otherwise.
- Strictly adhere to TypeScript. Avoid using `any`. Define strict interfaces/types in `packages/types` and import them across the monorepo.

### React & Next.js Guidelines
- Use Functional Components with React Hooks.
- Favor **Server Components** in Next.js App Router by default. Use `"use client"` ONLY when necessary (e.g., for interactivity, React hooks, event listeners).
- Keep UI components purely presentational where possible. Extract reusable business logic into `packages/hooks` and data fetching logic into `packages/api`.
- UI components in `ecommerce/ui` should be highly reusable, supporting standard HTML attributes via `React.forwardRef` and styling variations via `cva` (class-variance-authority).
- **Form State Management:** All local state variables used for forms MUST be managed using the `react-hook-form` library combined with `zod`. Absolutely do NOT use multiple discrete states with `useState` for form fields.
- **Handling Dynamic Params (Next 15):** In Next.js 15, route `params` and `searchParams` are Promises. ALWAYS unwrap them asynchronously using `await params` inside Server Components. Avoid relying on `React.use(params)` inside Client Components; instead, pass the resolved params or fetched data down as props to the Client Component.

### Global Architecture Conventions
- **Event Bus:** Use the global Event Bus (`packages/hooks/useEventBus.ts`) for cross-component communication. The Event Bus MUST implement a Lock mechanism to prevent spam-clicks (e.g., rejecting duplicate `ADD_TO_CART` events while pending).
- **Global Error Handling:** Implement Global Error Handling via React Error Boundaries (`GlobalErrorFallback` in `ecommerce/ui`). Ensure API Interceptors map HTTP 400/500 errors to global toast notifications automatically.
- **Data Fetching:** Do NOT use `fetch` or `axios` directly inside Next.js components. Define API services and TanStack Query hooks in `packages/api` and consume them in the apps.
- **Transaction & Flow:** For complex flows like Checkout, ensure Cart ID is managed properly on the client side (LocalStorage/Cookie), and API integrations follow strict event flows.

---

## 🤖 4. AI Agent Execution Rules
- **ALWAYS READ TROUBLESHOOTING_frontend.md FIRST:** Before starting any task or debugging, you MUST read the `TROUBLESHOOTING_frontend.md` file at the workspace root to be aware of past issues and avoid repeating mistakes.
- **Do NOT assume or skip steps.** Follow architectural documentation strictly.
- **MANDATORY PLANNING PHASE:** Before starting to write code or execute ANY task, you MUST create a detailed implementation plan file. If a plan file already exists for the current task, you MUST update it first. **CRITICAL:** After creating or updating the plan, you MUST STOP executing immediately and ask the user for explicit approval. Absolutely NO execution or code modification can occur before the user explicitly says "Approved" or "Proceed". Do NOT self-approve or chain tool calls to execute the plan.
- **OS Checking MUST BE AUTOMATIC:** Before running any installation commands, creating files, or executing shell scripts, you MUST automatically check the current Operating System (macOS, Windows, or Linux) using commands like `uname -a` or `ver`. Use the appropriate syntax and permissions (e.g., `sudo` on macOS) based on the OS. Never assume the OS.
- **Handling "Why" Questions:** When the user asks a question starting with "Why" (Tại sao) or asks for an explanation, you MUST ONLY EXPLAIN the reasoning. DO NOT proactively modify files, update code, or run commands based on that question unless explicitly instructed by the user to do so.
- Before modifying or creating a file, verify you are in the correct package or app directory.
- When creating a shared component in `ecommerce/ui`, immediately export it in `ecommerce/ui/src/index.ts` and verify it is transpiled properly in `apps/storefront/next.config.ts` and `apps/admin-dashboard/next.config.ts`.
- When adding new dependencies, verify that `package.json` configurations are updated correctly. Use workspace protocol `workspace:*` when linking internal packages.
- Prioritize updating `Tracking_Task*.md` files or markdown docs when completing milestones.
- **Mock Data Management & Centralization:** All mock data MUST ONLY be created and managed centrally inside `packages/api/src/home/queries.ts`. Do not create isolated mock data files (e.g., `mockData.ts`) within the individual apps (`storefront`, `admin-dashboard`). Furthermore, to prevent data fragmentation, DO NOT create multiple disconnected mock data variables for the same entity type (e.g., separate arrays for `mockCategories` and `featuredCategories`). All functions returning mock data for a specific entity MUST derive their data from a single, unified centralized array.

# Refactoring Code Flow & TypeScript Rules

This project is a monorepo consisting of multiple workspaces (`apps/` and `packages/`). To prevent incomplete refactors and broken types across the workspaces, all AI agents and developers must strictly follow this code flow when making changes to shared types or interfaces (like those in `@v8n/types`).

## Global Type Update Rule
Whenever a shared interface (e.g., `Product`, `Category`) or utility type is modified, added, or removed, you **MUST**:

1. **Global Search**: Perform a global search (`grep_search` or equivalent) across the **entire monorepo root** (`/`), not just the current app or package you are working on.
2. **Find All Usages**: Look for the name of the interface and any property changes (e.g. searching for `handle:` if you renamed `handle` to `slug`).
3. **Update Everything**: Update all occurrences of the type usage. Pay special attention to:
   - Mock Data files (`mockData.ts`, `queries.ts`, etc.) in all packages (`apps/*` and `packages/*`).
   - Hardcoded arrays or objects returning the interface in API packages.
   - Component props in UI packages.
4. **Never Assume Isolation**: Do not assume that changing a type in `packages/types` only affects the current active app. It affects the entire monorepo.
5. **Validation**: Check if `pnpm dev` or `pnpm build` triggers any type errors across the workspaces before concluding the task.

By following this checklist, we avoid edge cases where a property is updated in one app's mock data but forgotten in another package's query functions.
````

## File: package.json
````json
{
  "name": "v8n-ecomm",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "turbo": "latest",
    "typescript": "^5.0.0",
    "prettier": "^3.0.0"
  },
  "packageManager": "pnpm@9.0.0"
}
````

## File: pnpm-workspace.yaml
````yaml
packages:
  - "apps/*"
  - "ecommerce/*"
  - "packages/*"
````

## File: README.md
````markdown
# V8N Ecommerce Frontend Monorepo

Welcome to the **v8n-ecomm** frontend monorepo. This repository contains the frontend applications and shared packages for the V8N Ecommerce platform, managed via [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/).

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State/Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Package Manager:** `pnpm`
- **Monorepo Tool:** Turborepo

---

## 🏗 Architecture & Workspace Structure

This monorepo is divided into **Apps** and **Packages**.

### 📱 Apps (`apps/`)

- **`apps/storefront`**: The customer-facing e-commerce web application.
- **`apps/admin-dashboard`**: The internal dashboard for managing products, orders, and users.

### 📦 Shared Packages (`packages/` & `ecommerce/`)

- **`ecommerce/ui`**: Centralized UI component library based on `shadcn-ui`. All shared UI components live here.
- **`packages/api`**: Shared API clients (Axios/Fetch), endpoints, and data-fetching hooks (TanStack Query).
- **`packages/hooks`**: Custom React hooks independent of UI (e.g., `useEventBus`, `useAuth`).
- **`packages/i18n`**: Internationalization schemas and JSON dictionaries.
- **`packages/types`**: Shared TypeScript definitions, interfaces, and DTOs.
- **`packages/config`**: Shared configuration settings (ESLint, Prettier, TypeScript).

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/installation) (v9.x recommended)

### 1. Install Dependencies
Always use `pnpm` to install packages at the root level.
```bash
pnpm install
```

### 2. Start the Development Server
To start all applications simultaneously:
```bash
pnpm dev
```
- **Storefront:** `http://localhost:3000` (default)
- **Admin Dashboard:** `http://localhost:3001` (default)

To start a specific app:
```bash
pnpm --filter storefront dev
```

### 3. Build for Production
To build all apps and packages:
```bash
pnpm build
```

---

## 📜 Available Scripts (Root)

Run these commands from the root directory:

- `pnpm dev`: Starts the development servers using Turborepo.
- `pnpm build`: Builds all apps and packages.
- `pnpm lint`: Runs ESLint across all workspaces.
- `pnpm format`: Formats code using Prettier.

---

## 📖 Coding Standards & Conventions

1. **Package Management:** **ALWAYS use `pnpm`.** Never use `npm` or `yarn`.
2. **UI Components:** Do NOT install `shadcn-ui` components directly into the `apps/*` directories. Generate and maintain them inside `ecommerce/ui`.
3. **TypeScript:** Strictly enforce types. Avoid using `any`. Define core models in `packages/types`.
4. **Data Fetching:** Do NOT use raw `fetch` or `axios` directly inside components. Define services and custom hooks in `packages/api`.
5. **Form State:** Use `react-hook-form` and `zod` for all form state management instead of multiple `useState` declarations.
6. **Next.js Server Components:** Prefer Server Components by default. Only use `"use client"` when interactivity or React hooks are required.
7. **Cross-Component Communication:** Utilize the global Event Bus (`packages/hooks/useEventBus.ts`) for complex component communication decoupled from the component tree.
````

## File: apps/admin-dashboard/src/app/[locale]/admin/products/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { ProductsTable } from '@/components/admin/ProductsTable';
import type { Metadata } from 'next';
⋮----
export async function generateMetadata(
⋮----
export default function AdminProductsPage()
````

## File: apps/admin-dashboard/src/app/[locale]/admin/team/login-history/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { LoginHistoryClient } from '@/components/admin/LoginHistoryClient';
import type { Metadata } from 'next';
⋮----
export async function generateMetadata(
⋮----
export default function LoginHistoryPage()
````

## File: apps/admin-dashboard/src/app/[locale]/admin/team/roles/[id]/edit/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { EditRoleClient } from './EditRoleClient';
⋮----
export async function generateMetadata(
⋮----
export default function EditRolePage()
````

## File: apps/admin-dashboard/src/app/[locale]/admin/team/roles/new/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { RoleForm } from '@/components/admin/RoleForm';
import type { Metadata } from 'next';
⋮----
export async function generateMetadata(
⋮----
export default function NewRolePage()
````

## File: apps/admin-dashboard/src/app/[locale]/admin/team/roles/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { RolesListClient } from '@/components/admin/RolesListClient';
import type { Metadata } from 'next';
⋮----
export async function generateMetadata(
⋮----
export default function RolesPage()
````

## File: apps/admin-dashboard/src/app/[locale]/admin/team/users/[id]/edit/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
⋮----
import type { Metadata } from 'next';
⋮----
export async function generateMetadata(
⋮----
import { EditUserClient } from './EditUserClient';
⋮----
export default function EditUserPage()
````

## File: apps/admin-dashboard/src/app/[locale]/admin/team/users/new/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { UserForm } from '@/components/admin/UserForm';
import type { Metadata } from 'next';
⋮----
export async function generateMetadata(
⋮----
export default function NewUserPage()
````

## File: apps/admin-dashboard/src/app/[locale]/admin/team/users/page.tsx
````typescript
import { setRequestLocale } from 'next-intl/server';
import { UsersListClient } from '@/components/admin/UsersListClient';
import type { Metadata } from 'next';
⋮----
export async function generateMetadata(
⋮----
export default function AdminUsersPage()
````

## File: apps/admin-dashboard/src/components/admin/RoleForm.tsx
````typescript
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import type { AdminRole } from '@v8n/types';
import { adminRoleSchema, adminRoleUpdateSchema, type AdminRoleFormValues } from '@v8n/api/src/admin/zod-schemas';
import { useCreateAdminRole, useUpdateAdminRole, useAdminPermissions } from '@v8n/api/src/admin/queries';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Textarea,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@v8n/ui';
import { useState } from 'react';
⋮----
interface RoleFormProps {
    role?: AdminRole;
    isEditMode?: boolean;
}
⋮----
// Group permissions by group
⋮----
const togglePermission = (permId: string) =>
⋮----
const onSubmit = (values: AdminRoleFormValues) =>
⋮----
{/* Breadcrumb (desktop) */}
⋮----
{/* Mobile back button */}
⋮----
<form onSubmit=
⋮----
{/* Permissions */}
⋮----
{/* Buttons */}
````

## File: apps/admin-dashboard/src/components/admin/RolesListClient.tsx
````typescript
import { Link } from '@/i18n/routing';
import { useAdminRoles } from '@v8n/api/src/admin/queries';
import { Loader2, Plus, Shield } from 'lucide-react';
import { useState } from 'react';
import { RolesTable } from './RolesTable';
import { RoleCard } from './RoleCard';
⋮----
{/* Breadcrumb (desktop) */}
⋮----
{/* Header */}
⋮----
{/* Tabs */}
⋮----
{/* Content */}
⋮----
{/* Desktop table */}
⋮----
{/* Mobile cards */}
````

## File: apps/admin-dashboard/src/components/admin/UserForm.tsx
````typescript
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, EyeOff, Loader2, X } from 'lucide-react';
import { AdminUser } from '@v8n/types';
import { adminUserSchema, adminUserUpdateSchema } from '@v8n/api/src/admin/zod-schemas';
import { useCreateAdminUser, useUpdateAdminUser, useAdminRoles } from '@v8n/api/src/admin/queries';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Switch,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@v8n/ui';
import { useState } from 'react';
⋮----
interface UserFormProps {
    user?: AdminUser;
    isEditMode?: boolean;
}
⋮----
const onSubmit = (values:
⋮----
const toggleRole = (roleId: string) =>
⋮----
{/* Breadcrumb (desktop) */}
⋮----
{/* Mobile back button */}
⋮----
<form onSubmit=
⋮----
{/* Desktop: 2-column layout */}
⋮----
{/* Password */}
⋮----
{/* Roles multi-select */}
⋮----
{/* Status toggle */}
⋮----
{/* Buttons */}
````

## File: apps/storefront/src/components/layout/Footer.tsx
````typescript
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
````

## File: apps/storefront/package.json
````json
{
  "name": "storefront",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@formatjs/intl-localematcher": "^0.8.10",
    "@hookform/resolvers": "^3.3.4",
    "@tanstack/react-query": "^5.101.0",
    "@tanstack/react-query-devtools": "^5.101.0",
    "@v8n/api": "workspace:*",
    "@v8n/i18n": "workspace:*",
    "@v8n/types": "workspace:*",
    "@v8n/ui": "workspace:*",
    "lucide-react": "^0.300.0",
    "next": "15.0.0",
    "next-intl": "^4.13.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.4",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@next/env": "^16.2.9",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@v8n/config": "workspace:*",
    "autoprefixer": "^10.4.16",
    "eslint": "^9.39.0",
    "eslint-config-next": "15.0.0",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5"
  }
}
````

## File: packages/api/src/home/queries.ts
````typescript
import { Product, Category, ApiResponse, ApiProductDto } from "@v8n/types";
import { fetchClient } from "../client";
⋮----
// TODO: Use axios/fetch to call backend API endpoints when ready.
⋮----
export const getFeaturedCategories = async (): Promise<Category[]> =>
⋮----
export const getFeaturedProducts = async (): Promise<Product[]> =>
⋮----
export const getNewArrivals = async (): Promise<Product[]> =>
⋮----
export const getProducts = async (): Promise<Product[]> =>
⋮----
export const getProductBySlug = async (slug: string): Promise<Product | undefined> =>
⋮----
export const getCategories = async (): Promise<Category[]> =>
````

## File: packages/types/src/auth.ts
````typescript
// ===== CORE TYPES - Match Backend AuthResponse.java =====
⋮----
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;          // ADD - backend provides computed fullName
    phone?: string;            // ADD - backend provides phone
    avatarUrl?: string;        // RENAME from avatar → avatarUrl - match backend
    status: 'ACTIVE' | 'INACTIVE' | 'BANNED';  // ADD - match UserStatus enum
    emailVerified: boolean;    // ADD - backend provides this
    role: 'customer' | 'admin';
    createdAt?: string;        // ADD - ISO date string from LocalDateTime
    lastLoginAt?: string;      // ADD - ISO date string from LocalDateTime
}
⋮----
fullName: string;          // ADD - backend provides computed fullName
phone?: string;            // ADD - backend provides phone
avatarUrl?: string;        // RENAME from avatar → avatarUrl - match backend
status: 'ACTIVE' | 'INACTIVE' | 'BANNED';  // ADD - match UserStatus enum
emailVerified: boolean;    // ADD - backend provides this
⋮----
createdAt?: string;        // ADD - ISO date string from LocalDateTime
lastLoginAt?: string;      // ADD - ISO date string from LocalDateTime
⋮----
export interface AuthResponse {
    accessToken: string;       // RENAME from token → accessToken - match backend
    refreshToken: string;      // MAKE REQUIRED - backend always returns both
    tokenType: string;         // ADD - backend returns "Bearer"
    expiresIn: number;         // MAKE REQUIRED - backend returns expires duration
    user: User;
}
⋮----
accessToken: string;       // RENAME from token → accessToken - match backend
refreshToken: string;      // MAKE REQUIRED - backend always returns both
tokenType: string;         // ADD - backend returns "Bearer"
expiresIn: number;         // MAKE REQUIRED - backend returns expires duration
⋮----
// ===== API REQUEST TYPES - Match Backend DTOs =====
⋮----
export interface RegisterRequest {
    firstName: string;         // NOT fullName - backend expects separate fields
    lastName: string;
    email: string;
    password: string;
    phone?: string;            // ADD - backend RegisterRequest has phone
}
⋮----
firstName: string;         // NOT fullName - backend expects separate fields
⋮----
phone?: string;            // ADD - backend RegisterRequest has phone
⋮----
export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}
⋮----
export interface ForgotPasswordRequest {
    email: string;
}
⋮----
export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}
⋮----
// ===== UI-ONLY TYPES - NOT sent to backend =====
⋮----
export interface RegisterFormValues {
    fullName: string;          // UI-only: will be split into firstName + lastName
    email: string;
    password: string;
    confirmPassword: string;   // UI-only: validation only, not sent to API
    acceptTerms: boolean;      // UI-only: validation only, not sent to API
    phone?: string;            // Optional phone field
}
⋮----
fullName: string;          // UI-only: will be split into firstName + lastName
⋮----
confirmPassword: string;   // UI-only: validation only, not sent to API
acceptTerms: boolean;      // UI-only: validation only, not sent to API
phone?: string;            // Optional phone field
````

## File: packages/types/src/index.ts
````typescript

````

## File: .gitignore
````
# dependencies
node_modules
.pnp
.pnp.js

# Next.js
.next/
out/
build

# Turborepo
.turbo

# testing
coverage

# production
dist

# misc
.DS_Store
*.pem

# environments
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# pnpm
pnpm-debug.log*

# Vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDEs
.idea/
.vscode/
*.swp
all-apps.log
````

## File: start-fe.sh
````bash
#!/bin/bash

kill_port() {
  local port=$1
  local pid=$(lsof -ti :$port 2>/dev/null)
  if [ -n "$pid" ]; then
    echo "Killing process(es) $pid on port $port..."
    kill -9 $pid 2>/dev/null
  fi
}

read -p "Start admin or storefront? (ad for admin, fe for storefront, leave empty for both): " choice

if [ "$choice" = "ad" ]; then
  kill_port 3001
  pnpm --filter admin-dashboard dev 2>&1 | tee admin-dashboard.log
elif [ "$choice" = "fe" ]; then
  kill_port 3000
  pnpm --filter storefront dev 2>&1 | tee storefront.log
elif [ -z "$choice" ]; then
  kill_port 3000
  kill_port 3001
  pnpm dev 2>&1 | tee all-apps.log
else
  echo "Invalid choice. Exiting."
  exit 1
fi
````

## File: turbo.json
````json
{
  "$schema": "https://turbo.build/schema.json",
  "globalEnv": ["NEXT_PUBLIC_API_BASE_URL"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
````

## File: apps/admin-dashboard/next.config.ts
````typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { loadEnvConfig } from "@next/env";
````

## File: apps/storefront/next.config.ts
````typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { loadEnvConfig } from "@next/env";
````
