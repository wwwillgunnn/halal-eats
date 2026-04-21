import type { TravelMode } from "./types";

export function formatDuration(seconds: number): string {
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);

    if (mins === 0) return `${secs} sec`;
    return `${mins} min${secs > 0 ? ` ${secs} sec` : ""}`;
  }

  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);

  return `${hours}h ${mins}m`;
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function getOsrmProfile(mode: TravelMode) {
  if (mode === "driving") return "driving";
  if (mode === "walking") return "foot";
  return null;
}

export function getModeLabel(mode: TravelMode) {
  if (mode === "driving") return "Driving";
  if (mode === "walking") return "Walking";
  return "Public transport";
}

export function getRouteColor(mode: TravelMode) {
  if (mode === "driving") return "#2563eb";
  if (mode === "walking") return "#16a34a";
  return "#94a3b8";
}
