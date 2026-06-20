"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/i18n/routing";
import ProfileForm from "@/components/account/ProfileForm";
import { profileApi } from "@v8n/api";

export default function ProfileClient() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: () => profileApi.getProfile(),
        retry: false,
    });

    const saveProfileMutation = useMutation({
        mutationFn: (data: Parameters<typeof profileApi.updateProfile>[0]) =>
            profileApi.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: (data: Parameters<typeof profileApi.updatePassword>[0]) =>
            profileApi.updatePassword(data),
    });

    if (isError) {
        router.push("/login?returnUrl=/account/profile");
        return null;
    }

    return (
        <ProfileForm
            user={user || null}
            isLoading={isLoading}
            onSave={async (data) => {
                await saveProfileMutation.mutateAsync({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone || undefined,
                    dateOfBirth: data.dateOfBirth || undefined,
                });
            }}
            onChangePassword={async (data) => {
                await changePasswordMutation.mutateAsync({
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword,
                });
            }}
            onCancel={() => router.push("/account")}
        />
    );
}
