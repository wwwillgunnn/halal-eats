import { Clock3, MapPin, Star } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

const stores = [
  {
    id: 1,
    name: "Saffron Grill",
    cuisine: "Middle Eastern",
    rating: 4.8,
    reviews: 214,
    distance: "0.6 km",
    status: "Open",
    closesAt: "10:00 PM",
    address: "12 City Walk",
  },
  {
    id: 2,
    name: "Halal Bites",
    cuisine: "Burgers",
    rating: 4.6,
    reviews: 153,
    distance: "1.1 km",
    status: "Open",
    closesAt: "11:30 PM",
    address: "45 Main Street",
  },
  {
    id: 3,
    name: "Noor Cafe",
    cuisine: "Desserts",
    rating: 4.7,
    reviews: 96,
    distance: "1.8 km",
    status: "Closing soon",
    closesAt: "8:30 PM",
    address: "8 Riverside Ave",
  },
  {
    id: 4,
    name: "Saffron Grill",
    cuisine: "Middle Eastern",
    rating: 4.8,
    reviews: 214,
    distance: "0.6 km",
    status: "Open",
    closesAt: "10:00 PM",
    address: "12 City Walk",
  },
  {
    id: 5,
    name: "Halal Bites",
    cuisine: "Burgers",
    rating: 4.6,
    reviews: 153,
    distance: "1.1 km",
    status: "Open",
    closesAt: "11:30 PM",
    address: "45 Main Street",
  },
  {
    id: 6,
    name: "Noor Cafe",
    cuisine: "Desserts",
    rating: 4.7,
    reviews: 96,
    distance: "1.8 km",
    status: "Closing soon",
    closesAt: "8:30 PM",
    address: "8 Riverside Ave",
  },
];

export default function NavStores() {
  return (
    <div className="group-data-[collapsible=icon]:hidden px-2 pb-2 h-full overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Nearby halal spots
              </h3>
              <p className="text-xs text-muted-foreground">
                24 places found near you
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {stores.map((store) => (
            <div
              key={store.id}
              className="cursor-pointer rounded-xl border border-border bg-background/70 p-3 transition-colors hover:bg-accent"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {store.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {store.cuisine}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    {store.rating} ({store.reviews})
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {store.distance}
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    Until {store.closesAt}
                  </span>
                </div>

                <p className="truncate text-xs text-muted-foreground">
                  {store.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
