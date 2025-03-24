'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../atoms/card';
import { Button } from '../atoms/button';
import { IBook } from '@/database/types';

export interface BookProps extends Omit<IBook, 'id' | 'created_at'> {
  id?: string;
  created_at?: Date;
}

export interface BookComponentProps {
  item: BookProps;
  ctaText?: string;
  ctaType?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  ctaFunction?: () => void;
  ctaText2?: string;
  ctaType2?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  ctaFunction2?: () => void;
}

export function Book({ item, ctaText, ctaType, ctaText2, ctaType2, ctaFunction, ctaFunction2 }: BookComponentProps) {
  const { title, author_name, subject, cover_edition_key } = item;

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
      <CardContent className="flex flex-col justify-between">
        <div className="">
          <CardTitle className="font-semibold leading-none tracking-tight break-normal break-words">{title}</CardTitle>
          <CardDescription className="leading-tight">
            <strong>Author/s:</strong> {author_name.join(', ')}
          </CardDescription>
          <CardDescription className="my-4 leading-tight line-clamp-3">
            <strong>Genres:</strong> {subject.join(', ')}
          </CardDescription>
        </div>
        <div className="flex flex-col">
          {ctaText && (
            <Button variant={ctaType} onClick={() => ctaFunction && ctaFunction()}>
              {ctaText}
            </Button>
          )}
          {ctaText2 && (
            <Button variant={ctaType2} onClick={() => ctaFunction2 && ctaFunction2()}>
              {ctaText2}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
