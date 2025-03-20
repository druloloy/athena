import { createClient } from '@/lib/supabase/client';
import { error } from 'console';

export async function removeFromCollection(id: string) {
  const supabase = createClient();
  return await supabase.from('borrowed_books').delete().eq('id', id);
}

export async function acceptRequest(id: string) {
  const supabase = createClient();
  return await supabase.from('borrowed_books').update({ approved: true }).eq('id', id);
}

export async function markAsUnapproved(id: string) {
  const supabase = createClient();
  return await supabase.from('borrowed_books').update({ approved: false }).eq('id', id);
}
