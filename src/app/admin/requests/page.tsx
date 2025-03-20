'use client';

import { Button } from '@/app/_components/atoms/button';
import React from 'react';
import { acceptRequest, markAsUnapproved, removeFromCollection } from './actions';
import { createClient } from '@/lib/supabase/client';
import BooksContext from '@/app/_providers/BooksProvider/context';
import { BorrowedBook, BorrowedBookProps } from '@/app/_components/BorrowedBook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/atoms/tabs';
import { LucideRotateCw } from 'lucide-react';

function UnapprovedRequests({
  collection,
  setCollection,
}: {
  collection: BorrowedBookProps[];
  setCollection: React.Dispatch<React.SetStateAction<BorrowedBookProps[]>>;
}) {
  const approve = (id: string) => {
    acceptRequest(id).then(() => {
      setCollection((prev) => prev.filter((book) => book.id !== id));
    });
  };

  const decline = (id: string) => {
    removeFromCollection(id).then(() => {
      setCollection((prev) => prev.filter((book) => book.id !== id));
    });
  };

  return (
    <div className="">
      <div className="py-8 gap-4 flex flex-wrap">
        {collection &&
          collection.map((book) => (
            <BorrowedBook
              key={book.id}
              {...book}
              size="md"
              ctaText="Approve Request"
              ctaType="default"
              ctaFunction={() => approve(book!.id as string)}
              ctaFunction2={() => decline(book!.id as string)}
              ctaText2="Decline Request"
              ctaType2="ghost"
            />
          ))}

        {!collection ||
          (collection.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-center text-2xl">No unapproved books yet.</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

function ApprovedRequests({
  collection,
  setCollection,
}: {
  collection: BorrowedBookProps[];
  setCollection: React.Dispatch<React.SetStateAction<BorrowedBookProps[]>>;
}) {
  const unapprove = (id: string) => {
    markAsUnapproved(id).then(() => {
      setCollection((prev) => prev.filter((book) => book.id !== id));
    });
  };

  const returned = (id: string) => {
    removeFromCollection(id).then(() => {
      setCollection((prev) => prev.filter((book) => book.id !== id));
    });
  };

  return (
    <div className="">
      <div className="py-8 gap-4 flex flex-wrap">
        {collection &&
          collection.map((book) => (
            <BorrowedBook
              key={book.id}
              {...book}
              size="md"
              ctaText="Mark as returned"
              ctaType="destructive"
              ctaFunction={() => returned(book!.id as string)}
              ctaFunction2={() => unapprove(book!.id as string)}
              ctaText2="Unapprove Request"
              ctaType2="ghost"
            />
          ))}

        {!collection ||
          (collection.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-center text-2xl">No approved books yet.</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function Page() {
  const supabase = createClient();
  const { borrowedBooks } = React.useContext(BooksContext);
  const [refreshingCollection, setRefreshingCollection] = React.useState(false);
  const [unapprovedBooks, setUnapprovedBooks] = React.useState<BorrowedBookProps[]>([]);
  const [approvedBooks, setApprovedBooks] = React.useState<BorrowedBookProps[]>([]);

  const refreshCollection = React.useCallback(() => {
    setRefreshingCollection(true);
    setTimeout(() => {
      supabase
        .from('borrowed_books')
        .select('*,books(*),users(*)')
        .order('created_at', { ascending: false })
        .then(({ error, data }) => {
          setUnapprovedBooks(data?.filter((book) => !book.approved) as BorrowedBookProps[]);
          setApprovedBooks(data?.filter((book) => book.approved) as BorrowedBookProps[]);
        });
      setRefreshingCollection(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    setUnapprovedBooks(borrowedBooks.filter((book) => !book.approved));
    setApprovedBooks(borrowedBooks.filter((book) => book.approved));
  }, [borrowedBooks]);

  return (
    <Tabs className="w-full flex justify-center" defaultValue="unapproved">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="unapproved">Unapproved Requests</TabsTrigger>
        <TabsTrigger value="approved">Approved Requests</TabsTrigger>
      </TabsList>

      <div className="flex flex-row items-center space-x-2">
        <h2>Borrowed Books</h2>
        {/* <AddBookModal /> */}
      </div>

      <div className="">
        <Button onClick={refreshCollection} variant="ghost" className="mt-4">
          <LucideRotateCw /> {refreshingCollection ? 'Refreshing...' : 'Refresh Collection'}
        </Button>
      </div>

      <TabsContent value="unapproved">
        <UnapprovedRequests collection={unapprovedBooks} setCollection={setUnapprovedBooks} />
      </TabsContent>
      <TabsContent value="approved">
        <ApprovedRequests collection={approvedBooks} setCollection={setApprovedBooks} />
      </TabsContent>
    </Tabs>
  );
}
