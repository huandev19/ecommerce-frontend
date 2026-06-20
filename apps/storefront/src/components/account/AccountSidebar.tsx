"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@ui/lib/utils";
import {
    LayoutDashboard,
    Package,
    MapPin,
    User,
    Settings,
    LogOut,
} from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";

interface AccountSidebarProps {
    onLogout?: () => void;
}

export default function AccountSidebar({ onLogout }: AccountSidebarProps) {
    const t = useTranslations("storefront.account");
    const sidebarItems = [
        { label: t("dashboard"), href: "/account", icon: LayoutDashboard },
        { label: t("orders"), href: "/account/orders", icon: Package },
        { label: t("addresses"), href: "/account/addresses", icon: MapPin },
        { label: t("profile"), href: "/account/profile", icon: User },
        { label: t("settings"), href: "/account/settings", icon: Settings },
    ];
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuthStore();

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            logout();
            router.push("/login");
        }
    };

    return (
        <aside className="w-[240px] shrink-0">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
                <nav className="flex flex-col gap-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            item.href === "/account"
                                ? pathname === "/account"
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                    isActive
                                        ? "text-[#3B82F6] bg-blue-50"
                                        : "text-[#111827] hover:bg-gray-50"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    {/* Divider */}
                    <div className="my-2 border-t border-[#E5E7EB]" />

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#EF4444] hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>{t("sign_out")}</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}