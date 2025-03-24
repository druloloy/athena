import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../atoms/card';
import { Button } from '../atoms/button';
import { IUser, IBorrowedBook, IBook } from '@/database/types';

export interface BorrowedBookProps extends IBorrowedBook {
  users: IUser;
  books: IBook;
}

export interface BorrowedBookComponentProps {
  item: BorrowedBookProps;
  ctaText?: string;
  ctaType?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  ctaFunction?: () => void;
  ctaText2?: string;
  ctaType2?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  ctaFunction2?: () => void;
}

export function BorrowedBook({
  item,
  ctaText,
  ctaType = 'default',
  ctaFunction = () => {},
  ctaText2,
  ctaType2 = 'default',
  ctaFunction2 = () => {},
}: BorrowedBookComponentProps) {
  const { borrow_on, created_at } = item;
  const { title, author_name, cover_edition_key } = item.books;
  const { email, username } = item.users;

  return (
    <Card className={'min-w-[300px] max-w-[510px] grid grid-cols-1 md:grid-cols-2 mx-auto shadow-lg mt-4'}>
      <CardHeader className="mx-auto relative">
        <div className="relative object-cover h-[300px] w-[200px] rounded-md overflow-hidden shadow-lg">
          <Image
            className="object-cover w-full h-full"
            src={`https://covers.openlibrary.org/b/olid/${cover_edition_key}-L.jpg`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="leading-tight flex flex-col">
          <span className="line-clamp-3">
            <strong>Book Author/s:</strong> {author_name.join(', ')}
          </span>
          <span>
            <strong>Borrower ID:</strong> {username}
          </span>
          <span>
            <strong>Borrower&apos;s Contact:</strong> {email}
          </span>
          <span>
            <strong>Borrow On:</strong>{' '}
            {new Date(borrow_on).toLocaleDateString('en-PH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span>
            <strong>Requested On:</strong>{' '}
            {new Date(created_at).toLocaleDateString('en-PH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })}
          </span>
        </CardDescription>

        <div className="flex flex-col gap-2">
          {ctaText && (
            <Button variant={ctaType} onClick={() => ctaFunction && ctaFunction()}>
              {ctaText}
            </Button>
          )}
          {ctaText2 && (
            <Button className="mt-2" variant={ctaType2} onClick={() => ctaFunction2 && ctaFunction2()}>
              {ctaText2}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
