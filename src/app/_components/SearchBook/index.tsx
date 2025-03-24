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
