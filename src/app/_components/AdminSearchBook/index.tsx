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
        searchBooksByTitleFromDatabase(query).then(({ data, error }) => {
          if (!data || data.length === 0) return setResults([]);
          setResults(data);
        });
      }

      if (queryType === 'author') {
        searchBooksByAuthorFromDatabase(query).then(({ data, error }) => {
          if (!data || data.length === 0) return setResults([]);
          setResults(data);
        });
      }

      if (queryType === 'genre') {
        searchBooksByGenreFromDatabase(query).then(({ data, error }) => {
          if (!data || data.length === 0) return setResults([]);
          setResults(data);
        });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center space-x-2">
        <ComboBox setValue={setQueryType} />
        <Input onChange={(e) => setQuery(e.target.value)} placeholder="Search for a book..." />
        <Button className="btn btn-primary" onClick={search}>
          Search
        </Button>
      </div>
    </div>
  );
}
