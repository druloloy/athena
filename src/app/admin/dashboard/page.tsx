'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/_components/atoms/carousel';
import FileUpload from '@/app/_components/FileUpload';
import {
  getAnnouncements,
  getApprovedBorrowedBooksCount,
  getBookCollectionCount,
  getUnapprovedBorrowedBooksCount,
  removeAnnouncement,
  uploadAnnouncement,
} from './actions';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/app/_components/atoms/button';
import { ChevronRight, Eye, X } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const [announcements, setAnnouncements] = React.useState<{ name: string; public_url: string }[]>([]);
  const [showFileUpload, setShowFileUpload] = React.useState(false);
  const [totalBooksCount, setTotalBooksCount] = React.useState(0);
  const [totalPendingRequests, setTotalPendingRequests] = React.useState(0);
  const [totalApprovedRequests, setTotalApprovedRequests] = React.useState(0);

  getAnnouncements().then((data) => setAnnouncements(data || []));

  function handleUpload(file: File) {
    uploadAnnouncement(file).then(({ error }) => {
      if (error) {
        console.error(error);
      }
      getAnnouncements().then((data) => setAnnouncements(data || []));
    });
  }

  function viewPhoto(title: string) {
    window.open(title, '_blank');
  }

  function deleteAnnouncement(title: string) {
    removeAnnouncement(title).then(({ error }) => {
      if (error) {
        console.error(error);
      }
      getAnnouncements().then((data) => setAnnouncements(data || []));
    });
  }

  useEffect(() => {
    getBookCollectionCount().then(({ count }) => {
      setTotalBooksCount(count || 0);
    });

    getApprovedBorrowedBooksCount().then(({ count }) => {
      setTotalApprovedRequests(count || 0);
    });

    getUnapprovedBorrowedBooksCount().then(({ count }) => {
      setTotalPendingRequests(count || 0);
    });
  }, []);

  return (
    <main className="w-full grid grid-cols-2 gap-4">
      <div className="w-full">
        <h1 className="text-4xl font-bold m-0">Welcome to the Admin Dashboard</h1>
        <p>Here you can manage your announcements and other features.</p>

        <Link href="/admin/collection" prefetch>
          <div className="mt-4 border rounded-md p-4 flex flex-row items-center justify-between" role="button">
            <p className="text-xl font-bold">Total Books Uploaded</p>
            <div className="flex flex-row items-center gap-2">
              <p className="text-xl font-bold">{totalBooksCount}</p>
              <ChevronRight />
            </div>
          </div>
        </Link>

        <Link href="/admin/requests" prefetch>
          <div className="mt-4 border rounded-md p-4 flex flex-row items-center justify-between" role="button">
            <p className="text-xl font-bold">Pending Book Requests</p>
            <div className="flex flex-row items-center gap-2">
              <p className="text-xl font-bold">{totalPendingRequests}</p>
              <ChevronRight />
            </div>
          </div>
        </Link>

        <Link href="/admin/requests" prefetch>
          <div className="mt-4 border rounded-md p-4 flex flex-row items-center justify-between" role="button">
            <p className="text-xl font-bold">Approved Book Requests</p>
            <div className="flex flex-row items-center gap-2">
              <p className="text-xl font-bold">{totalApprovedRequests}</p>
              <ChevronRight />
            </div>
          </div>
        </Link>
      </div>
      <div className="border rounded-md p-4">
        <div className="flex flex-row items-center justify-between">
          <h3>Announcements</h3>
          <Button onClick={() => setShowFileUpload(true)}>Upload</Button>
        </div>
        {showFileUpload && <FileUpload handleUpload={handleUpload} setShowFileUpload={setShowFileUpload} />}
        {!showFileUpload && announcements.length > 0 && (
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-sm mx-auto"
          >
            <CarouselContent>
              {announcements.map((announcement) => (
                <CarouselItem key={announcement.name} className="relative">
                  <div className="absolute top-2 right-2 flex flex-row items-center gap-2">
                    <Button onClick={() => viewPhoto(announcement.public_url)} variant="ghost">
                      <Eye /> View
                    </Button>
                    <Button onClick={() => deleteAnnouncement(announcement.name)} variant="ghost">
                      <X /> Delete
                    </Button>
                  </div>
                  <Image
                    src={announcement.public_url}
                    alt={announcement.name}
                    className="w-full h-full object-contain"
                    width={500}
                    height={500}
                    priority
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </main>
  );
}
