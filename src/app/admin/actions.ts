'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    username: formData.get('username') as string,
    email: '',
    password: formData.get('password') as string,
  };

  const { data: queryResult, error: queryError } = await supabase
    .from('users')
    .select()
    .eq('username', data.username)
    .single();

  if (queryError || !queryResult || queryResult.role !== 'admin') {
    redirect('/error');
  }

  data.email = queryResult.email;

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    redirect('/error');
  }

  redirect('/admin/dashboard');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect('/');
}
