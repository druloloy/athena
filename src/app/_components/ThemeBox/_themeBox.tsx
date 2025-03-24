'use client';
import { useTheme } from '@/app/_hooks/use-theme';
import React from 'react';
import { Button } from '@/app/_components/atoms/button';
import { cn } from '@/lib/utils';
import { Moon, Sun, SunDim } from 'lucide-react';

export const ThemeBox = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="default"
      onClick={() => {
        toggleTheme();
      }}
      className={cn('px-0 rounded-full')}
    >
      {theme === 'light' ? <Sun /> : theme === 'dark' ? <Moon /> : <SunDim />}
    </Button>
  );
};
