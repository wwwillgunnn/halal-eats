import { SearchBar } from "./search-bar";
import { SelectGroup } from "./select-group";
import { Map, Plus } from "lucide-react";

export default function MobileMenu() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between md:hidden">
      <div className="pointer-events-auto p-4 space-y-2 mt-8">
        <SearchBar />
        <SelectGroup />
      </div>

      {/* TODO: drawer menu, add filters here */}
      <div className="pointer-events-auto">
        <div className="w-full rounded-t-2xl border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 p-6 shadow-lg">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border bg-card px-4 py-4 text-sm font-medium text-foreground shadow-sm transition hover:bg-accent">
              <Map className="size-5" />
              <span>Explore</span>
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl border bg-card px-4 py-4 text-sm font-medium text-foreground shadow-sm transition hover:bg-accent">
              <Plus className="size-5" />
              <span>Contribute</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
