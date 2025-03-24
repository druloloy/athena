'use server';

import { createClient } from '@/lib/supabase/client';
import { secure } from '@/lib/supabase/secure';

export async function removeFromCollection(id: string) {
  secure();
  const supabase = createClient();
  return await supabase.from('borrowed_books').delete().eq('id', id);
}

export async function acceptRequest(id: string) {
  secure();
  const supabase = createClient();
  return await supabase.from('borrowed_books').update({ approved: true }).eq('id', id);
}

export async function markAsUnapproved(id: string) {
  secure();
  const supabase = createClient();
  return await supabase.from('borrowed_books').update({ approved: false }).eq('id', id);
}
