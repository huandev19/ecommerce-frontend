"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@v8n/ui";
import { Input } from "@v8n/ui";
import { Checkbox } from "@v8n/ui";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { RegisterFormValues, RegisterRequest } from "@v8n/types";
import { useRegister } from "@v8n/api";

// Define the register schema
const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(2, "Full name must be at least 2 characters")
            .max(50, "Full name must not exceed 50 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string(),
        acceptTerms: z.literal(true, {
            errorMap: () => ({ message: "You must accept the Terms & Conditions" }),
        }),
        phone: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export function RegisterForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const { mutateAsync: registerAsync, isPending, error: mutationError } = useRegister();

    const {
        register: formRegister,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

    // Handle mutation errors
    useEffect(() => {
        if (mutationError) {
            setError(mutationError.message);
        }
    }, [mutationError]);

    const onSubmit = async (data: RegisterFormValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Transform UI form values to API request payload
            // Split fullName by last space: "Nguyen Van A" → firstName="Nguyen Van", lastName="A"
            // Edge case: single word → firstName=word, lastName=""
            const nameParts = data.fullName.trim().split(/\s+/);
            const firstName = nameParts.length > 1
                ? nameParts.slice(0, -1).join(" ")
                : nameParts[0];
            const lastName = nameParts.length > 1
                ? nameParts[nameParts.length - 1]
                : "";

            const transformedData: RegisterRequest = {
                firstName,
                lastName,
                email: data.email,
                password: data.password,
                phone: data.phone,
            };

            await registerAsync(transformedData);
            // Redirect to login page with success message
            router.push("/login?success=1");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
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

            {/* Full Name Field */}
            <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <Input
                    id="fullName"
                    type="text"
                    placeholder="Nguyen Van A"
                    {...formRegister("fullName")}
                    className="w-full"
                    disabled={isSubmitting}
                />
                {errors.fullName && (
                    <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
                )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...formRegister("email")}
                    className="w-full"
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Phone Field (Optional) */}
            <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number (Optional)
                </label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="+84 123 456 789"
                    {...formRegister("phone")}
                    className="w-full"
                    disabled={isSubmitting}
                />
                {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
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
                    {...formRegister("password")}
                    className="w-full"
                    disabled={isSubmitting}
                />
                {errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    {...formRegister("confirmPassword")}
                    className="w-full"
                    disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-start space-x-2">
                <Controller
                    name="acceptTerms"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            id="acceptTerms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5"
                        />
                    )}
                />
                <label
                    htmlFor="acceptTerms"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                    I agree to the Terms & Conditions and Privacy Policy
                </label>
            </div>
            {errors.acceptTerms && (
                <p className="text-sm text-red-600 mt-1">{errors.acceptTerms.message}</p>
            )}

            {/* Create Account Button */}
            <Button
                type="submit"
                className="w-full py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting || isPending}
            >
                {isSubmitting || isPending ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                    </span>
                ) : (
                    "Create Account"
                )}
            </Button>

            {/* Already have an account? Sign In link */}
            <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Sign In
                </Link>
            </div>
        </form>
    );
}