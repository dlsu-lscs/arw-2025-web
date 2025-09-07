'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { IoSearch } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { orgSearchQueryOptions } from '@/features/orgs/queries/orgs.query.options';
import { OrganizationType } from '@/features/orgs/types/orgs.types';
import OrgCard from '@/features/orgs/components/org-card';

const FormSchema = z.object({
  search: z.string().min(1, 'Search term is required').trim(),
});

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  // Only run the query when search is triggered and searchTerm is not empty
  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    ...orgSearchQueryOptions(searchTerm),
    enabled: isSearchTriggered && searchTerm.length > 0,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: '',
    },
  });

  // Watch for form errors and show toasts
  useEffect(() => {
    const errors = form.formState.errors;
    if (errors.search?.message) {
      toast.error(errors.search.message);
    }
  }, [form.formState.errors]);

  // Reset search triggered when search term is empty
  useEffect(() => {
    if (searchTerm === '') {
      setIsSearchTriggered(false);
    }
  }, [searchTerm]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const trimmedSearch = data.search.trim();

    setSearchTerm(trimmedSearch);
    setIsSearchTriggered(true);
  }

  return (
    <>
      <Popover>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <PopoverTrigger className="w-full">
                      <Input
                        className="font-space-mono border-black border-[1.5px] rounded-none pr-6 focus-visible:ring-0 focus-visible:border-black"
                        placeholder="Search all organizations..."
                        autoComplete="off"
                        {...field}
                      />{' '}
                    </PopoverTrigger>
                  </FormControl>
                  <button className="absolute right-0 top-1/2 -translate-1/2" type="submit">
                    <IoSearch />
                  </button>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <PopoverContent
          align="start"
          className="pixel-corners-wrapper p-0 rounded-0 w-[var(--radix-popover-trigger-width)] max-h-96 overflow-y-auto"
          onOpenAutoFocus={(event) => {
            // stop Radix from moving focus to the content
            event.preventDefault();
            // (optional) ensure the input is focused
          }}
        >
          <div className="pixel-corners !border-black p-4">
            {isLoading && <div className="p-4 text-center">Searching...</div>}

            {error && (
              <div className="p-4 text-center text-red-600">
                Error searching organizations. Please try again.
              </div>
            )}

            {searchResults && searchResults.content && searchResults.content.length > 0 ? (
              <div className="space-y-2 p-2">
                <h3 className="font-semibold text-sm text-gray-700 px-2">Search Results</h3>
                {searchResults.content.map((org: OrganizationType) => (
                  <OrgCard key={org.id} org={org}></OrgCard>
                ))}
              </div>
            ) : searchResults && isSearchTriggered ? (
              <div className="p-4 text-center text-gray-500">
                No organizations found for &ldquo;{searchTerm}&rdquo;
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Start typing to search organizations...
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
