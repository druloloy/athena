import { createClient } from '@/lib/supabase/client';

export async function getUserBorrowedBooks() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const {
    data: { id },
  }: any = await supabase.from('users').select('id').eq('auth_id', user.id).single();

  const { data, error } = await supabase
    .from('borrowed_books')
    .select('*, books(*), users(*)')
    .eq('borrower_id', id as string);

  return data;
}

export async function cancelBorrow(book_id: string) {
  const supabase = createClient();
  return await supabase.from('borrowed_books').delete().eq('id', book_id);
}
