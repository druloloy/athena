import { Button } from '@components/atoms/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@components/atoms/dialog';
import { Label } from '@components/atoms/label';
import { DatePicker } from '../DatePicker';
import React from 'react';
import { BookProps } from '../Book';
import { toast } from '@/app/_hooks/use-toast';

export function BorrowModal({
  book,
  setOpenBorrowModal,
}: {
  book: BookProps;
  setOpenBorrowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

  const sendBorrowRequest = () => {
    if (!selectedDate) {
      toast({
        title: 'Please select a date',
        description: 'You must select a date to borrow this book.',
        variant: 'destructive',
      });
    }

    fetch('/api/borrow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_id: book.id,
        date: selectedDate,
      }),
    })
      .then((res) => res.json())
      .then(({ error }) => {
        if (error) {
          return toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
          });
        }
        toast({
          title: 'Success',
          description: "You've successfully borrowed " + book.title + '!',
        });
      });

    setSelectedDate(undefined);
    setOpenBorrowModal(false);
  };

  return (
    book && (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow a Book</DialogTitle>
          <DialogDescription className="leading-tight">
            You are requesting to borrow{' '}
            <strong>
              {book.title} by{' '}
              {book.author_name.length > 3
                ? book.author_name.slice(0, 3).join(', ') + ', etc.'
                : book.author_name.join(', ')}
            </strong>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col justify-center gap-2">
          <Label htmlFor="date">When would you like to borrow this book?</Label>
          <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <DialogFooter>
          <Button onClick={sendBorrowRequest}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    )
  );
}
