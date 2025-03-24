import { createClient } from '@/lib/supabase/server';
import { LoginForm } from '@components/AdminLoginForm';
import { SideNavigation } from '../_components/SidebarNav';
import { Toaster } from '../_components/atoms/toaster';
import { BooksProvider } from '../_providers/BooksProvider';
import { ThemeBox } from '../_components/ThemeBox';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return (
      <main className="w-full h-screen flex justify-center items-center">
        <LoginForm />
      </main>
    );
  }

  const { data: roleData, error: roleError } = await supabase
    .from('users')
    .select('role')
    .eq('auth_id', data.user.id)
    .single();

  const role = roleData?.role;

  if (role !== 'admin' || roleError) {
    redirect('/');
  }

  return (
    <BooksProvider>
      <div className="fixed right-2 top-2 z-50">
        <ThemeBox />
      </div>
      <SideNavigation>{children}</SideNavigation>
      <Toaster />
    </BooksProvider>
  );
}
