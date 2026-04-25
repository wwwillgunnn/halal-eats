import Image from "next/image";
import { Clock3, ExternalLink, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { places } from "@/lib/places";
import { useMapSearch } from "@/components/providers/map-search-provider";

export function ListView() {
  const { selectedPlace, setSelectedPlace } = useMapSearch();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">
          Halal restaurants nearby
        </h1>
        <p className="text-sm text-muted-foreground">
          {places.length} places found near your location
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {places.map((place) => {
            const isSelected = selectedPlace?.id === place.id;

            return (
              <Card
                key={place.id}
                className={[
                  "overflow-hidden rounded-2xl border-border p-0 transition-colors",
                  isSelected && "border-green-500",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="relative h-40 w-full bg-muted">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
                  />
                </div>

                <CardContent className="space-y-4 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {place.category}
                    </p>
                    <h2 className="truncate text-base font-semibold text-foreground">
                      {place.name}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {place.rating} ({place.reviews.toLocaleString()})
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />
                      {place.hours}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">{place.label}</p>

                  <div className="flex gap-2">
                    {/* <Button
                      className="flex-1 rounded-lg"
                      onClick={() => setSelectedPlace(place)}
                    >
                      <Navigation className="size-4" />
                      Directions
                    </Button> */}

                    <Button
                      variant="outline"
                      className="flex-1 rounded-lg"
                      onClick={() =>
                        window.open(
                          place.website,
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                    >
                      <ExternalLink className="size-4" />
                      Website
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
