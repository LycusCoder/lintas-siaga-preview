"use client"

import { useEffect, useRef } from "react"

export default function PetaBencana() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulasi peta dengan placeholder
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <div class="text-center">
            <p class="text-gray-500">Peta Sebaran Bencana</p>
            <p class="text-sm text-gray-400 mt-2">Integrasi dengan peta akan ditampilkan di sini</p>
          </div>
        </div>
      `
    }
  }, [])

  return <div ref={mapRef} className="h-64" />
}
