'use client';

import { AddBookModal } from '@/app/_components/AddBookModal';
import { AdminSearchBook } from '@/app/_components/AdminSearchBook';
import { Button } from '@/app/_components/atoms/button';
import { Dialog, DialogTrigger } from '@/app/_components/atoms/dialog';
import { Gutter } from '@/app/_components/atoms/gutter';
import { Book, BookProps } from '@/app/_components/Book';
import React from 'react';
import { removeFromCollection } from './actions';
import BooksContext from '@/app/_providers/BooksProvider/context';
import { toast } from '@/app/_hooks/use-toast';
import { LucideRotateCw } from 'lucide-react';

export default function Page() {
  const { books } = React.useContext(BooksContext);
  const [refreshingCollection, setRefreshingCollection] = React.useState(false);
  const [results, setResults] = React.useState<BookProps[]>([]);

  function refreshCollection() {
    setRefreshingCollection(true);
    setTimeout(() => {
      setRefreshingCollection(false);
    }, 2000);
    setResults(books);
  }

  React.useEffect(() => {
    setResults(books);
  }, [books]);

  return (
    <div className="w-full h-screen flex justify-center">
      <Gutter>
        <div>
          <Dialog>
            <div className="px-4">
              <div className="flex flex-row items-center space-x-2">
                <h2>Book Collection</h2>
                <DialogTrigger asChild>
                  <Button variant="outline" className="btn btn-primary">
                    Add Book
                  </Button>
                </DialogTrigger>
                <AddBookModal setCollection={setResults} />
              </div>
              <AdminSearchBook searchFrom="db" setResults={setResults} />
            </div>
          </Dialog>

          <div className="px-4 mt-4">
            <Button onClick={refreshCollection} variant="ghost" className="mt-4">
              <LucideRotateCw /> {refreshingCollection ? 'Refreshing...' : 'Refresh Collection'}
            </Button>
          </div>

          <div className="gap-4 flex flex-wrap">
            {results &&
              results.map((book) => (
                <Book
                  {...book}
                  key={book!.id || ''}
                  size="md"
                  ctaText="Remove this book"
                  ctaType="destructive"
                  ctaFunction={() => {
                    removeFromCollection(book!.id || '').then((res) => {
                      setResults(results?.filter((b) => b.id !== book!.id));

                      toast({
                        title: 'Success',
                        description: book.title + ' is removed from collection',
                      });
                    });
                  }}
                />
              ))}

            {results && results.length === 0 && (
              <div>
                <h2 className="text-center text-2xl">No books found.</h2>
              </div>
            )}
          </div>
        </div>
      </Gutter>
    </div>
  );
}
