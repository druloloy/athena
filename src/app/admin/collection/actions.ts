import { createClient } from '@/lib/supabase/client';

export async function removeFromCollection(id: string) {
  const supabase = createClient();
  return await supabase.from('books').delete().eq('id', id);
}
