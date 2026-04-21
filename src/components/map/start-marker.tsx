import { MapMarker, MarkerContent, MarkerLabel } from "@/components/ui/map";

interface StartMarkerProps {
  lng: number;
  lat: number;
  label?: string;
}

export function StartMarker({
  lng,
  lat,
  label = "Current Location",
}: StartMarkerProps) {
  return (
    <MapMarker longitude={lng} latitude={lat}>
      <MarkerContent>
        <div className="size-5 rounded-full border-2 border-white bg-green-500 shadow-lg" />
        <MarkerLabel position="top">{label}</MarkerLabel>
      </MarkerContent>
    </MapMarker>
  );
}
