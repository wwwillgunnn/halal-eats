"use client";

import { useViewMode } from "@/components/providers/view-mode-provider";
import { MapView } from "@/components/map/map-view";
import { ListView } from "@/components/view-list";

export default function Page() {
  const { view } = useViewMode();

  return (
    <div className="h-full w-full">
      {view === "map" ? <MapView /> : <ListView />}
    </div>
  );
}
