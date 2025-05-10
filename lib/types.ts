// Tipe data untuk pengguna
export interface Pengguna {
  id: number
  name: string
  email: string
  phone: string
  alamat?: string
  kota?: string
  provinsi?: string
  role: "publik" | "relawan" | "admin_ltsg"
  path_ktp?: string
  status: "aktif" | "tidak_aktif" | "diblokir"
  email_verified_at?: string
  created_at: string
  updated_at: string
}

// Tipe data untuk kategori bencana
export interface KategoriBencana {
  id: number
  nama_kategori: string
  deskripsi?: string
  created_at: string
  updated_at: string
}

// Tipe data untuk provinsi
export interface Provinsi {
  id: number
  nama: string
  created_at: string
  updated_at: string
}

// Tipe data untuk kota
export interface Kota {
  id: number
  provinsi_id: number
  nama: string
  created_at: string
  updated_at: string
  provinsi?: Provinsi
}

// Tipe data untuk kecamatan
export interface Kecamatan {
  id: number
  kota_id: number
  nama: string
  created_at: string
  updated_at: string
  kota?: Kota
}

// Tipe data untuk laporan kejadian
export interface LaporanBencana {
  id: number
  kategori_id: number
  jenis?: "banjir" | "gempa_bumi" | "tanah_longsor" | "kebakaran" | "lainnya"
  judul: string
  deskripsi: string
  lokasi_kejadian?: { x: number; y: number }
  waktu_kejadian: string
  tingkat_keparahan: "rendah" | "sedang" | "tinggi"
  status: "aktif" | "ditangani" | "selesai"
  dilaporkan_oleh: number
  diverifikasi_oleh?: number
  diverifikasi_pada?: string
  kota_id?: number
  created_at: string
  updated_at: string
  kategori: KategoriBencana
  pelapor: Pengguna
  verifikator?: Pengguna
  kota?: Kota
  gambar?: GambarLaporanKejadian[]
}

// Tipe data untuk media laporan
export interface MediaLaporan {
  id: number
  laporan_kejadian_id: number
  path: string
  jenis_media: string
  nama_file?: string
  created_at: string
  updated_at: string
}

// Tipe data untuk gambar laporan kejadian
export interface GambarLaporanKejadian {
  id: number
  laporan_kejadian_id: number
  path: string
  keterangan?: string
  created_at: string
  updated_at: string
}

// Tipe data untuk tempat penampungan
export interface TempatPenampungan {
  id: number
  nama: string
  deskripsi?: string
  latitude: number
  longitude: number
  alamat: string
  kota: string
  provinsi: string
  kapasitas: number
  jumlah_penghuni_saat_ini: number
  status: "tersedia" | "terbatas" | "penuh"
  nama_kontak?: string
  telepon_kontak?: string
  dilaporkan_oleh: number
  diverifikasi_oleh?: number
  diverifikasi_pada?: string
  kota_id?: number
  created_at: string
  updated_at: string
  pelapor: Pengguna
  verifikator?: Pengguna
  kota_obj?: Kota
  kebutuhan?: KebutuhanPenampungan[]
}

// Tipe data untuk kebutuhan tempat penampungan
export interface KebutuhanPenampungan {
  id: number
  tempat_penampungan_id: number
  kategori: "makanan" | "air" | "obat" | "pakaian" | "selimut" | "lainnya"
  nama_kebutuhan: string
  deskripsi?: string
  jumlah: number
  prioritas: "rendah" | "sedang" | "tinggi"
  status: "dibutuhkan" | "terpenuhi_sebagian" | "terpenuhi"
  created_at: string
  updated_at: string
  tempat_penampungan: TempatPenampungan
}

// Tipe data untuk organisasi relawan
export interface OrganisasiRelawan {
  id: number
  nama: string
  deskripsi?: string
  kontak?: string
  created_at: string
  updated_at: string
}

// Tipe data untuk log status laporan
export interface LogStatusLaporan {
  id: number
  laporan_kejadian_id: number
  status_sebelumnya?: "aktif" | "ditangani" | "selesai"
  status_baru: "aktif" | "ditangani" | "selesai"
  diubah_oleh: number
  waktu_perubahan: string
  pengubah: Pengguna
  laporan: LaporanBencana
}

// Tipe data untuk relawan
export interface Relawan {
  id: number
  user_id: number
  keahlian: string[]
  pengalaman?: string
  ketersediaan: "tersedia" | "siaga" | "bertugas"
  terakhir_aktif?: string
  rating: number
  created_at: string
  updated_at: string
  user: Pengguna
  penugasan?: PenugasanRelawan[]
}

// Tipe data untuk penugasan relawan
export interface PenugasanRelawan {
  id: number
  relawan_id: number
  laporan_kejadian_id?: number
  tempat_penampungan_id?: number
  peran: string
  deskripsi?: string
  waktu_mulai: string
  waktu_berakhir?: string
  status: "ditugaskan" | "diterima" | "ditolak" | "selesai" | "dibatalkan"
  ditugaskan_oleh: number
  created_at: string
  updated_at: string
  relawan: Relawan
  laporan?: LaporanBencana
  penampungan?: TempatPenampungan
  penugasan_oleh: Pengguna
}

// Tipe data untuk log aktivitas
export interface LogAktivitas {
  id: number
  user_id?: number
  aksi: string
  deskripsi?: string
  alamat_ip?: string
  user_agent?: string
  created_at: string
  updated_at: string
  user?: Pengguna
}
