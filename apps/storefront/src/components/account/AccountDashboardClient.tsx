"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@/i18n/routing";
import DashboardContent from "@/components/account/DashboardContent";
import { profileApi } from "@v8n/api";

export default function AccountDashboardClient() {
    const router = useRouter();

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: () => profileApi.getProfile(),
        retry: false,
    });

    if (isError) {
        router.push("/login?returnUrl=/account");
        return null;
    }

    return (
        <DashboardContent
            user={user || null}
            isLoading={isLoading}
            onEdit={() => router.push("/account/profile")}
        />
    );
}
