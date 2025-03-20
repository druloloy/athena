import { Gutter } from '@/app/_components/atoms/gutter';
import { createClient } from '@/lib/supabase/server';
import { LoginForm } from '@components/AdminLoginForm';
import { SideNavigation } from '../_components/SidebarNav';
import { Toaster } from '../_components/atoms/toaster';
import { BooksProvider } from '../_providers/BooksProvider';
import { ThemeBox } from '../_components/ThemeBox';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return (
      <main className="w-full h-screen flex justify-center items-center">
        <Gutter className="w-full">
          <LoginForm />
        </Gutter>
      </main>
    );
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
