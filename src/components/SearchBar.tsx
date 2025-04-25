
import React, { useEffect, useState } from 'react';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { Doctor } from '../types/doctor';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
}

export const SearchBar = ({ doctors, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [query, doctors]);

  const handleSelect = (doctorName: string) => {
    setQuery(doctorName);
    onSearch(doctorName);
    setSuggestions([]);
  };

  return (
    <div className="w-full max-w-lg relative">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search doctors..."
          value={query}
          onValueChange={(value) => {
            setQuery(value);
            onSearch(value);
          }}
          className="h-12"
        />
        {suggestions.length > 0 && (
          <CommandList className="absolute w-full bg-white rounded-b-lg shadow-lg">
            {suggestions.map((doctor) => (
              <CommandItem
                key={doctor.id}
                value={doctor.name}
                onSelect={() => handleSelect(doctor.name)}
                className={cn(
                  "px-4 py-2 cursor-pointer hover:bg-blue-50",
                )}
              >
                {doctor.name}
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
};
