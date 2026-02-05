import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationMapPickerProps {
  value?: { lat: number; lng: number; address?: string };
  onChange: (location: { lat: number; lng: number; address?: string }) => void;
}

function LocationMarker({
  position,
  setPosition,
}: {
  position: LatLng | null;
  setPosition: (pos: LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={defaultIcon} />
  );
}

export function LocationMapPicker({ value, onChange }: LocationMapPickerProps) {
  const [position, setPosition] = useState<LatLng | null>(
    value ? new LatLng(value.lat, value.lng) : null
  );

  // Default center: Ho Chi Minh City
  const defaultCenter: [number, number] = [10.8231, 106.6297];

  useEffect(() => {
    if (position) {
      // Reverse geocoding to get address (simple implementation)
      onChange({
        lat: position.lat,
        lng: position.lng,
        address: `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`,
      });
    }
  }, [position, onChange]);

  return (
    <div className="space-y-2">
      <div className="h-[200px] rounded-lg overflow-hidden border border-border">
        <MapContainer
          center={value ? [value.lat, value.lng] : defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
      {position && (
        <p className="text-xs text-muted-foreground">
          📍 Selected: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Click on the map to select a location
      </p>
    </div>
  );
}
