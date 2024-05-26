"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface SelectTypeDropdownProps {
  onChange: (value: string) => void;
}

const formSchema = z.object({
  value: z.string({ required_error: "Value is required" }),
});

const SelectTypeDropdown: React.FC<SelectTypeDropdownProps> = ({
  onChange,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isOpen, setIsOpen] = useState(false);
  const onSelect = (value: string) => {
    form.setValue("value", value);
    onChange(form.getValues("value"));
    setIsOpen(false);
  };
  const values = [
    "views",
    "likes",
    "dislikes",
    "estimatedMinutesWatched",
    "averageViewDuration",
    "subscribersGained",
    "subscribersLost",
  ];
  useEffect(() => {
    form.setValue("value", "views");
  }, []);
  return (
    <Form {...form}>
      <form className="flex flex-row gap-x-4 items-center">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-x-2">
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-10 text-left font-normal capitalize",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto flex flex-col p-1"
                  align="start"
                >
                  <div className="w-full flex flex-col gap-x-1 z-10">
                    {values.map((value) => (
                      <p
                        key={value}
                        onClick={() => {
                          onSelect(value);
                        }}
                        className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      >
                        {value}
                      </p>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SelectTypeDropdown;
