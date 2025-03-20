'use client';
import React from 'react';
import { Book, BookProps } from '../_components/Book';
import { BorrowModal } from '../_components/BorrowModal';
import { Dialog } from '../_components/atoms/dialog';

export default function SearchResults({ results, isLoggedIn }: { results: BookProps[]; isLoggedIn: boolean }) {
  const [openBorrowModal, setOpenBorrowModal] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<BookProps | null>();

  return (
    <Dialog open={openBorrowModal} onOpenChange={setOpenBorrowModal}>
      <div className="flex flex-row flex-wrap gap-4 p-4">
        {results.length > 0 &&
          results.map((book) => (
            <Book
              {...book}
              key={book.key}
              size="sm"
              ctaText="Borrow this book"
              ctaType="default"
              ctaFunction={() => {
                if (!isLoggedIn) {
                  window.location.href = '/login';
                }
                setOpenBorrowModal(true);
                setSelectedBook(book);
              }}
            />
          ))}
      </div>
      <BorrowModal book={selectedBook as BookProps} setOpenBorrowModal={setOpenBorrowModal} />
    </Dialog>
  );
}
