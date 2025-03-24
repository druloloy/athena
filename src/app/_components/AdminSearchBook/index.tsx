'use client';

import React from 'react';
import { Button } from '../atoms/button';
import { Input } from '../atoms/input';
import { ComboBox } from '../ComboBox';
import { BookProps } from '../Book';
import { searchBooksByAuthor, searchBooksByGenre, searchBooksByTitle } from '@/lib/openlib/search';
import {
  searchBooksByAuthorFromDatabase,
  searchBooksByGenreFromDatabase,
  searchBooksByTitleFromDatabase,
} from '@/database/actions';

export function AdminSearchBook({
  setResults,
  searchFrom,
}: {
  setResults: React.Dispatch<React.SetStateAction<BookProps[] | undefined>> | ((results: BookProps[]) => void);
  searchFrom: 'openlibrary' | 'db';
}) {
  const [queryType, setQueryType] = React.useState('title');
  const [query, setQuery] = React.useState('');

  const search = () => {
    if (!query) return;

    if (searchFrom === 'openlibrary') {
      if (queryType === 'title') {
        searchBooksByTitle(query).then((results) => {
          if (!results || results.length === 0) return setResults([]);
          setResults(results);
        });
      }

      if (queryType === 'author') {
        searchBooksByAuthor(query).then((results) => {
          if (!results || results.length === 0) return setResults([]);
          setResults(results);
        });
      }

      if (queryType === 'genre') {
        searchBooksByGenre(query).then((results) => {
          if (!results || results.length === 0) return setResults([]);
          setResults(results);
        });
      }
    }

    if (searchFrom === 'db') {
      if (queryType === 'title') {
        searchBooksByTitleFromDatabase(query).then(({ data }) => {
          if (!data || data.length === 0) return setResults([]);
          setResults(data);
        });
      }

      if (queryType === 'author') {
        searchBooksByAuthorFromDatabase(query).then(({ data }) => {
          if (!data || data.length === 0) return setResults([]);
          setResults(data);
        });
      }

      if (queryType === 'genre') {
        searchBooksByGenreFromDatabase(query).then(({ data }) => {
          if (!data || data.length === 0) return setResults([]);
          setResults(data);
        });
      }
    }
  };

  return (
    <div className="w-full p-4">
      <div className="w-full flex-row flex flex-wrap md:flex-nowrap items-center justify-between gap-2">
        <div className="w-full flex-row flex items-center justify-between gap-2">
          <ComboBox setValue={setQueryType} />
          <Input className="text-sm md:text-base" onChange={(e) => setQuery(e.target.value)} placeholder="What book?" />
        </div>
        <Button className="w-full md:w-auto" variant="default" onClick={search}>
          Search
        </Button>
      </div>
    </div>
  );
}
