import {
  searchBooksByAuthorFromDatabase,
  searchBooksByGenreFromDatabase,
  searchBooksByTitleFromDatabase,
} from '@/database/actions';
import { BookProps } from '../_components/Book';
import SearchResults from './result';
import { createClient } from '@/lib/supabase/server';

const search = async (query: string, query_type: string) => {
  'use server';
  if (!query) return [];

  if (query_type === 'title') {
    return searchBooksByTitleFromDatabase(query).then(({ data }) => {
      if (!data || data.length === 0) return [];
      return data;
    });
  }

  if (query_type === 'author') {
    return searchBooksByAuthorFromDatabase(query).then(({ data }) => {
      if (!data || data.length === 0) return [];
      return data;
    });
  }

  if (query_type === 'genre') {
    return searchBooksByGenreFromDatabase(query).then(({ data }) => {
      if (!data || data.length === 0) return [];
      return data;
    });
  }

  return [];
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
    query_type: string;
  }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = user !== null;

  const { query, query_type } = await searchParams;
  const results: BookProps[] = await search(query, query_type);

  return (
    results && (
      <main className="w-full">
        <h2 className="text-center">
          Found {results.length} books for {query_type}: &quot;{query}&quot;.
        </h2>

        <SearchResults results={results} isLoggedIn={isLoggedIn} />
      </main>
    )
  );
}
