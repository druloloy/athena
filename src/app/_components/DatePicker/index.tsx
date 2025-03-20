'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@components/atoms/button';
import { Calendar } from '@components/atoms/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@components/atoms/popover';

export function DatePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[280px] justify-start text-left font-normal', !selectedDate && 'text-muted-foreground')}
        >
          <CalendarIcon />
          {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          fromDate={new Date()}
          // toDate={
          //   new Date(new Date().setDate(new Date().getDate() + 5)) // set to 5 days from now
          // }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
