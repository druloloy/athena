'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@components/atoms/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@components/atoms/command';
import { Popover, PopoverContent, PopoverTrigger } from '@components/atoms/popover';

const searchOptions = [
  {
    value: 'title',
    label: 'Title',
  },
  {
    value: 'author',
    label: 'Author',
  },
  {
    value: 'genre',
    label: 'Genre',
  },
];

export function ComboBox({ setValue }: { setValue: React.Dispatch<React.SetStateAction<string>> }) {
  const [open, setOpen] = React.useState(false);
  const [_value, _setValue] = React.useState('title');

  React.useEffect(() => {
    setValue(_value || 'title');
  }, [_value, setValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[100px] justify-between">
          {_value
            ? searchOptions.find((searchOption) => searchOption.value === _value)?.label
            : 'Select Search Option...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {searchOptions.map((searchOption) => (
                <CommandItem
                  key={searchOption.value}
                  value={searchOption.value}
                  onSelect={(currentValue) => {
                    _setValue(currentValue === _value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {searchOption.label}
                  <Check className={cn('ml-auto', _value === searchOption.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
