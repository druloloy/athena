import React from 'react';
import { AdminSearchBook } from '../AdminSearchBook';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../atoms/dialog';
import { ScrollArea, ScrollBar } from '../atoms/scroll-area';
import { Book, BookProps } from '../Book';
import { addToCollection } from './action';
import { toast } from '@/app/_hooks/use-toast';
import BooksContext from '@/app/_providers/BooksProvider/context';
import Collection from '../Collection';

export function AddBookModal({ setCollection }: { setCollection: React.Dispatch<React.SetStateAction<BookProps[]>> }) {
  const { books } = React.useContext(BooksContext);

  const [_results, _setResults] = React.useState<BookProps[]>([]);

  function setResults(results: BookProps[]) {
    // filter out books that are already in the collection
    const booksKeys = books.map((book) => book.key);
    _setResults(results.filter((book) => !booksKeys.includes(book.key)));
  }

  function addbook(book: BookProps) {
    addToCollection(book).then(() => {
      toast({
        title: 'Success',
        description: book.title + ' is added to collection',
      });
    });

    setCollection((prev) => [book, ...prev]);
  }

  return (
    <DialogContent className="h-screen md:h-2/3">
      <DialogHeader>
        <DialogTitle>Add Books</DialogTitle>
        <DialogDescription>Search and select a book to add.</DialogDescription>
        <AdminSearchBook searchFrom="openlibrary" setResults={setResults} />
      </DialogHeader>
      {_results && _results.length > 0 && (
        <div className="flex flex-row items-center space-x-2">
          <p>Found {_results.length} results.</p>
        </div>
      )}
      <ScrollArea className="p-4 overflow-y-auto">
        <Collection
          dataset={_results}
          ItemComponent={BookWrapper}
          onCTAClick={(item) => addbook(item)}
          showEmptyMessage={false}
        />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </DialogContent>
  );
}

const BookWrapper = ({ item, ctaFunction }: { item: BookProps; ctaFunction: () => void }) => {
  return <Book item={item} ctaFunction={ctaFunction} ctaText="Add Book" ctaType="default" />;
};
