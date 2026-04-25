import Image from "next/image";
import { Clock3, ExternalLink, Navigation, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { places } from "@/lib/places";
import { useMapSearch } from "@/components/providers/map-search-provider";

export default function NavStores() {
  const { selectedPlace, setSelectedPlace } = useMapSearch();

  return (
    <div className="group-data-[collapsible=icon]:hidden h-full overflow-hidden px-2 pb-2">
      <div className="flex h-full flex-col">
        <div className="p-3">
          <h3 className="text-sm font-semibold text-foreground">
            Nearby halal spots
          </h3>
          <p className="text-xs text-muted-foreground">
            {places.length} places found near you
          </p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {places.map((place) => {
            const isSelected = selectedPlace?.id === place.id;

            return (
              <div
                key={place.id}
                className={[
                  "overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-colors",
                  isSelected ? "border-green-500" : "border-border",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPlace(place)}
                  className="w-full text-left"
                >
                  <div className="relative h-32 w-full bg-muted">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>

                  <div className="space-y-2 p-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {place.category}
                      </p>
                      <h4 className="truncate text-sm font-semibold text-foreground">
                        {place.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">
                        {place.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({place.reviews.toLocaleString()})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />
                      <span>{place.hours}</span>
                    </div>
                  </div>
                </button>

                <div className="flex gap-2 px-3 pb-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 flex-1"
                    onClick={() => setSelectedPlace(place)}
                  >
                    <Navigation className="size-3.5" />
                    Directions
                  </Button>

                  <Button
                    size="icon-sm"
                    variant="outline"
                    className="h-8 w-8 shrink-0"
                    onClick={() => {
                      window.open(
                        place.website,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                  >
                    <ExternalLink className="size-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
