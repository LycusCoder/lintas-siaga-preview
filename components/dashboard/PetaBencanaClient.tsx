// components/PetaBencanaClient.tsx
"use client";

import { useMemo, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function PetaBencanaClient() {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  }, []);

  const icons = useMemo(() => {
    const makeIcon = (name: string) =>
      new L.Icon({
        iconUrl: `/leaflet/${name}`,
        iconRetinaUrl: `/leaflet/${name}`,
        shadowUrl: "/leaflet/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    return {
      bencana: makeIcon("marker-bencana.png"),
      posko: makeIcon("marker-posko.png"),
      pemantau: makeIcon("marker-pemantauan.png"),
      gempa: makeIcon("marker-gempa.png"),
      tsunami: makeIcon("marker-tsunami.png"),
      cuaca: makeIcon("marker-cuaca.png"),
    };
  }, []);

  const locations = [
    { id: 1, pos: [-6.914744, 107.60981], icon: icons.bencana, title: "Banjir Bandung", desc: "Jan 2025" },
    { id: 2, pos: [-6.2, 106.816666], icon: icons.bencana, title: "Kebakaran Jaksel", desc: "Feb 2025" },
    { id: 3, pos: [-6.8978, 109.6753], icon: icons.posko, title: "Posko Pekalongan", desc: "Mar 2025" },
    { id: 4, pos: [-7.25, 112.75], icon: icons.pemantau, title: "Pantau Kelud", desc: "Apr 2025" },
    { id: 5, pos: [-0.7893, 119.4189], icon: icons.gempa, title: "Stasiun Gempa", desc: "Mei 2025" },
    { id: 6, pos: [0.7893, 98.6544], icon: icons.tsunami, title: "Zona Tsunami", desc: "Jul 2025" },
    { id: 7, pos: [-2.5489, 118.0149], icon: icons.cuaca, title: "BMKG Sulsel", desc: "Agu 2025" },
  ];

  return (
    <div className="h-96 rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.pos} icon={loc.icon}>
            <Popup>
              <strong>{loc.title}</strong>
              <div className="text-sm text-gray-600 mt-1">{loc.desc}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
