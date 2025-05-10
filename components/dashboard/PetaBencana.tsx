"use client";

// components/PetaBencana.tsx
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Import client-only komponen secara dinamis
const PetaBencanaClient = dynamic(() => import("./PetaBencanaClient"), {
  ssr: false,
  loading: () => (
    <div className="h-96 rounded-lg flex items-center justify-center bg-gray-100 text-gray-500 shadow-md border border-gray-300">
      <p className="text-center text-sm">Memuat peta bencana...</p>
    </div>
  ),
});

export default function PetaBencana() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 rounded-lg flex items-center justify-center bg-gray-100 text-gray-500 shadow-md border border-gray-300">
        <p className="text-center text-sm">Peta Bencana (Preview)</p>
      </div>
    );
  }

  return <PetaBencanaClient />;
}
