'use server';
import { createClient } from '@/lib/supabase/client';
import { BookProps } from '../Book';

export async function addToCollection(book: BookProps) {
  const supabase = createClient();

  return await supabase
    .from('books')
    .insert({
      title: book.title,
      author_name: book.author_name,
      subject: book.subject,
      cover_edition_key: book.cover_edition_key,
      key: book.key,
    })
    .select();
}
