import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const body = await request.json();

  const data = {
    username: body.username,
    email: body.email,
    password: body.password,
  };

  const { data: authData, error: authError } = await supabase.auth.signUp(data);

  if (authError && authError.code === 'weak_password') {
    return Response.json({ error: 'Password must be at least 6 characters long' });
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

  if (queryError && queryError.code === '23503') {
    return Response.json({ error: 'User already exists.' });
  }

  return Response.json({ data: queryResult });
}
