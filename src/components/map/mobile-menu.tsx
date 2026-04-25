"use client";

import { useState } from "react";
import { SearchBar } from "@/components/sidebar/search-bar";
import { SelectGroup } from "@/components/sidebar/select-group";
import { Map, Plus, X, Store, MapPin, Utensils, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const stores = [
  {
    id: 1,
    name: "Halal Bites",
    subtitle: "Burgers · 8 min away",
  },
  {
    id: 2,
    name: "Spice Corner",
    subtitle: "Pakistani · 12 min away",
  },
  {
    id: 3,
    name: "Sultan Grill",
    subtitle: "BBQ · 15 min away",
  },
];

type PanelType = "explore" | "contribute" | null;

function ExplorePanel() {
  return (
    <div className="rounded-2xl border bg-background/95 p-4 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Explore places
          </h3>
          <p className="text-xs text-muted-foreground">
            Filter restaurants and browse nearby spots
          </p>
        </div>

        <SelectGroup />

        <div className="max-h-56 space-y-2 overflow-y-auto">
          {stores.map((store) => (
            <button
              key={store.id}
              type="button"
              className="flex w-full items-start gap-3 rounded-xl border bg-card px-3 py-3 text-left shadow-sm transition hover:bg-accent"
            >
              <div className="mt-0.5 rounded-lg border bg-background p-2">
                <Store className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {store.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {store.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContributePanel() {
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    address: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Replace with API/db call later
    console.log("New food spot submitted:", formData);

    setFormData({
      name: "",
      cuisine: "",
      address: "",
      notes: "",
    });
  }

  return (
    <div className="mb-12 rounded-2xl border bg-background/95 p-4 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Add a food spot
          </h3>
          <p className="text-xs text-muted-foreground">
            Share a restaurant so it can be added to the map
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label
              htmlFor="spot-name"
              className="text-xs font-medium text-foreground"
            >
              Spot name
            </label>
            <div className="flex items-center gap-2 rounded-xl border bg-card px-3">
              <Utensils className="size-4 shrink-0 text-muted-foreground" />
              <input
                id="spot-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Zamzam Grill"
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="spot-cuisine"
              className="text-xs font-medium text-foreground"
            >
              Cuisine / category
            </label>
            <div className="flex items-center gap-2 rounded-xl border bg-card px-3">
              <Store className="size-4 shrink-0 text-muted-foreground" />
              <input
                id="spot-cuisine"
                name="cuisine"
                type="text"
                value={formData.cuisine}
                onChange={handleChange}
                placeholder="e.g. Burgers, Lebanese, Cafe"
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="spot-address"
              className="text-xs font-medium text-foreground"
            >
              Address or location
            </label>
            <div className="flex items-center gap-2 rounded-xl border bg-card px-3">
              <MapPin className="size-4 shrink-0 text-muted-foreground" />
              <input
                id="spot-address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, suburb, or landmark"
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="spot-notes"
              className="text-xs font-medium text-foreground"
            >
              Notes
            </label>
            <div className="flex gap-2 rounded-xl border bg-card px-3 py-3">
              <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <textarea
                id="spot-notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Optional details like halal status, popular dishes, opening hours..."
                className="min-h-21 w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Submit food spot
          </button>
        </form>
      </div>
    </div>
  );
}

export default function MobileMenu() {
  const [openPanel, setOpenPanel] = useState<PanelType>(null);

  const isExploreOpen = openPanel === "explore";
  const isContributeOpen = openPanel === "contribute";

  function togglePanel(panel: Exclude<PanelType, null>) {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between md:hidden">
      <div className="pointer-events-auto mt-8 space-y-2 p-4">
        <SearchBar className="bg-background/95 shadow-md backdrop-blur supports-backdrop-filter:bg-background/80" />
      </div>

      <div className="pointer-events-auto">
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            openPanel
              ? "max-h-[55vh] translate-y-0 px-4 opacity-100"
              : "max-h-0 translate-y-4 px-4 pb-0 opacity-0",
            isExploreOpen && openPanel && "pb-4",
            isContributeOpen && openPanel && "pb-28",
          )}
        >
          {isExploreOpen && <ExplorePanel />}
          {isContributeOpen && <ContributePanel />}
        </div>

        <div className="w-full rounded-t-2xl border bg-background/95 p-6 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/80">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => togglePanel("explore")}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-medium shadow-sm transition ${
                isExploreOpen
                  ? "bg-accent text-foreground"
                  : "bg-card text-foreground hover:bg-accent"
              }`}
            >
              {isExploreOpen ? (
                <X className="size-5" />
              ) : (
                <Map className="size-5" />
              )}
              <span>{isExploreOpen ? "Close" : "Explore"}</span>
            </button>

            <button
              type="button"
              onClick={() => togglePanel("contribute")}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-medium shadow-sm transition ${
                isContributeOpen
                  ? "bg-accent text-foreground"
                  : "bg-card text-foreground hover:bg-accent"
              }`}
            >
              {isContributeOpen ? (
                <X className="size-5" />
              ) : (
                <Plus className="size-5" />
              )}
              <span>{isContributeOpen ? "Close" : "Contribute"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
