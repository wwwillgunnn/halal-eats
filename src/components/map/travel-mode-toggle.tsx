import { Car, PersonStanding, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TravelMode } from "@/lib/types";

interface TravelModeToggleProps {
  travelMode: TravelMode;
  onChange: (mode: TravelMode) => void;
}

export function TravelModeToggle({
  travelMode,
  onChange,
}: TravelModeToggleProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-background/95 p-2 shadow-md backdrop-blur supports-backdrop-filter:bg-background/80">
      <Button
        type="button"
        size="sm"
        variant={travelMode === "driving" ? "default" : "secondary"}
        onClick={() => onChange("driving")}
        className={
          travelMode === "driving"
            ? "gap-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
            : "gap-2"
        }
      >
        <Car className="size-4" />
        Car
      </Button>

      <Button
        type="button"
        size="sm"
        variant={travelMode === "walking" ? "default" : "secondary"}
        onClick={() => onChange("walking")}
        className={
          travelMode === "walking"
            ? "gap-2 border-green-600 bg-green-600 text-white hover:bg-green-700"
            : "gap-2"
        }
      >
        <PersonStanding className="size-4" />
        Walk
      </Button>

      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled
        className="gap-2 cursor-not-allowed opacity-60"
      >
        <Train className="size-4" />
        Transit
      </Button>
    </div>
  );
}
