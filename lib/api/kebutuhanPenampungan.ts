import type { KebutuhanPenampungan } from "@/lib/types"
import { getTempatPenampunganById } from "./tempatPenampungan"

// Data dummy untuk kebutuhan penampungan
const dummyKebutuhanPenampungan: KebutuhanPenampungan[] = [
  {
    id: 1,
    tempat_penampungan_id: 1,
    kategori: "makanan",
    nama_kebutuhan: "Beras",
    deskripsi: "Beras untuk konsumsi pengungsi",
    jumlah: 500,
    prioritas: "tinggi",
    status: "terpenuhi_sebagian",
    created_at: "2023-05-10T10:30:00.000Z",
    updated_at: "2023-05-10T10:30:00.000Z",
    tempat_penampungan: {
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
  },
  {
    id: 2,
    tempat_penampungan_id: 1,
    kategori: "air",
    nama_kebutuhan: "Air Minum Kemasan",
    deskripsi: "Air minum dalam kemasan botol 600ml",
    jumlah: 1000,
    prioritas: "tinggi",
    status: "dibutuhkan",
    created_at: "2023-05-10T10:35:00.000Z",
    updated_at: "2023-05-10T10:35:00.000Z",
    tempat_penampungan: {
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
  },
]

// Fungsi untuk mendapatkan semua kebutuhan penampungan
export const getKebutuhanPenampungan = async (): Promise<KebutuhanPenampungan[]> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyKebutuhanPenampungan
}

// Fungsi untuk mendapatkan kebutuhan penampungan berdasarkan ID
export const getKebutuhanPenampunganById = async (id: number): Promise<KebutuhanPenampungan | undefined> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dummyKebutuhanPenampungan.find((k) => k.id === id)
}

// Fungsi untuk menambah kebutuhan penampungan baru
export const tambahKebutuhanPenampungan = async (data: Omit<KebutuhanPenampungan, "id" | "created_at" | "updated_at" | "tempat_penampungan">): Promise<KebutuhanPenampungan> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Dapatkan data tempat penampungan
  const tempatPenampungan = await getTempatPenampunganById(data.tempat_penampungan_id)

  const newKebutuhan: KebutuhanPenampungan = {
    id: dummyKebutuhanPenampungan.length + 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tempat_penampungan: tempatPenampungan!,
  }

  dummyKebutuhanPenampungan.push(newKebutuhan)
  return newKebutuhan
}

// Fungsi untuk mengedit kebutuhan penampungan
export const editKebutuhanPenampungan = async (id: number, data: Partial<KebutuhanPenampungan>): Promise<KebutuhanPenampungan> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = dummyKebutuhanPenampungan.findIndex((k) => k.id === id)
  if (index === -1) {
    throw new Error("Kebutuhan penampungan tidak ditemukan")
  }

  // Update data tempat penampungan jika berubah
  if (data.tempat_penampungan_id && data.tempat_penampungan_id !== dummyKebutuhanPenampungan[index].tempat_penampungan_id) {
    const tempatPenampungan = await getTempatPenampunganById(data.tempat_penampungan_id)
    data.tempat_penampungan = tempatPenampungan
  }

  const updatedKebutuhan = {
    ...dummyKebutuhanPenampungan[index],
    ...data,
    updated_at: new Date().toISOString(),
  }

  dummyKebutuhanPenampungan[index] = updatedKebutuhan
  return updatedKebutuhan
}

// Fungsi untuk menghapus kebutuhan penampungan
export const hapusKebutuhanPenampungan = async (id: number): Promise<void> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = dummyKebutuhanPenampungan.findIndex((k) => k.id === id)
  if (index === -1) {
    throw new Error("Kebutuhan penampungan tidak ditemukan")
  }

  dummyKebutuhanPenampungan.splice(index, 1)
}