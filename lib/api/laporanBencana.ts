import type { LaporanBencana } from "@/lib/types"
import { getKategoriBencanaById } from "./kategoriBencana"
import { getPenggunaById } from "./pengguna"

// Data dummy untuk laporan bencana
const dummyLaporanBencana: LaporanBencana[] = [
  {
    id: 1,
    kategori_id: 1,
    jenis: "banjir",
    judul: "Banjir di Kelurahan Sukajadi",
    deskripsi: "Banjir setinggi 1 meter akibat hujan deras selama 3 jam",
    waktu_kejadian: "2023-05-10T08:30:00.000Z",
    tingkat_keparahan: "sedang",
    status: "aktif",
    dilaporkan_oleh: 3,
    kota_id: 1,
    created_at: "2023-05-10T09:00:00.000Z",
    updated_at: "2023-05-10T09:00:00.000Z",
    kategori: {
      id: 1,
      nama_kategori: "Banjir",
      deskripsi: "Bencana akibat meluapnya air sungai atau hujan yang sangat deras",
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-01T00:00:00.000Z",
    },
    pelapor: {
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
    kota: {
      id: 1,
      provinsi_id: 1,
      nama: "Bandung",
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-01T00:00:00.000Z",
    },
  },
  {
    id: 2,
    kategori_id: 4,
    jenis: "kebakaran",
    judul: "Kebakaran Pasar Baru",
    deskripsi: "Kebakaran di area Pasar Baru yang menghanguskan 10 kios",
    waktu_kejadian: "2023-05-09T14:15:00.000Z",
    tingkat_keparahan: "tinggi",
    status: "ditangani",
    dilaporkan_oleh: 2,
    diverifikasi_oleh: 1,
    diverifikasi_pada: "2023-05-09T14:30:00.000Z",
    kota_id: 2,
    created_at: "2023-05-09T14:20:00.000Z",
    updated_at: "2023-05-09T14:30:00.000Z",
    kategori: {
      id: 4,
      nama_kategori: "Kebakaran",
      deskripsi: "Bencana yang disebabkan oleh api yang tidak terkendali",
      created_at: "2023-01-04T00:00:00.000Z",
      updated_at: "2023-01-04T00:00:00.000Z",
    },
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
    kota: {
      id: 2,
      provinsi_id: 2,
      nama: "Jakarta",
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-01T00:00:00.000Z",
    },
  },
]

// Fungsi untuk mendapatkan semua laporan bencana
export const getLaporanBencana = async (): Promise<LaporanBencana[]> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyLaporanBencana
}

// Fungsi untuk mendapatkan laporan bencana berdasarkan ID
export const getLaporanBencanaById = async (id: number): Promise<LaporanBencana | undefined> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dummyLaporanBencana.find((l) => l.id === id)
}

// Fungsi untuk menambah laporan bencana baru
export const tambahLaporanBencana = async (data: Omit<LaporanBencana, "id" | "created_at" | "updated_at" | "kategori" | "pelapor" | "verifikator" | "kota">): Promise<LaporanBencana> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Dapatkan data kategori, pelapor, dan kota
  const kategori = await getKategoriBencanaById(data.kategori_id)
  const pelapor = await getPenggunaById(data.dilaporkan_oleh)
  
  let verifikator = undefined
  if (data.diverifikasi_oleh) {
    verifikator = await getPenggunaById(data.diverifikasi_oleh)
  }

  let kota = undefined
  if (data.kota_id) {
    kota = {
      id: data.kota_id,
      provinsi_id: 1, // Dummy data
      nama: "Kota Dummy",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  const newLaporan: LaporanBencana = {
    id: dummyLaporanBencana.length + 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    kategori: kategori!,
    pelapor: pelapor!,
    verifikator,
    kota,
  }

  dummyLaporanBencana.push(newLaporan)
  return newLaporan
}

// Fungsi untuk mengedit laporan bencana
export const editLaporanBencana = async (id: number, data: Partial<LaporanBencana>): Promise<LaporanBencana> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = dummyLaporanBencana.findIndex((l) => l.id === id)
  if (index === -1) {
    throw new Error("Laporan bencana tidak ditemukan")
  }

  // Update data yang diperlukan
  if (data.kategori_id && data.kategori_id !== dummyLaporanBencana[index].kategori_id) {
    const kategori = await getKategoriBencanaById(data.kategori_id)
    data.kategori = kategori
  }

  if (data.dilaporkan_oleh && data.dilaporkan_oleh !== dummyLaporanBencana[index].dilaporkan_oleh) {
    const pelapor = await getPenggunaById(data.dilaporkan_oleh)
    data.pelapor = pelapor
  }

  if (data.diverifikasi_oleh && data.diverifikasi_oleh !== dummyLaporanBencana[index].diverifikasi_oleh) {
    const verifikator = await getPenggunaById(data.diverifikasi_oleh)
    data.verifikator = verifikator
  }

  const updatedLaporan = {
    ...dummyLaporanBencana[index],
    ...data,
    updated_at: new Date().toISOString(),
  }

  dummyLaporanBencana[index] = updatedLaporan
  return updatedLaporan
}

// Fungsi untuk menghapus laporan bencana
export const hapusLaporanBencana = async (id: number): Promise<void> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = dummyLaporanBencana.findIndex((l) => l.id === id)
  if (index === -1) {
    throw new Error("Laporan bencana tidak ditemukan")
  }

  dummyLaporanBencana.splice(index, 1)
}