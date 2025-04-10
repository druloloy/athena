'use client';
import BooksContext from './_providers/BooksProvider/context';
import React from 'react';
import { Book, BookProps } from './_components/Book';
import { ScrollArea, ScrollBar } from './_components/atoms/scroll-area';
import { Separator } from './_components/atoms/separator';
import { Dialog } from './_components/atoms/dialog';
import { BorrowModal } from './_components/BorrowModal';
import { createClient } from '@/lib/supabase/client';
import { getAnnouncements } from './admin/dashboard/actions';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './_components/atoms/carousel';
import Image from 'next/image';
import { Button } from './_components/atoms/button';
import { redirect } from 'next/navigation';

export default function Home() {
  const { books } = React.useContext(BooksContext);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openBorrowModal, setOpenBorrowModal] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<BookProps | null>();
  const [announcements, setAnnouncements] = React.useState<{ name: string; public_url: string }[]>([]);

  React.useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(user !== null);
    });
  }, []);

  React.useEffect(() => {
    getAnnouncements().then((data) => setAnnouncements(data || []));
  }, []);

  const filterRecentlyAdded = books.filter(
    (book) => new Date(book!.created_at as Date) > new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  ); // filter books added 1 day ago

  return (
    <main className="w-full flex flex-col justify-center px-4 md:px-32 py-8 overflow-x-hidden">
      <h2 className="text-center mt-0 text-2xl md:text-4xl">Announcements</h2>
      <div className="w-full py-4">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
            duration: 15,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {announcements.map((announcement) => (
              <CarouselItem key={announcement.name} className="w-full h-full">
                <div className="relative">
                  <Image
                    src={announcement.public_url}
                    alt={announcement.name}
                    width="1000"
                    height="500"
                    className="aspect-[2/1] object-cover rounded-md"
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Separator />
      <div className="flex flex-row justify-center items-center md:justify-center gap-2 p-4">
        <h2 className="text-center md:text-center text-2xl md:text-4xl m-0">Freshly Added Books</h2>
        {/* <Button onClick={() => redirect('/books')} variant="outline">
          See All
        </Button> */}
      </div>
      {filterRecentlyAdded.length > 0 ? (
        <ScrollArea className="w-full mx-auto">
          <Dialog open={openBorrowModal} onOpenChange={setOpenBorrowModal}>
            <div className="flex  md:w-max gap-4 p-4">
              {filterRecentlyAdded.map((book) => (
                <Book
                  item={book}
                  key={book.key}
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center space-x-2 space-y-2">No recently added books.</div>
      )}
    </main>
  );
}
