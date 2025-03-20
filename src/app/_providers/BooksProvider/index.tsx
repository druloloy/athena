'use client';

import { createClient } from '@/lib/supabase/client';
import React from 'react';
import BooksContext, { BooksContextValue } from './context';
import { BookProps } from '@/app/_components/Book';
import { BorrowedBookProps } from '@/app/_components/BorrowedBook';

export function BooksProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const [books, setBooks] = React.useState<BookProps[]>([]);
  const [borrowedBooks, setBorrowedBooks] = React.useState<BorrowedBookProps[]>([]);
  const [bookVersion, setBookVersion] = React.useState(0);
  const [borrowedBookVersion, setBorrowedBookVersion] = React.useState(0);

  React.useEffect(() => {
    supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ error, data }) => {
        if (error) return;
        setBooks(data);
      });
  }, []);

  React.useEffect(() => {
    supabase
      .from('borrowed_books')
      .select('*,books(*),users(*)')
      .order('created_at', { ascending: false })
      .then(({ error, data }) => {
        if (error) return;
        setBorrowedBooks(data);
      });
  }, []);

  React.useEffect(() => {
    supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ error, data }) => {
        if (error) return;
        setBooks(data);
      });
  }, []);

  React.useEffect(() => {
    supabase
      .from('borrowed_books')
      .select('*,books(*),users(*)')
      .order('created_at', { ascending: false })
      .then(({ error, data }) => {
        if (error) return;
        setBorrowedBooks(data);
      });
  }, []);

  React.useEffect(() => {
    const channel = supabase
      .channel('realtime insert book collection')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'books',
        },
        (payload) => {
          setBooks((prev) => [payload.new as BookProps, ...(prev || [])]);
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const channel = supabase
      .channel('realtime update book collection')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'books',
        },
        (payload) => {
          setBooks((prev) =>
            prev.map((book) => (book.id === (payload.new as BookProps).id ? (payload.new as BookProps) : book))
          );
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const channel = supabase
      .channel('realtime delete book collection')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'books',
        },
        (payload) => {
          setBooks((prev) => prev.filter((book) => book.id !== (payload.old as BookProps).id));
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const channel = supabase
      .channel('realtime delete borrowed book collection')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'borrowed_books',
        },
        (payload) => {
          setBorrowedBooks((prev) => prev.filter((book) => book.id !== (payload.old as BorrowedBookProps).id));
          setBorrowedBookVersion((prev) => prev + 1);
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const channel = supabase
      .channel('realtime update borrowed book collection')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'borrowed_books',
        },
        (payload) => {
          setBorrowedBooks((prev) => prev.filter((book) => book.id !== (payload.old as BorrowedBookProps).id));
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        borrowedBooks,
        setBorrowedBooks,
        bookVersion,
        setBookVersion,
        borrowedBookVersion,
        setBorrowedBookVersion,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
