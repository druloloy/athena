'use client';

import React from 'react';
import { Button } from '../atoms/button';
import { Input } from '../atoms/input';
import { ComboBox } from '../ComboBox';
import { redirect } from 'next/navigation';

export function SearchBook() {
  const [queryType, setQueryType] = React.useState('title');
  const [query, setQuery] = React.useState('');

  const search = () => {
    redirect(`/search?query=${encodeURIComponent(query)}&query_type=${queryType}`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center space-x-2">
        <ComboBox setValue={setQueryType} />
        <Input onChange={(e) => setQuery(e.target.value)} placeholder="What book are you looking for?" />
        <Button className="btn btn-primary" onClick={search}>
          Search
        </Button>
      </div>
    </div>
  );
}
