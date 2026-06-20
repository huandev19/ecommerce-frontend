"use client";

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

interface RoleFormProps {
    role?: AdminRole;
    isEditMode?: boolean;
}

export function RoleForm({ role, isEditMode = false }: RoleFormProps) {
    const router = useRouter();
    const [selectedPermIds, setSelectedPermIds] = useState<string[]>(
        isEditMode ? [] : [],
    );

    const createMutation = useCreateAdminRole();
    const updateMutation = useUpdateAdminRole();
    const { data: permsData } = useAdminPermissions();

    const permissions = permsData?.permissions ?? [];
    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    // Group permissions by group
    const groupedPerms: Record<string, typeof permissions> = {};
    for (const p of permissions) {
        if (!groupedPerms[p.group]) groupedPerms[p.group] = [];
        groupedPerms[p.group].push(p);
    }

    const schema = isEditMode ? adminRoleUpdateSchema : adminRoleSchema;

    const form = useForm<AdminRoleFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: role?.name ?? '',
            description: role?.description ?? '',
            permissionIds: [],
        },
    });

    const togglePermission = (permId: string) => {
        setSelectedPermIds((prev) =>
            prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId],
        );
    };

    const onSubmit = (values: AdminRoleFormValues) => {
        const payload = { ...values, permissionIds: selectedPermIds };

        if (isEditMode && role) {
            const updatePayload = { id: role.id } as Parameters<typeof updateMutation.mutate>[0];
            if (values.name !== role.name) updatePayload.name = values.name;
            if (values.description !== role.description) updatePayload.description = values.description;
            updatePayload.permissionIds = selectedPermIds;

            updateMutation.mutate(updatePayload, {
                onSuccess: () => router.push('/admin/team/roles'),
                onError: (err) => {
                    form.setError('root', { message: err.message });
                },
            });
        } else {
            createMutation.mutate(payload, {
                onSuccess: () => router.push('/admin/team/roles'),
                onError: (err) => {
                    form.setError('root', { message: err.message });
                },
            });
        }
    };

    const title = isEditMode ? 'Edit Role' : 'Create Role';
    const breadcrumbLabel = isEditMode ? 'Edit Role' : 'Add Role';

    return (
        <div className="space-y-6">
            {/* Breadcrumb (desktop) */}
            <div className="hidden text-sm text-[#6B7280] md:block">
                <Link href="/admin/team/roles" className="hover:text-[#3B82F6] transition-colors">
                    Settings
                </Link>
                <span className="mx-2">/</span>
                <Link href="/admin/team/roles" className="hover:text-[#3B82F6] transition-colors">
                    Roles & Permissions
                </Link>
                <span className="mx-2">/</span>
                <span className="font-medium text-[#111827]">{breadcrumbLabel}</span>
            </div>

            {/* Mobile back button */}
            <Link
                href="/admin/team/roles"
                className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors md:hidden"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Roles
            </Link>

            <Card className="shadow-sm">
                <CardHeader className="border-b border-[#E5E7EB] pb-4">
                    <CardTitle className="text-lg font-bold text-[#111827]">{title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            {form.formState.errors.root && (
                                <div className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]">
                                    {form.formState.errors.root.message as string}
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#111827]">Role Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="e.g. Catalog Manager"
                                                className="bg-[#F9FAFB] border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#3B82F6] focus:ring-[#3B82F6]/20"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#111827]">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Describe what this role can do..."
                                                rows={3}
                                                className="bg-[#F9FAFB] border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#3B82F6] focus:ring-[#3B82F6]/20 resize-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Permissions */}
                            <div>
                                <label className="block text-sm font-medium text-[#111827] mb-2">
                                    Permissions
                                </label>
                                <div className="rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] p-4 max-h-80 overflow-y-auto space-y-4">
                                    {Object.entries(groupedPerms).map(([group, perms]) => (
                                        <div key={group}>
                                            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                                                {group}
                                            </h4>
                                            <div className="space-y-1.5">
                                                {perms.map((perm) => {
                                                    const isSelected = selectedPermIds.includes(perm.id);
                                                    return (
                                                        <button
                                                            key={perm.id}
                                                            type="button"
                                                            onClick={() => togglePermission(perm.id)}
                                                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${isSelected
                                                                    ? 'bg-[#EFF6FF] text-[#3B82F6] ring-1 ring-[#3B82F6]'
                                                                    : 'bg-white text-[#374151] hover:bg-[#F3F4F6]'
                                                                }`}
                                                        >
                                                            <span
                                                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${isSelected
                                                                        ? 'border-[#3B82F6] bg-[#3B82F6] text-white'
                                                                        : 'border-[#D1D5DB] bg-white'
                                                                    }`}
                                                            >
                                                                {isSelected && <Check className="h-3 w-3" />}
                                                            </span>
                                                            <span>{perm.action}</span>
                                                            <span className="ml-auto text-xs text-[#9CA3AF]">{perm.description}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                    {Object.keys(groupedPerms).length === 0 && (
                                        <p className="py-4 text-center text-sm text-[#9CA3AF]">No permissions available</p>
                                    )}
                                </div>
                                {form.formState.errors.permissionIds && (
                                    <p className="mt-1.5 text-sm text-[#EF4444]">
                                        {form.formState.errors.permissionIds.message as string}
                                    </p>
                                )}
                                <p className="mt-1.5 text-xs text-[#6B7280]">
                                    {selectedPermIds.length} permission(s) selected
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse gap-3 pt-4 md:flex-row md:justify-end">
                                <Link
                                    href="/admin/team/roles"
                                    className="inline-flex items-center justify-center rounded-lg border border-[#D1D5DB] bg-white px-5 py-2.5 text-sm font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB]"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || selectedPermIds.length === 0}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#2563EB] disabled:opacity-50"
                                >
                                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {isEditMode ? 'Save Changes' : 'Create Role'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
