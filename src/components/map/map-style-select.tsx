interface MapStyleSelectProps {
  style: string;
  onChange: (value: string) => void;
}

export function MapStyleSelect({ style, onChange }: MapStyleSelectProps) {
  return (
    <div className="absolute top-2 right-12 z-10 hidden md:block">
      <select
        value={style}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border bg-background px-2 py-1 text-sm text-foreground shadow"
      >
        <option value="default">Default (Carto)</option>
        <option value="openstreetmap">OpenStreetMap</option>
        <option value="openstreetmap3d">OpenStreetMap 3D</option>
      </select>
    </div>
  );
}
