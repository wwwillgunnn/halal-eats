"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, MapPin, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { places } from "@/lib/places";
import { useMapSearch } from "@/components/providers/map-search-provider";

type SearchBarProps = React.ComponentProps<"div">;

export function SearchBar({ className }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const { selectedPlace, setSelectedPlace } = useMapSearch();

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-10 w-full justify-between rounded-xl px-3 font-normal"
            >
              <span className="flex min-w-0 items-center gap-2">
                <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">
                  {selectedPlace ? selectedPlace.name : "Search..."}
                </span>
              </span>

              <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
            </Button>
          }
        />

        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) p-0"
        >
          <Command>
            <CommandInput placeholder="Search places..." />
            <CommandList>
              <CommandEmpty>No place found.</CommandEmpty>

              <CommandGroup heading="Places">
                {places.map((place) => (
                  <CommandItem
                    key={place.id}
                    value={`${place.name} ${place.category} ${place.label}`}
                    onSelect={() => {
                      setSelectedPlace(place);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <MapPin className="mr-2 size-4 text-muted-foreground" />

                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium">{place.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {place.category} · {place.rating} stars
                      </span>
                    </div>

                    <Check
                      className={cn(
                        "ml-2 size-4",
                        selectedPlace?.id === place.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
