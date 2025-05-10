import type { Relawan } from "@/lib/types"
import { getPenggunaById } from "./pengguna"

// Data dummy untuk relawan
const dummyRelawan: Relawan[] = [
  {
    id: 1,
    user_id: 2,
    keahlian: ["P3K", "Evakuasi", "Logistik"],
    pengalaman: "Relawan bencana selama 5 tahun",
    ketersediaan: "tersedia",
    terakhir_aktif: "2023-05-10T12:00:00.000Z",
    rating: 4.8,
    created_at: "2023-01-02T00:00:00.000Z",
    updated_at: "2023-05-10T12:00:00.000Z",
    user: {
      id: 2,
      name: "Relawan Siaga",
      email: "relawan@example.com",
      phone: "081234567891",
      alamat: "Jl. Pahlawan No. 45",
      kota: "Jakarta",
      provinsi: "DKI Jakarta",
      role: "relawan",
      status: "aktif",
      created_at: "2023-01-02T00:00:00.000Z",
      updated_at: "2023-01-02T00:00:00.000Z",
    },
  },
  {
    id: 2,
    user_id: 5,
    keahlian: ["Medis", "P3K", "Psikologi"],
    pengalaman: "Dokter umum dengan pengalaman relawan 3 tahun",
    ketersediaan: "siaga",
    terakhir_aktif: "2023-05-09T18:00:00.000Z",
    rating: 4.9,
    created_at: "2023-01-05T00:00:00.000Z",
    updated_at: "2023-05-09T18:00:00.000Z",
    user: {
      id: 5,
      name: "Relawan Medis",
      email: "medis@example.com",
      phone: "081234567894",
      alamat: "Jl. Kesehatan No. 56",
      kota: "Yogyakarta",
      provinsi: "DI Yogyakarta",
      role: "relawan",
      status: "aktif",
      created_at: "2023-01-05T00:00:00.000Z",
      updated_at: "2023-01-05T00:00:00.000Z",
    },
  },
]

// Fungsi untuk mendapatkan semua relawan
export const getRelawan = async (): Promise<Relawan[]> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyRelawan
}

// Fungsi untuk mendapatkan relawan berdasarkan ID
export const getRelawanById = async (id: number): Promise<Relawan | undefined> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dummyRelawan.find((r) => r.id === id)
}

// Fungsi untuk menambah relawan baru
export const tambahRelawan = async (data: Omit<Relawan, "id" | "created_at" | "updated_at" | "user" | "penugasan">): Promise<Relawan> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Dapatkan data user
  const user = await getPenggunaById(data.user_id)

  const newRelawan: Relawan = {
    id: dummyRelawan.length + 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user: user!,
  }

  dummyRelawan.push(newRelawan)
  return newRelawan
}

// Fungsi untuk mengedit relawan
export const editRelawan = async (id: number, data: Partial<Relawan>): Promise<Relawan> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = dummyRelawan.findIndex((r) => r.id === id)
  if (index === -1) {
    throw new Error("Relawan tidak ditemukan")
  }

  // Update data user jika berubah
  if (data.user_id && data.user_id !== dummyRelawan[index].user_id) {
    const user = await getPenggunaById(data.user_id)
    data.user = user
  }

  const updatedRelawan = {
    ...dummyRelawan[index],
    ...data,
    updated_at: new Date().toISOString(),
  }

  dummyRelawan[index] = updatedRelawan
  return updatedRelawan
}

// Fungsi untuk menghapus relawan
export const hapusRelawan = async (id: number): Promise<void> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = dummyRelawan.findIndex((r) => r.id === id)
  if (index === -1) {
    throw new Error("Relawan tidak ditemukan")
  }

  dummyRelawan.splice(index, 1)
}