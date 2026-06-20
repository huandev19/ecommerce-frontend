'use client';

import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import { BarChart3, Box, ChevronDown, ChevronRight, History, Lock, Menu, Package, Settings, ShoppingCart, Users, X } from 'lucide-react';
import { useState } from 'react';

const mainNavItems = [
  { label: 'Dashboard', href: '/admin', icon: BarChart3 },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Workflows', href: '/admin/workflows', icon: Box },
];

const teamSubItems = [
  { label: 'Users', href: '/admin/team/users', icon: Users },
  { label: 'Roles', href: '/admin/team/roles', icon: Lock },
  { label: 'Login History', href: '/admin/team/login-history', icon: History },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [teamExpanded, setTeamExpanded] = useState(true);

  const isTeamActive = pathname.startsWith('/admin/team');

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center border-b border-[#334155] px-6">
        <Link href="/admin" className="text-xl font-bold text-white" onClick={() => setIsOpen(false)}>
          Admin Panel
        </Link>
      </div>
      <nav className="space-y-1 px-3 py-4">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-[#334155] text-white' : 'text-gray-300 hover:bg-[#334155] hover:text-white'
                }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}

        {/* SETTINGS divider */}
        <div className="px-3 pt-6 pb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Settings</span>
        </div>

        {/* Team expandable */}
        <button
          type="button"
          onClick={() => setTeamExpanded(!teamExpanded)}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isTeamActive ? 'bg-[#334155] text-white' : 'text-gray-300 hover:bg-[#334155] hover:text-white'
            }`}
        >
          <Users className="h-5 w-5" />
          <span className="flex-1 text-left">Team</span>
          {teamExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {teamExpanded && (
          <div className="ml-4 space-y-1 border-l border-[#334155] pl-4">
            {teamSubItems.map((sub) => {
              const Icon = sub.icon;
              const isSubActive = pathname === sub.href || pathname.startsWith(`${sub.href}/`);
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isSubActive
                      ? 'bg-[#334155] text-white'
                      : 'text-gray-400 hover:bg-[#334155] hover:text-white'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {sub.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Other Settings items */}
        <Link
          href="/admin/settings"
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${pathname === '/admin/settings' || pathname.startsWith('/admin/settings/')
              ? 'bg-[#334155] text-white'
              : 'text-gray-300 hover:bg-[#334155] hover:text-white'
            }`}
        >
          <Settings className="h-5 w-5" />
          General
        </Link>
      </nav>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-[#1E293B] px-4 text-white md:hidden">
        <button
          type="button"
          aria-label="Open admin navigation"
          className="rounded-lg p-2 hover:bg-[#334155]"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/admin/products" className="text-lg font-semibold">
          Admin Panel
        </Link>
        <Link href="/admin/team/users/new" className="rounded-full bg-[#3B82F6] px-3 py-1 text-sm font-semibold text-white">
          +
        </Link>
      </header>

      <aside className="fixed inset-y-0 left-0 hidden w-[280px] overflow-y-auto bg-[#1E293B] md:block">
        {sidebarContent}
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close admin navigation overlay"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <aside className="relative h-full w-[280px] overflow-y-auto bg-[#1E293B] shadow-xl">
            <button
              type="button"
              aria-label="Close admin navigation"
              className="absolute right-3 top-3 rounded-lg p-2 text-gray-300 hover:bg-[#334155] hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      ) : null}
    </>
  );
}
