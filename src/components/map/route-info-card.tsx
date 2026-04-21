import { Clock, Route as RouteIcon } from "lucide-react";
import type { Place } from "@/components/map/restaurant-marker";
import type { RouteData, TravelMode } from "@/lib/types";
import {
  formatDistance,
  formatDuration,
  getModeLabel,
  getRouteColor,
} from "@/lib/route-utils";

interface RouteInfoCardProps {
  travelMode: TravelMode;
  route: RouteData | null;
  selectedPlace: Place | null;
}

export function RouteInfoCard({
  travelMode,
  route,
  selectedPlace,
}: RouteInfoCardProps) {
  const modeLabel = getModeLabel(travelMode);
  const routeColor = getRouteColor(travelMode);

  return (
    <div className="rounded-xl border bg-background/95 px-3 py-2 shadow-md backdrop-blur supports-backdrop-filter:bg-background/80">
      {travelMode === "transit" ? (
        <div>
          <p className="text-sm font-medium">Public transport unavailable</p>
          <p className="text-xs text-muted-foreground">
            Transit routing is not supported by the current routing API.
          </p>
        </div>
      ) : route ? (
        <>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {formatDuration(route.duration)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <RouteIcon className="size-4" style={{ color: routeColor }} />
              <span className="text-sm text-muted-foreground">
                {formatDistance(route.distance)}
              </span>
            </div>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            {modeLabel} ETA to {selectedPlace?.name}
          </p>
        </>
      ) : (
        <div>
          <p className="text-sm font-medium">{modeLabel} route unavailable</p>
          <p className="text-xs text-muted-foreground">
            No {modeLabel.toLowerCase()} route could be found to{" "}
            {selectedPlace?.name}.
          </p>
        </div>
      )}
    </div>
  );
}
