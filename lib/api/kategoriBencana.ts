import type { KategoriBencana } from "@/lib/types"

// Data dummy untuk kategori bencana
const dummyKategoriBencana: KategoriBencana[] = [
  {
    id: 1,
    nama_kategori: "Banjir",
    deskripsi: "Bencana akibat meluapnya air sungai atau hujan yang sangat deras",
    created_at: "2023-01-01T00:00:00.000Z",
    updated_at: "2023-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    nama_kategori: "Gempa Bumi",
    deskripsi: "Getaran atau guncangan yang terjadi di permukaan bumi",
    created_at: "2023-01-02T00:00:00.000Z",
    updated_at: "2023-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    nama_kategori: "Tanah Longsor",
    deskripsi: "Pergerakan tanah atau bebatuan menuruni lereng",
    created_at: "2023-01-03T00:00:00.000Z",
    updated_at: "2023-01-03T00:00:00.000Z",
  },
  {
    id: 4,
    nama_kategori: "Kebakaran",
    deskripsi: "Bencana yang disebabkan oleh api yang tidak terkendali",
    created_at: "2023-01-04T00:00:00.000Z",
    updated_at: "2023-01-04T00:00:00.000Z",
  },
  {
    id: 5,
    nama_kategori: "Tsunami",
    deskripsi: "Gelombang air laut yang sangat besar akibat gempa di dasar laut",
    created_at: "2023-01-05T00:00:00.000Z",
    updated_at: "2023-01-05T00:00:00.000Z",
  },
]

// Fungsi untuk mendapatkan semua kategori bencana
export const getKategoriBencana = async (): Promise<KategoriBencana[]> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyKategoriBencana
}

// Fungsi untuk mendapatkan kategori bencana berdasarkan ID
export const getKategoriBencanaById = async (id: number): Promise<KategoriBencana | undefined> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 300))
  return dummyKategoriBencana.find((k) => k.id === id)
}

// Fungsi untuk menambah kategori bencana baru
export const tambahKategoriBencana = async (
  data: Omit<KategoriBencana, "id" | "created_at" | "updated_at">,
): Promise<KategoriBencana> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newKategori: KategoriBencana = {
    id: dummyKategoriBencana.length + 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  dummyKategoriBencana.push(newKategori)
  return newKategori
}

// Fungsi untuk mengedit kategori bencana
export const editKategoriBencana = async (id: number, data: Partial<KategoriBencana>): Promise<KategoriBencana> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = dummyKategoriBencana.findIndex((k) => k.id === id)
  if (index === -1) {
    throw new Error("Kategori bencana tidak ditemukan")
  }

  const updatedKategori = {
    ...dummyKategoriBencana[index],
    ...data,
    updated_at: new Date().toISOString(),
  }

  dummyKategoriBencana[index] = updatedKategori
  return updatedKategori
}

// Fungsi untuk menghapus kategori bencana
export const hapusKategoriBencana = async (id: number): Promise<void> => {
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = dummyKategoriBencana.findIndex((k) => k.id === id)
  if (index === -1) {
    throw new Error("Kategori bencana tidak ditemukan")
  }

  dummyKategoriBencana.splice(index, 1)
}
