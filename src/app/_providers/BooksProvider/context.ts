import { BookProps } from '@/app/_components/Book';
import { BorrowedBookProps } from '@/app/_components/BorrowedBook';
import { createContext } from 'react';

export interface BooksContextValue {
  books: BookProps[];
  setBooks: (books: BookProps[]) => void;
  borrowedBooks: BorrowedBookProps[];
  setBorrowedBooks: (books: BorrowedBookProps[]) => void;
  bookVersion: number;
  setBookVersion: (version: number) => void;
  borrowedBookVersion: number;
  setBorrowedBookVersion: (version: number) => void;
  fetchBooks: () => void;
  fetchBorrowedBooks: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const BooksContext = createContext<BooksContextValue>({} as BooksContextValue);

export default BooksContext;
