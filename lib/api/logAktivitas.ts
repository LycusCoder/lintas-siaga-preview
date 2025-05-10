import type { LogAktivitas } from "@/lib/types"
import { getPenggunaById } from "./pengguna"

// Data dummy untuk log aktivitas
const dummyLogAktivitas: LogAktivitas[] = [
  {
    id: 1,
    user_id: 1,
    aksi: "login",
    deskripsi: "Login ke sistem",
    alamat_ip: "192.168.1.1",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    created_at: "2023-05-10T08:00:00.000Z",
    updated_at: "2023-05-10T08:00:00.000Z",
    user: {
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
    user_id: 1,
    aksi: "tambah laporan",
    deskripsi: "Menambahkan laporan bencana baru",
    alamat_ip: "192.168.1.1",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    created_at: "2023-05-10T09:15:00.000Z",
    updated_at: "2023-05-10T09:15:00.000Z",
    user: {
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
    id: 3,
    user_id: 2,
    aksi: "login",
    deskripsi: "Login ke sistem",
    alamat_ip: "192.168.1.2",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    created_at: "2023-05-10T10:30:00.000Z",
    updated_at: "2023-05-10T10:30:00.000Z",
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
    id: 4,
    user_id: 1,
    aksi: "ubah status laporan",
    deskripsi: "Mengubah status laporan dari 'aktif' menjadi 'ditangani'",
    alamat_ip: "192.168.1.1",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    created_at: "2023-05-10T11:45:00.000Z",
    updated_at: "2023-05-10T11:45:00.000Z",
    user: {
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
    id: 5,
    user_id: 3,
    aksi: "login",
    deskripsi: "Login ke sistem",
    alamat_ip: "192.168.1.3",
    user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
    created_at: "2023-05-10T13:00:00.000Z",
    updated_at: "2023-05-10T13:00:00.000Z",
    user: {
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
  },
]

// Fungsi untuk mendapatkan semua log aktivitas
export const getLogAktivitas = async (): Promise<LogAktivitas[]> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyLogAktivitas
}

// Fungsi untuk mendapatkan log aktivitas berdasarkan ID
export const getLogAktivitasById = async (id: number): Promise<LogAktivitas | undefined> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dummyLogAktivitas.find((l) => l.id === id)
}

// Fungsi untuk menambah log aktivitas baru
export const tambahLogAktivitas = async (data: Omit<LogAktivitas, "id" | "created_at" | "updated_at" | "user">): Promise<LogAktivitas> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Dapatkan data user jika ada
  let user = undefined
  if (data.user_id) {
    user = await getPenggunaById(data.user_id)
  }

  const newLog: LogAktivitas = {
    id: dummyLogAktivitas.length + 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user,
  }

  dummyLogAktivitas.push(newLog)
  return newLog
}