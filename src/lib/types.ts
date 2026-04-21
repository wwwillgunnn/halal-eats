export type TravelMode = "driving" | "walking" | "transit";

export interface RouteData {
  coordinates: [number, number][];
  duration: number;
  distance: number;
}
