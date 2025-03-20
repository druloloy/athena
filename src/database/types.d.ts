export interface IBook {
  id: string;
  title: string;
  author_name: string[];
  subject: string[];
  cover_edition_key: string;
  key: string;
  created_at: Date;
}

export interface IBorrowedBook {
  id: string;
  borrower_id: string;
  book_id: string;
  approved: boolean;
  borrow_on: Date;
  created_at: Date;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: Date;
}
