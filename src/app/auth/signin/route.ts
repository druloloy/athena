import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const body = await request.json();

  const data = {
    username: body.username,
    email: '',
    password: body.password,
  };

  const { data: queryResult, error: queryError } = await supabase
    .from('users')
    .select()
    .eq('username', data.username)
    .single();

  if (queryError && queryError.code === 'PGRST116') {
    return Response.json({ error: 'Invalid Credentials.' });
  }

  data.email = queryResult.email;

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (authError && authError.code === 'invalid_password') {
    return Response.json({ error: 'Invalid Credentials.' });
  }

  return Response.json({ message: 'success' });
}
