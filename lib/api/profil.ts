import type { Pengguna } from "@/lib/types"

// Data dummy untuk profil pengguna yang sedang login
const dummyProfil: Pengguna = {
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
}

// Fungsi untuk mendapatkan profil pengguna yang sedang login
export const getProfil = async (): Promise<Pengguna> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyProfil
}

// Fungsi untuk memperbarui profil pengguna
export const updateProfil = async (data: Partial<Pengguna>): Promise<Pengguna> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Update profil dengan data baru
  const updatedProfil = {
    ...dummyProfil,
    ...data,
    updated_at: new Date().toISOString(),
  }

  // Dalam aplikasi nyata, ini akan mengirim permintaan ke API
  // Untuk demo, kita hanya memperbarui objek lokal
  Object.assign(dummyProfil, updatedProfil)

  return updatedProfil
}

// Fungsi untuk memperbarui password
export const updatePassword = async (data: {
  current_password: string
  new_password: string
  confirm_password: string
}): Promise<void> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Simulasi validasi password saat ini
  if (data.current_password !== "password123") {
    throw new Error("Password saat ini tidak valid")
  }

  // Dalam aplikasi nyata, ini akan mengirim permintaan ke API
  // Untuk demo, kita hanya simulasikan berhasil
  return Promise.resolve()
}