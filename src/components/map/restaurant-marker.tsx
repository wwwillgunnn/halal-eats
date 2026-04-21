import {
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Star, Navigation, Clock, ExternalLink } from "lucide-react";
// import Image from "next/image";

export interface Place {
  id: number;
  name: string;
  label: string;
  category: string;
  rating: number;
  reviews: number;
  hours: string;
  lng: number;
  lat: number;
}

const places: Place[] = [
  {
    id: 1,
    name: "Eiffel Tower",
    label: "Landmark",
    category: "Landmark",
    rating: 4.8,
    reviews: 18234,
    hours: "9:30 AM - 11:45 PM",
    // image:
    //   "https://images.unsplash.com/photo-1549144511-f099e773c147?w=300&h=200&fit=crop",
    lng: 2.2945,
    lat: 48.8584,
  },
  {
    id: 2,
    name: "Louvre Museum",
    label: "Museum",
    category: "Museum",
    rating: 4.9,
    reviews: 25671,
    hours: "9:00 AM - 6:00 PM",
    // image:
    //   "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=300&h=200&fit=crop",
    lng: 2.3364,
    lat: 48.8606,
  },
  {
    id: 3,
    name: "Gare du Nord",
    label: "Transit",
    category: "Transit",
    rating: 4.5,
    reviews: 9342,
    hours: "Open 24 hours",
    // image:
    //   "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=200&fit=crop",
    lng: 2.3553,
    lat: 48.8809,
  },
];

interface RestaurantMarkerProps {
  onDirections?: (place: Place) => void;
}

export function RestaurantMarker({ onDirections }: RestaurantMarkerProps) {
  return (
    <>
      {places.map((place) => (
        <MapMarker key={place.id} longitude={place.lng} latitude={place.lat}>
          <MarkerContent>
            <div className="size-5 cursor-pointer rounded-full border-2 border-white bg-rose-500 shadow-lg transition-transform hover:scale-110" />
            <MarkerLabel position="bottom">{place.label}</MarkerLabel>
          </MarkerContent>

          <MarkerPopup className="w-62 p-0">
            <div className="relative h-32 overflow-hidden rounded-t-md">
              {/* <Image
                fill
                src={place.image}
                alt={place.name}
                className="object-cover"
              /> */}
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
      ))}
    </>
  );
}
