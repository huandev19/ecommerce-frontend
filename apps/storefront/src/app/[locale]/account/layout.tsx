import { setRequestLocale } from 'next-intl/server';
import AccountSidebar from "@/components/account/AccountSidebar";
import AuthGuard from "@/components/account/AuthGuard";

export default async function AccountLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <AuthGuard>
            <div className="min-h-screen bg-[#F9FAFB]">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    {/* PC: Sidebar + Content */}
                    <div className="flex gap-8">
                        {/* Sidebar - hidden on mobile */}
                        <div className="hidden md:block">
                            <AccountSidebar />
                        </div>

                        {/* Content area */}
                        <div className="min-h-[500px] flex-1">{children}</div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
