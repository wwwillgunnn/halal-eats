"use client";

import { useState } from "react";
import { Camera, Star, ChefHat, Clock } from "lucide-react";

// TODO: update this to either use shad or just design it better idk
export function RestaurantFilters() {
  const [price, setPrice] = useState("all");
  const [rating, setRating] = useState("all");
  const [cuisine, setCuisine] = useState("all");
  const [hours, setHours] = useState("all");

  return (
    <div className="absolute left-4 right-4 top-20 z-10 flex items-center gap-2 overflow-x-auto md:left-2 md:right-auto md:top-2 md:overflow-visible">
      <FilterSelect
        icon={<Camera className="h-4 w-4" />}
        value={price}
        onChange={setPrice}
        options={[
          { label: "Price", value: "all" },
          { label: "$", value: "$" },
          { label: "$$", value: "$$" },
          { label: "$$$", value: "$$$" },
        ]}
      />
      <FilterSelect
        icon={<Star className="h-4 w-4 fill-current" />}
        value={rating}
        onChange={setRating}
        options={[
          { label: "Rating", value: "all" },
          { label: "4.5+", value: "4.5" },
          { label: "4.0+", value: "4.0" },
          { label: "3.5+", value: "3.5" },
        ]}
      />
      <FilterSelect
        icon={<ChefHat className="h-4 w-4" />}
        value={cuisine}
        onChange={setCuisine}
        options={[
          { label: "Cuisine", value: "all" },
          { label: "Burgers", value: "burgers" },
          { label: "Pakistani", value: "pakistani" },
          { label: "BBQ", value: "bbq" },
        ]}
      />
      <FilterSelect
        icon={<Clock className="h-4 w-4" />}
        value={hours}
        onChange={setHours}
        options={[
          { label: "Hours", value: "all" },
          { label: "Open now", value: "open-now" },
          { label: "Open late", value: "open-late" },
        ]}
      />
    </div>
  );
}

type FilterSelectProps = {
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
};

function FilterSelect({ icon, value, onChange, options }: FilterSelectProps) {
  return (
    <label className="relative inline-flex items-center">
      <span className="pointer-events-none absolute left-2 text-foreground">
        {icon}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border bg-background py-1 pl-7 pr-2 text-sm text-foreground shadow"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
