'use client';
import React from 'react';
import { cancelBorrow, getUserBorrowedBooks } from './actions';
import { BorrowedBook, BorrowedBookProps } from '@/app/_components/BorrowedBook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/atoms/tabs';

export default function Page() {
  const [pendingBooks, setPendingBooks] = React.useState<BorrowedBookProps[]>([]);
  const [approvedBooks, setApprovedBooks] = React.useState<BorrowedBookProps[]>([]);

  React.useEffect(() => {
    getUserBorrowedBooks().then((res) => {
      setPendingBooks(res?.filter((book) => !book.approved) as BorrowedBookProps[]);
      setApprovedBooks(res?.filter((book) => book.approved) as BorrowedBookProps[]);
    });
  }, []);

  const cancel = (id: string) => {
    cancelBorrow(id).then(() => {
      setPendingBooks((prev) => prev.filter((book) => book.id !== id));
    });
  };

  return (
    <main className="w-full flex flex-col justify-center px-32 py-8">
      <h1>Your Borrowed Books</h1>

      <Tabs className="w-full flex justify-center" defaultValue="unapproved">
        <TabsList>
          <TabsTrigger value="unapproved">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="unapproved">
          <div className="gap-4 flex flex-wrap">
            {pendingBooks &&
              pendingBooks.map((book) => (
                <BorrowedBook
                  {...book}
                  key={book!.id || ''}
                  size="md"
                  ctaText="Cancel Request"
                  ctaType="destructive"
                  ctaFunction={() => cancel(book.id!)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="gap-4 flex flex-wrap">
            {approvedBooks && approvedBooks.map((book) => <BorrowedBook {...book} key={book!.id || ''} size="md" />)}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
