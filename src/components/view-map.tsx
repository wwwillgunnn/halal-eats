"use client";

import { useState, useEffect, useRef } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerLabel,
  type MapRef,
} from "@/components/ui/map";
import { RestaurantMarker, type Place } from "./restaurant-marker";
import { Loader2 } from "lucide-react";

const styles = {
  default: undefined,
  openstreetmap: "https://tiles.openfreemap.org/styles/bright",
  openstreetmap3d: "https://tiles.openfreemap.org/styles/liberty",
};

type StyleKey = keyof typeof styles;

interface RouteData {
  coordinates: [number, number][];
  duration: number;
  distance: number;
}

const start = { name: "Start", lng: 2.3522, lat: 48.8566 };

export function MapView() {
  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<StyleKey>("default");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [route, setRoute] = useState<RouteData | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  const selectedStyle = styles[style];
  const is3D = style === "openstreetmap3d";

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 });
  }, [is3D]);

  useEffect(() => {
    if (!selectedPlace) {
      setRoute(null);
      return;
    }

    const place = selectedPlace;

    async function fetchRoute() {
      setIsLoadingRoute(true);

      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${place.lng},${place.lat}?overview=full&geometries=geojson&alternatives=true`,
        );

        const data = await response.json();

        if (data.routes?.[0]) {
          const selectedRoute = data.routes[0];
          const coordinates = selectedRoute.geometry.coordinates as [
            number,
            number,
          ][];

          setRoute({
            coordinates,
            duration: selectedRoute.duration,
            distance: selectedRoute.distance,
          });

          const lngs = coordinates.map((coord) => coord[0]);
          const lats = coordinates.map((coord) => coord[1]);

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
        }
      } catch (error) {
        console.error("Failed to fetch route:", error);
      } finally {
        setIsLoadingRoute(false);
      }
    }

    fetchRoute();
  }, [selectedPlace]);

  return (
    <div className="h-screen w-full relative">
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
        {/* Desktop Menu */}
        <MapControls
          position="top-right"
          className="top-32 right-4 hidden md:block md:top-2 md:right-2"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />
        {/* Mobile Menu */}
        <MapControls
          position="bottom-right"
          showLocate
          className="bottom-32 md:hidden"
        />

        {route && (
          <MapRoute
            coordinates={route.coordinates}
            color="#6366f1"
            width={6}
            opacity={0.9}
          />
        )}

        {/* TODO: add time and distance info in the top left */}

        <MapMarker longitude={start.lng} latitude={start.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-green-500 border-2 border-white shadow-lg" />
            <MarkerLabel position="top">Current Location</MarkerLabel>
          </MarkerContent>
        </MapMarker>

        <RestaurantMarker onDirections={setSelectedPlace} />
      </Map>

      <div className="hidden absolute top-2 right-12 z-10 md:visible">
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as StyleKey)}
          className="bg-background text-foreground rounded-md border px-2 py-1 text-sm shadow"
        >
          <option value="default">Default (Carto)</option>
          <option value="openstreetmap">OpenStreetMap</option>
          <option value="openstreetmap3d">OpenStreetMap 3D</option>
        </select>
      </div>

      {isLoadingRoute && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/40">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
