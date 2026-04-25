import Image from "next/image";
import {
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Star, Navigation, Clock, ExternalLink } from "lucide-react";
import { Place, places } from "@/lib/places";

interface RestaurantMarkerProps {
  onDirections?: (place: Place) => void;
  selectedPlaceId?: number | null;
}

export function RestaurantMarker({
  onDirections,
  selectedPlaceId,
}: RestaurantMarkerProps) {
  return (
    <>
      {places.map((place) => {
        const isSelected = selectedPlaceId === place.id;

        return (
          <MapMarker key={place.id} longitude={place.lng} latitude={place.lat}>
            <MarkerContent>
              <div
                className={[
                  "size-5 cursor-pointer rounded-full border-2 border-white bg-rose-500 shadow-lg transition-transform hover:scale-110",
                  isSelected && "scale-125 ring-4 ring-rose-500/30",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
              <MarkerLabel position="bottom">{place.name}</MarkerLabel>
            </MarkerContent>

            <MarkerPopup className="w-62 overflow-hidden p-0">
              <div className="relative h-32 w-full overflow-hidden rounded-t-md bg-muted">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover"
                  sizes="248px"
                />
              </div>

              <div className="space-y-2 p-3">
                <div>
                  <p className="text-muted-foreground pb-0.5 text-[11px] font-medium tracking-wide uppercase">
                    {place.category}
                  </p>
                  <h3 className="text-foreground leading-tight font-semibold">
                    {place.name}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{place.rating}</span>
                    <span className="text-muted-foreground">
                      ({place.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>

                <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  <Clock className="size-3.5" />
                  <span>{place.hours}</span>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => onDirections?.(place)}
                  >
                    <Navigation className="size-3.5" />
                    Directions
                  </Button>

                  <Button size="icon-sm" variant="outline">
                    <ExternalLink className="size-3.5" />
                  </Button>
                </div>
              </div>
            </MarkerPopup>
          </MapMarker>
        );
      })}
    </>
  );
}
