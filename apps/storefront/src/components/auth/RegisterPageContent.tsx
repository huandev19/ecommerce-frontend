"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@v8n/ui";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function RegisterPageContent() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-[calc(100vh-120px)] bg-gray-50 flex flex-col items-center justify-center py-8 px-4 md:px-6">
                {/* Breadcrumb */}
                <nav className="w-full max-w-md mb-4 text-sm text-gray-500">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 font-medium">Register</li>
                    </ol>
                </nav>

                {/* Register Card */}
                <Card className="w-full max-w-md shadow-md">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold text-gray-900">
                            Create Account
                        </CardTitle>
                        <p className="text-center text-sm text-gray-500 mt-1">
                            Join us to start shopping and managing your orders
                        </p>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                </Card>
            </div>
        </QueryClientProvider>
    );
}