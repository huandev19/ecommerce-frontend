"use client";

import { User, Mail, Phone, Calendar } from "lucide-react";
import type { UserProfile } from "@v8n/types";

interface DashboardContentProps {
    user: UserProfile | null;
    isLoading: boolean;
    onEdit: () => void;
}

export default function DashboardContent({
    user,
    isLoading,
    onEdit,
}: DashboardContentProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 text-center text-gray-500">
                Unable to load profile. Please try again later.
            </div>
        );
    }

    const fields = [
        { label: "First Name", value: user.firstName, icon: User },
        { label: "Last Name", value: user.lastName, icon: User },
        { label: "Email", value: user.email, icon: Mail },
        { label: "Phone", value: user.phone || "—", icon: Phone },
        { label: "Date of Birth", value: user.dateOfBirth || "—", icon: Calendar },
    ];

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#111827]">Profile</h1>
                <button
                    onClick={onEdit}
                    className="rounded-lg border border-[#3B82F6] px-4 py-2 text-sm font-medium text-[#3B82F6] hover:bg-blue-50 transition-colors"
                >
                    Edit
                </button>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
                {/* Avatar */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E5E7EB] text-xl font-bold text-gray-600">
                        {user.firstName?.[0]?.toUpperCase()}
                        {user.lastName?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-[#111827]">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {fields.map((field) => {
                        const Icon = field.icon;
                        return (
                            <div key={field.label}>
                                <label className="mb-1 block text-sm font-medium text-[#6B7280]">
                                    {field.label}
                                </label>
                                <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#111827]">
                                    <Icon className="h-4 w-4 text-gray-400" />
                                    <span>{field.value}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}