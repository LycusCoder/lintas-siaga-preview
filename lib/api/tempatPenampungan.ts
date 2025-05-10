import type { TempatPenampungan } from "@/lib/types"
import { getPenggunaById } from "./pengguna"

// Data dummy untuk tempat penampungan
const dummyTempatPenampungan: TempatPenampungan[] = [
  {
    id: 1,
    nama: "Gedung Sekolah SDN 1 Sukajadi",
    deskripsi: "Gedung sekolah yang dialihfungsikan sebagai tempat penampungan sementara",
    latitude: -6.9034,
    longitude: 107.5731,
    alamat: "Jl. Sukajadi No. 123, Bandung",
    kota: "Bandung",
    provinsi: "Jawa Barat",
    kapasitas: 200,
    jumlah_penghuni_saat_ini: 150,
    status: "terbatas",
    nama_kontak: "Budi Santoso",
    telepon_kontak: "081234567890",
    dilaporkan_oleh: 1,
    diverifikasi_oleh: 1,
    diverifikasi_pada: "2023-05-10T10:00:00.000Z",
    kota_id: 1,
    created_at: "2023-05-10T09:30:00.000Z",
    updated_at: "2023-05-10T10:00:00.000Z",
    pelapor: {
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
    verifikator: {
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
  },
  {
    id: 2,
    nama: "GOR Saparua",
    deskripsi: "Gedung olahraga yang digunakan sebagai tempat penampungan",
    latitude: -6.9144,
    longitude: 107.6048,
    alamat: "Jl. Saparua No. 45, Bandung",
    kota: "Bandung",
    provinsi: "Jawa Barat",
    kapasitas: 500,
    jumlah_penghuni_saat_ini: 200,
    status: "tersedia",
    nama_kontak: "Andi Wijaya",
    telepon_kontak: "081234567891",
    dilaporkan_oleh: 2,
    diverifikasi_oleh: 1,
    diverifikasi_pada: "2023-05-09T15:00:00.000Z",
    kota_id: 1,
    created_at: "2023-05-09T14:30:00.000Z",
    updated_at: "2023-05-09T15:00:00.000Z",
    pelapor: {
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
    verifikator: {
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
  },
]

// Fungsi untuk mendapatkan semua tempat penampungan
export const getTempatPenampungan = async (): Promise<TempatPenampungan[]> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyTempatPenampungan
}

// Fungsi untuk mendapatkan tempat penampungan berdasarkan ID
export const getTempatPenampunganById = async (id: number): Promise<TempatPenampungan | undefined> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dummyTempatPenampungan.find((t) => t.id === id)
}

// Fungsi untuk menambah tempat penampungan baru
export const tambahTempatPenampungan = async (data: Omit<TempatPenampungan, "id" | "created_at" | "updated_at" | "pelapor" | "verifikator" | "kota_obj" | "kebutuhan">): Promise<TempatPenampungan> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Dapatkan data pelapor dan verifikator
  const pelapor = await getPenggunaById(data.dilaporkan_oleh)
  
  let verifikator = undefined
  if (data.diverifikasi_oleh) {
    verifikator = await getPenggunaById(data.diverifikasi_oleh)
  }

  const newPenampungan: TempatPenampungan = {
    id: dummyTempatPenampungan.length + 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pelapor: pelapor!,
    verifikator,
  }

  dummyTempatPenampungan.push(newPenampungan)
  return newPenampungan
}

// Fungsi untuk mengedit tempat penampungan
export const editTempatPenampungan = async (id: number, data: Partial<TempatPenampungan>): Promise<TempatPenampungan> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = dummyTempatPenampungan.findIndex((t) => t.id === id)
  if (index === -1) {
    throw new Error("Tempat penampungan tidak ditemukan")
  }

  // Update data yang diperlukan
  if (data.dilaporkan_oleh && data.dilaporkan_oleh !== dummyTempatPenampungan[index].dilaporkan_oleh) {
    const pelapor = await getPenggunaById(data.dilaporkan_oleh)
    data.pelapor = pelapor
  }

  if (data.diverifikasi_oleh && data.diverifikasi_oleh !== dummyTempatPenampungan[index].diverifikasi_oleh) {
    const verifikator = await getPenggunaById(data.diverifikasi_oleh)
    data.verifikator = verifikator
  }

  const updatedPenampungan = {
    ...dummyTempatPenampungan[index],
    ...data,
    updated_at: new Date().toISOString(),
  }

  dummyTempatPenampungan[index] = updatedPenampungan
  return updatedPenampungan
}

// Fungsi untuk menghapus tempat penampungan
export const hapusTempatPenampungan = async (id: number): Promise<void> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = dummyTempatPenampungan.findIndex((t) => t.id === id)
  if (index === -1) {
    throw new Error("Tempat penampungan tidak ditemukan")
  }

  dummyTempatPenampungan.splice(index, 1)
}