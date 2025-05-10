"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomMarker from "@/components/Map/CustomMarker"


export default function PetaBencana() {
  const lokasiBencana = [
    {
      id: 1,
      posisi: [-6.914744, 107.60981],
      jenis: "bencana",
      informasi: "Banjir di Bandung",
    },
    {
      id: 2,
      posisi: [-6.2, 106.816666],
      jenis: "bencana",
      informasi: "Kebakaran di Jakarta",
    },
    {
      id: 3,
      posisi: [-6.8978, 109.6753],
      jenis: "posko",
      informasi: (
        <div>
          <h6>Posko Pengungsian Masjid Agung Pekalongan</h6>
          <p>Alamat: Jl. KH. Mas Mansyur No. 1</p>
          <p>Kebutuhan Mendesak: Air bersih, selimut, makanan siap saji.</p>
        </div>
      ),
    },
    {
      id: 4,
      posisi: [-7.5678, 110.8217], // Contoh lokasi pantauan di Solo
      jenis: "pantauan",
      informasi: "Potensi Banjir di Area Sungai Bengawan Solo",
    },
  ];

  return (
    <div className="h-64 rounded-lg overflow-hidden">
      <MapContainer center={[-6.914744, 107.60981]} zoom={7} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lokasiBencana.map((lokasi) => (
          <CustomMarker
            key={lokasi.id}
            position={lokasi.posisi}
            jenis={lokasi.jenis}
            informasi={lokasi.informasi}
          />
        ))}
      </MapContainer>
    </div>
  );
}