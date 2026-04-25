"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useViewMode } from "@/components/providers/view-mode-provider";

export function ModeSwitch() {
  const { view, setView } = useViewMode();

  return (
    <Tabs
      value={view}
      onValueChange={(value) => setView(value as "map" | "list")}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="map">Map</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
