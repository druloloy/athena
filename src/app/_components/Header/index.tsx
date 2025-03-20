import Link from 'next/link';
import React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../atoms/navigation-menu';
import { BookCopy, Home, LogIn, LogOut, Shield } from 'lucide-react';
import { logout } from '@/app/admin/actions';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { SearchBook } from '../SearchBook';
import { Separator } from '../atoms/separator';

export default async function Header() {
  const hideOnEndpoints = ['/admin', '/login', '/signup'];

  const headerList = await headers();
  const pathname = headerList.get('x-current-path');

  // if pathname starts with excluded endpoints return null
  if (hideOnEndpoints.some((endpoint) => pathname?.startsWith(endpoint))) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = user !== null;

  let isAdmin = false;
  if (isLoggedIn) {
    const { data, error } = await supabase.from('users').select('role').eq('auth_id', user.id).single();
    if (error) {
      console.error(error);
    } else {
      isAdmin = data.role === 'admin';
    }
  }

  return (
    <div className="w-full mx-auto">
      <Link href="/">
        <div className="w-full flex flex-col items-center space-x-2 space-y-2">
          <h1 className="uppercase">500 Books of Summer</h1>
          <p>Quench your Thirst for Knowledge</p>
        </div>
      </Link>

      <NavigationMenu className="mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink className="flex flex-row items-center gap-2" href="/">
              <Home />
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {isAdmin && (
              <NavigationMenuLink className="flex flex-row items-center gap-2" href="/admin">
                <Shield />
                Admin Dashboard
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="flex flex-row items-center gap-2" href="/student/borrowed">
              <BookCopy />
              Borrowed Books
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {isLoggedIn ? (
              <NavigationMenuLink className="flex flex-row items-center gap-2" href="/" onClick={logout}>
                <LogOut />
                Logout
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink className="flex flex-row items-center gap-2" href="/login">
                <LogIn />
                Login
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="w-1/2 py-4 mx-auto">
        <SearchBook />
      </div>
      <Separator />
    </div>
  );
}
