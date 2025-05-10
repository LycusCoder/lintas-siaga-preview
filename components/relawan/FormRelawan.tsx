// components/relawan/FormRelawan.tsx

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Relawan } from "@/lib/types"
import { useState } from "react"

type Props = {
  relawan?: Relawan | null
  onSubmit: (data: any) => void
}

export default function FormRelawan({ relawan, onSubmit }: Props) {
  const [name, setName] = useState(relawan?.user.name || "")
  const [keahlian, setKeahlian] = useState(relawan?.keahlian.join(", ") || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      user: { name },
      keahlian: keahlian.split(",").map((s) => s.trim()),
      ketersediaan: "tersedia",
      rating: 4.5,
      terakhir_aktif: new Date().toISOString(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Nama</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label>Keahlian (pisahkan dengan koma)</Label>
        <Input value={keahlian} onChange={(e) => setKeahlian(e.target.value)} />
      </div>
      <Button type="submit" className="w-full">Simpan</Button>
    </form>
  )
}