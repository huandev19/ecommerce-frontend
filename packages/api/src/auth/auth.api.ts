import { LoginRequest, AuthResponse, RegisterRequest, ApiResponse } from "@v8n/types";

// TODO: Use axios/fetch to call backend API endpoints when ready.
// Currently using fetch-based implementation with error handling.

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export const authApi = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                switch (response.status) {
                    case 401:
                        throw new Error("Invalid email or password. Please try again.");
                    case 429:
                        throw new Error("Too many login attempts. Please try again later.");
                    case 500:
                        throw new Error("Server error. Please try again.");
                    default:
                        throw new Error(errorData.message || "Login failed. Please try again.");
                }
            }

            const data = await response.json();
            return data as AuthResponse;
        } catch (error) {
            if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
                throw new Error("Connection error. Please check your internet and try again.");
            }
            throw error;
        }
    },

    logout: async (): Promise<void> => {
        try {
            await fetch(`${baseUrl}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    },

    refresh: async (refreshToken: string): Promise<AuthResponse> => {
        try {
            const response = await fetch(`${baseUrl}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                throw new Error("Failed to refresh token");
            }

            const data = await response.json();
            return data as AuthResponse;
        } catch (error) {
            console.error("Token refresh failed:", error);
            throw error;
        }
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                switch (response.status) {
                    case 400:
                        throw new Error("Invalid registration data. Please check your information.");
                    case 409:
                        throw new Error("An account with this email already exists. Please sign in instead.");
                    case 429:
                        throw new Error("Too many registration attempts. Please try again later.");
                    case 500:
                        throw new Error("Server error. Please try again later.");
                    default:
                        throw new Error(errorData.message || "Registration failed. Please try again.");
                }
            }

            const apiResponse = await response.json() as ApiResponse<AuthResponse>;
            if (!apiResponse.success) {
                throw new Error(apiResponse.message || "Registration failed. Please try again.");
            }

            return apiResponse.data as AuthResponse;
        } catch (error) {
            if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
                throw new Error("Connection error. Please check your internet and try again.");
            }
            throw error;
        }
    },
};
