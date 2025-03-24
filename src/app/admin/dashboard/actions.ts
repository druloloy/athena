import { createClient } from '@/lib/supabase/client';
import { secure } from '@/lib/supabase/secure';

export async function getAnnouncements() {
  const supabase = createClient();

  return await supabase.storage
    .from('athena')
    .list('announcements', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
    .then((res) => res.data?.map((file) => file.name))
    .then(async (res) => {
      return res?.map((file) => {
        return {
          name: file,
          public_url: supabase.storage.from('athena').getPublicUrl('announcements/' + file).data.publicUrl,
        };
      });
    });
}

export async function uploadAnnouncement(file: File) {
  secure();
  const supabase = createClient();
  return await supabase.storage.from('athena').upload('announcements/' + file.name, file, {
    cacheControl: '3600',
    upsert: false,
  });
}

export async function removeAnnouncement(file: string) {
  secure();
  const supabase = createClient();
  const { error } = await supabase.storage.from('athena').remove(['announcements/' + file]);

  return { error };
}

export async function getBookCollectionCount() {
  const supabase = createClient();
  return await supabase.from('books').select('*', { count: 'exact', head: true });
}

export async function getApprovedBorrowedBooksCount() {
  const supabase = createClient();
  return await supabase.from('borrowed_books').select('*', { count: 'exact', head: true }).eq('approved', true);
}

export async function getUnapprovedBorrowedBooksCount() {
  const supabase = createClient();
  return await supabase.from('borrowed_books').select('*', { count: 'exact', head: true }).eq('approved', false);
}
