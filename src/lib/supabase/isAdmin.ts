import { createClient } from './server';

export async function isAdmin(id: string) {
  const supabase = await createClient();

  const { data: user } = await supabase.from('users').select('auth_id,role').eq('auth_id', id).single();

  return user?.role === 'admin';
}
