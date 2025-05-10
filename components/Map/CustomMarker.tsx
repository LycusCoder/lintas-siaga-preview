"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, ReactNode } from "react";

interface CustomMarkerProps {
  position: [number, number];
  jenis: "bencana" | "posko" | "pantauan" | string;
  informasi: ReactNode;
}

function createCustomIcon(iconUrl: string) {
  return new L.Icon({
    iconUrl: `/leaflet/${iconUrl}`,
    iconRetinaUrl: `/leaflet/${iconUrl.replace(".png", "-2x.png")}`,
    shadowUrl: "/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

export default function CustomMarker({ position, jenis, informasi }: CustomMarkerProps) {
  const [icon, setIcon] = useState<L.Icon>();

  useEffect(() => {
    let iconUrl: string;
    switch (jenis) {
      case "bencana":
        iconUrl = "marker-bencana.png";
        break;
      case "posko":
        iconUrl = "marker-posko.png";
        break;
      case "pantauan":
        iconUrl = "marker-pantauan.png";
        break;
      default:
        iconUrl = "marker-icon.png";
    }
    setIcon(createCustomIcon(iconUrl));
  }, [jenis]);

  if (!icon) return null;

  return (
    <Marker position={position} icon={icon}>
      <Popup>{informasi}</Popup>
    </Marker>
  );
}
