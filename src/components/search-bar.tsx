"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

const FormSchema = z.object({
  search: z.string(),
});

export function SearchBar() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Popover>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
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
                        {...field}
                      />{" "}
                    </PopoverTrigger>
                  </FormControl>
                  <button
                    className="absolute right-0 top-1/2 -translate-1/2"
                    type="submit"
                  >
                    <IoSearch />
                  </button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <PopoverContent
          align="start"
          className=""
          onOpenAutoFocus={(event) => {
            // stop Radix from moving focus to the content
            event.preventDefault();
            // (optional) ensure the input is focused
          }}
        >
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </>
  );
}
