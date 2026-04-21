import { useEffect, useMemo, useRef, useState } from "react";
import { Map, MapControls, MapRoute, type MapRef } from "@/components/ui/map";
import { Loader2 } from "lucide-react";
import { RestaurantMarker, type Place } from "./restaurant-marker";
import { TravelModeToggle } from "./travel-mode-toggle";
import { RouteInfoCard } from "./route-info-card";
import { MapStyleSelect } from "./map-style-select";
import { StartMarker } from "./start-marker";
import { useRoute } from "@/hooks/use-route";
import { getRouteColor } from "@/lib/route-utils";
import type { TravelMode } from "@/lib/types";

const styles = {
  default: undefined,
  openstreetmap: "https://tiles.openfreemap.org/styles/bright",
  openstreetmap3d: "https://tiles.openfreemap.org/styles/liberty",
};

type StyleKey = keyof typeof styles;

// TODO: Change to actual location
const start = { name: "Start", lng: 2.3522, lat: 48.8566 };

export function MapView() {
  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<StyleKey>("default");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>("driving");

  const selectedStyle = styles[style];
  const is3D = style === "openstreetmap3d";

  const { route, isLoadingRoute } = useRoute({
    selectedPlace,
    travelMode,
    start,
  });

  const routeColor = useMemo(() => getRouteColor(travelMode), [travelMode]);

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 });
  }, [is3D]);

  useEffect(() => {
    if (!route?.coordinates.length) return;

    const lngs = route.coordinates.map((coord) => coord[0]);
    const lats = route.coordinates.map((coord) => coord[1]);

    const west = Math.min(...lngs);
    const east = Math.max(...lngs);
    const south = Math.min(...lats);
    const north = Math.max(...lats);

    mapRef.current?.fitBounds(
      [
        [west, south],
        [east, north],
      ],
      { padding: 80, duration: 800 },
    );
  }, [route]);

  return (
    <div className="relative h-screen w-full">
      <Map
        ref={mapRef}
        center={[2.3522, 48.8566]}
        zoom={8.5}
        styles={
          selectedStyle
            ? { light: selectedStyle, dark: selectedStyle }
            : undefined
        }
      >
        <MapControls
          position="top-right"
          className="top-32 right-4 hidden md:block md:top-2 md:right-2"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />

        <MapControls
          position="bottom-right"
          showLocate
          className="bottom-32 md:hidden"
        />

        {route && travelMode !== "transit" && (
          <MapRoute
            coordinates={route.coordinates}
            color={routeColor}
            width={6}
            opacity={0.95}
          />
        )}

        <StartMarker lng={start.lng} lat={start.lat} />
        <RestaurantMarker onDirections={setSelectedPlace} />
      </Map>

      {selectedPlace && (
        <div className="absolute inset-x-3 bottom-28 z-10 flex flex-col gap-2 w-72 md:w-auto md:inset-x-auto md:bottom-auto md:left-3 md:top-3 md:max-w-[calc(100%-1.5rem)]">
          <RouteInfoCard
            travelMode={travelMode}
            route={route}
            selectedPlace={selectedPlace}
          />
          <TravelModeToggle travelMode={travelMode} onChange={setTravelMode} />
        </div>
      )}

      <MapStyleSelect
        style={style}
        onChange={(value) => setStyle(value as StyleKey)}
      />

      {isLoadingRoute && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/40">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
