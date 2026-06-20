import { create } from 'zustand';
import { User, AuthResponse } from '@v8n/types';
import { authApi } from '@v8n/api';

// Token storage keys
const TOKEN_KEYS = {
    ACCESS_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'v8n_refresh_token',
    TOKEN_EXPIRES_AT: 'v8n_token_expires_at',
};

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
    clearError: () => void;
}

/**
 * Store tokens based on rememberMe preference.
 * accessToken: localStorage (rememberMe=true) or sessionStorage (rememberMe=false)
 * refreshToken: always localStorage for persistence
 * expiresAt: same storage as accessToken
 */
function storeTokens(response: AuthResponse, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(TOKEN_KEYS.ACCESS_TOKEN, response.accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, response.refreshToken);
    // expiresIn is in seconds, store as timestamp for expiry check
    storage.setItem(TOKEN_KEYS.TOKEN_EXPIRES_AT, String(Date.now() + response.expiresIn * 1000));
}

/**
 * Clear tokens from both localStorage and sessionStorage
 * to handle rememberMe toggle scenarios.
 */
function clearTokens(): void {
    [localStorage, sessionStorage].forEach(storage => {
        storage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
        storage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
        storage.removeItem(TOKEN_KEYS.TOKEN_EXPIRES_AT);
    });
}

/**
 * Get accessToken from whichever storage it exists in.
 */
function getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN) || sessionStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email, password, rememberMe = false) => {
        set({ isLoading: true, error: null });

        try {
            const credentials = { email, password, rememberMe };
            const response = await authApi.login(credentials);

            // Save tokens and user
            storeTokens(response, rememberMe);

            set({
                user: response.user,
                token: response.accessToken,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed. Please try again.',
            });
            throw error;
        }
    },


    logout: () => {
        // Clear all tokens
        clearTokens();

        set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
        });
    },

    checkAuth: () => {
        // Check if user is authenticated by looking for stored token
        const token = getAccessToken();

        if (token) {
            // In a real app, we'd validate the token or call an endpoint
            // For now, we'll assume it's valid
            set({
                token,
                isAuthenticated: true,
            });
        }
    },

    clearError: () => {
        set({ error: null });
    },
}));
