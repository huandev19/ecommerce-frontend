import type { UserProfile, UpdateProfileRequest, UpdatePasswordRequest } from "@v8n/types";
import { fetchClient } from "../client";

export const profileApi = {
    getProfile: async (): Promise<UserProfile> => {
        return fetchClient<UserProfile>("/profile", {
            method: "GET",
            credentials: "include",
        });
    },

    updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
        return fetchClient<UserProfile>("/profile", {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(data),
        });
    },

    updatePassword: async (data: UpdatePasswordRequest): Promise<void> => {
        return fetchClient<void>("/profile/password", {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(data),
        });
    },

    logout: async (): Promise<void> => {
        return fetchClient<void>("/auth/logout", {
            method: "POST",
            credentials: "include",
        });
    },
};