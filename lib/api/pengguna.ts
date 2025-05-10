import type { Pengguna } from "@/lib/types"

// Data dummy untuk pengguna
const dummyPengguna: Pengguna[] = [
  {
    id: 1,
    name: "Admin SiagaCrew",
    email: "admin@ltsg.go.id",
    phone: "081234567890",
    alamat: "Jl. Merdeka No. 123",
    kota: "Bandung",
    provinsi: "Jawa Barat",
    role: "admin_ltsg",
    status: "aktif",
    created_at: "2023-01-01T00:00:00.000Z",
    updated_at: "2023-01-01T00:00:00.000Z",
  },
  {
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
  {
    id: 3,
    name: "Warga Publik",
    email: "warga@example.com",
    phone: "081234567892",
    alamat: "Jl. Sudirman No. 78",
    kota: "Surabaya",
    provinsi: "Jawa Timur",
    role: "publik",
    status: "aktif",
    created_at: "2023-01-03T00:00:00.000Z",
    updated_at: "2023-01-03T00:00:00.000Z",
  },
  {
    id: 4,
    name: "Petugas Lapangan",
    email: "petugas@ltsg.go.id",
    phone: "081234567893",
    alamat: "Jl. Gatot Subroto No. 12",
    kota: "Bandung",
    provinsi: "Jawa Barat",
    role: "admin_ltsg",
    status: "aktif",
    created_at: "2023-01-04T00:00:00.000Z",
    updated_at: "2023-01-04T00:00:00.000Z",
  },
  {
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
]

// Fungsi untuk mendapatkan semua pengguna
export const getPengguna = async (): Promise<Pengguna[]> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyPengguna
}

// Fungsi untuk mendapatkan pengguna berdasarkan ID
export const getPenggunaById = async (id: number): Promise<Pengguna | undefined> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dummyPengguna.find((p) => p.id === id)
}

// Fungsi untuk menambah pengguna baru
export const tambahPengguna = async (data: Omit<Pengguna, "id" | "created_at" | "updated_at">): Promise<Pengguna> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newPengguna: Pengguna = {
    id: dummyPengguna.length + 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  dummyPengguna.push(newPengguna)
  return newPengguna
}

// Fungsi untuk mengedit pengguna
export const editPengguna = async (id: number, data: Partial<Pengguna>): Promise<Pengguna> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = dummyPengguna.findIndex((p) => p.id === id)
  if (index === -1) {
    throw new Error("Pengguna tidak ditemukan")
  }

  const updatedPengguna = {
    ...dummyPengguna[index],
    ...data,
    updated_at: new Date().toISOString(),
  }

  dummyPengguna[index] = updatedPengguna
  return updatedPengguna
}

// Fungsi untuk menghapus pengguna
export const hapusPengguna = async (id: number): Promise<void> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = dummyPengguna.findIndex((p) => p.id === id)
  if (index === -1) {
    throw new Error("Pengguna tidak ditemukan")
  }

  dummyPengguna.splice(index, 1)
}
