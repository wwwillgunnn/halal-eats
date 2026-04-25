"use client";

import { createContext, useContext, useState } from "react";
import type { Place } from "@/lib/places";

type MapSearchContextValue = {
  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
};

const MapSearchContext = createContext<MapSearchContextValue | null>(null);

export function MapSearchProvider({ children }: { children: React.ReactNode }) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <MapSearchContext.Provider value={{ selectedPlace, setSelectedPlace }}>
      {children}
    </MapSearchContext.Provider>
  );
}

export function useMapSearch() {
  const context = useContext(MapSearchContext);

  if (!context) {
    throw new Error("useMapSearch must be used inside MapSearchProvider");
  }

  return context;
}
