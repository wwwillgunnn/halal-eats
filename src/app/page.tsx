"use client";

import { useViewMode } from "@/components/view-mode-provider";
import { MapView } from "@/components/view-map";
import { ListView } from "@/components/view-list";

export default function Page() {
  const { view } = useViewMode();

  return (
    <div className="h-full w-full">
      {view === "map" ? <MapView /> : <ListView />}
    </div>
  );
}
