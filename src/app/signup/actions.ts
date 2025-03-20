'use server';

import { createClient } from '@/lib/supabase/server';

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

  if (authError && authError.code === 'weak_password') {
    return { error: 'Password must be at least 6 characters long' };
  }

  const { data: queryResult, error: queryError } = await supabase
    .from('users')
    .insert({
      username: data.username,
      email: data.email,
      role: 'user',
      auth_id: authData?.user?.id,
    })
    .select();

  if (queryError) {
    return { error: 'An error occurred' };
  }

  // redirect('/confirmEmail');
}
