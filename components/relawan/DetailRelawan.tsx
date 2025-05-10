// components/relawan/DetailRelawan.tsx

import { type Relawan } from "@/lib/types"

export default function DetailRelawan({ relawan }: { relawan: Relawan }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Nama:</h3>
        <p>{relawan.user.name}</p>
      </div>
      <div>
        <h3 className="font-semibold">Keahlian:</h3>
        <p>{relawan.keahlian.join(", ")}</p>
      </div>
      <div>
        <h3 className="font-semibold">Ketersediaan:</h3>
        <p>{relawan.ketersediaan}</p>
      </div>
      <div>
        <h3 className="font-semibold">Rating:</h3>
        <p>{relawan.rating}</p>
      </div>
      <div>
        <h3 className="font-semibold">Terakhir Aktif:</h3>
        <p>{new Date(relawan.terakhir_aktif).toLocaleDateString("id-ID")}</p>
      </div>
    </div>
  )
}