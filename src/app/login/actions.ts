'use server';

import { revalidatePath } from 'next/cache';
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

  if (queryError || !queryResult) {
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

  revalidatePath('/', 'layout');
  redirect('/student');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: authData, error: authError } = await supabase.auth.signUp(data);

  const { error: queryError } = await supabase
    .from('users')
    .insert({
      username: data.username,
      email: data.email,
      role: 'user',
      auth_id: authData?.user?.id,
    })
    .select();

  if (authError || queryError) {
    redirect('/error');
  }

  redirect('/confirmEmail');
}
