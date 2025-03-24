'use client';
import React from 'react';
import { cancelBorrow, getUserBorrowedBooks } from './actions';
import { BorrowedBook, BorrowedBookProps } from '@/app/_components/BorrowedBook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/atoms/tabs';
import Collection from '@/app/_components/Collection';

export default function Page() {
  const [pendingBooks, setPendingBooks] = React.useState<BorrowedBookProps[]>([]);
  const [approvedBooks, setApprovedBooks] = React.useState<BorrowedBookProps[]>([]);

  React.useEffect(() => {
    getUserBorrowedBooks().then((res) => {
      setPendingBooks(res?.filter((book) => !book.approved) as BorrowedBookProps[]);
      setApprovedBooks(res?.filter((book) => book.approved) as BorrowedBookProps[]);
    });
  }, []);

  const cancel = (book: BorrowedBookProps) => {
    cancelBorrow(book.id).then(() => {
      setPendingBooks((prev) => prev.filter((b) => b.id !== book.id));
    });
  };

  return (
    <main className="w-full flex flex-col justify-center px-4 md:px-32 py-8 overflow-x-hidden">
      <h1>Your Borrowed Books</h1>

      <Tabs className="w-full flex justify-center" defaultValue="unapproved">
        <TabsList>
          <TabsTrigger value="unapproved">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="unapproved">
          <Collection dataset={pendingBooks} ItemComponent={PendingBooksWrapper} onCTAClick={cancel} />
        </TabsContent>

        <TabsContent value="approved">
          <Collection dataset={approvedBooks} ItemComponent={ApprovedBooksWrapper} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

const PendingBooksWrapper = ({ ctaFunction, item }: { ctaFunction: () => void; item: BorrowedBookProps }) => {
  return <BorrowedBook item={item} ctaText="Cancel Request" ctaType="destructive" ctaFunction={ctaFunction} />;
};

const ApprovedBooksWrapper = ({ ctaFunction, item }: { ctaFunction: () => void; item: BorrowedBookProps }) => {
  return <BorrowedBook item={item} />;
};
