'use client';

import React from 'react';
import { acceptRequest, markAsUnapproved, removeFromCollection } from './actions';
import BooksContext from '@/app/_providers/BooksProvider/context';
import { BorrowedBook, BorrowedBookProps } from '@/app/_components/BorrowedBook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/atoms/tabs';
import Collection from '@/app/_components/Collection';

function UnapprovedRequests({
  collection,
  setCollection,
  refresh,
}: {
  collection: BorrowedBookProps[];
  setCollection: React.Dispatch<React.SetStateAction<BorrowedBookProps[]>>;
  refresh: () => void;
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
    <Collection
      dataset={collection}
      ItemComponent={UnapprovedBorrowedBookWrapper}
      onCTAClick={(book) => approve(book!.id as string)}
      onCTAClick2={(book) => decline(book!.id as string)}
      onRefresh={refresh}
      includeRefresh
    />
  );
}

function ApprovedRequests({
  collection,
  setCollection,
  refresh,
}: {
  collection: BorrowedBookProps[];
  setCollection: React.Dispatch<React.SetStateAction<BorrowedBookProps[]>>;
  refresh: () => void;
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
    <Collection
      dataset={collection}
      ItemComponent={ApprovedBorrowedBookWrapper}
      onCTAClick={(book) => returned(book!.id as string)}
      onCTAClick2={(book) => unapprove(book!.id as string)}
      onRefresh={refresh}
      includeRefresh
    />
  );
}

export default function Page() {
  const { borrowedBooks, fetchBorrowedBooks } = React.useContext(BooksContext);
  const [unapprovedBooks, setUnapprovedBooks] = React.useState<BorrowedBookProps[]>([]);
  const [approvedBooks, setApprovedBooks] = React.useState<BorrowedBookProps[]>([]);

  React.useEffect(() => {
    setUnapprovedBooks(borrowedBooks.filter((book) => !book.approved));
    setApprovedBooks(borrowedBooks.filter((book) => book.approved));
  }, [borrowedBooks]);

  const refresh = () => {
    fetchBorrowedBooks();
  };

  return (
    <main className="w-full flex flex-col justify-center">
      <div className="flex flex-row items-center space-x-2">
        <h2>Borrowed Books</h2>
      </div>
      <Tabs className="w-full flex justify-center" defaultValue="unapproved">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="unapproved">Unapproved Requests</TabsTrigger>
          <TabsTrigger value="approved">Approved Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="unapproved">
          <UnapprovedRequests collection={unapprovedBooks} setCollection={setUnapprovedBooks} refresh={refresh} />
        </TabsContent>
        <TabsContent value="approved">
          <ApprovedRequests collection={approvedBooks} setCollection={setApprovedBooks} refresh={refresh} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

const UnapprovedBorrowedBookWrapper = ({
  item,
  ctaFunction,
  ctaFunction2,
}: {
  item: BorrowedBookProps;
  ctaFunction: () => void;
  ctaFunction2: () => void;
}) => {
  return (
    <BorrowedBook
      item={item}
      ctaText="Approve Request"
      ctaType="default"
      ctaFunction={ctaFunction}
      ctaFunction2={ctaFunction2}
      ctaText2="Decline Request"
      ctaType2="ghost"
    />
  );
};

const ApprovedBorrowedBookWrapper = ({
  item,
  ctaFunction,
  ctaFunction2,
}: {
  item: BorrowedBookProps;
  ctaFunction: () => void;
  ctaFunction2: () => void;
}) => {
  return (
    <BorrowedBook
      item={item}
      ctaText="Mark as returned"
      ctaType="destructive"
      ctaFunction={ctaFunction}
      ctaFunction2={ctaFunction2}
      ctaText2="Unapprove Request"
      ctaType2="ghost"
    />
  );
};
