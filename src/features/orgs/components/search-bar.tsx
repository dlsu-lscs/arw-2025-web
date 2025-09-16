'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IoSearch, IoClose } from 'react-icons/io5';
import { useSearchStore } from '@/features/orgs/store/useSearchStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect } from 'react';

const FormSchema = z.object({
  search: z.string().trim(),
});

export function SearchBar() {
  const {
    inputValue,
    setInputValue,
    setDebouncedSearchTerm,
    setIsTyping,
    clearSearch,
    isSearchActive,
  } = useSearchStore();

  // Debounce the input value with 300ms delay
  const debouncedInputValue = useDebounce(inputValue, 300);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: inputValue,
    },
  });

  // Update the debounced search term when debounced value changes
  useEffect(() => {
    setDebouncedSearchTerm(debouncedInputValue);
  }, [debouncedInputValue, setDebouncedSearchTerm]);

  // Sync form with external store changes (like when clearSearch is called from other components)
  useEffect(() => {
    if (inputValue === '' && form.getValues('search') !== '') {
      form.reset({ search: '' });
    }
  }, [inputValue, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const trimmedSearch = data.search.trim();

    if (trimmedSearch === '') {
      clearSearch();
    } else {
      // Immediately set the debounced term on form submit (Enter key)
      setDebouncedSearchTerm(trimmedSearch);
    }
  }

  // Handle real-time input changes
  const handleInputChange = (value: string) => {
    form.setValue('search', value);
    setInputValue(value);
    setIsTyping(value.trim().length > 0);

    if (value.trim() === '') {
      clearSearch();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  className="font-space-mono border-black border-[1.5px] rounded-none pr-10 focus-visible:ring-0 focus-visible:border-black"
                  placeholder="Search all organizations..."
                  autoComplete="off"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e.target.value);
                  }}
                />
              </FormControl>
              {isSearchActive ? (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer text-gray-500 hover:text-gray-700"
                  type="button"
                  onClick={() => {
                    clearSearch();
                    form.reset();
                  }}
                >
                  <IoClose />
                </button>
              ) : (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                  type="submit"
                >
                  <IoSearch />
                </button>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
