'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookCopy, BookOpen, LayoutDashboard, LogOut, LucideIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/app/_components/atoms/sidebar';
import { logout } from '@/app/admin/actions';
import { Button } from '../atoms/button';

export interface NavItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Requests',
    href: '/admin/requests',
    icon: BookCopy,
  },
  {
    title: 'Books Collection',
    href: '/admin/collection',
    icon: BookOpen,
  },
];

export function SideNavigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-zinc-200 dark:border-zinc-800">
        <SidebarHeader className="border-b border-zinc-200 dark:border-zinc-800">
          <Button variant="link" className="hover:no-underline" onClick={() => (window.location.href = '/')}>
            <div className="flex h-14 items-center px-4">
              <span className="font-semibold text-zinc-900 dark:text-zinc-50 uppercase">500 Books of Summer</span>
            </div>
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  <Link href={item.href} prefetch>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-zinc-200 dark:border-zinc-800">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                <Button variant={'ghost'} onClick={() => logout()}>
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <div className="w-full flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
          <SidebarTrigger />
          <div className="flex-1" />
        </header>
        <main className="flex-1 p-4">
          <div className="mx-auto max-w-6xl">
            {/* Your page content goes here */}
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
