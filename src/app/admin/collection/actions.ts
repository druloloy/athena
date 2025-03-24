'use server';
import { createClient } from '@/lib/supabase/server';
import { secure } from '@/lib/supabase/secure';

export async function removeFromCollection(id: string) {
  secure();
  const supabase = await createClient();
  return await supabase.from('books').delete().eq('id', id);
}
