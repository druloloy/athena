'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../atoms/card';
import { Button } from '../atoms/button';
import { IBook } from '@/database/types';

export interface BookProps extends Omit<IBook, 'id' | 'created_at'> {
  id?: string;
  created_at?: Date;
}

export function Book({
  title,
  author_name,
  subject,
  cover_edition_key,
  ctaText,
  ctaType,
  ctaFunction,
}: BookProps & {
  size?: 'sm' | 'md' | 'lg';
  ctaText: string;
  ctaType: 'default' | 'destructive';
  ctaFunction?: () => void;
}) {
  return (
    <Card className={'min-w-[300px] max-w-[510px] grid grid-cols-1 md:grid-cols-2 mx-auto shadow-lg mt-4'}>
      <CardHeader className="mx-auto">
        <Image
          src={`https://covers.openlibrary.org/b/olid/${cover_edition_key}-L.jpg`}
          alt={title}
          width={300}
          height={400}
          priority
        />
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <CardTitle className="font-semibold leading-none tracking-tight break-normal break-words">{title}</CardTitle>
        <CardDescription className="leading-tight">
          <strong>Author/s:</strong> {author_name.join(', ')}
        </CardDescription>
        <CardDescription className="my-4 leading-tight line-clamp-3">
          <strong>Genres:</strong> {subject.join(', ')}
        </CardDescription>
        <Button variant={ctaType} onClick={() => ctaFunction && ctaFunction()}>
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}
