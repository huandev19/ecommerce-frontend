import { setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@v8n/ui";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login | V8N E-commerce",
    description: "Sign in to your V8N E-commerce account",
};

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
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
                    <li className="text-gray-900 font-medium">Login</li>
                </ol>
            </nav>

            {/* Login Card */}
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-gray-900">
                        Sign In
                    </CardTitle>
                    <p className="text-center text-sm text-gray-500 mt-1">
                        Enter your credentials to access your account
                    </p>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
}
