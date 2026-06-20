import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegisterRequest, AuthResponse } from '@v8n/types';
import { authApi } from './auth.api';

// Define query keys for auth-related queries
export const AUTH_QUERY_KEYS = {
    register: ['auth', 'register'] as const,
};

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
export function useRegister() {
    const queryClient = useQueryClient();

    return useMutation<AuthResponse, Error, RegisterRequest>({
        mutationKey: AUTH_QUERY_KEYS.register,
        mutationFn: async (data: RegisterRequest) => {
            try {
                // Call the API registration function
                const response = await authApi.register(data);
                return response;
            } catch (error) {
                // Re-throw the error so it's caught by the mutation error handler
                throw error instanceof Error ? error : new Error('Registration failed');
            }
        },
        // Optimistic UI pattern: update local state before server response
        onMutate: async (variables: RegisterRequest) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: AUTH_QUERY_KEYS.register });

            // Snapshot the previous value
            const previousAuth = queryClient.getQueryData<AuthResponse>(AUTH_QUERY_KEYS.register);

            // Return a context object with the snapshotted value
            return { previousAuth };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (error: Error, variables: RegisterRequest, context: unknown) => {
            // Restore previous data if it existed
            if (context && typeof context === 'object' && 'previousAuth' in context) {
                const typedContext = context as { previousAuth: AuthResponse | undefined };
                if (typedContext.previousAuth) {
                    queryClient.setQueryData(AUTH_QUERY_KEYS.register, typedContext.previousAuth);
                }
            }
        },
        // Always refetch after error or success to ensure we have the latest data
        onSettled: () => {
            // Invalidate auth-related queries to ensure fresh data
            queryClient.invalidateQueries({ queryKey: ['auth'], exact: false });
        },
    });
}
