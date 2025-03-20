import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../atoms/card';
import { Button } from '../atoms/button';
import { IUser, IBorrowedBook, IBook } from '@/database/types';

export interface BorrowedBookProps extends IBorrowedBook {
  users: IUser;
  books: IBook;
}
export function BorrowedBook({
  borrow_on,
  books,
  users,
  size,
  created_at,
  ctaText,
  ctaType = 'default',
  ctaFunction = () => {},
  ctaText2,
  ctaType2 = 'default',
  ctaFunction2 = () => {},
}: BorrowedBookProps & {
  size?: 'sm' | 'md' | 'lg';
  ctaText?: string;
  ctaType?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  ctaFunction?: () => void;
  ctaText2?: string;
  ctaType2?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  ctaFunction2?: () => void;
}) {
  const { title, author_name, cover_edition_key } = books;
  const { email, username } = users;

  return (
    <Card className={'min-w-[300px] max-w-[510px] grid grid-cols-1 md:grid-cols-2 mx-auto shadow-lg mt-4'}>
      <CardHeader>
        <div className="">
          <Image
            src={`https://covers.openlibrary.org/b/olid/${cover_edition_key}-L.jpg`}
            alt={title}
            width={size === 'sm' ? 200 : size === 'md' ? 300 : 400}
            height={400}
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="leading-tight">
          <strong>Author/s:</strong> {author_name.join(', ')}
        </CardDescription>
        <CardDescription className="my-4 leading-tight line-clamp-3">
          <strong>Borrowed By:</strong> {username}
        </CardDescription>
        <CardDescription className="my-4 leading-tight line-clamp-3">
          <strong>Borrow On:</strong>{' '}
          {new Date(borrow_on).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
        <CardDescription className="my-4 leading-tight line-clamp-3">
          <strong>Requested On:</strong>{' '}
          {new Date(created_at).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </CardDescription>

        <CardDescription className="my-4 leading-tight line-clamp-3">
          <strong>Contact At:</strong> {email}
        </CardDescription>

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
      </CardContent>
    </Card>
  );
}
