"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@v8n/ui";
import { Camera, Eye, EyeOff } from "lucide-react";
import type { UserProfile } from "@v8n/types";

const profileSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must be at most 50 characters"),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must be at most 50 characters"),
    phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
        .optional()
        .or(z.literal("")),
    dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
        .optional()
        .or(z.literal("")),
});

const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain an uppercase letter")
            .regex(/[0-9]/, "Password must contain a number"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

interface ProfileFormProps {
    user: UserProfile | null;
    isLoading: boolean;
    onSave: (data: ProfileFormValues) => Promise<void>;
    onChangePassword: (data: PasswordFormValues) => Promise<void>;
    onCancel: () => void;
}

export default function ProfileForm({
    user,
    isLoading,
    onSave,
    onChangePassword,
    onCancel,
}: ProfileFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            phone: user?.phone || "",
            dateOfBirth: user?.dateOfBirth || "",
        },
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
        reset: resetPassword,
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmitProfile = async (data: ProfileFormValues) => {
        setSaveError(null);
        try {
            await onSave(data);
        } catch (err) {
            setSaveError(
                err instanceof Error ? err.message : "Failed to save profile"
            );
        }
    };

    const onSubmitPassword = async (data: PasswordFormValues) => {
        setPasswordError(null);
        try {
            await onChangePassword(data);
            resetPassword();
        } catch (err) {
            setPasswordError(
                err instanceof Error ? err.message : "Failed to change password"
            );
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#111827]">Profile</h1>
            </div>

            {/* Profile Form */}
            <div className="mb-6 rounded-xl border border-[#E5E7EB] bg-white p-6">
                <h2 className="mb-6 text-lg font-semibold text-[#111827]">
                    Personal Information
                </h2>

                {/* Avatar Upload */}
                <div className="mb-6 flex items-center gap-4">
                    <div className="relative">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E5E7EB] text-2xl font-bold text-gray-600">
                            {user?.firstName?.[0]?.toUpperCase()}
                            {user?.lastName?.[0]?.toUpperCase()}
                        </div>
                        <button
                            type="button"
                            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#3B82F6] text-white"
                        >
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500">Click to upload new photo</p>
                </div>

                {saveError && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {saveError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmitProfile)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#6B7280]">
                                First Name
                            </label>
                            <input
                                {...register("firstName")}
                                className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none"
                                placeholder="John"
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#6B7280]">
                                Last Name
                            </label>
                            <input
                                {...register("lastName")}
                                className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none"
                                placeholder="Doe"
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#6B7280]">
                                Email
                            </label>
                            <input
                                value={user?.email || ""}
                                readOnly
                                className="w-full cursor-not-allowed rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 text-sm text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#6B7280]">
                                Phone
                            </label>
                            <input
                                {...register("phone")}
                                className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none"
                                placeholder="+1234567890"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#6B7280]">
                                Date of Birth
                            </label>
                            <input
                                {...register("dateOfBirth")}
                                className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none"
                                placeholder="YYYY-MM-DD"
                            />
                            {errors.dateOfBirth && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.dateOfBirth.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>

            {/* Password Change Section */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
                <h2 className="mb-6 text-lg font-semibold text-[#111827]">
                    Change Password
                </h2>

                {passwordError && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {passwordError}
                    </div>
                )}

                <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#6B7280]">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...registerPassword("currentPassword")}
                                    className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 pr-10 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {passwordErrors.currentPassword && (
                                <p className="mt-1 text-xs text-red-500">
                                    {passwordErrors.currentPassword.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#6B7280]">
                                New Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...registerPassword("newPassword")}
                                className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none"
                            />
                            {passwordErrors.newPassword && (
                                <p className="mt-1 text-xs text-red-500">
                                    {passwordErrors.newPassword.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#6B7280]">
                                Confirm Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...registerPassword("confirmPassword")}
                                className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none"
                            />
                            {passwordErrors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-500">
                                    {passwordErrors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button
                            type="submit"
                            disabled={isPasswordSubmitting}
                        >
                            {isPasswordSubmitting
                                ? "Updating..."
                                : "Update Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}