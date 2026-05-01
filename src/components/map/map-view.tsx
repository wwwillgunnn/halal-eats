import { useEffect, useRef, useState } from "react";
import { Map, MapControls, MapRoute, type MapRef } from "@/components/ui/map";
import { Loader2 } from "lucide-react";
import { RestaurantMarker } from "./restaurant-marker";
import { TravelModeToggle } from "./travel-mode-toggle";
import { RouteInfoCard } from "./route-info-card";
import { MapStyleSelect } from "./map-style-select";
import { StartMarker } from "./start-marker";
import { useRoute } from "@/hooks/use-route";
import { getRouteColor } from "@/lib/route-utils";
import type { TravelMode } from "@/lib/types";
import { useMapSearch } from "@/components/providers/map-search-provider";
import { RestaurantFilters } from "../sidebar/restaurant-filters";

const styles = {
  default: undefined,
  openstreetmap: "https://tiles.openfreemap.org/styles/bright",
  openstreetmap3d: "https://tiles.openfreemap.org/styles/liberty",
};

type StyleKey = keyof typeof styles;

const DEFAULT_CENTER: [number, number] = [151.2093, -33.8688];

export function MapView() {
  const mapRef = useRef<MapRef>(null);

  const [style, setStyle] = useState<StyleKey>("default");
  const [travelMode, setTravelMode] = useState<TravelMode>("driving");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

  const { selectedPlace, setSelectedPlace } = useMapSearch();

  const selectedStyle = styles[style];
  const is3D = style === "openstreetmap3d";

  const start = userLocation
    ? { name: "Your location", lng: userLocation[0], lat: userLocation[1] }
    : { name: "Start", lng: DEFAULT_CENTER[0], lat: DEFAULT_CENTER[1] };

  const { route, isLoadingRoute } = useRoute({
    selectedPlace,
    travelMode,
    start,
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        const currentLocation: [number, number] = [longitude, latitude];

        setUserLocation(currentLocation);

        mapRef.current?.flyTo({
          center: currentLocation,
          zoom: 14,
          duration: 900,
        });
      },
      (error) => {
        console.error("Could not get location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    mapRef.current?.easeTo({
      pitch: is3D ? 60 : 0,
      duration: 500,
    });
  }, [is3D]);

  useEffect(() => {
    if (route?.coordinates.length) {
      const lngs = route.coordinates.map(([lng]) => lng);
      const lats = route.coordinates.map(([, lat]) => lat);

      mapRef.current?.fitBounds(
        [
          [Math.min(...lngs), Math.min(...lats)],
          [Math.max(...lngs), Math.max(...lats)],
        ],
        {
          padding: 80,
          duration: 800,
        },
      );

      return;
    }

    if (selectedPlace) {
      mapRef.current?.flyTo({
        center: [selectedPlace.lng, selectedPlace.lat],
        zoom: 15,
        duration: 900,
      });
    }
  }, [route, selectedPlace]);

  return (
    <div className="relative h-screen w-full">
      <Map
        ref={mapRef}
        center={userLocation ?? DEFAULT_CENTER}
        zoom={userLocation ? 13 : 8}
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
            color={getRouteColor(travelMode)}
            width={6}
            opacity={0.95}
          />
        )}

        <StartMarker lng={start.lng} lat={start.lat} />

        <RestaurantMarker
          onDirections={setSelectedPlace}
          selectedPlaceId={selectedPlace?.id ?? null}
        />
      </Map>

      {selectedPlace && (
        <div className="absolute inset-x-3 bottom-28 z-10 flex w-72 flex-col gap-2 md:inset-x-auto md:bottom-auto md:left-3 md:top-3 md:w-auto md:max-w-[calc(100%-1.5rem)]">
          <RouteInfoCard
            travelMode={travelMode}
            route={route}
            selectedPlace={selectedPlace}
            onClearSelectedPlace={() => setSelectedPlace(null)}
          />

          <TravelModeToggle travelMode={travelMode} onChange={setTravelMode} />
        </div>
      )}

      <MapStyleSelect
        style={style}
        onChange={(value) => setStyle(value as StyleKey)}
      />

      <RestaurantFilters />

      {isLoadingRoute && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/40">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
