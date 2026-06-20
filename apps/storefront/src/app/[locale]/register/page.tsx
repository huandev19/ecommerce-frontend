import { setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { RegisterPageContent } from "@/components/auth/RegisterPageContent";

export const metadata: Metadata = {
    title: "Register | V8N E-commerce",
    description: "Create a new account on V8N E-commerce",
};

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <RegisterPageContent />;
}
