"use client";

import { useEffect, useState } from "react";
import type { Place } from "@/components/map/restaurant-marker";
import type { RouteData, TravelMode } from "@/lib/types";
import { getOsrmProfile } from "@/lib/route-utils";

interface UseRouteArgs {
  selectedPlace: Place | null;
  travelMode: TravelMode;
  start: { lng: number; lat: number };
}

export function useRoute({ selectedPlace, travelMode, start }: UseRouteArgs) {
  const [route, setRoute] = useState<RouteData | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  useEffect(() => {
    if (!selectedPlace) {
      setRoute(null);
      return;
    }

    const profile = getOsrmProfile(travelMode);

    if (!profile) {
      setRoute(null);
      return;
    }

    let cancelled = false;

    async function fetchRoute() {
      setIsLoadingRoute(true);

      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/${profile}/${start.lng},${start.lat};${selectedPlace!.lng},${selectedPlace!.lat}?overview=full&geometries=geojson&alternatives=false`,
        );

        const data = await response.json();

        if (cancelled) return;

        if (data.routes?.[0]) {
          const selectedRoute = data.routes[0];

          setRoute({
            coordinates: selectedRoute.geometry.coordinates,
            duration: selectedRoute.duration,
            distance: selectedRoute.distance,
          });
        } else {
          setRoute(null);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch route:", error);
          setRoute(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingRoute(false);
        }
      }
    }

    fetchRoute();

    return () => {
      cancelled = true;
    };
  }, [selectedPlace, travelMode, start]);

  return { route, isLoadingRoute };
}
