'use client';
import type React from 'react';

import type { ReactNode } from 'react';
import { Button } from '@components/atoms/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/atoms/card';

interface AuthFormProps {
  title: string;
  description: string;
  children: ReactNode;
  submitText: string;
  onSubmit: (e: React.FormEvent) => void;
  footer?: ReactNode;
}

export default function AuthForm({ title, description, children, submitText, onSubmit, footer }: AuthFormProps) {
  return (
    <Card className="w-full h-full md:h-auto max-w-md shadow-lg flex flex-col justify-center">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold uppercase text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            {submitText}
          </Button>
          {footer}
        </CardFooter>
      </form>
    </Card>
  );
}
