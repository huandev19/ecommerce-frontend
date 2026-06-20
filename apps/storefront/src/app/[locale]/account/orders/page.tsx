import { setRequestLocale } from 'next-intl/server';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import OrdersList from "@/components/account/OrdersList";

export default async function OrdersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <div>
            <div className="mb-6 flex items-center gap-4">
                <Link
                    href="/account"
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
                <h1 className="text-2xl font-bold text-[#111827]">My Orders</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    {/* Account sidebar will be rendered by layout */}
                </div>
                <div className="lg:col-span-3">
                    <OrdersList />
                </div>
            </div>
        </div>
    );
}