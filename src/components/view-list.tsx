"use client";

import { Clock3, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const restaurants = [
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
    name: "Bismillah Kitchen",
    cuisine: "Pakistani",
    rating: 4.5,
    reviews: 121,
    distance: "2.2 km",
    status: "Open",
    closesAt: "9:00 PM",
    address: "18 North Street",
  },
];

export function ListView() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">
          Halal restaurants nearby
        </h1>
        <p className="text-sm text-muted-foreground">
          24 places found near your location
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="overflow-hidden rounded-2xl border-border"
            >
              <div className="h-40 w-full bg-muted" />

              <CardContent className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-foreground">
                      {restaurant.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {restaurant.cuisine}
                    </p>
                  </div>
                  {/* <Badge
                    variant={
                      restaurant.status === "Open" ? "default" : "secondary"
                    }
                    className="rounded-full"
                  >
                    {restaurant.status}
                  </Badge> */}
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {restaurant.rating} ({restaurant.reviews})
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {restaurant.distance}
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />
                    Until {restaurant.closesAt}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {restaurant.address}
                </p>

                <div className="flex gap-2">
                  <Button className="flex-1 rounded-lg">View details</Button>
                  <Button variant="outline" className="flex-1 rounded-lg">
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
