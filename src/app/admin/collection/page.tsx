'use client';

import { AddBookModal } from '@/app/_components/AddBookModal';
import { AdminSearchBook } from '@/app/_components/AdminSearchBook';
import { Button } from '@/app/_components/atoms/button';
import { Dialog, DialogTrigger } from '@/app/_components/atoms/dialog';
import { Book, BookProps } from '@/app/_components/Book';
import React from 'react';
import { removeFromCollection } from './actions';
import BooksContext from '@/app/_providers/BooksProvider/context';
import { toast } from '@/app/_hooks/use-toast';
import Collection from '@/app/_components/Collection';

export default function Page() {
  const { books, fetchBooks } = React.useContext(BooksContext);
  const [results, setResults] = React.useState<BookProps[]>([]);

  function refreshCollection() {
    fetchBooks();
    console.log(books.length);
  }

  function removeBook(book: BookProps) {
    removeFromCollection(book!.id as string).then(() => {
      setResults((prev) => prev.filter((b) => b.key !== book.key));
      toast({
        title: 'Success',
        description: book.title + ' is removed from collection',
      });
    });
  }

  React.useEffect(() => {
    setResults(books);
  }, [books]);

  return (
    <main className="w-full flex flex-col justify-center">
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

      <Collection
        dataset={results}
        includeRefresh
        onRefresh={refreshCollection}
        ItemComponent={BookWrapper}
        onCTAClick={removeBook}
      />
    </main>
  );
}

const BookWrapper = ({ item, ctaFunction }: { item: BookProps; ctaFunction: () => void }) => {
  return <Book item={item} ctaFunction={ctaFunction} ctaText="Remove Book" ctaType="destructive" />;
};
