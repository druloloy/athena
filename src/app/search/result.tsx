'use client';
import React from 'react';
import { Book, BookProps } from '../_components/Book';
import { BorrowModal } from '../_components/BorrowModal';
import { Dialog } from '../_components/atoms/dialog';
import Collection from '../_components/Collection';

export default function SearchResults({ results, isLoggedIn }: { results: BookProps[]; isLoggedIn: boolean }) {
  const [openBorrowModal, setOpenBorrowModal] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<BookProps | null>();

  function handleCTAClick(book: BookProps) {
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
    setOpenBorrowModal(true);
    setSelectedBook(book);
  }

  return (
    <Dialog open={openBorrowModal} onOpenChange={setOpenBorrowModal}>
      <Collection dataset={results} ItemComponent={BookWrapper} onCTAClick={handleCTAClick} />
      <BorrowModal book={selectedBook as BookProps} setOpenBorrowModal={setOpenBorrowModal} />
    </Dialog>
  );
}

const BookWrapper = ({ item, ctaFunction }: { item: BookProps; ctaFunction: () => void }) => {
  return <Book item={item} ctaFunction={ctaFunction} ctaText="Borrow this book" ctaType="default" />;
};
