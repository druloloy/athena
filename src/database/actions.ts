import { createClient } from '@/lib/supabase/client';

export async function searchBooksByTitleFromDatabase(query: string) {
  const supabase = createClient();
  return await supabase.from('books').select().ilike('title', `%${query}%`);
}

export async function searchBooksByAuthorFromDatabase(query: string) {
  const supabase = createClient();
  return await supabase.rpc('search_books_by_author_pattern', {
    search_pattern: `%${query}%`,
  });
}

export async function searchBooksByGenreFromDatabase(query: string) {
  const supabase = createClient();
  return await supabase.rpc('search_books_by_subject_pattern', {
    search_pattern: `%${query}%`,
  });
}
