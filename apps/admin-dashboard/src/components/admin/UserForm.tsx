"use client";

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

interface UserFormProps {
    user?: AdminUser;
    isEditMode?: boolean;
}


export function UserForm({ user, isEditMode = false }: UserFormProps) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(user?.roleIds ?? []);

    const createMutation = useCreateAdminUser();
    const updateMutation = useUpdateAdminUser();
    const { data: rolesData } = useAdminRoles();

    const roles = rolesData?.roles ?? [];
    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const createSchema = adminUserSchema.extend({
        confirmPassword: adminUserSchema.shape.password,
    }).refine((d) => d.password === d.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

    const schema = isEditMode ? adminUserUpdateSchema : createSchema;

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: user?.email ?? '',
            name: user?.name ?? '',
            password: '',
            confirmPassword: '',
            roleIds: user?.roleIds ?? [],
            isActive: user?.status === 'active' || user?.status === undefined ? true : false,
        },
    });

    const onSubmit = (values: { email: string; name: string; password?: string; isActive?: boolean }) => {
        if (isEditMode && user) {
            const payload = { id: user.id } as Parameters<typeof updateMutation.mutate>[0];
            if (values.email !== user.email) payload.email = values.email;
            if (values.name !== user.name) payload.name = values.name;
            if (values.password) payload.password = values.password;
            if (JSON.stringify(selectedRoleIds) !== JSON.stringify(user.roleIds))
                payload.roleIds = selectedRoleIds;
            if ((values.isActive ? 'active' : 'inactive') !== user.status)
                payload.isActive = values.isActive;

            updateMutation.mutate(payload, {
                onSuccess: () => router.push('/admin/team/users'),
                onError: (err) => {
                    form.setError('root', { message: err.message });
                },
            });
        } else {
            createMutation.mutate(
                { ...values, roleIds: selectedRoleIds } as Parameters<typeof createMutation.mutate>[0],
                {
                    onSuccess: () => router.push('/admin/team/users'),
                    onError: (err) => {
                        form.setError('root', { message: err.message });
                    },
                },
            );
        }
    };

    const toggleRole = (roleId: string) => {
        setSelectedRoleIds((prev) =>
            prev.includes(roleId) ? prev.filter((r) => r !== roleId) : [...prev, roleId],
        );
    };

    const title = isEditMode ? 'Edit Admin User' : 'Create Admin User';
    const breadcrumbLabel = isEditMode ? 'Edit User' : 'Add Admin User';

    return (
        <div className="space-y-6">
            {/* Breadcrumb (desktop) */}
            <div className="hidden text-sm text-[#6B7280] md:block">
                <Link href="/admin/team/users" className="hover:text-[#3B82F6] transition-colors">
                    Team
                </Link>
                <span className="mx-2">/</span>
                <Link href="/admin/team/users" className="hover:text-[#3B82F6] transition-colors">
                    Admin Users
                </Link>
                <span className="mx-2">/</span>
                <span className="font-medium text-[#111827]">{breadcrumbLabel}</span>
            </div>

            {/* Mobile back button */}
            <Link
                href="/admin/team/users"
                className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors md:hidden"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Users
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

                            {/* Desktop: 2-column layout */}
                            <div className="grid gap-5 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#111827]">Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="admin@example.com"
                                                    disabled={isEditMode}
                                                    className="bg-[#F9FAFB] border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#3B82F6] focus:ring-[#3B82F6]/20"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#111827]">Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder="John Nguyen"
                                                    className="bg-[#F9FAFB] border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#3B82F6] focus:ring-[#3B82F6]/20"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Password */}
                            {(!isEditMode || true) && (
                                <div className="grid gap-5 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#111827]">
                                                    Password{isEditMode ? ' (leave blank to keep unchanged)' : ''}
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            {...field}
                                                            type={showPassword ? 'text' : 'password'}
                                                            placeholder={isEditMode ? '••••••••' : 'Enter password'}
                                                            className="bg-[#F9FAFB] border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] pr-12 focus:border-[#3B82F6] focus:ring-[#3B82F6]/20"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-[#3B82F6] hover:text-[#2563EB]"
                                                            tabIndex={-1}
                                                        >
                                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {!isEditMode && (
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#111827]">Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type={showPassword ? 'text' : 'password'}
                                                            placeholder="Confirm password"
                                                            className="bg-[#F9FAFB] border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#3B82F6] focus:ring-[#3B82F6]/20"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                            )}

                            {/* Roles multi-select */}
                            <div>
                                <label className="block text-sm font-medium text-[#111827] mb-2">Assign Roles</label>
                                <div className="rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-4 py-3">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {selectedRoleIds.length === 0 && (
                                            <span className="text-sm text-[#9CA3AF]">Select roles...</span>
                                        )}
                                        {selectedRoleIds.map((rid) => {
                                            const role = roles.find((r) => r.id === rid);
                                            return role ? (
                                                <span
                                                    key={rid}
                                                    className="inline-flex items-center gap-1 rounded-full border border-[#3B82F6] bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-medium text-[#3B82F6]"
                                                >
                                                    {role.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleRole(rid)}
                                                        className="ml-1 rounded-full p-0.5 hover:bg-[#DBEAFE] transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </span>
                                            ) : null;
                                        })}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                                        {roles.map((role) => {
                                            const isSelected = selectedRoleIds.includes(role.id);
                                            return (
                                                <button
                                                    key={role.id}
                                                    type="button"
                                                    onClick={() => toggleRole(role.id)}
                                                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${isSelected
                                                            ? 'bg-[#EFF6FF] text-[#3B82F6] border border-[#3B82F6]'
                                                            : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#3B82F6] hover:text-[#3B82F6]'
                                                        }`}
                                                >
                                                    {role.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                {form.formState.errors.roleIds && (
                                    <p className="mt-1.5 text-sm text-[#EF4444]">
                                        {form.formState.errors.roleIds.message as string}
                                    </p>
                                )}
                            </div>

                            {/* Status toggle */}
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border border-[#E5E7EB] px-4 py-3">
                                        <div>
                                            <FormLabel className="text-[#111827]">Account Status</FormLabel>
                                            <p className="text-xs text-[#6B7280] mt-0.5">
                                                {field.value ? 'User can log in and access the admin panel' : 'User account is disabled'}
                                            </p>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="data-[state=checked]:bg-[#10B981]"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Buttons */}
                            <div className="flex flex-col-reverse gap-3 pt-4 md:flex-row md:justify-end">
                                <Link
                                    href="/admin/team/users"
                                    className="inline-flex items-center justify-center rounded-lg border border-[#D1D5DB] bg-white px-5 py-2.5 text-sm font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB]"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#2563EB] disabled:opacity-50"
                                >
                                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {isEditMode ? 'Save Changes' : 'Create User'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
