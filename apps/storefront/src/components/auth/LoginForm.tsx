"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@v8n/ui";
import { Input } from "@v8n/ui";
import { Checkbox } from "@v8n/ui";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";

// Google SVG icon component
function GoogleLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08 1.92 3.28 4.74 3.28 8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
        </svg>
    );
}

// Define the login schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const { login, error: authError, clearError } = useAuthStore();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        }
    });

    // Clear error when auth store has error
    useEffect(() => {
        if (authError) {
            setError(authError);
            clearError();
        }
    }, [authError, clearError]);

    const onSubmit = async (data: LoginFormValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await login(data.email, data.password, data.rememberMe);
            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Error Message */}
            {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full"
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full"
                    disabled={isSubmitting}
                />
                {errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
            </div>

            {/* Remember Me & Forgot Password - Responsive */}
            <div className="flex justify-between items-center">
                {/* Remember me: hidden on mobile, visible on desktop */}
                <div className="hidden md:flex items-center space-x-2">
                    <Controller
                        name="rememberMe"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id="remember-me"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}
                    />
                    <label
                        htmlFor="remember-me"
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                        Remember me
                    </label>
                </div>
                {/* Forgot password: always visible */}
                <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Forgot password?
                </Link>
            </div>

            {/* Sign In Button */}
            <Button
                type="submit"
                className="w-full py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                    </span>
                ) : (
                    "Sign In"
                )}
            </Button>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    {/* Desktop: longer divider text, Mobile: shorter */}
                    <span className="hidden md:inline-flex px-2 bg-white text-gray-500">
                        ━━━━━━━━━━━━ OR ━━━━━━━━━━━━
                    </span>
                    <span className="md:hidden inline-flex px-2 bg-white text-gray-500">
                        ━━ OR ━━
                    </span>
                </div>
            </div>

            {/* Social Login - Google Only */}
            <Button
                variant="outline"
                className="w-full py-3 text-base font-medium border-gray-300 hover:bg-gray-50"
                type="button"
            >
                <GoogleLogo className="mr-2 h-5 w-5" />
                Continue with Google
            </Button>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-600 mt-4">
                Don&apos;t have an account?{' '}
                <Link
                    href="/register"
                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Register
                </Link>
            </div>
        </form>
    );
}
